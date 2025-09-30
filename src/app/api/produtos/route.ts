// src/app/api/produtos/route.ts
import { NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/services/produto.service';

export async function GET() {
    try {
        // Apenas chama o serviço
        const produtos = await getAllProducts();
        return NextResponse.json(produtos, { status: 200 });
    } catch (error) {
        console.error('Erro na API Route (GET):', error);
        return NextResponse.json(
            { message: 'Erro ao buscar produtos.' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // A validação dos dados de entrada fica na camada da API
        if (!body.nome || !body.preco === undefined || !body.estoque === undefined) {
            return NextResponse.json(
                { message: 'Dados incompletos. Nome, preço e estoque são obrigatórios.' },
                { status: 400 }
            );
        }

        // Apenas chama o serviço
        const novoProduto = await createProduct(body);
        return NextResponse.json(novoProduto, { status: 201 });
    } catch (error) {
        console.error('Erro na API Route (POST):', error);
        return NextResponse.json(
            { message: 'Erro ao criar produto.' },
            { status: 500 }
        );
    }
}