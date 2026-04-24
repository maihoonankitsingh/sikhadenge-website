-- CreateEnum
CREATE TYPE "SdUserStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "SdAuditEntity" AS ENUM ('SD_USER', 'SD_ROLE', 'SD_PERMISSION', 'SD_SESSION', 'OTHER');

-- CreateTable
CREATE TABLE "SdUser" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "status" "SdUserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SdUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdRole" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SdRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdPermission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SdPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdUserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "scope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SdUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdRolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "SdRolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SdSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SdAuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entity" "SdAuditEntity" NOT NULL DEFAULT 'OTHER',
    "entityId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SdAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SdUser_email_key" ON "SdUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SdUser_phone_key" ON "SdUser"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "SdRole_key_key" ON "SdRole"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SdPermission_key_key" ON "SdPermission"("key");

-- CreateIndex
CREATE INDEX "SdUserRole_roleId_idx" ON "SdUserRole"("roleId");

-- CreateIndex
CREATE INDEX "SdUserRole_userId_idx" ON "SdUserRole"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SdUserRole_userId_roleId_scope_key" ON "SdUserRole"("userId", "roleId", "scope");

-- CreateIndex
CREATE INDEX "SdRolePermission_permissionId_idx" ON "SdRolePermission"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "SdRolePermission_roleId_permissionId_key" ON "SdRolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "SdSession_tokenHash_key" ON "SdSession"("tokenHash");

-- CreateIndex
CREATE INDEX "SdSession_userId_idx" ON "SdSession"("userId");

-- CreateIndex
CREATE INDEX "SdSession_expiresAt_idx" ON "SdSession"("expiresAt");

-- CreateIndex
CREATE INDEX "SdAuditLog_actorId_idx" ON "SdAuditLog"("actorId");

-- CreateIndex
CREATE INDEX "SdAuditLog_createdAt_idx" ON "SdAuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "SdAuditLog_entity_entityId_idx" ON "SdAuditLog"("entity", "entityId");

-- AddForeignKey
ALTER TABLE "SdUserRole" ADD CONSTRAINT "SdUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SdUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SdUserRole" ADD CONSTRAINT "SdUserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SdRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SdRolePermission" ADD CONSTRAINT "SdRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SdRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SdRolePermission" ADD CONSTRAINT "SdRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "SdPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SdSession" ADD CONSTRAINT "SdSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SdUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SdAuditLog" ADD CONSTRAINT "SdAuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "SdUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
