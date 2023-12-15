/*
  Warnings:

  - You are about to alter the column `new` on the `credit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `credit` MODIFY `new` INTEGER NOT NULL;
