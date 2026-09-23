/** Lista de identificadores (slugs de lote) persistida em localStorage. */
export function parseSlugList(raw: string, max = 200): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? [
          ...new Set(
            value.filter(
              (v): v is string =>
                typeof v === "string" && /^[a-z0-9-]{1,160}$/.test(v),
            ),
          ),
        ].slice(0, max)
      : [];
  } catch {
    return [];
  }
}

export function parseFavorites(raw: string): string[] {
  return parseSlugList(raw, 200);
}

/**
 * Lista de termos livres (buscas recentes). Aceita acento e espaço, recusa
 * caracteres de controle, apara e remove repetidos sem diferenciar maiúsculas.
 */
export function parseTextList(raw: string, max = 20): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    const out: string[] = [];
    for (const v of value) {
      if (typeof v !== "string") continue;
      const t = v.trim();
      if (!t || t.length > 60 || /[\u0000-\u001f\u007f]/.test(t)) continue;
      const key = t.toLocaleLowerCase("pt-BR");
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(t);
    }
    return out.slice(0, max);
  } catch {
    return [];
  }
}
