// src/app/api/whatsapp/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { processarListaDeCompras } from '@/services/ai.service'; // Importa nosso novo serviço!
import { sendMessage } from '@/services/whatsapp.service';
import { formatarNumeroBrasil } from '@/services/whatsapp.service';

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

// Função para o "aperto de mão" com a Meta
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    // A lógica aqui continua a mesma, mas agora compara com a variável de ambiente
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log("Webhook verificado com sucesso!");
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.error("Falha na verificação do Webhook. Token recebido:", token);
      return new NextResponse(null, { status: 403 });
    }
  }

// Função para receber as mensagens dos clientes
// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         console.log('Mensagem recebida do WhatsApp:', JSON.stringify(body, null, 2));

//         // Extrai o texto da mensagem do cliente
//         // A estrutura do objeto do WhatsApp é complexa, por isso a navegação longa
//         const mensagemDoCliente = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;

//         if (mensagemDoCliente) {
//             console.log(`Texto do cliente: "${mensagemDoCliente}"`);

//             // CHAMA NOSSO SERVIÇO DE IA!
//             const listaDeCompras = await processarListaDeCompras(mensagemDoCliente);

//             // POR ENQUANTO, VAMOS APENAS MOSTRAR O RESULTADO NO CONSOLE
//             console.log('--- LISTA ESTRUTURADA PELA IA ---');
//             console.log(listaDeCompras);
//             console.log('---------------------------------');

//             // Aqui, no futuro, adicionaremos a lógica para:
//             // 1. Buscar os produtos da 'listaDeCompras' no banco de dados.
//             // 2. Montar o orçamento.
//             // 3. Enviar a resposta para o cliente.
//         }

//         // Responde para a Meta imediatamente com 200 OK para confirmar o recebimento
//         return NextResponse.json({ status: 'success' }, { status: 200 });

//     } catch (error) {
//         console.error('Erro no webhook:', error);
//         return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
//     }
// }

export async function POST(request: Request) {
    try {
      const body = await request.json();
      console.log('Mensagem recebida:', JSON.stringify(body, null, 2));
  
      const mensagemDoCliente = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
      const numeroDoCliente = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;
  
      if (mensagemDoCliente && numeroDoCliente) {
        // Cria a mensagem de resposta
        const mensagemDeResposta = `Olá! Recebi sua mensagem: "${mensagemDoCliente}"`;
  
        // Chama o serviço para enviar a resposta de volta para o cliente
        await sendMessage(numeroDoCliente, mensagemDeResposta);
      }
  
      return NextResponse.json({ status: 'success' }, { status: 200 });
    } catch (error) {
      console.error('Erro no webhook:', error);
      return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
    }
  }