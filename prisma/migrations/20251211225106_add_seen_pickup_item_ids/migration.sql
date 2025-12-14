/*
  Warnings:

  - You are about to drop the column `seenPickupNotifications` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "seenPickupNotifications",
ADD COLUMN     "seenPickupItemIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
