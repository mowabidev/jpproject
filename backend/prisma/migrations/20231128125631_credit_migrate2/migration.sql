-- DropForeignKey
ALTER TABLE `credit` DROP FOREIGN KEY `Credit_subscriptionId_fkey`;

-- AlterTable
ALTER TABLE `credit` MODIFY `subscriptionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Credit` ADD CONSTRAINT `Credit_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
