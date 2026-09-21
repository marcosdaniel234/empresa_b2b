# Fundação estética — marketplace B2B de ativos

Versão 1.0 · 21/09/2026 · Proposta de design para revisão

## Entrega e leitura

Este conjunto define a aparência e o comportamento visual do produto antes da programação. “ATIVOS B2B” é somente um identificador descritivo temporário; nome, marca e logotipo finais continuam abertos. Nenhuma decisão estética altera regras comerciais do PROJECT_MASTER.

1. [Modelo visual: catálogo, leilão e mobile](MODELO_VISUAL_B2B.png).
2. Este documento: direção de arte, identidade, tokens, componentes e acessibilidade.
3. [Telas e jornadas](TELAS_E_JORNADAS.md): arquitetura de informação e composição de todas as áreas.
4. [Animações e microinterações](ANIMACOES_E_MICROINTERACOES.md): gatilhos, tempos, curvas, estados, storyboard e movimento reduzido.
5. [Handoff e validação](HANDOFF_DESIGN.md): organização futura no Figma, checklist, divergências conhecidas da imagem e ordem de aplicação.

Os documentos são a especificação; a imagem é uma referência de atmosfera e composição. Não há protótipo funcional nem animação reproduzível nesta entrega: os movimentos estão especificados e descritos quadro a quadro. Não foram criados HTML, CSS, JavaScript ou componentes de aplicação.

## 1. Conceito: clareza industrial

Uma vitrine de ativos corporativos com a facilidade de descoberta de um marketplace de classificados. A personalidade combina pragmatismo, boa fotografia, informação organizada e comunicação humana. O comprador deve conseguir responder rapidamente: “O que é?”, “Quem vende?”, “Quanto está?”, “Quando termina?” e “O que preciso fazer para participar?”.

A plataforma deve parecer confiável pelo que informa e pelo que permite conferir. Não usar brasões, cadeados decorativos, rankings fictícios, avaliações inventadas ou selos que não correspondam a uma verificação real.

Cinco princípios:

- **O ativo vem primeiro:** foto útil e dados técnicos têm mais espaço que publicidade.
- **A ação tem hierarquia:** uma ação principal por região funcional.
- **O valor é inequívoco:** lance atual, mínimo e valor a confirmar sempre possuem rótulos.
- **A empresa está presente:** organização ativa e vendedor são identificados onde importam.
- **O movimento explica:** transições orientam navegação e mudanças de estado sem criar pressão para licitar.

## 2. Referência OLX e identidade própria

Da referência OLX aproveitamos busca central, filtros, cards, localização, favoritos, facilidade para anunciar e perfil do vendedor. A direção visual proposta usa verde-petróleo, superfícies claras e informação empresarial bem organizada. Não pretende reproduzir a identidade da OLX.

Marketplace e painel compartilham tipografia, cores, linguagem e componentes. O marketplace privilegia fotos e descoberta; o painel privilegia tabelas, tarefas e estados. A estética permanece reconhecível em ambos.

## 3. Paleta e tokens semânticos

| Token | Valor | Uso |
|---|---|---|
| brand.900 | #123C36 | cabeçalho, identidade e faixas institucionais |
| action.default | #17624B | ação principal e links |
| action.hover | #124C3B | hover da ação principal |
| action.pressed | #0D382D | estado pressionado |
| accent.soft | #D9ED92 | acento editorial; fundo com texto escuro |
| surface.page | #F6F7F4 | fundo geral |
| surface.card | #FFFFFF | cards, formulários, painéis |
| surface.subtle | #EDF2EE | grupos de informação e regiões secundárias |
| text.primary | #182822 | títulos, valores, texto principal |
| text.secondary | #52635A | metadados e ajuda |
| text.inverse | #FFFFFF | texto sobre superfícies escuras |
| border.subtle | #D7DFD9 | separadores decorativos e contorno de cards |
| border.control | #73877B | contorno de campos sem preenchimento suficiente |
| focus.ring | #225CBE | foco de teclado; separado da cor de sucesso |
| success.text | #166044 | “Lance confirmado” e conclusão |
| success.surface | #E8F3EC | fundo de confirmação |
| warning.text | #815000 | atenção e pendências |
| warning.surface | #FFF3D7 | fundo de aviso |
| danger.text | #A62C2C | erro e ação destrutiva |
| danger.surface | #FCEBEC | fundo de erro |
| info.text | #2457A6 | informação e sincronização |
| info.surface | #EDF3FD | fundo informativo |

