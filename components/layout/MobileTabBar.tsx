"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, PlusCircle, Building2 } from "lucide-react";

const TABS = [
  { href: "/", label: "Explorar", icon: Compass },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/anunciar", label: "Anunciar", icon: PlusCircle },
  { href: "/entrar", label: "Minha empresa", icon: Building2 },
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
      className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-border-subtle bg-white md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        minHeight: "calc(60px + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/"
            ? pathname === "/" || pathname.startsWith("/resultados")
            : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-caption ${
              active ? "font-semibold text-action" : "text-text-secondary"
            }`}
            aria-current={active ? "page" : undefined}
          >
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
