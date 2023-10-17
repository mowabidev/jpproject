/*
  Warnings:

  - You are about to drop the column `Refund` on the `loan` table. All the data in the column will be lost.
  - Added the required column `refund` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan` DROP COLUMN `Refund`,
    ADD COLUMN `refund` INTEGER NOT NULL;
