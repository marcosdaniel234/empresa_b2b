#!/usr/bin/env node
/**
 * Gera a textura de curvas de nível das faixas em vinho
 * (public/images/curvas.svg).
 *
 * Em vez de anéis desenhados um a um, calcula um relevo contínuo — dois
 * morros largos fora do quadro, um vale e ruído suave — e extrai as isolinhas
 * com marching squares, como num levantamento topográfico real. As curvas saem
 * igualmente espaçadas em altitude, nunca se cruzam, e a cada cinco uma é
 * "curva mestra", mais marcada.
 *
 * Determinística: a mesma semente produz sempre o mesmo arquivo.
 */
import { writeFileSync } from "node:fs";

const W = 1600;
const H = 900;
const CELL = 10; // resolução da malha, em px
const LEVELS = 30;
const MASTER_EVERY = 5;

/* ---------- relevo ---------- */

let seed = 11;
const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// Ruído de valor suavizado, em algumas oitavas.
const GRID = 16;
const lattice = Array.from({ length: (GRID + 2) ** 2 }, rand);
const at = (i, j) => lattice[(j % (GRID + 1)) * (GRID + 1) + (i % (GRID + 1))];
const fade = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const u = fade(x - i);
  const v = fade(y - j);
  const a = at(i, j) * (1 - u) + at(i + 1, j) * u;
  const b = at(i, j + 1) * (1 - u) + at(i + 1, j + 1) * u;
  return a * (1 - v) + b * v;
}
function fbm(x, y) {
  let sum = 0;
  let amp = 1;
  let freq = 1;
  for (let o = 0; o < 2; o++) {
    sum += amp * noise(x * freq, y * freq);
    amp *= 0.45;
    freq *= 2.1;
  }
  return sum;
}

const hills = [
  { x: 1420, y: 120, sx: 620, sy: 420, h: 1.0 },
  { x: 120, y: 980, sx: 700, sy: 380, h: 0.8 },
  { x: 760, y: 470, sx: 260, sy: 170, h: -0.28 },
];

function height(x, y) {
  let z = 0;
  for (const k of hills) {
    const dx = (x - k.x) / k.sx;
    const dy = (y - k.y) / k.sy;
    z += k.h * Math.exp(-(dx * dx + dy * dy));
  }
  return z + 0.17 * fbm((x / W) * 5 + 0.3, (y / H) * 3 + 0.7);
}

const cols = Math.ceil(W / CELL) + 1;
const rows = Math.ceil(H / CELL) + 1;
const field = new Float64Array(cols * rows);
let min = Infinity;
let max = -Infinity;
for (let j = 0; j < rows; j++)
  for (let i = 0; i < cols; i++) {
    const z = height(i * CELL, j * CELL);
    field[j * cols + i] = z;
    if (z < min) min = z;
    if (z > max) max = z;
  }

/* ---------- marching squares ---------- */

function segmentsAt(level) {
  const segs = [];
  const interp = (x1, y1, z1, x2, y2, z2) => {
    const t = (level - z1) / (z2 - z1);
    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  };
  for (let j = 0; j < rows - 1; j++)
    for (let i = 0; i < cols - 1; i++) {
      const x = i * CELL;
      const y = j * CELL;
      const a = field[j * cols + i]; // topo-esq
      const b = field[j * cols + i + 1]; // topo-dir
      const c = field[(j + 1) * cols + i + 1]; // base-dir
      const d = field[(j + 1) * cols + i]; // base-esq
      const code = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
      if (code === 0 || code === 15) continue;
      const top = () => interp(x, y, a, x + CELL, y, b);
      const right = () => interp(x + CELL, y, b, x + CELL, y + CELL, c);
      const bottom = () => interp(x, y + CELL, d, x + CELL, y + CELL, c);
      const left = () => interp(x, y, a, x, y + CELL, d);
      const center = (a + b + c + d) / 4 > level;
      switch (code) {
        case 1: case 14: segs.push([left(), bottom()]); break;
        case 2: case 13: segs.push([bottom(), right()]); break;
        case 3: case 12: segs.push([left(), right()]); break;
        case 4: case 11: segs.push([top(), right()]); break;
        case 6: case 9: segs.push([top(), bottom()]); break;
        case 7: case 8: segs.push([left(), top()]); break;
        case 5:
          if (center) { segs.push([left(), top()]); segs.push([bottom(), right()]); }
          else { segs.push([left(), bottom()]); segs.push([top(), right()]); }
          break;
        case 10:
          if (center) { segs.push([top(), right()]); segs.push([left(), bottom()]); }
          else { segs.push([left(), top()]); segs.push([bottom(), right()]); }
          break;
      }
    }
  return segs;
}

