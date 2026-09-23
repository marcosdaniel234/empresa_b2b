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
  ["Branco sobre action (botão azul-petróleo)", "#FFFFFF", "#0E4A6E", 4.5],
  ["Branco sobre action.hover", "#FFFFFF", "#0B3C5A", 4.5],
  ["action sobre surface.page (link)", "#0E4A6E", "#F1F4F5", 4.5],
  ["action sobre surface.card", "#0E4A6E", "#FCFDFD", 4.5],
  ["action sobre surface.subtle", "#0E4A6E", "#E7EDF0", 4.5],
  ["action sobre o concreto do botão claro", "#0E4A6E", "#EEF3F4", 4.5],
  ["accent-bright sobre brand.900 (assinatura no azul)", "#7FCFC6", "#0B1D2A", 4.5],
  ["accent-bright sobre brand.800", "#7FCFC6", "#10293B", 4.5],
  ["accent-bright sobre brand.700", "#7FCFC6", "#173A52", 4.5],
  ["accent sobre accent.soft (contagem regressiva)", "#1B6E6C", "#DDF0EE", 4.5],
  ["accent sobre surface.page (sobretítulo)", "#1B6E6C", "#F1F4F5", 4.5],
  ["brand.900 sobre accent.solid (etiqueta de destaque)", "#0B1D2A", "#4FB3AA", 4.5],
  ["action sobre o marcador do mapa", "#0E4A6E", "#EEF3F4", 4.5],
  ["Branco sobre auction (Em leilão)", "#FFFFFF", "#B42329", 4.5],
  ["Branco sobre direct (Venda direta)", "#FFFFFF", "#1F5FBF", 4.5],
  ["text.primary sobre surface.page", "#0E1B24", "#F1F4F5", 4.5],
  ["text.primary sobre surface.card", "#0E1B24", "#FCFDFD", 4.5],
  ["text.secondary sobre surface.page", "#3F4F5A", "#F1F4F5", 4.5],
  ["text.secondary sobre surface.subtle", "#3F4F5A", "#E7EDF0", 4.5],
  ["text.muted sobre surface.card", "#526069", "#FCFDFD", 4.5],
  ["text.muted sobre surface.page", "#526069", "#F1F4F5", 4.5],
  ["text.muted sobre surface.subtle", "#526069", "#E7EDF0", 4.5],
  ["text.muted sobre surface.raised", "#526069", "#DCE4E8", 4.5],
  ["Branco sobre brand.900", "#FFFFFF", "#0B1D2A", 4.5],
  ["Branco sobre brand.800", "#FFFFFF", "#10293B", 4.5],
  ["Branco sobre brand.700", "#FFFFFF", "#173A52", 4.5],
  ["Branco a 72% sobre brand.900 (texto de apoio)", "#BBC0C3", "#0B1D2A", 4.5],
  ["success.text sobre success.surface", "#047857", "#ECFDF5", 4.5],
  ["warning.text sobre warning.surface", "#92400E", "#FEF3C7", 4.5],
  ["danger.text sobre danger.surface", "#B91C1C", "#FEE2E2", 4.5],
  ["info.text sobre info.surface", "#1D4ED8", "#EFF4FE", 4.5],
  ["border.control sobre surface.card", "#7A8A94", "#FCFDFD", 3],
  ["focus.ring sobre surface.page", "#1D4ED8", "#F1F4F5", 3],
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
