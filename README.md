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
npm run dev       # ambiente de desenvolvimento em http://localhost:3000
npm run build     # build de produção
npm run start     # serve o build de produção
npx eslint .       # lint
```

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
  layout/                   Header, busca, navegação mobile, rodapé
  catalog/                  Card de ativo, filtros, favoritos, abas de loja
  auction/                  Galeria, painel de lance, modal de revisão, relógio
  ui/                       Botão, chip de status, estado vazio, placeholder visual

lib/
  data.ts                   Dados de demonstração (ativos e empresas fictícios)
  filters.ts                Lógica de filtro/ordenação do catálogo
  format.ts                 Formatação de moeda, data/hora e contagem regressiva
```

## Decisões de design

- **Tokens de cor, tipografia, espaçamento, raio e sombra** replicados exatamente como especificado em `FUNDACAO_ESTETICA.md` (`tailwind.config.ts`).
- **Painel de lance** segue a ordem obrigatória de informação definida em `TELAS_E_JORNADAS.md` §4 (status → valor → mínimo/incremento → contagem de lances → prazo → regra de prorrogação → campo de valor).
- **Modal de revisão de lance** segue o storyboard de `ANIMACOES_E_MICROINTERACOES.md` §4: revisão → confirmando → aceito/incerto, sem fechamento automático, sem duplo envio, com foco gerenciado.
- **Movimento**: sem confete, sem som, sem parallax; skeleton estático (sem shimmer); preferência por movimento reduzido respeitada globalmente em `app/globals.css`.
- **Imagem**: como a demonstração não possui fotos reais, os ativos recebem ilustrações editoriais por categoria, claramente identificadas. Isso evita confundir material de exemplo com um anúncio real.

## Simplificações atuais

Documentadas em detalhe em `MVP_ESCOPO.md`, resumidamente:

- Sem autenticação: o painel de lance funciona como protótipo de interface aberto a qualquer visitante, com aviso explícito, em vez de implementar os estados de elegibilidade (visitante/sem empresa/pendente) do documento de telas.
- Favoritos persistem apenas no `localStorage` do navegador, não em conta de usuário.
- Contagem de categorias nos filtros é estática (não recalculada por combinação de filtros já aplicados).
- Barra fixa de lance no mobile é sempre visível na página de leilão, em vez de aparecer apenas quando o resumo sai da viewport (simplificação da regra de `TELAS_E_JORNADAS.md` §4).
