/*
  Warnings:

  - Added the required column `Author_Id` to the `Floor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "Author_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_Author_Id_fkey" FOREIGN KEY ("Author_Id") REFERENCES "Users"("U_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
