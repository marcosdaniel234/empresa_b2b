#!/usr/bin/env node
/**
 * Gera public/images/rotas.svg, o fundo das faixas em vinho: um Brasil em
 * retícula de pontos (meio-tom), cruzado por rotas pontilhadas entre os
 * estados que têm lotes — a ideia de "novos destinos": ativos que saem de
 * uma empresa e seguem para outra.
 *
 * O meio-tom não é aleatório: os pontos crescem e acendem perto dos polos de
 * oferta, e esmaecem nas regiões sem lote. Tudo determinístico.
 */
import { writeFileSync } from "node:fs";
import { STATES, inside } from "./brazil-geometry.mjs";

const W = 1600;
const H = 900;
const COLOR = "#E0A47C";

// Posição do mapa no quadro: à direita, com a costa inteira visível.
const SCALE = 1.42;
const OX = 1090 - 306 * SCALE;
const OY = 455 - 320 * SCALE;
const toCanvas = ([x, y]) => [OX + x * SCALE, OY + y * SCALE];
const toMap = ([x, y]) => [(x - OX) / SCALE, (y - OY) / SCALE];

// Estados com lotes no catálogo de demonstração: os polos das rotas.
const HUBS = ["SP", "PR", "GO", "MG", "RJ", "BA", "ES", "PE", "RS", "SC"];
const hub = Object.fromEntries(
  STATES.filter((s) => HUBS.includes(s.uf)).map((s) => [s.uf, toCanvas([s.x, s.y])]),
);

/* ---------- retícula ---------- */

const STEP = 15;
const BUCKETS = [
  { r: 1.05, o: 0.16 },
  { r: 1.55, o: 0.24 },
  { r: 2.15, o: 0.34 },
  { r: 2.8, o: 0.48 },
];
const dots = BUCKETS.map(() => []);

for (let y = STEP / 2; y < H; y += STEP) {
  for (let x = STEP / 2; x < W; x += STEP) {
    const m = toMap([x, y]);
    const state = STATES.find((s) => s.rings.some((ring) => inside(m, ring)));
    if (!state) continue;
    // Intensidade: proximidade do polo de oferta mais próximo.
    const near = Math.max(
      ...Object.values(hub).map(([hx, hy]) => Math.exp(-((x - hx) ** 2 + (y - hy) ** 2) / 150 ** 2)),
    );
    const level = Math.min(BUCKETS.length - 1, Math.floor(near * BUCKETS.length * 0.999 + (HUBS.includes(state.uf) ? 0.6 : 0)));
    dots[level].push(`M${Math.round(x)} ${Math.round(y)}h0`);
  }
}

/* ---------- rotas ---------- */

const EDGES = [
  ["SP", "RJ"], ["SP", "MG"], ["SP", "PR"], ["PR", "SC"], ["SC", "RS"],
  ["SP", "GO"], ["GO", "BA"], ["MG", "BA"], ["BA", "PE"], ["RJ", "ES"],
  ["GO", "PE"], ["PR", "RS"],
];

function arc(a, b, bend = 0.22) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Curva sempre para o mesmo lado, como rotas aéreas no mapa.
  const cx = mx + dy * bend;
  const cy = my - dx * bend;
  return `M${Math.round(x1)} ${Math.round(y1)}Q${Math.round(cx)} ${Math.round(cy)} ${Math.round(x2)} ${Math.round(y2)}`;
}

const routes = EDGES.map(([a, b]) => arc(hub[a], hub[b])).join("");
// Duas rotas que saem do quadro: o destino pode estar fora do mapa.
const outbound = [arc(hub.SP, [-80, 610], 0.18), arc(hub.GO, [-80, 250], 0.16)].join("");

const nodes = Object.values(hub)
  .map(([x, y]) => {
    const cx = Math.round(x);
    const cy = Math.round(y);
    return (
      `<circle cx="${cx}" cy="${cy}" r="17" stroke-opacity=".14"/>` +
      `<circle cx="${cx}" cy="${cy}" r="9" stroke-opacity=".38"/>` +
      `<circle cx="${cx}" cy="${cy}" r="3.6" fill="#F0B98F" stroke="none"/>`
    );
  })
  .join("");

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="${COLOR}" stroke-linecap="round">` +
  BUCKETS.map((b, i) => `<path stroke-width="${b.r * 2}" stroke-opacity="${b.o}" d="${dots[i].join("")}"/>`).join("") +
  `<path stroke-width="1" stroke-opacity=".16" d="${routes}${outbound}"/>` +
  `<path stroke-width="2.2" stroke-opacity=".62" stroke-dasharray="0 9" d="${routes}${outbound}"/>` +
  `<g stroke-width="1">${nodes}</g>` +
  `</svg>`;

writeFileSync("public/images/rotas.svg", svg);
console.log(`rotas.svg gerado (${(svg.length / 1024).toFixed(1)} KB, ${dots.flat().length} pontos)`);
