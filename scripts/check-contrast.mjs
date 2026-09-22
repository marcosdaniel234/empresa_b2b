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
  ["Branco sobre action.DEFAULT (botão)", "#FFFFFF", "#C2410C", 4.5],
  ["Branco sobre action.hover", "#FFFFFF", "#9A3412", 4.5],
  ["Branco sobre action.pressed", "#FFFFFF", "#7C2D12", 4.5],
  ["action.DEFAULT sobre branco (preço e link)", "#C2410C", "#FFFFFF", 4.5],
  ["action.DEFAULT sobre surface.page", "#C2410C", "#F5F7FA", 4.5],
  ["action.DEFAULT sobre action.soft", "#C2410C", "#FFF1E8", 4.5],
  ["action.bright sobre brand.900 (só no escuro)", "#F97316", "#0E1B2A", 4.5],
  ["action.bright sobre brand.800", "#F97316", "#16283C", 4.5],
  ["text.primary sobre branco", "#0F1B2A", "#FFFFFF", 4.5],
  ["text.primary sobre surface.page", "#0F1B2A", "#F5F7FA", 4.5],
  ["text.secondary sobre branco", "#47566B", "#FFFFFF", 4.5],
  ["text.secondary sobre surface.subtle", "#47566B", "#EEF1F6", 4.5],
  ["text.muted sobre branco", "#5A6A80", "#FFFFFF", 4.5],
  ["text.muted sobre surface.page", "#5A6A80", "#F5F7FA", 4.5],
  ["text.muted sobre surface.subtle", "#5A6A80", "#EEF1F6", 4.5],
  ["text.muted sobre surface.raised", "#5A6A80", "#EAEEF4", 4.5],
  ["Branco sobre brand.900 (topo, abertura e rodapé)", "#FFFFFF", "#0E1B2A", 4.5],
  ["Branco sobre brand.800 (painel escuro)", "#FFFFFF", "#16283C", 4.5],
  ["Branco sobre brand.700", "#FFFFFF", "#22384F", 4.5],
  ["Branco sobre brand.600", "#FFFFFF", "#33506D", 4.5],
  ["Branco sobre success.solid (etiqueta Aberto)", "#FFFFFF", "#047857", 4.5],
  ["success.text sobre success.surface", "#047857", "#ECFDF5", 4.5],
  ["warning.text sobre warning.surface", "#92400E", "#FEF3C7", 4.5],
  ["danger.text sobre danger.surface", "#B91C1C", "#FEE2E2", 4.5],
  ["info.text sobre info.surface", "#1D4ED8", "#EFF4FE", 4.5],
  ["border.control sobre branco (contorno de campo)", "#7C8899", "#FFFFFF", 3],
  ["border.strong sobre branco (moldura)", "#C9D2DE", "#FFFFFF", 1.3],
  ["focus.ring sobre branco", "#1D4ED8", "#FFFFFF", 3],
  ["focus.ring sobre surface.page", "#1D4ED8", "#F5F7FA", 3],
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
