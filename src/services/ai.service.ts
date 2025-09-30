// src/services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializa o cliente do Google AI com a nossa chave de API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Define o formato de saída que esperamos da IA
export type ItemDaLista = {
    item: string;
    quantidade: number;
    unidade?: string; // ex: 'saco', 'metro', 'unidade'
};

/**
 * Processa uma mensagem de texto do usuário e extrai uma lista de compras estruturada.
 * @param mensagem - O texto enviado pelo cliente.
 * @returns Uma promessa que resolve para um array de ItensDaLista.
 */
export const processarListaDeCompras = async (mensagem: string): Promise<ItemDaLista[]> => {
    const prompt = `
    Você é um assistente especialista em uma loja de materiais de construção. 
    Sua tarefa é analisar a mensagem de um cliente e extrair uma lista de compras.
    A resposta DEVE ser um array de objetos JSON, puro, sem nenhum texto adicional.
    Cada objeto deve ter as chaves "item", "quantidade" e, se aplicável, "unidade".
    Se a quantidade não for especificada, assuma o valor 1.

    Exemplo de mensagem: "bom dia, preciso de 2 sacos de cimento, 1000 tijolos e 1 lata de tinta branca"
    Exemplo de resposta:
    [
      {"item": "cimento", "quantidade": 2, "unidade": "sacos"},
      {"item": "tijolos", "quantidade": 1000},
      {"item": "tinta branca", "quantidade": 1, "unidade": "lata"}
    ]

    Agora, processe a seguinte mensagem:
    "${mensagem}"
  `;

    try {
        console.log('Serviço de IA: Enviando prompt para o Gemini...');
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log('Serviço de IA: Resposta recebida do Gemini:', responseText);

        // Limpa a resposta da IA para garantir que seja um JSON válido
        const jsonString = responseText.replace(/```json|```/g, '').trim();

        // Converte a string JSON em um objeto JavaScript
        const listaEstruturada: ItemDaLista[] = JSON.parse(jsonString);
        return listaEstruturada;

    } catch (error) {
        console.error('Erro ao processar a lista com a IA:', error);
        // Em caso de erro, retorna uma lista vazia para não quebrar o fluxo
        return [];
    }
};