/**
 * Validação do pré-cadastro de empresas (/anunciar). Tudo roda no navegador;
 * nada é enviado.
 */

/** Aplica a máscara 00.000.000/0000-00 conforme a pessoa digita. */
export function formatCnpj(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 14);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 8), d.slice(8, 12), d.slice(12, 14)];
  let out = parts[0];
  if (parts[1]) out += `.${parts[1]}`;
  if (parts[2]) out += `.${parts[2]}`;
  if (parts[3]) out += `/${parts[3]}`;
  if (parts[4]) out += `-${parts[4]}`;
  return out;
}

function digito(base: string): number {
  const pesos = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const soma = [...base].reduce((acc, n, i) => acc + Number(n) * pesos[i], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

/** Confere os dois dígitos verificadores do CNPJ (formato numérico). */
export function isValidCnpj(raw: string): boolean {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const primeiro = digito(d.slice(0, 12));
  const segundo = digito(d.slice(0, 12) + primeiro);
  return d.endsWith(`${primeiro}${segundo}`);
}

/** Provedores de e-mail pessoal: aceitos, mas com um aviso. */
const PESSOAIS = new Set([
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "yahoo.com",
  "yahoo.com.br",
  "icloud.com",
  "uol.com.br",
  "bol.com.br",
  "terra.com.br",
]);

export type EmailCheck = "vazio" | "invalido" | "pessoal" | "ok";

export function checkCorporateEmail(raw: string): EmailCheck {
  const email = raw.trim().toLowerCase();
  if (!email) return "vazio";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(email)) return "invalido";
  return PESSOAIS.has(email.split("@")[1]) ? "pessoal" : "ok";
}
