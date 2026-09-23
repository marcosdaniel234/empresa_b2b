#!/usr/bin/env node
/**
 * Regrada os fundos fotográficos para a paleta Atlantic Industrial.
 *
 * Os originais (metal-cobre e panorama-industrial) foram gerados em cobre e
 * vinho. Aqui cada um vira um duotom — sombras no azul-atlântico, luzes no
 * verde-mar —, preservando luz, forma e composição. Os originais ficam
 * intactos; as versões regradas ganham o sufixo "-atlantico".
 *
 * Uso: node scripts/grade-backgrounds.mjs
 */
import sharp from "sharp";

const DIR = "public/images/backgrounds";
const FILES = ["metal-cobre", "panorama-industrial"];

// Rampa de cor: luminância 0 → 1.
const STOPS = [
  [0.0, [6, 15, 23]],
  [0.25, [16, 41, 59]],
  [0.5, [34, 80, 111]],
  [0.75, [62, 140, 146]],
  [1.0, [190, 240, 232]],
];

// Levanta os meios-tons: os originais são escuros e o duotom os achataria.
const GAMMA = 0.72;

function ramp(t) {
  for (let i = 1; i < STOPS.length; i++) {
    const [t1, c1] = STOPS[i];
    const [t0, c0] = STOPS[i - 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k));
    }
  }
  return STOPS[STOPS.length - 1][1];
}

const LUT = Array.from({ length: 256 }, (_, i) => ramp((i / 255) ** GAMMA));

for (const name of FILES) {
  const { data, info } = await sharp(`${DIR}/${name}.webp`)
    .greyscale()
    .normalise()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) out.set(LUT[data[i]], i * 3);
  const graded = sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } });
  await graded.clone().webp({ quality: 78, effort: 5 }).toFile(`${DIR}/${name}-atlantico.webp`);
  await graded.clone().resize({ width: 640 }).webp({ quality: 74, effort: 5 }).toFile(`${DIR}/${name}-atlantico-640.webp`);
  console.log(`${name}-atlantico.webp gerado`);
}
