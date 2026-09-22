import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

// Família técnica, desenhada para documentação e produto industrial — não a
// sans-serif genérica que qualquer gerador de site usa por padrão.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

// Reservada para códigos de lote, valores e contagens: números tabulares
// com identidade de painel de controle, não de planilha.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ATIVOS B2B | Leilão de ativos industriais entre empresas",
    template: "%s · ATIVOS B2B",
  },
  description:
    "Catálogo de leilão de ativos corporativos entre empresas: máquinas, veículos, tecnologia e mobiliário, com ficha técnica, localização e prazo de cada lote.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main id="conteudo-principal" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
