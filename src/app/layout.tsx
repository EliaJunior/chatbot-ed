import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configura a fonte Poppins, que será carregada de forma otimizada pelo Next.js
const poppins = Poppins({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800']
});

// --- METADADOS COMPLETOS PARA SEO E COMPARTILHAMENTO ---
export const metadata: Metadata = {
  // Título dinâmico para as abas do navegador
  title: {
    template: '%s | ED Engenharia Automação',
    default: 'ED Engenharia - Automação de Orçamentos via Chatbot',
  },
  // Descrição principal do seu site para os buscadores
  description: "Acelere suas vendas com orçamentos instantâneos. A ED Engenharia oferece uma plataforma SaaS com chatbot para automatizar o atendimento em casas de construção e comércios.",

  // Palavras-chave relevantes para o seu negócio
  keywords: ["chatbot", "orçamento automático", "SaaS", "material de construção", "vendas", "automação", "whatsapp", "ED Engenharia"],

  // Informações sobre o autor/criador
  authors: [{ name: 'ED Engenharia', url: 'https://seusite.com.br' }], // Substitua pela URL do seu site quando tiver
  creator: 'ED Engenharia',
  publisher: 'ED Engenharia',

  // Metadados para o Open Graph (como o link aparece no Facebook, WhatsApp, etc.)
  openGraph: {
    title: 'ED Engenharia - Automação de Orçamentos via Chatbot',
    description: 'Transforme listas de materiais em vendas fechadas com nosso chatbot inteligente.',
    url: 'https://seusite.com.br', // URL canônica do seu site
    siteName: 'ED Engenharia Automação',
    // Imagem que aparecerá ao compartilhar o link. Crie uma imagem de 1200x630px e coloque na pasta /public
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Logotipo da ED Engenharia em um fundo tecnológico.',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  // Ícones do site (favicon)
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}