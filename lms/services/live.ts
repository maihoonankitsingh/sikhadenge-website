// =============================================================
// Live class service (Phase 3 · 100ms).
//
// Flow:
//  1. Admin batch banata hai -> live class schedule karta hai
//     (100ms room + host/guest codes ban jaate hain).
//  2. Student dashboard me class dikhi -> "Join" -> hosted 100ms room.
//  3. Class end -> 100ms recording process karta hai -> webhook aata hai
//     -> hum recording ko us course me LIVE_RECORDING lesson bana dete hain
//     (auto-update, bina manual upload). Ye tumhari core demand hai.
// =============================================================

import { prisma } from "../../lib/prisma";
import { serviceOk, serviceFail, type ServiceResult } from "../types";
import { isHmsConfigured, createRoom, createRoomCodes, pickCodes, prebuiltUrl } from "../hms";
import { notifyMany } from "../notify";

const RECORDINGS_MODULE_TITLE = "Class Recordings";

// ---------- Batches (admin) ----------

export async function createBatch(input: { courseId?: unknown; name?: unknown; startDate?: unknown }) {
  const { courseId, name } = input;
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");
  if (typeof name !== "string" || name.trim().length < 2) return serviceFail(400, "Batch name required");

  const course = await prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
  if (!course) return serviceFail(404, "Course not found");

  const batch = await prisma.batch.create({
    data: {
      courseId,
      name: name.trim(),
      startDate: typeof input.startDate === "string" && input.startDate ? new Date(input.startDate) : null,
    },
    select: { id: true },
  });
  return serviceOk({ batch });
}

export async function listBatchesForCourse(courseId: unknown) {
  if (typeof courseId !== "string" || !courseId) return serviceFail(400, "courseId required");
  const batches = await prisma.batch.findMany({
    where: { courseId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      startDate: true,
      liveClasses: {
        orderBy: { scheduledAt: "desc" },
        select: { id: true, title: true, scheduledAt: true, status: true, recordingReady: true, hmsRoomId: true },
      },
    },
  });
  return serviceOk({ batches });
}

// ---------- Schedule a live class (admin) ----------

export async function scheduleLiveClass(input: { batchId?: unknown; title?: unknown; scheduledAt?: unknown }) {
  const { batchId, title, scheduledAt } = input;
  if (typeof batchId !== "string" || !batchId) return serviceFail(400, "batchId required");
  if (typeof title !== "string" || title.trim().length < 2) return serviceFail(400, "Title required");
  if (typeof scheduledAt !== "string" || !scheduledAt) return serviceFail(400, "scheduledAt required");

  const when = new Date(scheduledAt);
  if (Number.isNaN(when.getTime())) return serviceFail(400, "Invalid date/time");

  const batch = await prisma.batch.findUnique({ where: { id: batchId }, select: { id: true, name: true } });
  if (!batch) return serviceFail(404, "Batch not found");

  // Pehle DB record (isse scheduling keys ke bina bhi kaam karti hai).
  const live = await prisma.liveClass.create({
    data: { batchId, title: title.trim(), scheduledAt: when },
    select: { id: true },
  });

  // 100ms configured ho to room + codes provision karo.
  if (isHmsConfigured()) {
    try {
      const room = await createRoom(`${batch.name} · ${title.trim()}`.slice(0, 60));
      const codes = await createRoomCodes(room.id);
      const { hostCode, guestCode } = pickCodes(codes);
      await prisma.liveClass.update({
        where: { id: live.id },
        data: { hmsRoomId: room.id, hostCode, guestCode },
      });
    } catch (e) {
      // Record rehne do; admin baad me retry kar sakta hai. Warning return.
      return serviceOk({ liveClassId: live.id, warning: e instanceof Error ? e.message : "Room provisioning failed" });
    }
  }

  return serviceOk({ liveClassId: live.id, hmsConfigured: isHmsConfigured() });
}

// ---------- Host join (admin/instructor) ----------

export async function getHostJoinInfo(liveClassId: unknown): Promise<ServiceResult<{ url: string }>> {
  if (typeof liveClassId !== "string" || !liveClassId) return serviceFail(400, "liveClassId required");
  const live = await prisma.liveClass.findUnique({
    where: { id: liveClassId },
    select: { id: true, hostCode: true },
  });
  if (!live) return serviceFail(404, "Live class not found");
  if (!live.hostCode) return serviceFail(400, "Live room not provisioned (check 100ms config)");

  await prisma.liveClass.update({ where: { id: live.id }, data: { status: "LIVE" } });
  return serviceOk({ url: prebuiltUrl(live.hostCode) });
}

export async function endLiveClass(liveClassId: unknown) {
  if (typeof liveClassId !== "string" || !liveClassId) return serviceFail(400, "liveClassId required");
  await prisma.liveClass.update({ where: { id: liveClassId }, data: { status: "ENDED" } }).catch(() => null);
  return serviceOk({ ended: true });
}

// ---------- Student: list + join ----------

