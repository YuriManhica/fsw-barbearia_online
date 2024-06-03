/*
  Warnings:

  - You are about to drop the column `data` on the `Bookings` table. All the data in the column will be lost.
  - You are about to drop the column `barbershopid` on the `Services` table. All the data in the column will be lost.
  - Added the required column `date` to the `Bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barbershopId` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_barbershopid_fkey";

-- AlterTable
ALTER TABLE "Bookings" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "barbershopid",
ADD COLUMN     "barbershopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
