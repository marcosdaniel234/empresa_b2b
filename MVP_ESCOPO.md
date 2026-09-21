# Escopo do MVP — o que foi construído, o que não foi, e os próximos passos

Este documento existe para que nenhuma decisão de escopo fique implícita. Ele complementa os quatro documentos de design originais (`FUNDACAO_ESTETICA.md`, `TELAS_E_JORNADAS.md`, `ANIMACOES_E_MICROINTERACOES.md`, `HANDOFF_DESIGN.md`), que definiram a direção visual e comportamental completa do produto — inclusive de partes que este MVP ainda não constrói.

## 1. O que foi construído

Um protótipo de front-end navegável, com dados fictícios, cobrindo a jornada pública de descoberta e a interação de maior complexidade especificada (revisão e confirmação de lance):

| Tela | Status | Observação |
|---|---|---|
| T01 — Home / Explorar | Construída | Hero, busca, categorias, seções "Encerrando em breve" / "Novos leilões" / "Empresas" |
| T02 — Resultados e filtros | Construída | Filtros desktop e folha mobile, chips aplicados, ordenação, estado vazio |
| T03 — Página de leilão | Construída | Galeria com lightbox, ficha técnica, condição, documentos, retirada, painel de lance |
| T04 — Revisão e confirmação de lance | Construída como protótipo interativo | Ver limitações na seção 2 — não há servidor validando o valor |
| T05 — Loja da empresa | Construída (versão simplificada) | Capa, dados institucionais, abas de leilões |
| T12 — 404 e estados vazios | Construídos parcialmente | 404 geral; estados vazios do catálogo e de favoritos |
| Favoritos | Construído como recurso client-side | `localStorage`, sem conta associada |
| Como funciona | Construída | Página institucional explicando o fluxo e os limites do MVP |

Todos os componentes seguem os tokens visuais, a tipografia, o espaçamento, os raios e as sombras definidos em `FUNDACAO_ESTETICA.md`, com contraste calculado a partir das mesmas cores semânticas validadas naquele documento. As microinterações implementadas (hover, foco, modal, skeleton² não aplicável pois dados são estáticos, contagem regressiva, favoritar) seguem os tempos e curvas de `ANIMACOES_E_MICROINTERACOES.md` e respeitam `prefers-reduced-motion`.

## 2. O que não foi construído

### 2.1 Autenticação e contas de empresa (T06, T09)
Não existe cadastro, login, sessão, papéis de equipe nem vínculo de usuário a uma organização. As páginas `/entrar` e `/anunciar` são *placeholders* explícitos informando isso ao visitante, em vez de simular um login que não existe.

**Impacto direto:** o painel de lance do MVP não implementa os estados de elegibilidade da tabela de `TELAS_E_JORNADAS.md` §4 (Visitante / Sem empresa / Membro sem permissão / Habilitação pendente / Termos não aceitos). Em vez disso, ele expõe diretamente o formulário de lance a qualquer visitante, com um aviso permanente de que se trata de um protótipo de demonstração. Essa é uma simplificação deliberada para poder demonstrar a interação mais elaborada do design (revisão → confirmação → recibo) sem construir autenticação — mas não é o comportamento final desejado.

### 2.2 Backend, banco de dados e lances reais
Não há servidor de aplicação, banco de dados, WebSocket/streaming de eventos de leilão, nem qualquer chamada de rede além de assets estáticos. Todos os ativos e empresas vêm de `lib/data.ts`, hardcoded.

O botão "Confirmar lance" simula uma resposta de sucesso após ~900 ms com `setTimeout` — não envia nada a lugar nenhum. Os estados de "mínimo desatualizado" (D2) e "resposta incerta" (D3) descritos em `ANIMACOES_E_MICROINTERACOES.md` §4 têm a interface do modal pronta (`BidReviewModal.tsx`, fase `"uncertain"`), mas não são acionados neste MVP porque não há um servidor real cuja resposta poderia ser incerta ou desatualizada — isso exigiria simular condições de corrida que não fariam sentido sem uma API de verdade.

### 2.3 Publicação de ativos (T07)
O assistente completo de cadastro (dados → fotos/documentos → informações técnicas → condições do leilão → revisão → publicação/aprovação) não foi construído. `/anunciar` é um placeholder.

### 2.4 Painel da empresa (T08), fechamento pós-leilão (T10) e administração da plataforma (T11)
Nenhuma dessas três áreas foi construída. Não há dashboard de tarefas/métricas da empresa, não há timeline de fechamento (documentação, pagamento externo, retirada), e não há painel de administração da plataforma (moderação, auditoria, ações críticas).

