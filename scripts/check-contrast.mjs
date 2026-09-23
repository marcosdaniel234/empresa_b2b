#!/usr/bin/env node
/**
 * Verifica a razão de contraste WCAG das combinações de texto usadas nos
 * tokens de app/globals.css e tailwind.config.ts. Rodar após qualquer
 * mudança de paleta: `node scripts/check-contrast.mjs`.
 */

function linear(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrastRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [rótulo, primeiro plano, fundo, mínimo exigido]
const PAIRS = [
  ["Branco sobre action (botão vinho)", "#FFFFFF", "#6E1F27", 4.5],
  ["Branco sobre action.hover", "#FFFFFF", "#561820", 4.5],
  ["action sobre surface.page (link)", "#6E1F27", "#F6F0E9", 4.5],
  ["action sobre surface.card", "#6E1F27", "#FFFDFA", 4.5],
  ["action sobre surface.subtle", "#6E1F27", "#EFE6DC", 4.5],
  ["action sobre creme do botão claro", "#6E1F27", "#F6EDE3", 4.5],
  ["copper-bright sobre brand.900 (assinatura no vinho)", "#D9936A", "#2A0E12", 4.5],
  ["copper-bright sobre brand.800", "#D9936A", "#3A1418", 4.5],
  ["copper sobre copper.soft (contagem regressiva)", "#9C4A22", "#F6E6DA", 4.5],
  ["copper sobre surface.page (sobretítulo)", "#9C4A22", "#F6F0E9", 4.5],
  ["brand.900 sobre copper.solid (etiqueta de destaque)", "#2A0E12", "#C9824F", 4.5],
  ["Branco sobre auction (Em leilão)", "#FFFFFF", "#B42329", 4.5],
  ["Branco sobre direct (Venda direta)", "#FFFFFF", "#1F5FBF", 4.5],
  ["text.primary sobre surface.page", "#1E1315", "#F6F0E9", 4.5],
  ["text.primary sobre surface.card", "#1E1315", "#FFFDFA", 4.5],
  ["text.secondary sobre surface.page", "#54433F", "#F6F0E9", 4.5],
  ["text.secondary sobre surface.subtle", "#54433F", "#EFE6DC", 4.5],
  ["text.muted sobre surface.card", "#6E5D58", "#FFFDFA", 4.5],
  ["text.muted sobre surface.page", "#6E5D58", "#F6F0E9", 4.5],
  ["text.muted sobre surface.subtle", "#6E5D58", "#EFE6DC", 4.5],
  ["text.muted sobre surface.raised", "#6E5D58", "#E7DCD0", 4.5],
  ["Branco sobre brand.900", "#FFFFFF", "#2A0E12", 4.5],
  ["Branco sobre brand.800", "#FFFFFF", "#3A1418", 4.5],
  ["Branco sobre brand.700", "#FFFFFF", "#4F1C21", 4.5],
  ["Branco a 72% sobre brand.900 (texto de apoio)", "#C9C0C1", "#2A0E12", 4.5],
  ["success.text sobre success.surface", "#047857", "#ECFDF5", 4.5],
  ["warning.text sobre warning.surface", "#92400E", "#FEF3C7", 4.5],
  ["danger.text sobre danger.surface", "#B91C1C", "#FEE2E2", 4.5],
  ["info.text sobre info.surface", "#1D4ED8", "#EFF4FE", 4.5],
  ["border.control sobre surface.card", "#8C7A72", "#FFFDFA", 3],
  ["focus.ring sobre surface.page", "#1D4ED8", "#F6F0E9", 3],
];

let failed = false;
for (const [label, fg, bg, min] of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= min;
  if (!ok) failed = true;
  console.log(
    `${ok ? "OK  " : "FALHA"} ${ratio.toFixed(2)}:1 (mín. ${min}:1) — ${label}`,
  );
}

if (failed) {
  console.error("\nAlguma combinação ficou abaixo do mínimo WCAG AA.");
  process.exit(1);
}
console.log("\nTodas as combinações passam WCAG AA.");
