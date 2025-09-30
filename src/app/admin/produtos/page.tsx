// src/app/admin/produtos/page.tsx
// import { productsSDK } from '@/lib/sdk/product.sdk';
import { produtosSDK } from '@/lib/sdk/produto.sdk';

import styles from './page.module.css';
import ProductTable from './ProductTable'; // 1. Importamos nossa tabela!

export default async function ProdutosAdminPage() {
    const produtos = await produtosSDK.getAll();

    return (
        // O main agora é mais um container geral
        <main>
            <h1 className={styles.title}>
                Gerenciamento de Produtos
            </h1>

            {/* 2. Renderizamos a tabela, passando os produtos para ela */}
            <ProductTable produtos={produtos} />
        </main>
    );
}