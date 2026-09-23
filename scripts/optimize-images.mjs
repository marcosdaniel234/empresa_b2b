#!/usr/bin/env node
/**
 * Gera as fotografias publicadas a partir dos originais em assets-src/.
 *
 * Os originais são PNG de 1,5–2,7 MB; servidos direto, uma página de
 * catálogo com doze cartões baixava ~25 MB. Cada original vira dois WebP:
 * `<nome>.webp` (até 1600 px, para a abertura e a ficha do lote) e
 * `<nome>-640.webp` (para cartões e miniaturas). O `ImageSlot` escolhe entre
 * eles por `srcset`.
 *
 * Rodar após adicionar ou trocar uma foto: `npm run images`.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "assets-src";
const OUT = "public/images";
const SIZES = [
  { suffix: "", width: 1600, quality: 76 },
  { suffix: "-640", width: 640, quality: 72 },
];

let before = 0;
let after = 0;

for (const dir of await readdir(SRC)) {
  const from = path.join(SRC, dir);
  if (!(await stat(from)).isDirectory()) continue;
  await mkdir(path.join(OUT, dir), { recursive: true });

  for (const file of await readdir(from)) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const input = path.join(from, file);
    const name = file.replace(/\.(png|jpe?g)$/i, "");
    before += (await stat(input)).size;

    for (const size of SIZES) {
      const output = path.join(OUT, dir, `${name}${size.suffix}.webp`);
      await sharp(input)
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: size.quality, effort: 5 })
        .toFile(output);
      after += (await stat(output)).size;
    }
  }
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(`Originais: ${mb(before)} MB → publicados: ${mb(after)} MB`);
