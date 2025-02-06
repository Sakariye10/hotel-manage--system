/*
  Warnings:

  - You are about to drop the `Sallary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sallary" DROP CONSTRAINT "Sallary_Author_Id_fkey";

-- DropForeignKey
ALTER TABLE "Sallary" DROP CONSTRAINT "Sallary_Em_Id_fkey";

-- DropTable
DROP TABLE "Sallary";
