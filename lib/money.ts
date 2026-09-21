/** Parses Brazilian user input into integer cents without removing decimal separators. */
export function parseBRLToCents(input: string): number | null {
  const value = input.trim();
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(value)) return null;
  const [whole, fraction = ""] = value.replaceAll(".", "").split(",");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(cents) && cents > 0 ? cents : null;
}
export function validateDemoBid(
  input: string,
  minimumReais: number,
): { cents: number | null; error?: string } {
  const cents = parseBRLToCents(input);
  if (cents === null)
    return { cents, error: "Digite um valor válido, como 28.500,00." };
  if (cents < Math.round(minimumReais * 100))
    return {
      cents: null,
      error: "O valor está abaixo do próximo lance mínimo.",
    };
  return { cents };
}