export async function listLiveForStudent(userId: string) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    select: { courseId: true },
  });
  const courseIds = enrollments.map((e) => e.courseId);
  if (courseIds.length === 0) return serviceOk({ classes: [] });

  const classes = await prisma.liveClass.findMany({
    where: { batch: { courseId: { in: courseIds } } },
    orderBy: { scheduledAt: "asc" },
    select: {
      id: true,
      title: true,
      scheduledAt: true,
      status: true,
      recordingReady: true,
      batch: { select: { name: true, course: { select: { title: true, slug: true } } } },
    },
  });

  return serviceOk({
    classes: classes.map((c) => ({
      id: c.id,
      title: c.title,
      scheduledAt: c.scheduledAt,
      status: c.status,
      recordingReady: c.recordingReady,
      batchName: c.batch.name,
      courseTitle: c.batch.course.title,
      courseSlug: c.batch.course.slug,
    })),
  });
}

export async function getStudentJoinInfo(
  userId: string,
  liveClassId: unknown
): Promise<ServiceResult<{ url: string }>> {
  if (typeof liveClassId !== "string" || !liveClassId) return serviceFail(400, "liveClassId required");

  const live = await prisma.liveClass.findUnique({
    where: { id: liveClassId },
    select: { id: true, guestCode: true, status: true, batch: { select: { courseId: true } } },
  });
  if (!live) return serviceFail(404, "Live class not found");

  // Enrollment check.
  const enrolled = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId: live.batch.courseId } },
    select: { id: true },
  });
  if (!enrolled) return serviceFail(403, "Not enrolled in this course");

  if (live.status === "ENDED") return serviceFail(410, "This class has ended");
  if (!live.guestCode) return serviceFail(400, "Live room not ready yet");

  // Attendance mark (idempotent).
  await prisma.attendance
    .upsert({
      where: { liveClassId_userId: { liveClassId: live.id, userId } },
      create: { liveClassId: live.id, userId },
      update: {},
    })
    .catch(() => null);

  return serviceOk({ url: prebuiltUrl(live.guestCode) });
}

// ---------- Webhook: recording ready -> auto lesson ----------

type HmsWebhookPayload = {
  type?: string;
  data?: Record<string, unknown>;
};

/**
 * 100ms recording-success webhook handle karta hai:
 *  room_id se LiveClass dhundo -> recordingUrl set karo -> us course me
 *  "Class Recordings" module me LIVE_RECORDING lesson auto-create karo.
 * Student ke learn page pe recording apne aap dikh jaati hai.
 */
export async function handleRecordingWebhook(payload: HmsWebhookPayload): Promise<ServiceResult<{ handled: boolean }>> {
  const type = payload?.type || "";
  const data = payload?.data || {};

  // Sirf recording-success events pe kaam karo.
  if (!/recording.*success|beam\.recording\.success/i.test(type)) {
    return serviceOk({ handled: false });
  }

  const roomId = (data.room_id || data.roomId) as string | undefined;
  if (!roomId) return serviceOk({ handled: false });

  // Recording URL alag-alag field me aa sakta hai — jo mile use lo.
  // NOTE (prod): 100ms presigned URL expire hota hai — aage isko apne
  // storage (R2/S3) me copy karna hoga. Abhi jo mila wahi store.
  const url =
    (data.recording_presigned_url ||
      data.recording_path ||
      data.presigned_url ||
      data.location ||
      data.url) as string | undefined;

  const live = await prisma.liveClass.findFirst({
    where: { hmsRoomId: roomId },
    select: { id: true, title: true, recordingReady: true, batch: { select: { courseId: true } } },
  });
  if (!live) return serviceOk({ handled: false });

  await prisma.liveClass.update({
    where: { id: live.id },
    data: { recordingUrl: url || null, recordingReady: true, status: "ENDED" },
  });

  // Recording ko course content me lesson bana do (agar URL mila).
  if (url && !live.recordingReady) {
    const courseId = live.batch.courseId;

    // "Class Recordings" module dhundo ya banao.
    let recModule = await prisma.module.findFirst({
      where: { courseId, title: RECORDINGS_MODULE_TITLE },
      select: { id: true },
    });
    if (!recModule) {
      const count = await prisma.module.count({ where: { courseId } });
      recModule = await prisma.module.create({
        data: { courseId, title: RECORDINGS_MODULE_TITLE, order: count },
        select: { id: true },
      });
    }

    const lessonCount = await prisma.lesson.count({ where: { moduleId: recModule.id } });
    await prisma.lesson.create({
      data: {
        moduleId: recModule.id,
        title: live.title,
        type: "LIVE_RECORDING",
        order: lessonCount,
        videoUrl: url,
      },
    });

    // Enrolled students ko notify: recording ready.
    const course = await prisma.course.findUnique({ where: { id: courseId }, select: { title: true, slug: true } });
    const enrolled = await prisma.enrollment.findMany({ where: { courseId }, select: { userId: true } });
    await notifyMany(
      enrolled.map((e) => e.userId),
      {
        type: "recording",
        title: "New recording available 🎥",
        body: `"${live.title}" recording is now in ${course?.title || "your course"}.`,
        link: course?.slug ? `/student/learn/${course.slug}` : "/student",
      }
    ).catch(() => null);
  }

  return serviceOk({ handled: true });
}
