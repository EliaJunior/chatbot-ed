// src/app/admin/layout.tsx
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import styles from './layout.module.css';

// Todo layout recebe uma propriedade 'children', que será o conteúdo da página (page.tsx)
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layoutContainer}>
            {/* Nossa sidebar fica aqui, fixa */}
            <Sidebar />

            {/* A área principal onde o conteúdo de cada página será renderizado */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}