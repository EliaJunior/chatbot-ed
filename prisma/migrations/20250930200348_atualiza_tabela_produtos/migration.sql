/*
  Warnings:

  - You are about to drop the column `createdAt` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `atualizadoEm` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estoque` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "price",
DROP COLUMN "stock",
DROP COLUMN "updatedAt",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "estoque" INTEGER NOT NULL,
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;
