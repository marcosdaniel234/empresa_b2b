"use client";

import { Check, Plus } from "lucide-react";
import { createSlugListStore } from "@/components/shared/localSlugList";
import { parseSlugList } from "@/lib/preferences";

const store = createSlugListStore(
  "ativos-b2b:lojas-seguidas",
  "ativos-b2b:lojas-seguidas-change",
  50,
);

export const useFollowedStores = store.useList;

/**
 * Seguir uma loja. A lista fica salva neste navegador — o mesmo modelo dos
 * favoritos —, então o botão reflete o estado real em qualquer página.
 */
export function FollowButton({
  slug,
  name,
  tone = "dark",
  className = "",
}: {
  slug: string;
  name: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const followed = store.useList();
  const active = followed.includes(slug);

  function toggle() {
    const current = parseSlugList(store.readRaw(), 50);
    store.write(
      active ? current.filter((s) => s !== slug) : [slug, ...current],
    );
  }

  const palette =
    tone === "dark"
      ? active
        ? "border-accent-bright bg-accent-bright text-brand-900"
        : "border-white/35 text-white hover:border-accent-bright hover:text-accent-bright"
      : active
        ? "border-action bg-action text-white"
        : "border-border-strong text-text-primary hover:border-action hover:text-action";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? `Deixar de seguir ${name}` : `Seguir ${name}`}
      className={`relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-[6px] border px-3 text-caption font-semibold transition-colors duration-standard ease-standard ${palette} ${className}`}
    >
      {active ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Plus size={13} aria-hidden="true" />
      )}
      {active ? "Seguindo" : "Seguir"}
    </button>
  );
}
