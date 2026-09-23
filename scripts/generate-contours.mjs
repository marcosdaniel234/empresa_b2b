#!/usr/bin/env node
/**
 * Gera a textura de curvas de nível das faixas em vinho
 * (public/images/curvas.svg). Determinística: a mesma semente produz sempre o
 * mesmo arquivo, então o SVG versionado só muda quando o desenho muda.
 *
 * Cada "morro" é uma família de curvas fechadas concêntricas, deformadas por
 * três harmônicos — o suficiente para parecer levantamento topográfico sem
 * virar ruído.
 */
import { writeFileSync } from "node:fs";

const W = 1600;
const H = 900;
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

const hills = [
  { cx: 1180, cy: 260, rings: 16, step: 34, rx: 1.35, ry: 0.85 },
  { cx: 260, cy: 760, rings: 12, step: 38, rx: 1.2, ry: 0.8 },
  { cx: 820, cy: 980, rings: 9, step: 42, rx: 1.6, ry: 0.7 },
];

function ring(h, r) {
  const k = [rand() * 0.14, rand() * 0.1, rand() * 0.07];
  const ph = [rand() * 6.28, rand() * 6.28, rand() * 6.28];
  const pts = [];
  for (let i = 0; i <= 56; i++) {
    const t = (i / 56) * Math.PI * 2;
    const wobble =
      1 + k[0] * Math.sin(2 * t + ph[0]) + k[1] * Math.sin(3 * t + ph[1]) + k[2] * Math.sin(5 * t + ph[2]);
    pts.push([h.cx + Math.cos(t) * r * h.rx * wobble, h.cy + Math.sin(t) * r * h.ry * wobble]);
  }
  // curva suave por pontos médios (Bézier quadrática)
  let d = `M${((pts[0][0] + pts[1][0]) / 2).toFixed(0)} ${((pts[0][1] + pts[1][1]) / 2).toFixed(0)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const mx = (x + pts[i + 1][0]) / 2;
    const my = (y + pts[i + 1][1]) / 2;
    d += `Q${x.toFixed(0)} ${y.toFixed(0)} ${mx.toFixed(0)} ${my.toFixed(0)}`;
  }
  return d + "Z";
}

const paths = hills
  .flatMap((h) => Array.from({ length: h.rings }, (_, i) => ring(h, 40 + i * h.step)))
  .map((d) => `<path d="${d}"/>`)
  .join("");

writeFileSync(
  "public/images/curvas.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#D9936A" stroke-opacity=".17" stroke-width="1">${paths}</svg>`,
);
console.log("curvas.svg gerado");
