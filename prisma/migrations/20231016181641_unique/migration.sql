-- DropForeignKey
ALTER TABLE `subscription` DROP FOREIGN KEY `Subscription_creditId_fkey`;

-- AlterTable
ALTER TABLE `subscription` MODIFY `creditId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_creditId_fkey` FOREIGN KEY (`creditId`) REFERENCES `Credit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
