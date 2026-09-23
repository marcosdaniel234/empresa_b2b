# ATIVOS B2B

Marketplace de leilão de ativos corporativos entre empresas, com máquinas, veículos, tecnologia e mobiliário. Este repositório contém uma demonstração navegável da interface, com dados fictícios, que implementa a fundação estética e as telas centrais da jornada de descoberta e simulação de lance.

> **"ATIVOS B2B" é um identificador temporário de projeto.** Nome, marca e logotipo definitivos ainda não foram definidos (ver [`docs/design/FUNDACAO_ESTETICA.md`](./docs/design/FUNDACAO_ESTETICA.md)).

Os quatro documentos originais que fundamentam o produto estão preservados em [`docs/design/`](./docs/design/): `FUNDACAO_ESTETICA.md` (tokens e identidade), `TELAS_E_JORNADAS.md` (arquitetura de telas), `ANIMACOES_E_MICROINTERACOES.md` (movimento) e `HANDOFF_DESIGN.md` (validação e organização futura). A revisão profissional aplicada à interface está registrada em [`REVISAO_PROFISSIONAL.md`](./docs/design/REVISAO_PROFISSIONAL.md).

## O que esta demonstração é e o que ainda não é

Este é um **protótipo de interface (frontend-only)**, sem backend, sem autenticação e sem persistência real de dados. Ele existe para:

- validar a direção visual (tokens, tipografia, componentes) em telas reais e responsivas;
- demonstrar a jornada principal de comprador: buscar → analisar → revisar → confirmar um lance;
- servir de base de código para a implementação incremental do produto completo.

Todos os ativos, empresas e valores exibidos são **fictícios**, gerados em `lib/data.ts` apenas para preencher a interface. Nenhuma simulação é registrada. O aviso permanente no painel e na revisão reforça esse limite.

Para o inventário completo do que **não** foi construído e o roteiro sugerido de próximos passos, leia **[`MVP_ESCOPO.md`](./MVP_ESCOPO.md)**.

## Stack técnica

- **Next.js 16** (App Router, React Server Components) + **TypeScript**
- **Tailwind CSS**, com os tokens de cor/tipografia/espaçamento/raio/sombra do design system mapeados em `tailwind.config.ts`
- **lucide-react** para ícones (família única de linha, conforme especificação)
- Fontes **Plus Jakarta Sans** (variável) e **Roboto Mono** via `next/font/google`
- `sharp` (desenvolvimento) para o pipeline de imagens
- Sem backend, sem banco de dados, sem chamadas de rede além dos assets estáticos

Zero dependências com vulnerabilidades conhecidas (`npm audit` limpo no momento da entrega).

## Rodando localmente

```bash
npm install
npm run dev        # ambiente de desenvolvimento em http://localhost:3000
npm run build      # gera o site estático em out/
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # testes de domínio (Node test runner)
npm run images     # reprocessa as fotos de assets-src/ para public/images/
node scripts/check-contrast.mjs   # confere as combinações de cor em WCAG AA
```

O build usa `output: "export"`: o resultado é um site estático em `out/`, que pode
ser servido por qualquer hospedagem de arquivos.

### Imagens

As fotos originais ficam em `assets-src/` (PNG, fora do site publicado).
`npm run images` gera, para cada uma, dois WebP em `public/images/`: 1600 px e
640 px (`-640.webp`). Os componentes servem as duas por `srcset`, então um
cartão baixa a versão pequena e a abertura, a grande. O conjunto caiu de
86,5 MB para cerca de 6 MB.

Outros arquivos gerados por script, versionados já prontos:

- `public/images/rotas.svg` — fundo das faixas azul profundo
  (`node scripts/generate-backdrop.mjs`, determinístico): o Brasil em retícula
  de pontos, com rotas pontilhadas entre os estados que têm lotes. O
  componente `Backdrop` põe por baixo de toda faixa um degradê de uma cor fixa
  (o azul-aço `#22506F` em transparências), protege o lado do texto (as rotas só
  aparecem do meio para a direita) e, no celular, deixa só o degradê.
- `lib/brazilMap.ts` — traçado das 27 UFs para o mapa clicável da página
  inicial (`node scripts/generate-brazil-map.mjs`, a partir de `@svg-maps/brazil`).
- `public/images/states/*.webp` — bandeiras das UFs, rasterizadas de
  `assets-src/states/*.svg` por `npm run images` (de ~850 KB para ~21 KB).