Regras: branco sobre action.default; text.primary sobre accent.soft; texto de status sobre seu respectivo fundo. Não usar verde-claro como texto em branco. A borda sutil serve à organização visual, não pode ser a única indicação de um controle. Status inclui texto e, quando útil, ícone.

Proporção indicativa: 75% superfícies claras, 15% texto/estrutura, 8% verde e 2% acento. Isso orienta equilíbrio, não é uma métrica a implementar. Sem gradientes como linguagem recorrente, fundos de vídeo ou texturas atrás de conteúdo operacional.

Modo claro é a referência do MVP. Modo escuro exige nova matriz de contraste e não será gerado por inversão automática de cores.

## 4. Tipografia

Família proposta: **Inter**, com fallback sans-serif do sistema. Usar pesos 400, 500, 600 e 700. A fonte oferece recursos úteis para interfaces e números; documentação e licença devem acompanhar sua distribuição: [Inter, fonte oficial](https://rsms.me/inter/).

| Estilo | Desktop tamanho/entrelinha | Mobile tamanho/entrelinha | Peso |
|---|---|---|---|
| Display editorial | 40/48 px | 28/36 px | 700 |
| Título de página | 32/40 px | 26/34 px | 700 |
| Título de seção | 24/32 px | 22/30 px | 600 |
| Título de card | 18/26 px | 18/26 px | 600 |
| Valor principal | 32/40 px | 30/38 px | 700 |
| Corpo | 16/24 px | 16/24 px | 400 |
| Rótulo de controle | 14/20 px | 14/20 px | 500 |
| Metadado | 14/20 px | 14/20 px | 400 |
| Legenda não crítica | 12/18 px | 12/18 px | 400 |

Valores, tabelas e relógios usam algarismos tabulares. Não animar a contagem numérica de dinheiro. Nunca reduzir texto financeiro ou termos relevantes para 12 px. Títulos longos do detalhe quebram linha integralmente; no catálogo, até duas linhas, com título completo disponível no destino. Caixa alta fica limitada a siglas e rótulos curtos.

Formatação: português brasileiro, BRL “R$ 28.500,00” em revisão/recibo; cards podem omitir centavos somente quando forem zero. Datas completas em contexto de confirmação: “21 set. 2026, 16h00 — horário de Brasília”. Demais fusos devem ter rótulo explícito.

## 5. Grid, espaçamento e geometria

Unidade base: 4 px. Escala: 4, 8, 12, 16, 24, 32, 48, 64 e 96 px. Preferir intervalos de 24–32 px entre blocos e 8–12 px entre rótulo e conteúdo relacionado.

| Largura de referência | Grid | Margens | Comportamento |
|---|---|---|---|
| 320–599 px | 4 colunas, gutter 16 | 16 px | lista de cards, filtros em folha/modal |
| 600–899 px | 8 colunas, gutter 20 | 24 px | 2 cards, filtros recolhidos |
| 900–1199 px | 12 colunas, gutter 24 | 32 px | sidebar e 2 cards; detalhe bid abaixo se necessário |
| ≥1200 px | 12 colunas, gutter 24 | mínimo 32 px | sidebar + 3 cards; detalhe galeria + bid lateral |

Conteúdo máximo: 1280 px centralizado. Em 1440 px, margens resultantes de 80 px. Sidebar de filtro 240 px; painel de lance 360–400 px; área principal flexível. Em telas largas, ampliar respiro em vez de esticar cards indefinidamente.

Raios: 8 px campos/botões, 12 px cards, 16 px modal/folha, 999 px somente pílulas/avatar. Bordas de 1 px. Sombra de nível 1: deslocamento vertical 2 px, desfoque 8 px, preto esverdeado a 6%; nível 2: 8/24 px a 12%; modal: 16/48 px a 18%. Não usar sombra forte como substituto de hierarquia.

## 6. Fotografias, ícones e identidade

Fotografia documental: luz neutra, bem visível, contexto de conservação e avarias. Capa de card 4:3; galeria reserva área estável e mostra a imagem integral quando cortá-la omitir informação. Aceitar fotos menos bonitas desde que sejam úteis; qualidade não pode esconder defeitos.

Checklist do anúncio: vista geral, laterais, identificação técnica quando apropriada, detalhes de desgaste, acessórios e escala. Remover dados pessoais e localização sensível quando necessário. Não retocar avaria nem substituir a foto real por imagem de IA.

Fotos da prancha são sintéticas e ilustrativas, não demonstram propriedade ou condição de ativos reais. Não reutilizá-las como anúncios de produção.

Ícones: uma única família de linha, caixa 24 px, traço próximo de 1,75–2 px, cantos consistentes. A fonte de ícones será escolhida na implementação com licença documentada. Exemplos: busca, filtros, coração, relógio, localização, empresa, documento, aviso e check. Controles icon-only têm rótulo acessível e alvo de 44×44 px.

Identificador temporário “ATIVOS B2B” usa composição tipográfica simples. Não foi entregue marca registrada, símbolo exclusivo ou estudo de naming. Lojas podem exibir logo/capa da empresa, mas não recolorem botões de lance ou componentes de segurança.

## 7. Componentes base e estados

### Botões

Altura padrão 48 px; compacto 40 px somente em desktop com alvo adequado; mobile 48 px. Padding horizontal 20 px; ícone de 20 px, intervalo 8 px. Primário preenchido verde, secundário branco com contorno, terciário link, destrutivo vermelho com verbo específico.

Estados: repouso, hover, foco, pressionado, ocupado e indisponível. Ocupado preserva largura e rótulo contextual, por exemplo “Confirmando…”. Indisponível tem explicação adjacente; não depender de tooltip em mobile. Foco: anel de 2 px com afastamento de 2 px; azul sobre superfícies claras e branco sobre o cabeçalho escuro.

### Campos

Rótulo persistente acima, campo 48 px, ajuda abaixo. Placeholder é exemplo e não rótulo. Obrigatoriedade indicada antes de preencher. Erro combina borda, ícone e mensagem específica. Formulário enviado com erro mostra resumo e foco no primeiro campo afetado, preservando os dados.

Valor monetário com moeda fixa visível; entrada não deve perder cursor na formatação. Arquivos apresentam nome, tamanho, progresso real, remover e status de verificação. Não chamar arquivo de “seguro” só porque terminou o upload.

### Card de ativo/leilão

Ordem: imagem → status → título → atributo útil → empresa → cidade/UF → lance atual/inicial → prazo → ação. Foto não deve conter números financeiros sobrepostos. Favorito no canto com fundo sólido e alvo próprio.

“Lance inicial” quando nenhum lance foi aceito; “Lance atual” depois do primeiro. “Próximo lance mínimo” pertence principalmente ao detalhe. Toda apresentação deve usar dados atuais e não inferir preço final. Atributos e localização quebram linha antes de comprimir valor ou prazo.

Card não é um único botão que engloba outros botões. Título/foto navegam; favorito funciona independentemente. Hover adiciona contorno sutil, sem inclinação 3D.

### Chips e status

Rascunho/cancelado/encerrado: neutro. Agendado: informativo. Aberto: verde com rótulo “Aberto”. Encerrando em breve: âmbar somente no limiar definido para apresentação. Vencedor confirmado: verde; superado: âmbar com texto. Erro: vermelho. “Encerrando” é condição visual, não novo estado de negócio.

### Tabs, filtros e paginação

Tab ativa com sublinhado e peso, além de cor. Filtros selecionados viram chips removíveis. Quantidade de resultados anunciada após aplicar. Desktop usa aplicação explícita para grupos complexos; busca por texto admite Enter. Mobile mantém alterações em rascunho até “Aplicar filtros”; fechar preserva os filtros aplicados anteriormente.

### Modais e folhas

Modal central máximo 520 px para confirmação; padding 24 px. Mobile usa diálogo de tela inteira ou folha com altura suficiente e rolagem interna segura. Título, conteúdo e ações seguem ordem de leitura. Apenas uma camada modal por vez; foco permanece nela e retorna ao acionador ao fechar. Escape cancela antes do envio. Depois do envio, fechar não cancela um lance já submetido.

### Tabelas e timeline

Cabeçalho 44 px, linhas de 56 px e números à direita. Ordenação com nome/estado acessível. Mobile transforma registro em card rotulado quando isso preserva comparação; tabelas realmente comparativas podem rolar horizontalmente em região identificada. A timeline de auditoria mostra ação, ator, organização e horário com detalhes sob demanda.

### Alertas, toasts e vazio

Toast é complemento, não única confirmação de um lance. Notificações transitórias duram aproximadamente 5 s com pausa em hover/foco; erro importante permanece no contexto. Estados vazios têm motivo, orientação e uma ação: “Nenhum ativo corresponde aos filtros. Limpe alguns filtros para ampliar a busca.” Sem bonecos comemorativos em erro financeiro.

Skeleton estático reserva geometria de fotos, títulos e cards. Falha de imagem mantém proporção e texto “Imagem indisponível”, sem apagar o anúncio. Layout não salta ao receber conteúdo.

## 8. Acessibilidade como parte da aparência

Meta de implementação: WCAG 2.2 AA. Texto comum exige contraste mínimo 4,5:1; texto grande 3:1; informação não depende somente de cor. Esses critérios são verificáveis na implementação, não certificados por uma prancha: [W3C — contraste](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

O sistema adota alvos de 44×44 px como padrão próprio, acima do mínimo de 24×24 px sujeito às condições/exceções da WCAG 2.2: [W3C — tamanho mínimo de alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

Navegação inteira por teclado; foco visível; ordem de títulos coerente; rótulos dos controles; mensagens de erro vinculadas; zoom e reflow; texto alternativo útil. Contadores de segundos não são anunciados continuamente por leitor de tela. Atualizações importantes são agrupadas sem interromper a digitação.

Mover conteúdo não é obrigatório para compreender estado. Com preferência por movimento reduzido, folhas, modais e cards surgem sem deslocamento/escala; mensagens e indicadores de estado permanecem. Não utilizar autoplay, flash, brilho intermitente, parallax ou loops de urgência.

## 9. Linguagem e microcopy

Tom direto, cordial e específico. Preferir “empresa”, “equipe”, “ativo”, “leilão”, “lance”, “retirada” e “fechamento”. Evitar expor termos como tenant, outbox e request ID, salvo referência de atendimento opcional.

| Contexto | Texto proposto |
|---|---|
| Busca | O que sua empresa procura? |
| Catálogo | Ativos que movem novos negócios. |
| Publicação | Anunciar ativo |
| Primeiro passo do lance | Revisar lance |
| Confirmação | Confirmar lance de R$ 28.500,00 |
| Representação | Você está dando este lance em nome de Empresa Exemplo. |
| Sucesso confirmado | Lance de R$ 28.500,00 confirmado. |
| Não líder após confirmação | Seu lance foi confirmado, mas já foi superado. |
| Mínimo alterado | O lance mínimo mudou. Revise o novo valor antes de confirmar. |
| Resposta incerta | Estamos verificando se seu lance foi registrado. |
| Reconexão | Reconectando. Os valores exibidos podem estar desatualizados. |
| Fim local aguardando servidor | Prazo atingido. Confirmando o encerramento. |
| Sem autorização | Seu perfil não permite dar lances por esta empresa. |
| Publicação com aprovação | Enviar para aprovação |

Condições de venda, retirada, taxas e documentação devem refletir o leilão concreto. “Retirada por conta do comprador” na imagem é exemplo, não regra global. Não prometer garantia, pagamento protegido ou inspeção quando a plataforma não oferece esses serviços.

## 10. Limites desta versão

Direção visual, tokens e especificações estão propostos. Ainda não houve teste de usabilidade com compradores ou vendedores, inspeção de interface implementada, auditoria de teclado, ensaio de motion em navegador nem validação de marca. O próximo trabalho de design é transformar estas especificações em frames editáveis e testar as jornadas, caso solicitado.

