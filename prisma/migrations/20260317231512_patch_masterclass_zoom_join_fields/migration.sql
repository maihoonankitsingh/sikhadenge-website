-- AlterTable
ALTER TABLE "MasterclassZoomJoin" ADD COLUMN     "durationMinutes" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "joinClickedAt" TIMESTAMP(3),
ADD COLUMN     "joinTime" TIMESTAMP(3),
ADD COLUMN     "leaveTime" TIMESTAMP(3),
ADD COLUMN     "meetingId" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "participantEmail" TEXT,
ADD COLUMN     "participantName" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'registered',
ADD COLUMN     "zoomJoinUrl" TEXT;
