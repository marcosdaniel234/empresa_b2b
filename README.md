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
- Fonte **Inter** via `next/font/google`
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

## Direção visual: catálogo industrial

A interface segue a lógica de um marketplace industrial B2B maduro: densidade de
catálogo, navegação por categorias e busca dominante, em vez de uma página de
campanha. Na prática:

- **Cabeçalho em dois níveis**: faixa utilitária (atendimento, idioma/moeda,
  favoritos e entrar) e barra principal fixa com o botão **Menu**, a marca, a
  busca e as ações de conta. Toda a navegação de seções e a taxonomia completa
  ficam dentro do Menu — o topo não repete o que a home e o rodapé já listam.
- **Sem divisórias verticais na navegação**: o item apontado recebe uma régua
  laranja que cresce da esquerda (`.nav-underline`), no lugar das linhas fixas
  que davam ao topo aparência de portal antigo.
- **Primeira dobra da home** é busca + catálogo: título direto, indicadores do
  catálogo e o explorador de categorias, que abre as subcategorias com
  contagem no lugar, sem trocar de página. Em seguida vêm as vitrines de
  lotes, empresas e depoimentos, separadas por faixas de publicidade.
- **Cards informativos**: lote, categoria, título, empresa, localização, prazo e
  valor ficam visíveis sem abrir o detalhe. O catálogo alterna entre grade e
  lista.
- **Paleta quente de leilão industrial**: neutros em areia e barro no lugar dos
  cinzas frios, grafite amadeirado nas faixas escuras e laranja de segurança
  (`action`) como cor de ação, borda de seção e indicação de clique.
- **Geometria compacta**: raios curtos (3–4 px), bordas discretas, sombras quase
  imperceptíveis e contêiner central de até 1440 px.
- **Movimento contido**: transições de 100–260 ms com uma única curva
  (`ease-standard`), elevação curta nos cards, régua de hover e painéis que
  descem com `animate-panel-down`. Tudo sob o bloco
  `prefers-reduced-motion: reduce` de `app/globals.css`.
- Todos os tokens vivem em `tailwind.config.ts` e `app/globals.css`; os
  componentes não usam cores soltas. `node scripts/check-contrast.mjs` valida
  as 23 combinações de texto em WCAG AA.

A identidade (verde-petróleo de ação, acento verde-limão, tipografia Inter)
continua sendo a do ATIVOS B2B, derivada de `FUNDACAO_ESTETICA.md`.

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
