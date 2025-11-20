/*
  Warnings:

  - You are about to drop the column `alreadyRead` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Book` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "alreadyRead",
DROP COLUMN "updated_at",
DROP COLUMN "userId",
ALTER COLUMN "current_page" DROP DEFAULT,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;