- `public/og.jpg` — imagem de compartilhamento 1200×630
  (`node scripts/generate-og.cjs`, com o site servido em `localhost:4210`;
  requer Playwright).

## Publicação no GitHub Pages

O workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
usa o fluxo oficial do Pages: `checkout` → `setup-node` → `npm ci` →
tipos, lint e testes → `configure-pages` → `npm run build` →
`upload-pages-artifact` → `deploy-pages`. Ele roda a cada push no branch de
desenvolvimento, sob demanda (`workflow_dispatch`) e uma vez por dia.

**Guia rápido (uma vez, feito pelo dono do repositório):**

1. Em **Settings → Pages → Build and deployment**, escolha **Source: GitHub
   Actions**.
2. Em **Actions**, abra “Publicar site” e clique em **Run workflow** (ou faça
   um push).
3. Ao fim do job `deploy`, o endereço aparece no resumo da execução — em geral
   `https://<usuário>.github.io/empresa_b2b/`.

Observações:

- Em repositório **privado**, o GitHub Pages exige plano pago (Pro, Team ou
  Enterprise). No plano gratuito, torne o repositório público ou publique
  `out/` em outro host estático.
- O `configure-pages` informa o caminho base (`/empresa_b2b`, ou a raiz com
  domínio próprio) e o endereço público; o build recebe os dois como
  `NEXT_PUBLIC_BASE_PATH` e `NEXT_PUBLIC_SITE_URL`, usados nos links, no
  `sitemap.xml`, no `robots.txt` e nas metatags de compartilhamento.
- A reconstrução diária é proposital: as datas dos leilões de demonstração
  são calculadas no momento do build, e ela mantém os prazos sempre válidos.

Para reproduzir a publicação localmente:

```bash
NEXT_PUBLIC_BASE_PATH=/empresa_b2b npm run build
npx serve out   # e abra http://localhost:3000/empresa_b2b/
```

## Estrutura do projeto

```
app/                         Rotas (App Router)
  page.tsx                   Início: abertura com lotes em destaque, busca,
                             oportunidades, categorias e lojas
  resultados/                Catálogo com filtros (modalidade, categoria,
                             situação, estado, cidade, valor)
  leilao/[slug]/             Ficha do lote + painel de lance ou de compra
  leiloes/ leiloes/[slug]/   Leilões por empresa
  lojas/ loja/[slug]/        Diretório de lojas e loja da empresa
  anunciar/                  Página de quem vende + pré-cadastro
  favoritos/ comparar/       Seleções pessoais (localStorage)
  como-funciona/ ajuda/ entrar/ termos/ privacidade/
  robots.ts sitemap.ts       SEO estático

components/
  brand/      Curvas de nível, mapa do Brasil, revelação por rolagem
  layout/     Cabeçalho, menu, rodapé, faixa de abertura interna, tab bar
  home/       Abertura em carrossel, painel de busca, faixa de confiança,
              oportunidades, mapa de estados com bandeiras, categorias,
              faixa de empresas
  seller/     Formulário de pré-cadastro
  catalog/    Cartão de ativo, catálogo, filtros, favoritos, seguir loja,
              diretório de lojas, comparação
  auction/    Galeria, painel de lance, revisão, contagem regressiva
  ads/ ui/    Espaços de publicidade e peças básicas

lib/
  data.ts      Dados de demonstração (ativos, empresas, modalidade)
  filters.ts   Filtro e ordenação do catálogo (URL ↔ estado)
  cadastro.ts  Máscara e validação de CNPJ e e-mail
  images.ts    Caminhos e srcset das fotos
  format.ts    Moeda, datas, contagem regressiva, nomes de empresa
```

## Direção visual: Atlantic Industrial

A interface reconstrói as três referências da marca (abertura com carrossel,
página de quem vende e seções numeradas de oportunidades, categorias e
empresas).

