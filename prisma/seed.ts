// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// Instancia o Prisma Client
const prisma = new PrismaClient();

// Lista de produtos que queremos inserir
const produtosParaInserir = [
    {
        nome: 'Cimento Portland CP II 50kg',
        descricao: 'Ideal para rebocos, contrapisos e concretos em geral.',
        preco: 28.50,
        estoque: 150,
    },
    {
        nome: 'Argamassa ACIII Cinza 20kg',
        descricao: 'Para assentamento de porcelanatos em áreas internas e externas.',
        preco: 35.75,
        estoque: 200,
    },
    {
        nome: 'Tijolo Baiano 9 Furos (Milheiro)',
        descricao: 'Milheiro de tijolos cerâmicos para alvenaria de vedação.',
        preco: 750.00,
        estoque: 30,
    },
    {
        nome: 'Areia Média Lavada (Metro Cúbico)',
        descricao: 'Metro cúbico de areia para concreto e argamassa.',
        preco: 120.00,
        estoque: 50,
    },
    {
        nome: 'Vergalhão de Aço CA50 10mm (Barra 12m)',
        descricao: 'Barra de vergalhão para estruturas de concreto armado.',
        preco: 42.90,
        estoque: 300,
    },
    {
        nome: 'Tinta Acrílica Branca Lata 18L',
        descricao: 'Tinta de alta cobertura para paredes internas e externas.',
        preco: 189.90,
        estoque: 80,
    },
    {
        nome: 'Caixa d\'Água Polietileno 1000L',
        descricao: 'Reservatório de água com tampa, resistente e de fácil instalação.',
        preco: 399.00,
        estoque: 25,
    },
    {
        nome: 'Fio Elétrico Flexível 2.5mm² (Rolo 100m)',
        descricao: 'Rolo de fio de cobre flexível para instalações elétricas.',
        preco: 110.00,
        estoque: 150,
    },
    {
        nome: 'Lâmpada LED Bulbo 9W Branca',
        descricao: 'Lâmpada de baixo consumo, bivolt, soquete E27.',
        preco: 8.99,
        estoque: 1000,
    },
    {
        nome: 'Porcelanato Polido Bege 60x60cm (m²)',
        descricao: 'Metro quadrado de porcelanato polido de alta resistência.',
        preco: 59.90,
        estoque: 500,
    },
];

async function main() {
    console.log('🌱 Iniciando o seeding do banco de dados...');

    // O comando createMany é otimizado para inserir vários registros de uma vez
    const resultado = await prisma.produto.createMany({
        data: produtosParaInserir,
        skipDuplicates: true,
    });

    console.log(`✅ Seeding finalizado com sucesso! ${resultado.count} produtos foram criados.`);
}

// Executa a função main e garante que a conexão com o banco seja fechada no final
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });