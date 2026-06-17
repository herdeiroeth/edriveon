-- CreateEnum
CREATE TYPE "Role" AS ENUM ('LOCATARIO', 'LOCADOR');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('ELETRICO', 'HIBRIDO');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SUV', 'SEDAN', 'HATCH');

-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('ATIVO', 'PAUSADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'LOCATARIO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" "VehicleType" NOT NULL,
    "category" "Category" NOT NULL,
    "color" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "dailyPrice" DECIMAL(10,2) NOT NULL,
    "deposit" DECIMAL(10,2) NOT NULL,
    "rangeKm" INTEGER NOT NULL,
    "powerCv" INTEGER NOT NULL,
    "accel0to100" DOUBLE PRECISION NOT NULL,
    "consumptionKwh" DOUBLE PRECISION NOT NULL,
    "seats" INTEGER NOT NULL,
    "trunkLiters" INTEGER NOT NULL,
    "topSpeedKmh" INTEGER NOT NULL,
    "batteryKwh" DOUBLE PRECISION NOT NULL,
    "features" TEXT[],
    "photos" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "VehicleStatus" NOT NULL DEFAULT 'ATIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE INDEX "Vehicle_status_idx" ON "Vehicle"("status");

-- CreateIndex
CREATE INDEX "Vehicle_type_idx" ON "Vehicle"("type");

-- CreateIndex
CREATE INDEX "Vehicle_category_idx" ON "Vehicle"("category");

-- CreateIndex
CREATE INDEX "Vehicle_city_idx" ON "Vehicle"("city");

-- CreateIndex
CREATE INDEX "Vehicle_ownerId_idx" ON "Vehicle"("ownerId");

-- CreateIndex
CREATE INDEX "Vehicle_status_dailyPrice_idx" ON "Vehicle"("status", "dailyPrice");

-- CreateIndex
CREATE INDEX "Vehicle_status_rangeKm_idx" ON "Vehicle"("status", "rangeKm");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
