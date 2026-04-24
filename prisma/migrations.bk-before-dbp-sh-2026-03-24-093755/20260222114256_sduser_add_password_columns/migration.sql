-- AlterTable
ALTER TABLE "SdUser" ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "passwordSalt" TEXT;
