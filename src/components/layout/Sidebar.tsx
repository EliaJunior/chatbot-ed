'use client';

import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu,
    LayoutDashboard,
    FileText,
    Users,
    ShoppingCart,
    Package,
    Warehouse,
    Settings,
    LogOut,
    ChevronsLeft,
} from 'lucide-react';

const menuItems = [
    // ... (sua lista de menuItems continua a mesma)
    { item: "Painel", href: "/admin/painel", icon: LayoutDashboard },
    { item: "Vendas", isHeader: true },
    { item: "Orçamentos", href: "/admin/orcamentos", icon: FileText },
    { item: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
    { item: "Clientes", href: "/admin/clientes", icon: Users },
    { item: "Estoque", isHeader: true },
    { item: "Produtos", href: "/admin/produtos", icon: Package },
    { item: "Fornecedores", href: "/admin/fornecedores", icon: Warehouse },
];

export default function Sidebar() {
    // ESTADOS: Um para o clique (fixar) e um para o hover
    const [isPinned, setIsPinned] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const pathname = usePathname();

    // LÓGICA: O menu está expandido se estiver fixado OU se o mouse estiver sobre ele
    const isExpanded = isPinned || isHovering;

    // AÇÕES: Funções para controlar os estados
    const togglePin = () => setIsPinned(prev => !prev);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <aside
            className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}
        >
            <header className={styles.header}>
                {/* REGRA 2 e 3: Clicar neste botão agora fixa/solta o menu */}
                <button onClick={togglePin} className={styles.menuButton}>
                    {/* O ícone muda para indicar o estado 'fixado' */}
                    {isPinned ? <ChevronsLeft size={20} /> : <Menu size={20} />}
                </button>
            </header>

            {/* REGRA 4: O hover só funciona nesta área que envolve o menu e o rodapé */}
            <div
                className={styles.hoverArea}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <nav className={styles.nav}>
                    <ul>
                        {menuItems.map((menuItem, index) =>
                            menuItem.isHeader ? (
                                <li key={index} className={styles.menuTitle}>
                                    <span className={styles.linkText}>{menuItem.item}</span>
                                </li>
                            ) : (
                                <li key={index} title={!isExpanded ? menuItem.item : undefined}>
                                    <Link
                                        href={menuItem.href!}
                                        className={`${styles.link} ${pathname.startsWith(menuItem.href!) ? styles.active : ''}`}
                                    >
                                        {React.createElement(menuItem.icon!, { className: styles.linkIcon, size: 20 })}
                                        <span className={styles.linkText}>{menuItem.item}</span>
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                <footer className={styles.footer}>
                    <Link href="/admin/configuracoes" title={!isExpanded ? "Configurações" : undefined} className={`${styles.link} ${pathname.startsWith('/admin/configuracoes') ? styles.active : ''}`}>
                        <Settings className={styles.linkIcon} size={20} />
                        <span className={styles.linkText}>Configurações</span>
                    </Link>
                    <button className={styles.logoutButton} title={!isExpanded ? "Sair" : undefined}>
                        <LogOut className={styles.linkIcon} size={20} />
                        <span className={styles.linkText}>Sair</span>
                    </button>
                </footer>
            </div>
        </aside>
    );
}