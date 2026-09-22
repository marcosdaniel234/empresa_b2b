import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

// Plus Jakarta Sans: geométrica de terminais retos e contraforma aberta, com
// peso extrabold firme o bastante para os títulos de duas linhas da abertura
// e legível em 12 px nas fichas de lote. O eixo variável cobre 200 a 800.
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Reservada a código de lote, valor e contagem regressiva: monoespaçada de
// desenho neutro, para o número não competir com o texto ao lado.
const mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
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
