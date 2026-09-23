import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header, HeaderSpacer } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { RevealObserver } from "@/components/brand/RevealObserver";
import { SITE_URL } from "@/lib/site";

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

const DESCRICAO =
  "Leilão e venda direta de ativos corporativos entre empresas: máquinas, veículos, tecnologia e mobiliário, com ficha técnica, localização e prazo de cada lote.";

// Sem o endereço público (desenvolvimento), a imagem sai com o caminho base.
const OG_IMAGE = `${SITE_URL || (process.env.NEXT_PUBLIC_BASE_PATH ?? "")}/og.jpg`;

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(`${SITE_URL}/`) } : {}),
  title: {
    default: "ATIVOS B2B | Grandes ativos. Novos destinos.",
    template: "%s · ATIVOS B2B",
  },
  description: DESCRICAO,
  applicationName: "ATIVOS B2B",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ATIVOS B2B",
    title: "ATIVOS B2B | Grandes ativos. Novos destinos.",
    description: DESCRICAO,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "ATIVOS B2B — Grandes ativos. Novos destinos." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATIVOS B2B | Grandes ativos. Novos destinos.",
    description: DESCRICAO,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#2A0E12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marca a página como capaz de animar antes do primeiro quadro, para
            que a revelação por rolagem nunca esconda conteúdo sem JavaScript. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-surface-page pb-[calc(60px+env(safe-area-inset-bottom))] font-sans md:pb-0">
        <Header />
        <HeaderSpacer />
        <main id="conteudo-principal" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileTabBar />
        <RevealObserver />
      </body>
    </html>
  );
}
