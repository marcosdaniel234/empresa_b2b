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
import { brazil, STATES } from "./brazil-geometry.mjs";

const TOLERANCE = 0.35;

function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const len = Math.hypot(bx - ax, by - ay);
  let far = 0;
  let idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    // Anel que fecha no ponto de partida (caso de SC, com diferença só de
    // arredondamento, ~1e-13): não há segmento de referência, então vale a
    // distância até o ponto inicial.
    const dist =
      len < 1e-6
        ? Math.hypot(pts[i][0] - ax, pts[i][1] - ay)
        : Math.abs((by - ay) * pts[i][0] - (bx - ax) * pts[i][1] + bx * ay - by * ax) / len;
    if (dist > far) {
      far = dist;
      idx = i;
    }
  }
  if (far <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}

const r = (n) => Number(n.toFixed(1));

const states = STATES.map((st) => {
  const d = st.rings
    .map((ring) => simplify(ring, TOLERANCE))
    .filter((ring) => ring.length > 2)
    .map((ring) => "M" + ring.map(([px, py]) => `${r(px)} ${r(py)}`).join("L") + "Z")
    .join("");
  return { uf: st.uf, name: st.name, x: r(st.x), y: r(st.y), d };
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
