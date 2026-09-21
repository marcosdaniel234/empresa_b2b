/**
 * Export estático. `trailingSlash` gera `pasta/index.html`, formato aceito por
 * qualquer host estático (incluindo GitHub Pages), e `basePath` permite
 * publicar o site em um subdiretório sem alterar o código.
 * Um único epoch compartilhado mantém as datas de demonstração iguais no
 * servidor e no navegador.
 */
// Hosts de site raiz informam "/" como caminho base; o Next espera "" nesse caso.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_DEMO_EPOCH:
      process.env.NEXT_PUBLIC_DEMO_EPOCH ?? String(Date.now()),
  },
};

export default nextConfig;
