// src/lib/sdk/product.sdk.ts
import { Produto } from '@prisma/client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Definindo o tipo para os dados de criação de um produto
export type ProductCreateData = Omit<Produto, 'id' | 'data_criacao' | 'data_atualizacao'>;

export const produtosSDK = {
    /**
     * Busca todos os produtos da API.
     * @returns Uma promessa que resolve para um array de produtos.
     */
    getAll: async (): Promise<Produto[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`, { cache: 'no-store' });
            if (!response.ok) throw new Error('Falha ao buscar produtos.');
            return response.json();
        } catch (error) {
            console.error('Erro em productsSDK.getAll:', error);
            throw error;
        }
    },

    /**
     * Cria um novo produto enviando os dados para a API.
     * @param data - Os dados do produto a ser criado.
     * @returns Uma promessa que resolve para o produto recém-criado.
     */
    create: async (data: ProductCreateData): Promise<Produto> => {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Falha ao criar produto.');
            return response.json();
        } catch (error) {
            console.error('Erro em productsSDK.create:', error);
            throw error;
        }
    },

    // No futuro, podemos adicionar mais métodos aqui:
    // getById: async (id: string) => { ... },
    // update: async (id: string, data: Partial<ProductCreateData>) => { ... },
};