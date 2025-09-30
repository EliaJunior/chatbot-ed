// src/services/product.service.ts
import prisma from '@/lib/prisma';
import { Produto } from '@prisma/client';

// Uma boa prática é definir os tipos de dados de entrada para nossas funções
// Omitimos os campos que o banco de dados gera sozinho (id, datas)
export type ProductCreateData = Omit<Produto, 'id' | 'data_criacao' | 'data_atualizacao'>;

// --- FUNÇÕES DE LEITURA (READ) ---

export const getAllProducts = async (): Promise<Produto[]> => {
    console.log('Service: Buscando todos os produtos...');
    const produtos = await prisma.produto.findMany({
        orderBy: {
            nome: 'asc',
        },
    });
    return produtos;
};

// --- FUNÇÕES DE CRIAÇÃO (CREATE) ---

export const createProduct = async (data: ProductCreateData): Promise<Produto> => {
    console.log('Service: Criando um novo produto...');
    const novoProduto = await prisma.produto.create({
        data,
    });
    return novoProduto;
};



// No futuro, adicionaremos aqui:
// export const getProductById = async (id: string) => { ... };
// export const updateProduct = async (id: string, data: ProductUpdateData) => { ... };
// export const deleteProduct = async (id: string) => { ... };