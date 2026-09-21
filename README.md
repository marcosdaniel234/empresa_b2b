# ATIVOS B2B — MVP

Marketplace de leilão de ativos corporativos entre empresas (máquinas, veículos, tecnologia e mobiliário). Este repositório contém o **MVP de front-end** do produto: um protótipo navegável, com dados de demonstração, que implementa a fundação estética e as telas centrais da jornada de descoberta e lance descritas nos documentos de design do projeto.

> **"ATIVOS B2B" é um identificador temporário de projeto.** Nome, marca e logotipo definitivos ainda não foram definidos (ver [`docs/design/FUNDACAO_ESTETICA.md`](./docs/design/FUNDACAO_ESTETICA.md)).

Os quatro documentos originais de design que fundamentam este MVP estão preservados em [`docs/design/`](./docs/design/): `FUNDACAO_ESTETICA.md` (tokens e identidade), `TELAS_E_JORNADAS.md` (arquitetura de telas), `ANIMACOES_E_MICROINTERACOES.md` (movimento) e `HANDOFF_DESIGN.md` (validação e organização futura). Este README e o `MVP_ESCOPO.md` referenciam esses arquivos diretamente.

## O que este MVP é — e o que não é

Este é um **protótipo de interface (frontend-only)**, sem backend, sem autenticação e sem persistência real de dados. Ele existe para:

- validar a direção visual (tokens, tipografia, componentes) em telas reais e responsivas;
- demonstrar a jornada principal de comprador: buscar → analisar → revisar → confirmar um lance;
- servir de base de código para a implementação incremental do produto completo.

Todos os ativos, empresas e valores exibidos são **fictícios**, gerados em `lib/data.ts` apenas para preencher a interface. Nenhum lance dado no protótipo é registrado em lugar nenhum — veja o aviso permanente no modal de revisão de lance.

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
  como-funciona/              Explicação do fluxo + limites do MVP
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

## Decisões de design herdadas dos documentos originais

- **Tokens de cor, tipografia, espaçamento, raio e sombra** replicados exatamente como especificado em `FUNDACAO_ESTETICA.md` (`tailwind.config.ts`).
- **Painel de lance** segue a ordem obrigatória de informação definida em `TELAS_E_JORNADAS.md` §4 (status → valor → mínimo/incremento → contagem de lances → prazo → regra de prorrogação → campo de valor).
- **Modal de revisão de lance** segue o storyboard de `ANIMACOES_E_MICROINTERACOES.md` §4: revisão → confirmando → aceito/incerto, sem fechamento automático, sem duplo envio, com foco gerenciado.
- **Movimento**: sem confete, sem som, sem parallax; skeleton estático (sem shimmer); preferência por movimento reduzido respeitada globalmente em `app/globals.css`.
- **Fotografia**: como o MVP não possui fotos reais de ativos, cada ativo recebe uma composição ilustrativa por categoria (ícone + padrão de pontos), em vez de imagens fotorrealistas geradas por IA — evita que uma demonstração seja confundida com um anúncio real (ver `HANDOFF_DESIGN.md` §3).

## Simplificações assumidas neste MVP

Documentadas em detalhe em `MVP_ESCOPO.md`, resumidamente:

- Sem autenticação: o painel de lance funciona como protótipo de interface aberto a qualquer visitante, com aviso explícito, em vez de implementar os estados de elegibilidade (visitante/sem empresa/pendente) do documento de telas.
- Favoritos persistem apenas no `localStorage` do navegador, não em conta de usuário.
- Contagem de categorias nos filtros é estática (não recalculada por combinação de filtros já aplicados).
- Barra fixa de lance no mobile é sempre visível na página de leilão, em vez de aparecer apenas quando o resumo sai da viewport (simplificação da regra de `TELAS_E_JORNADAS.md` §4).
