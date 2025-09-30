/*
  Warnings:

  - You are about to drop the column `name` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `nome` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;
