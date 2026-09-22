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
  ["Branco sobre action.DEFAULT (botão)", "#FFFFFF", "#B45309", 4.5],
  ["Branco sobre action.hover", "#FFFFFF", "#92400E", 4.5],
  ["Branco sobre action.pressed", "#FFFFFF", "#78350F", 4.5],
  ["action.DEFAULT sobre branco (links)", "#B45309", "#FFFFFF", 4.5],
  ["text.primary sobre surface.page", "#16191C", "#F1F2F3", 4.5],
  ["text.secondary sobre branco", "#454E52", "#FFFFFF", 4.5],
  ["text.muted sobre branco", "#5C666B", "#FFFFFF", 4.5],
  ["text.muted sobre surface.subtle", "#5C666B", "#E7E9EA", 4.5],
  ["Branco sobre brand.900 (cabeçalho/rodapé)", "#FFFFFF", "#14181B", 4.5],
  ["text.primary sobre accent.soft", "#16191C", "#F5C451", 4.5],
  ["success.text sobre success.surface", "#1B7A43", "#E5F3EA", 4.5],
  ["warning.text sobre warning.surface", "#7A5D00", "#FBF1D2", 4.5],
  ["danger.text sobre danger.surface", "#A62C2C", "#FBE9EA", 4.5],
  ["info.text sobre info.surface", "#22508F", "#EAF1FB", 4.5],
  ["border.control sobre branco (contorno de campo)", "#6B767B", "#FFFFFF", 3],
  ["focus.ring sobre branco", "#225CBE", "#FFFFFF", 3],
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