// Junta os segmentos em polilinhas contínuas.
function chain(segs) {
  const key = (p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
  const ends = new Map();
  const used = new Uint8Array(segs.length);
  segs.forEach((s, n) => {
    for (const p of s) {
      const k = key(p);
      if (!ends.has(k)) ends.set(k, []);
      ends.get(k).push(n);
    }
  });
  const next = (p, from) => (ends.get(key(p)) ?? []).find((n) => n !== from && !used[n]);
  const lines = [];
  segs.forEach((s, n) => {
    if (used[n]) return;
    used[n] = 1;
    const line = [s[0], s[1]];
    for (const dir of [1, -1]) {
      let cur = n;
      for (;;) {
        const tip = dir === 1 ? line[line.length - 1] : line[0];
        const m = next(tip, cur);
        if (m === undefined) break;
        used[m] = 1;
        const [p, q] = segs[m];
        const other = key(p) === key(tip) ? q : p;
        if (dir === 1) line.push(other);
        else line.unshift(other);
        cur = m;
      }
    }
    lines.push(line);
  });
  return lines;
}

// Ramer–Douglas–Peucker: menos pontos, mesma forma.
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let far = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs((by - ay) * pts[i][0] - (bx - ax) * pts[i][1] + bx * ay - by * ax) / len;
    if (d > far) { far = d; idx = i; }
  }
  if (far <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}

// Chaikin: arredonda os degraus da malha antes de simplificar.
function chaikin(pts, times) {
  let out = pts;
  for (let t = 0; t < times; t++) {
    const next = [out[0]];
    for (let i = 0; i < out.length - 1; i++) {
      const [ax, ay] = out[i];
      const [bx, by] = out[i + 1];
      next.push([ax * 0.75 + bx * 0.25, ay * 0.75 + by * 0.25], [ax * 0.25 + bx * 0.75, ay * 0.25 + by * 0.75]);
    }
    next.push(out[out.length - 1]);
    out = next;
  }
  return out;
}

// Catmull-Rom → Bézier cúbica, para a linha correr sem quinas.
function smoothPath(pts) {
  const r = (n) => Math.round(n);
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

/* ---------- saída ---------- */

const regular = [];
const master = [];
for (let n = 1; n < LEVELS; n++) {
  const level = min + ((max - min) * n) / LEVELS;
  const lines = chain(segmentsAt(level))
    .map((l) => simplify(chaikin(l, 3), 0.55))
    .filter((l) => l.length > 3);
  const d = lines.map(smoothPath).join("");
  if (!d) continue;
  (n % MASTER_EVERY === 0 ? master : regular).push(d);
}

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#E0A47C" stroke-linecap="round" stroke-linejoin="round">` +
  `<path stroke-opacity=".1" stroke-width=".9" d="${regular.join("")}"/>` +
  `<path stroke-opacity=".2" stroke-width="1.25" d="${master.join("")}"/>` +
  `</svg>`;

writeFileSync("public/images/curvas.svg", svg);
console.log(`curvas.svg gerado (${(svg.length / 1024).toFixed(1)} KB)`);
