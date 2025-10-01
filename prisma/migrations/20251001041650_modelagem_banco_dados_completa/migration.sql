/*
  Warnings:

  - The primary key for the `produtos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estoque` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `id_empresa` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - The required column `id_produto` was added to the `produtos` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_unidade_medida` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoDesconto" AS ENUM ('PERCENTUAL', 'VALOR_FIXO');

-- AlterTable
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_pkey",
DROP COLUMN "estoque",
DROP COLUMN "id",
DROP COLUMN "preco",
ADD COLUMN     "id_empresa" TEXT NOT NULL,
ADD COLUMN     "id_produto" TEXT NOT NULL,
ADD COLUMN     "id_unidade_medida" TEXT NOT NULL,
ADD CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_produto");

-- CreateTable
CREATE TABLE "orcamentos" (
    "id_orcamento" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "valor_total" DOUBLE PRECISION NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "tipo_desconto" "TipoDesconto",
    "valor_desconto" DOUBLE PRECISION,
    "id_cliente" TEXT NOT NULL,
    "id_empresa" TEXT NOT NULL,

    CONSTRAINT "orcamentos_pkey" PRIMARY KEY ("id_orcamento")
);

-- CreateTable
CREATE TABLE "itens_orcamento" (
    "id_item_orcamento" TEXT NOT NULL,
    "nome_produto" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" DOUBLE PRECISION NOT NULL,
    "preco_total" DOUBLE PRECISION NOT NULL,
    "tipo_desconto" "TipoDesconto",
    "valor_desconto" DOUBLE PRECISION,
    "id_orcamento" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,

    CONSTRAINT "itens_orcamento_pkey" PRIMARY KEY ("id_item_orcamento")
);

-- CreateTable
CREATE TABLE "empresas" (
    "id_empresa" TEXT NOT NULL,
    "nome_fantasia" TEXT NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id_empresa")
);

-- CreateTable
CREATE TABLE "unidades_medida" (
    "id_unidade_medida" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "abreviacao" TEXT NOT NULL,

    CONSTRAINT "unidades_medida_pkey" PRIMARY KEY ("id_unidade_medida")
);

-- CreateTable
CREATE TABLE "movimentos_estoque" (
    "id_movimento_estoque" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "motivo" TEXT,
    "data_movimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_produto" TEXT NOT NULL,

    CONSTRAINT "movimentos_estoque_pkey" PRIMARY KEY ("id_movimento_estoque")
);

-- CreateTable
CREATE TABLE "precos" (
    "id_preco" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data_inicio_validade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_produto" TEXT NOT NULL,

    CONSTRAINT "precos_pkey" PRIMARY KEY ("id_preco")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id_cliente" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_empresa" TEXT NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id_pedido" TEXT NOT NULL,
    "status_pagamento" TEXT NOT NULL DEFAULT 'pendente',
    "status_entrega" TEXT NOT NULL DEFAULT 'separacao',
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "id_orcamento" TEXT NOT NULL,
    "id_empresa" TEXT NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id_pedido")
);

-- CreateIndex
CREATE UNIQUE INDEX "unidades_medida_abreviacao_key" ON "unidades_medida"("abreviacao");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_id_empresa_whatsapp_key" ON "clientes"("id_empresa", "whatsapp");

-- CreateIndex
CREATE UNIQUE INDEX "pedidos_id_orcamento_key" ON "pedidos"("id_orcamento");

-- AddForeignKey
ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orcamentos" ADD CONSTRAINT "orcamentos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id_empresa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_orcamento" ADD CONSTRAINT "itens_orcamento_id_orcamento_fkey" FOREIGN KEY ("id_orcamento") REFERENCES "orcamentos"("id_orcamento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_orcamento" ADD CONSTRAINT "itens_orcamento_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimentos_estoque" ADD CONSTRAINT "movimentos_estoque_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_unidade_medida_fkey" FOREIGN KEY ("id_unidade_medida") REFERENCES "unidades_medida"("id_unidade_medida") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id_empresa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precos" ADD CONSTRAINT "precos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id_empresa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_orcamento_fkey" FOREIGN KEY ("id_orcamento") REFERENCES "orcamentos"("id_orcamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id_empresa") ON DELETE CASCADE ON UPDATE CASCADE;
