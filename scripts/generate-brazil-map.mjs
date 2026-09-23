#!/usr/bin/env node
/**
 * Gera lib/brazilMap.ts: o traçado de cada UF, pronto para o mapa clicável
 * da página inicial.
 *
 * Fonte: @svg-maps/brazil (Victor Cazanave, CC-BY-4.0). Os caminhos originais
 * usam só "m" relativo e "z"; aqui viram coordenadas absolutas, simplificadas
 * por Ramer–Douglas–Peucker e arredondadas a uma casa — a forma continua
 * idêntica no tamanho em que o mapa aparece, com cerca de metade do peso.
 */
import { writeFileSync } from "node:fs";
import brazil from "@svg-maps/brazil";

const TOLERANCE = 0.35;

function rings(d) {
  const tokens = d.trim().split(/[\s,]+|(?=[mz])|(?<=[mz])/i).filter(Boolean);
  const out = [];
  let cur = null;
  let x = 0;
  let y = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === "m") {
      x += Number(tokens[++i]);
      y += Number(tokens[++i]);
      cur = [[x, y]];
      out.push(cur);
    } else if (t === "z" || t === "Z") {
      cur = null;
    } else {
      x += Number(t);
      y += Number(tokens[++i]);
      if (!cur) {
        cur = [[x, y]];
        out.push(cur);
      } else cur.push([x, y]);
    }
  }
  return out;
}

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let far = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const dist = Math.abs((by - ay) * pts[i][0] - (bx - ax) * pts[i][1] + bx * ay - by * ax) / len;
    if (dist > far) {
      far = dist;
      idx = i;
    }
  }
  if (far <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}

const r = (n) => Number(n.toFixed(1));

// Centroide do maior anel: onde o mapa ancora o marcador de cada UF.
function centroid(ring) {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[(i + 1) % ring.length];
    const f = x0 * y1 - x1 * y0;
    a += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  return { area: Math.abs(a / 2), x: cx / (3 * a), y: cy / (3 * a) };
}

const states = brazil.locations.map((loc) => {
  const all = rings(loc.path);
  const main = all.map(centroid).sort((p, q) => q.area - p.area)[0];
  const d = all
    .map((ring) => simplify(ring, TOLERANCE))
    .filter((ring) => ring.length > 2)
    .map((ring) => "M" + ring.map(([px, py]) => `${r(px)} ${r(py)}`).join("L") + "Z")
    .join("");
  return { uf: loc.id.toUpperCase(), name: loc.name, x: r(main.x), y: r(main.y), d };
});

const file = `/**
 * Traçado das 27 UFs, gerado por scripts/generate-brazil-map.mjs — não editar
 * à mão. Fonte: @svg-maps/brazil, de Victor Cazanave, licença CC-BY-4.0
 * (https://github.com/VictorCazanave/svg-maps).
 */
export const BRAZIL_VIEWBOX = "${brazil.viewBox}";

export const BRAZIL_STATES: { uf: string; name: string; x: number; y: number; d: string }[] = ${JSON.stringify(states, null, 0)
  .replace(/\},\{/g, "},\n  {")
  .replace(/^\[\{/, "[\n  {")
  .replace(/\}\]$/, "},\n]")};
`;

writeFileSync("lib/brazilMap.ts", file);
console.log(`lib/brazilMap.ts gerado (${(file.length / 1024).toFixed(1)} KB, ${states.length} UFs)`);
