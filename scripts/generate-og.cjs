/* eslint-disable @typescript-eslint/no-require-imports -- script de build auxiliar, roda com Node puro */
/**
 * Gera public/og.jpg (1200×630), a imagem de compartilhamento.
 *
 * Abre o site já construído (sirva `out/` em http://localhost:4210) para
 * reaproveitar as fontes e os estilos reais, monta a composição e fotografa.
 * Uso: npx serve out -l 4210 & node scripts/generate-og.cjs
 */
const { chromium } = require("playwright");
const sharp = require("sharp");
const path = require("node:path");

const BASE = process.env.OG_BASE ?? "http://localhost:4210";

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.evaluate((base) => {
    document.body.className = "font-sans";
    document.body.style.padding = "0";
    document.body.innerHTML = `
      <div class="on-dark" style="position:relative;isolation:isolate;overflow:hidden;width:1200px;height:630px;background:#2A0E12;color:#fff">
        <img src="${base}/images/assets/cavalo-mecanico-6x2.webp" style="position:absolute;top:0;right:0;height:100%;width:62%;object-fit:cover;z-index:-2" />
        <div style="position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#2A0E12 38%,rgba(42,14,18,.82) 55%,rgba(42,14,18,.1))"></div>
        <div style="position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse 60% 70% at 22% 55%, rgba(107,42,47,.65), rgba(107,42,47,0));-webkit-mask-image:linear-gradient(90deg,#000 25%,transparent 60%);mask-image:linear-gradient(90deg,#000 25%,transparent 60%)"></div>
        <div style="display:flex;flex-direction:column;justify-content:space-between;height:100%;padding:64px 72px">
          <span style="font-size:34px;font-weight:800;letter-spacing:-.035em">ATIVOS <span class="text-copper-gradient">B2B</span></span>
          <div>
            <p class="kicker-on-dark" style="font-size:15px">Negócios que movimentam empresas</p>
            <p style="margin-top:20px;font-size:78px;font-weight:800;line-height:.98;letter-spacing:-.045em">Grandes ativos.<span class="text-copper-gradient" style="display:block;padding-bottom:8px">Novos destinos.</span></p>
          </div>
          <p style="font-size:23px;color:rgba(255,255,255,.8)">Máquinas, veículos, tecnologia e mobiliário entre empresas.</p>
        </div>
      </div>`;
  }, BASE);
  await page.waitForTimeout(800);
  const png = await page.screenshot({ type: "png" });
  await sharp(png)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(__dirname, "..", "public", "og.jpg"));
  await browser.close();
  console.log("public/og.jpg gerado");
})();
