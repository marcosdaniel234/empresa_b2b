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