### 2.5 Notificações
Não há sistema de notificações agrupadas por data/tipo (parte de T12). O único mecanismo assíncrono do MVP é o recibo de lance dentro do próprio modal.

### 2.6 Identidade de marca
"ATIVOS B2B" continua sendo um identificador temporário de texto, exatamente como nos documentos de design originais. Não foi criado logotipo, símbolo, ou estudo de naming.

### 2.7 Fotografia real
Como não existem ativos reais, o MVP usa composições ilustrativas por categoria (ícone + padrão geométrico) no lugar de fotografias. Isso é intencional — ver `HANDOFF_DESIGN.md` §3, que já alertava contra reaproveitar imagens sintéticas como se fossem anúncios reais.

### 2.8 Validação com usuários e auditoria formal
Nenhuma das duas rodadas previstas em `HANDOFF_DESIGN.md` §6 (verificação de contraste na interface real, sessões de usabilidade com compradores/vendedores) foi executada. Os cálculos de contraste daquele documento partiram dos tokens de cor; este MVP os aplica fielmente, mas não repete a auditoria em HTML renderizado, leitor de tela ou zoom 200% de forma sistemática.

## 3. Simplificações assumidas (e por quê)

Estas não são lacunas de escopo, mas decisões conscientes para manter o MVP coerente sem inventar comportamento de produto:

- **Favoritos em `localStorage`**, não em conta — permite demonstrar a interação sem autenticação real.
- **Contagem de categoria nos filtros é estática** (contagem total por categoria, não recalculada considerando os demais filtros já aplicados) — uma implementação com backend real calcularia isso a cada consulta.
- **Barra fixa de lance no mobile é sempre visível** na página de leilão, em vez de aparecer somente quando o resumo financeiro sai da viewport (regra exata de `TELAS_E_JORNADAS.md` §4) — a versão final deve usar um `IntersectionObserver` sobre o resumo desktop-equivalente.
- **Estados de leilão sintéticos**: os 12 ativos de demonstração cobrem intencionalmente todos os status (agendado, aberto, encerrando, encerrado com/sem vencedor, cancelado) para que cada estado da interface seja visualmente verificável.
- **Organização representada**: o modal de revisão de lance não exibe "Você está dando este lance em nome de [Empresa]" porque não há sessão de usuário; em vez disso, mostra um aviso de que essa informação virá com a autenticação.

## 4. Roteiro sugerido de próximos passos

Ordem recomendada, cada fase dependendo da anterior:

1. **Fundação de dados e autenticação.** Modelar empresa, membro, papel, ativo e leilão num backend real; implementar cadastro, login e sessão. Sem isso, nenhuma das fases seguintes pode sair do estado de protótipo.
2. **Motor de leilão real.** Persistência de lances, validação de valor mínimo no servidor, WebSocket/streaming para atualização ao vivo, regra de prorrogação (anti-sniping) executada no servidor — hoje só descrita visualmente. É o momento de finalmente acionar os estados D2 ("mínimo mudou") e D3 ("resposta incerta") do modal de revisão com condições reais.
3. **Estados de elegibilidade do painel de lance** (T03 §"Estados da ação do leilão"): visitante, sem empresa, membro sem permissão, habilitação pendente, termos não aceitos — hoje simplificados para um único estado aberto de demonstração.
4. **Publicação de ativos (T07).** Assistente de cadastro completo, upload de fotos/documentos reais, fluxo de aprovação.
5. **Painel da empresa (T08) e membros/permissões (T09).** Dashboard de tarefas, métricas reais, gestão de equipe.
6. **Fechamento pós-leilão (T10).** Timeline de documentação, pagamento externo e retirada.
7. **Administração da plataforma (T11).** Moderação, auditoria, ações críticas com trilha de revisão.
8. **Notificações (T12).** Sistema agrupado por data/tipo, com preferências de aviso.
9. **Identidade de marca.** Naming, logotipo, sistema de marca aplicado sobre a fundação estética já validada neste MVP.
10. **Validação formal.** Auditoria de acessibilidade na interface real implementada (teclado, leitor de tela, zoom 200%) e sessões de usabilidade com compradores e vendedores reais, conforme roteiro de `HANDOFF_DESIGN.md` §6.

Cada fase deve manter os tokens, componentes e padrões de interação já estabelecidos neste MVP — a base visual não precisa ser refeita, apenas alimentada por dados e regras reais.

