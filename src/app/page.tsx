// src/app/page.tsx - REVISADO
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

// Componente Navbar agora usando CSS Modules
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        {/* <Image src="/logo-ed-engenharia.png" width={32} height={32} alt="Logo ED Engenharia" /> */}
        <span>ED Engenharia</span>
      </div>
      <div className={styles.navbarActions}>
        <Link href="/admin/painel" className={styles.navbarLink}>
          Acessar Painel
        </Link>
        <Link href="/auth/signup" className={styles.navbarButton}>
          Criar Conta
        </Link>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.heroSection}>
        <h1 className={styles.headline}>
          Automatize seus Orçamentos. Acelere suas Vendas.
        </h1>
        <p className={styles.subheadline}>
          A ED Engenharia transforma listas de materiais em orçamentos instantâneos via WhatsApp, liberando sua equipe para focar no que realmente importa: vender.
        </p>
        <div className={styles.ctaContainer}>
          <Link href="/auth/signup" className={styles.primaryButton}>
            Comece de Graça
          </Link>
          <Link href="/contact" className={styles.secondaryButton}>
            Fale Conosco
          </Link>
        </div>
      </section>
    </main>
  );
}