"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Home, PlusCircle, UserRound } from "lucide-react";

const TABS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/resultados", label: "Explorar", icon: Compass },
  { href: "/anunciar", label: "Vender", icon: PlusCircle },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/entrar", label: "Perfil", icon: UserRound },
];

/**
 * Barra fixa inferior do mobile. Na página de leilão ela dá lugar à ação do
 * painel de lance, para não competirem duas barras fixas.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/leilao/")) return null;

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border-subtle bg-surface-card/95 shadow-[0_-6px_20px_rgba(11,29,42,.06)] backdrop-blur md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        minHeight: "calc(60px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 text-caption transition-colors duration-standard ${
              active ? "font-semibold text-action" : "text-text-secondary"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-accent-solid"
              />
            )}
            <Icon
              size={21}
              strokeWidth={active ? 2 : 1.75}
              aria-hidden="true"
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
