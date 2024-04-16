/*
  Warnings:

  - You are about to drop the column `StartTime` on the `onRampTransaction` table. All the data in the column will be lost.
  - Changed the type of `amount` on the `Balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `startTime` to the `onRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "onRampTransaction" DROP COLUMN "StartTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
