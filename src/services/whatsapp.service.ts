// src/services/whatsapp.service.ts

const WHATSAPP_ACCESS_TOKEN = process.env.META_WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

/**
 * Envia uma mensagem de texto para um número de telefone via API do WhatsApp.
 * @param to - O número de telefone do destinatário.
 * @param text - O conteúdo da mensagem a ser enviada.
 */
export const sendMessage = async (to: string, text: string): Promise<void> => {
    // **A MÁGICA ACONTECE AQUI!**
    // Corrigimos o número ANTES de enviá-lo.
    const numeroCorrigido = formatarNumeroBrasil(to);

    try {
        console.log(`Serviço do WhatsApp: Enviando mensagem "${text}" para ${numeroCorrigido}`);

        const response = await fetch(
            `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: numeroCorrigido,
                    text: { body: text },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao enviar mensagem: ${JSON.stringify(errorData)}`);
        }

        console.log('Serviço do WhatsApp: Mensagem enviada com sucesso!');
        const responseData = await response.json();
        console.log(responseData);

    } catch (error) {
        console.error('Erro detalhado no serviço do WhatsApp:', error);
    }
};

/**
 * Corrige um número de telefone brasileiro para o formato com 9 dígitos, se aplicável.
 * @param numero - O número de telefone no formato E.164 (ex: 558699930217)
 * @returns O número corrigido (ex: 5586999930217)
 */
export function formatarNumeroBrasil(numero: string): string {
    // Remove o código do país (55)
    if (numero.startsWith('55') && numero.length === 12) {
        const ddd = numero.substring(2, 4);
        const numeroSemDDD = numero.substring(4);

        // No Brasil, celulares têm 9 dígitos após o DDD. Números com 8 são antigos.
        // Esta regra cobre a maioria dos celulares (que não começam com 2, 3, 4 ou 5).
        if (numeroSemDDD.length === 8 && !['2', '3', '4', '5'].includes(numeroSemDDD[0])) {
            const numeroCorrigido = `55${ddd}9${numeroSemDDD}`;
            console.log(`Serviço do WhatsApp: Número corrigido de ${numero} para ${numeroCorrigido}`);
            return numeroCorrigido;
        }
    }

    // Se não for um caso que precise de correção, retorna o número original
    return numero;
}