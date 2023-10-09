/*
  Warnings:

  - You are about to drop the column `subscription` on the `Credit` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `creditId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[creditId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Credit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_creditId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_subscriptionId_fkey`;

-- DropIndex
DROP INDEX `Credit_subscription_key` ON `Credit`;

-- DropIndex
DROP INDEX `Subscription_phone_key` ON `Subscription`;

-- AlterTable
ALTER TABLE `Credit` DROP COLUMN `subscription`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Subscription` DROP COLUMN `address`,
    DROP COLUMN `phone`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `creditId`,
    DROP COLUMN `subscriptionId`;

-- CreateIndex
CREATE UNIQUE INDEX `Subscription_creditId_key` ON `Subscription`(`creditId`);

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit` ADD CONSTRAINT `Credit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
