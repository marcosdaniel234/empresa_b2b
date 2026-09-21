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
 * Barra fixa inferior (T01/T03). Na página de leilão, o painel de lance
 * substitui esta barra para evitar duas ações fixas competindo (TELAS_E_JORNADAS §1).
 */
export function MobileTabBar() {
  const pathname = usePathname();
  // Na página de leilão, a barra fixa do painel de lance assume o lugar
  // desta navegação para evitar duas barras fixas competindo (T03).
  if (pathname.startsWith("/leilao/")) return null;

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch border-t border-border-subtle bg-surface-card md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-caption ${
              active ? "text-action" : "text-text-secondary"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="h-6 w-6" strokeWidth={active ? 2 : 1.75} aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
