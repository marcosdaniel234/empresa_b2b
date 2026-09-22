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
  ["Branco sobre action.DEFAULT (botão)", "#FFFFFF", "#BC3F0C", 4.5],
  ["Branco sobre action.hover", "#FFFFFF", "#9A3412", 4.5],
  ["Branco sobre action.pressed", "#FFFFFF", "#7C2D12", 4.5],
  ["action.DEFAULT sobre branco (links)", "#BC3F0C", "#FFFFFF", 4.5],
  ["action.DEFAULT sobre surface.page", "#BC3F0C", "#F7F5F2", 4.5],
  ["action.DEFAULT sobre surface.subtle", "#BC3F0C", "#F0EDE9", 4.5],
  ["text.primary sobre branco", "#1C1917", "#FFFFFF", 4.5],
  ["text.primary sobre surface.page", "#1C1917", "#F7F5F2", 4.5],
  ["text.secondary sobre branco", "#4A443F", "#FFFFFF", 4.5],
  ["text.secondary sobre surface.subtle", "#4A443F", "#F0EDE9", 4.5],
  ["text.muted sobre branco", "#6B635B", "#FFFFFF", 4.5],
  ["text.muted sobre surface.page", "#6B635B", "#F7F5F2", 4.5],
  ["text.muted sobre surface.subtle", "#6B635B", "#F0EDE9", 4.5],
  ["text.muted sobre surface.raised", "#6B635B", "#EAE5E0", 4.5],
  ["text.secondary sobre surface.raised", "#4A443F", "#EAE5E0", 4.5],
  ["Branco sobre brand.900 (faixas escuras)", "#FFFFFF", "#1C1917", 4.5],
  ["Branco sobre brand.800", "#FFFFFF", "#292524", 4.5],
  ["Branco sobre brand.700", "#FFFFFF", "#44403C", 4.5],
  ["text.primary sobre accent.soft (CTA no escuro)", "#1C1917", "#FBBF24", 4.5],
  ["text.primary sobre accent.strong", "#1C1917", "#F59E0B", 4.5],
  ["success.text sobre success.surface", "#1B7A43", "#E5F3EA", 4.5],
  ["warning.text sobre warning.surface", "#7A5D00", "#FBF1D2", 4.5],
  ["danger.text sobre danger.surface", "#A62C2C", "#FBE9EA", 4.5],
  ["info.text sobre info.surface", "#22508F", "#EAF1FB", 4.5],
  ["border.control sobre branco (contorno de campo)", "#857C73", "#FFFFFF", 3],
  ["border.strong sobre branco (moldura)", "#CFC8C0", "#FFFFFF", 1.4],
  ["focus.ring sobre branco", "#1D4ED8", "#FFFFFF", 3],
  ["focus.ring sobre surface.page", "#1D4ED8", "#F7F5F2", 3],
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
