import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="pt-BR" className={inter.variable}>
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
