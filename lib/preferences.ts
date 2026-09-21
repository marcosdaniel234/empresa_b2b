export function parseFavorites(raw: string): string[] {
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
        ].slice(0, 200)
      : [];
  } catch {
    return [];
  }
}
