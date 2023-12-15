/*
  Warnings:

  - You are about to drop the column `creditId` on the `subscription` table. All the data in the column will be lost.
  - Added the required column `subscriptionId` to the `Credit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `Subscription_creditId_fkey`;

-- AlterTable
ALTER TABLE `credit` ADD COLUMN `subscriptionId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subscription` DROP COLUMN `creditId`;

-- AddForeignKey
ALTER TABLE `Credit` ADD CONSTRAINT `Credit_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
