-- CreateTable
CREATE TABLE "MasterclassZoomAttendance" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT,
    "participantName" TEXT,
    "participantEmail" TEXT,
    "participantPhone" TEXT,
    "joinTime" TIMESTAMP(3),
    "leaveTime" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "joinClickedAt" TIMESTAMP(3),
    "source" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MasterclassZoomAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MasterclassZoomAttendance_participantEmail_idx" ON "MasterclassZoomAttendance"("participantEmail");

-- CreateIndex
CREATE INDEX "MasterclassZoomAttendance_participantPhone_idx" ON "MasterclassZoomAttendance"("participantPhone");

-- CreateIndex
CREATE INDEX "MasterclassZoomAttendance_meetingId_idx" ON "MasterclassZoomAttendance"("meetingId");
