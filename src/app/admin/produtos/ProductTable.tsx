'use client';

// 1. Importe 'useRef' e 'useEffect' do React
import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import styles from './page.module.css';
import { Produto } from '@prisma/client';

export default function ProductTable({ produtos }: { produtos: Produto[] }) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // 2. Crie uma referência para o checkbox "selecionar todos"
    const selectAllRef = useRef<HTMLInputElement>(null);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const allIds = produtos.map((p) => p.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectRow = (id: string) => {
        setSelectedIds((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id)
                : [...prevSelected, id]
        );
    };

    const handleDeleteSelected = () => {
        alert(`Deletar os seguintes produtos: ${selectedIds.join(', ')}`);
    };

    const numSelected = selectedIds.length;
    const numProdutos = produtos.length;

    // 3. Use 'useEffect' para atualizar o estado 'indeterminate'
    // Este efeito roda toda vez que a lista de 'selectedIds' muda.
    useEffect(() => {
        if (selectAllRef.current) {
            const isIndeterminate = numSelected > 0 && numSelected < numProdutos;
            selectAllRef.current.indeterminate = isIndeterminate;
        }
    }, [selectedIds, numProdutos]);

    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
                <h2 className={styles.cardTitle}>
                    {numSelected > 0
                        ? `${numSelected} de ${numProdutos} selecionado(s)`
                        : `${numProdutos} Produtos Cadastrados`}
                </h2>
                <div className={styles.headerActions}>
                    {numSelected > 0 ? (
                        <button onClick={handleDeleteSelected} className={`${styles.button} ${styles.dangerButton}`}>
                            <Trash2 size={16} />
                            Deletar Selecionados
                        </button>
                    ) : (
                        <button className={`${styles.button} ${styles.primaryButton}`}>
                            + Adicionar Produto
                        </button>
                    )}
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={`${styles.th} ${styles.checkboxCell}`}>
                            {/* 4. Conecte a ref ao input e remova a propriedade 'indeterminate' do JSX */}
                            <input
                                ref={selectAllRef}
                                type="checkbox"
                                checked={numSelected === numProdutos && numProdutos > 0}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className={styles.th}>Nome</th>
                        <th className={styles.th}>Estoque</th>
                        <th className={styles.th}>Preço</th>
                        <th className={styles.th}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id} className={styles.tr}>
                            <td className={`${styles.td} ${styles.checkboxCell}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(produto.id)}
                                    onChange={() => handleSelectRow(produto.id)}
                                />
                            </td>
                            <td className={styles.td}>
                                <div className={styles.productNameCell}>{produto.nome}</div>
                                <div className={styles.productDescriptionCell}>{produto.descricao}</div>
                            </td>
                            <td className={styles.td}>{produto.estoque}</td>
                            <td className={styles.td}>R$ {produto.preco.toFixed(2)}</td>
                            <td className={`${styles.td} ${styles.actionsCell}`}>
                                <button className={styles.actionsButton}>
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}