- **Cor**: azul-atlântico profundo (`brand-900` #0B1D2A) nas faixas,
  cabeçalho e rodapé, como casco de navio e aço pintado de estaleiro;
  verde-mar (`accent`, #7FCFC6 sobre o azul e #1B6E6C sobre o claro) em
  sobretítulos, índices numerados, mapa e no degradê do destaque; concreto
  frio (`surface-page` #F1F4F5) no corpo; azul-petróleo (`action` #0E4A6E)
  como cor de ação. Vermelho e azul só nos selos “Em leilão” e
  “Venda direta”. As 31 combinações de texto passam WCAG AA
  (`scripts/check-contrast.mjs`).
- **Tipografia**: Plus Jakarta Sans em extrabold com tracking negativo nos
  títulos; Roboto Mono reservada a códigos e números tabulares.
- **Fundo**: degradê de uma cor fixa (azul-aço `#22506F`) em todas as faixas. Nas
  aberturas internas e no rodapé, o Brasil em pontos verde-mar, cruzado por
  rotas entre os estados com lotes — “novos destinos”.
  Prompts para gerar versões fotográficas: [`docs/design/PROMPTS_IMAGENS.md`](./docs/design/PROMPTS_IMAGENS.md).
- **Estados**: a seção “Ativos em todo o Brasil” liga mapa e bandeiras ao
  catálogo filtrado por UF; passar o ponteiro numa bandeira acende o estado no
  mapa (só CSS, com `:has`). No catálogo, o filtro de estado usa as bandeiras,
  e o título mostra a bandeira da UF escolhida.
- **Movimento**: entrada escalonada da abertura, aproximação lenta da foto
  (Ken Burns), troca do lote em destaque a cada 8 s — pausada sob o ponteiro,
  com foco, com a aba oculta e sempre para quem pede movimento reduzido — e
  revelação por rolagem com um único IntersectionObserver. Sem JavaScript, o
  conteúdo aparece normalmente.
- Todos os tokens vivem em `tailwind.config.ts` e `app/globals.css`.

### Onde a referência não foi seguida ao pé da letra

Copiar o desenho, nesses pontos, significaria afirmar algo falso:

1. **Selo de empresa verificada** — não há verificação nesta demonstração; os
   cartões de empresa não levam o selo.
2. **Números de mercado** — nenhum número de tração é exibido. Contagens de
   lotes, lojas e ativos vêm do próprio catálogo.
3. **Seis categorias** — o catálogo tem quatro; a vitrine mostra as quatro.
4. **Foto do trabalhador na página de quem vende** e **fotos das sedes das
   empresas** — não existem no acervo; entram a peça institucional e as fotos
   dos próprios lotes.

## Créditos

- Contorno do Brasil: [@svg-maps/brazil](https://github.com/VictorCazanave/svg-maps),
  de Victor Cazanave, licença CC-BY-4.0 (simplificado para 1 casa decimal).
- Ícones: [Lucide](https://lucide.dev), licença ISC.
- Fontes: Plus Jakarta Sans e Roboto Mono, licença SIL OFL.

## Decisões de design

- **Filtros do catálogo são resolvidos no navegador** (`CatalogBrowser`), lendo
  `useSearchParams`. Isso mantém links como `/resultados/?categoria=maquinas`
  funcionando na exportação estática, onde `searchParams` não chega ao servidor.
- **Tokens de cor, tipografia, espaçamento, raio e sombra** centralizados em `tailwind.config.ts`, a partir de `FUNDACAO_ESTETICA.md`.
- **Painel de lance** segue a ordem obrigatória de informação definida em `TELAS_E_JORNADAS.md` §4 (status → valor → mínimo/incremento → contagem de lances → prazo → regra de prorrogação → campo de valor).
- **Modal de revisão de lance** segue o storyboard de `ANIMACOES_E_MICROINTERACOES.md` §4: revisão → confirmando → aceito/incerto, sem fechamento automático, sem duplo envio, com foco gerenciado.
- **Movimento**: sem confete, sem som, sem parallax; skeleton estático (sem shimmer); preferência por movimento reduzido respeitada globalmente em `app/globals.css`.
- **Imagem**: cada lote tem uma foto ilustrativa nomeada pelo slug; a galeria repete essa foto e avisa que é ilustrativa. Onde faltar arquivo, `ImageSlot` mantém a moldura reservada na proporção certa.

## Simplificações atuais

Documentadas em detalhe em `MVP_ESCOPO.md`, resumidamente:

- Sem autenticação: o painel de lance funciona como protótipo de interface aberto a qualquer visitante, com aviso explícito, em vez de implementar os estados de elegibilidade (visitante/sem empresa/pendente) do documento de telas.
- Favoritos persistem apenas no `localStorage` do navegador, não em conta de usuário.
- Os códigos de lote (`LT-****`) são fixos nos dados de demonstração; em produção
  viriam do cadastro do ativo.
- O pré-cadastro de vendedor valida os dados no navegador e mostra a
  conferência, mas não envia nada.
