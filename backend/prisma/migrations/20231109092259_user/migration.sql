-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_garantId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(255) NULL,
    MODIFY `garantId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_garantId_fkey` FOREIGN KEY (`garantId`) REFERENCES `Garant`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
