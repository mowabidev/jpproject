/*
  Warnings:

  - Added the required column `Refund` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan` ADD COLUMN `Refund` INTEGER NOT NULL;
