-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDENTE', 'APROVADO', 'NEGADO');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDENTE';

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");
