"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Revela os elementos marcados com `data-reveal` quando entram na tela.
 *
 * Um único observador para o site inteiro, refeito a cada troca de rota. Cada
 * elemento anima uma vez e deixa de ser observado. O atraso escalonado vem de
 * `data-reveal="2"` (em múltiplos de 90 ms), para que itens de uma mesma
 * fileira cheguem em sequência, não em bloco.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const step = Number(el.dataset.reveal) || 0;
          el.style.setProperty("--reveal-delay", `${step * 90}ms`);
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
