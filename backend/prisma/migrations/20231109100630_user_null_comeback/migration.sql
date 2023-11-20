/*
  Warnings:

  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `garantId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_garantId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `garantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_garantId_fkey` FOREIGN KEY (`garantId`) REFERENCES `Garant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
