/**
 * Geometria do Brasil compartilhada pelos geradores (mapa clicável e fundo
 * de rotas). Fonte: @svg-maps/brazil, de Victor Cazanave, licença CC-BY-4.0.
 * Os caminhos originais usam só "m" relativo e "z".
 */
import brazil from "@svg-maps/brazil";

export { brazil };

/** Converte um caminho do pacote em anéis de coordenadas absolutas. */
export function rings(d) {
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

/** Área e centroide de um anel (fórmula do polígono). */
export function centroid(ring) {
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

/** Ponto dentro de um anel (par-ímpar). */
export function inside([px, py], ring) {
  let hit = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** UFs com anéis e centroide do maior anel. */
export const STATES = brazil.locations.map((loc) => {
  const all = rings(loc.path);
  const main = all.map(centroid).sort((p, q) => q.area - p.area)[0];
  return { uf: loc.id.toUpperCase(), name: loc.name, rings: all, x: main.x, y: main.y };
});
