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
```

O build usa `output: "export"`: o resultado é um site estático em `out/`, que pode
ser servido por qualquer hospedagem de arquivos.

## Publicação

O site é publicado no GitHub Pages a partir do branch `gh-pages`, que contém
apenas o resultado do build. O workflow
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) roda as
checagens, gera o export estático e atualiza esse branch a cada push.

**Passo único de configuração** (só o dono do repositório pode fazer): em
`Settings > Pages > Build and deployment`, escolher **Deploy from a branch**,
branch `gh-pages`, pasta `/ (root)`. Feito isso, o site fica disponível em
`https://<usuário>.github.io/empresa_b2b/` e passa a ser atualizado
automaticamente.

Como o Pages serve o projeto em um subdiretório, o build aceita a variável
`NEXT_PUBLIC_BASE_PATH` (o workflow preenche com o nome do repositório). Para
reproduzir a publicação localmente:

```bash
NEXT_PUBLIC_BASE_PATH=/empresa_b2b npm run build
```

O workflow também roda uma vez por dia. Isso é proposital: as datas dos leilões
de demonstração são calculadas a partir do momento do build, então a
reconstrução diária mantém os prazos do catálogo sempre válidos.

## Estrutura do projeto

```
app/                       Rotas (App Router)
  page.tsx                 Home / Explorar (T01)
  resultados/               Catálogo com filtros (T02)
  leilao/[slug]/            Página de leilão + painel de lance (T03/T04)
  loja/[slug]/               Loja da empresa (T05)
  favoritos/                 Favoritos (client-side, localStorage)
  como-funciona/              Explicação do fluxo e limites atuais
  entrar/ anunciar/           Placeholders honestos ("ainda não implementado")
  termos/ privacidade/ ajuda/  Páginas institucionais mínimas
  not-found.tsx               404 (T12)

components/
  layout/                   Header, busca, menu principal, rodapé, tab bar
  home/                     Explorador de categorias e depoimentos da home
  ads/                      Espaços reservados de publicidade (formatos IAB)
  catalog/                  Card de ativo (grade/lista), navegador do catálogo,
                            filtros, favoritos, vitrines e abas de loja
  auction/                  Galeria, painel de lance, modal de revisão, relógio
  ui/                       Botão, chip de status, estado vazio, ilustração de ativo

lib/
  data.ts                   Dados de demonstração (ativos e empresas fictícios)
  filters.ts                Lógica de filtro/ordenação do catálogo
  format.ts                 Formatação de moeda, data/hora e contagem regressiva
```

## Direção visual: marketplace de ativos empresariais

A interface segue a referência visual da marca: marinho profundo como base
institucional e laranja como única cor de ação.

- **Regra de cor**: o marinho (`brand`) carrega topo, abertura, faixas e
  rodapé; o laranja (`action`) fica reservado a botão, preço, régua de
  sobretítulo e aba corrente. O corpo do catálogo é claro, para que as fichas
  de lote respirem entre as faixas escuras. O laranja existe em dois tons por
  contraste: `action` é o sólido que aceita texto branco, `action-bright` é o
  vivo que só aparece como texto sobre o marinho — trocar um pelo outro
  quebra AA.
- **Cabeçalho em três faixas**: utilitária (institucional e conta), principal
  (marca, busca e atalhos) e a barra de categorias. Abaixo de `md` a busca
  ganha linha própria e a navegação recolhe no botão de menu.
- **Abertura em duas colunas**: à esquerda a promessa e as três garantias, à
  direita o lote que encerra primeiro com contagem regressiva ao vivo.
- **Cartão de lote**: foto, etiqueta de situação, favorito, código do lote,
  localização, pílulas de especificação e o valor em laranja ao lado do
  prazo. O mesmo cartão serve a abertura, a busca e as vitrines.
- **Blocos da abertura**: compra por estado, categorias em destaque, lotes em
  destaque com abas de ordenação reais, faixa de venda, números do catálogo e
  a assinatura de fechamento.
- **Geometria**: cantos de 8 px nos controles, 12 px nos cartões e 16 px nos
  painéis; sombras baixas; contêiner central de até 1440 px.
- **Movimento contido**: transições de 100–260 ms com uma única curva
  (`ease-standard`), elevação curta nos cartões e painéis que descem com
  `animate-panel-down`. Tudo sob o bloco `prefers-reduced-motion: reduce`.
- Todos os tokens vivem em `tailwind.config.ts` e `app/globals.css`; os
  componentes não usam cores soltas. `node scripts/check-contrast.mjs` valida
  as 29 combinações de texto em WCAG AA.

### Dois pontos em que a referência não foi seguida ao pé da letra

Nos dois casos copiar o desenho significaria afirmar algo falso:

1. **Selo "lote verificado"** — não há processo de verificação nesta
   demonstração. No lugar dele entra a situação real do lote (aberto,
   encerrando, agendado, encerrado).
2. **Números de tração** (compradores cadastrados, volume transacionado,
   percentual verificado) — nenhum existe. A faixa traz os quatro números que
   o próprio catálogo produz, cada um ligado ao recorte que ele conta.

Fotografia: o catálogo traz uma imagem por lote em `public/images/assets/`,
nomeada pelo slug, além das bandeiras das UFs, da peça institucional e das
criações de anúncio. Onde ainda não houver arquivo, `ImageSlot` mantém a
moldura reservada, hachurada, na proporção em que a foto entrará.

## Decisões de design

- **Filtros do catálogo são resolvidos no navegador** (`CatalogBrowser`), lendo
  `useSearchParams`. Isso mantém links como `/resultados/?categoria=maquinas`
  funcionando na exportação estática, onde `searchParams` não chega ao servidor.
- **Tokens de cor, tipografia, espaçamento, raio e sombra** centralizados em `tailwind.config.ts`, a partir de `FUNDACAO_ESTETICA.md`.
- **Painel de lance** segue a ordem obrigatória de informação definida em `TELAS_E_JORNADAS.md` §4 (status → valor → mínimo/incremento → contagem de lances → prazo → regra de prorrogação → campo de valor).
- **Modal de revisão de lance** segue o storyboard de `ANIMACOES_E_MICROINTERACOES.md` §4: revisão → confirmando → aceito/incerto, sem fechamento automático, sem duplo envio, com foco gerenciado.
- **Movimento**: sem confete, sem som, sem parallax; skeleton estático (sem shimmer); preferência por movimento reduzido respeitada globalmente em `app/globals.css`.
- **Imagem**: como a demonstração não possui fotos reais, os ativos recebem ilustrações editoriais por categoria, claramente identificadas. Isso evita confundir material de exemplo com um anúncio real.

## Simplificações atuais

Documentadas em detalhe em `MVP_ESCOPO.md`, resumidamente:

- Sem autenticação: o painel de lance funciona como protótipo de interface aberto a qualquer visitante, com aviso explícito, em vez de implementar os estados de elegibilidade (visitante/sem empresa/pendente) do documento de telas.
- Favoritos persistem apenas no `localStorage` do navegador, não em conta de usuário.
- Os códigos de lote (`LT-****`) são fixos nos dados de demonstração; em produção
  viriam do cadastro do ativo.
- O catálogo não tem paginação: os lotes de demonstração cabem em uma tela de
  resultados.
