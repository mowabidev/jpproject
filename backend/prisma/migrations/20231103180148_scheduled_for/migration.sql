-- AlterTable
ALTER TABLE `subscription` ADD COLUMN `paid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `paidAt` DATETIME(3) NULL,
    ADD COLUMN `scheduledFor` DATETIME(3) NULL;
