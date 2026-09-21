# Animações e microinterações

Versão 1.0 · Especificação de comportamento; sem código ou animação executável

## 1. Intenção do movimento

Movimento deve mostrar origem/destino, confirmar interação ou explicar mudança. O valor financeiro e o estado do leilão são atualizados imediatamente conforme a resposta recebida; uma animação nunca posterga, suaviza numericamente ou altera essa informação.

Não usar confetes, martelo animado, roleta, som automático, relógio piscante, bounce repetido, parallax ou revelação que esconda cards até o scroll. Resultados e confirmação precisam ser legíveis também sem animação.

## 2. Tokens de movimento

| Token | Duração | Aplicação |
|---|---:|---|
| instant | 0 ms | dinheiro, deadline, mudança sem movimento |
| micro | 100 ms | pressão de botão e pequeno feedback |
| quick | 160 ms | hover, cor, borda e favorito |
| standard | 220 ms | entrada de modal/dropdown e estado contextual |
| panel | 280 ms | folha/drawer e mudança espacial maior |
| emphasis | 600 ms | fade único do fundo de valor atualizado |

Curvas, em notação para handoff (não código): standard `cubic-bezier(0.2, 0, 0, 1)`; saída `cubic-bezier(0.4, 0, 1, 1)`; mudanças de cor `linear`. Não usar mola no fluxo de lance. Deslocamento pequeno: 4–8 px; drawer mobile: até 24 px com fade, sem atravessar toda a tela. Escala máxima decorativa: 1,04, somente no coração de favorito.

## 3. Catálogo de interações

| ID / elemento | Gatilho e sequência visual | Tempo/curva | Interrupção e movimento reduzido |
|---|---|---|---|
| M01 Botão | hover escurece preenchimento; pressionar altera tonalidade | 100–160 ms, linear | reverte do estado atual; sem deslocamento em qualquer modo |
| M02 Card | hover realça borda e sombra suave; conteúdo não move | 160 ms, standard | foco aplica contorno imediato; reduzido sem transição |
| M03 Favorito | coração preenche; escala 1→1,04→1 opcional | 160 ms total | repetir reverte; reduzido só preenchimento; falha restaura estado e informa |
| M04 Dropdown | menu aparece com opacidade e deslocamento 4 px | entrada 160 ms/standard, saída 100 ms | Escape fecha; reduzido instantâneo |
| M05 Filtros mobile | backdrop e painel aparecem; foco vai ao título | entrada 280 ms, saída 160 ms | reabrir parte do estado atual; reduzido sem translação |
| M06 Aplicar filtros | mantém estrutura; resultados novos substituem anteriores | fade máximo 160 ms | última busca vence; reduzido substitui imediatamente |
| M07 Galeria | usuário aciona miniatura/próxima; imagem troca sem zoom | 160 ms, linear | clique seguinte não fica em fila; reduzido instantâneo |
| M08 Lightbox | superfície e backdrop aparecem, foco no diálogo | 220 ms, standard | fecha/restaura foco; reduzido instantâneo |
| M09 Modal de lance | backdrop + opacidade, deslocamento vertical 8 px | entrada 220 ms, saída 160 ms | só uma instância; reduzido sem deslocamento/fade |
| M10 Envio de lance | botão mantém tamanho, rótulo “Confirmando…” | imediato; indicador até resposta | animação não representa prazo; reduzido indicador estático com texto |
| M11 Lance confirmado | recibo surge; ícone check estático; região anunciada | fundo aparece em 160 ms | nova atualização não apaga recibo; reduzido imediato |
| M12 Lance atual recebido | número muda imediatamente; fundo verde-claro desaparece uma vez | fade de 600 ms, linear | coalescer eventos; não reiniciar flashes contínuos; reduzido sem fade |
| M13 Lance superado | mensagem âmbar e texto de situação atual | 160 ms | persistente no painel; reduzido imediato |
| M14 Prorrogação | horário muda imediatamente; aviso “Encerramento prorrogado” | aviso 160 ms | nunca animar relógio para trás; reduzido imediato |
| M15 Relógio | dígitos tabulares substituídos, sem rolagem de números | 0 ms | não anunciar cada segundo; sem diferença no reduzido |
| M16 Reconexão | faixa informativa discreta, texto estável | 160 ms | permanece até atualização confirmada; sem pulso |
| M17 Encerramento | controles cedem lugar a estado/resultado confirmado | fade até 220 ms; dados imediatos | sem celebração; reduzido instantâneo |
| M18 Toast | entrada 4 px/fade e saída fade | 160/100 ms | fila limitada, duplicatas agrupadas; reduzido imediato |
| M19 Accordion | conteúdo expande com altura natural; seta gira até 90° | 220 ms | reversível; reduzido instantâneo |
| M20 Upload | progresso por bytes/status real, sem progresso fictício | atualização direta | permitir cancelar quando suportado; mesmo comportamento reduzido |
| M21 Skeleton | blocos estáticos nas dimensões finais | sem loop | some ao carregar; nenhum shimmer |
| M22 Troca de empresa | confirmar saída de edição pendente; atualizar contexto e conteúdo | fade até 160 ms após contexto resolvido | limpar painéis financeiros antigos; reduzido imediato |

Valores propostos são parâmetros para prototipação; poderão ser refinados em teste de usabilidade sem mudar semântica e segurança da ação.

## 4. Storyboard — confirmação de lance

### Quadro A · repouso

Detalhe mostra lance atual R$ 28.000,00; mínimo R$ 28.500,00; empresa representada e campo proposto. “Revisar lance” abre a revisão. O valor editável não se confunde com o valor confirmado.

### Quadro B · 0–220 ms após abrir revisão

Backdrop escurece; diálogo aparece 8 px abaixo e chega à posição final. Foco no título “Revise seu lance”. Conteúdo mostra R$ 28.500,00 e a empresa, sem qualquer envio ainda. Com movimento reduzido, o quadro final surge imediatamente.

### Quadro C · após confirmação explícita

“Confirmar lance de R$ 28.500,00” muda para “Confirmando…”. Dimensões e valor permanecem. O diálogo não se fecha automaticamente enquanto o estado é desconhecido. O tempo de rede não tem duração visual predefinida.

### Quadro D1 · resposta aceita

Recibo mostra “Lance de R$ 28.500,00 confirmado”, horário e referência; posição provisória aparece separadamente. Fundo de sucesso discreto, sem pop, som ou confete. Ação “Voltar ao leilão”. Se outro lance já o superou, o recibo continua válido e a mensagem informa a situação atual.

### Quadro D2 · valor desatualizado

Painel de aviso diz “O lance mínimo mudou”. Valor digitado é preservado. Novo mínimo mostrado com origem atualizada, botão de confirmar suspenso até nova revisão. Não corrigir e enviar automaticamente.

### Quadro D3 · resposta desconhecida

“Estamos verificando se seu lance foi registrado.” Exibir consulta de status. Não mostrar erro definitivo nem sucesso antes de consultar o resultado. Se o usuário fechar, o status da tentativa permanece acessível na página; fechar o diálogo não desfaz um lance.

## 5. Storyboard — encerramento e anti-sniping

Relógio é informação derivada do horário oficial. Quando visualmente atinge zero, a ação é preventivamente indisponível e a mensagem passa a “Prazo atingido. Confirmando o encerramento.” Não mostrar “Você venceu” por relógio local.

Se o servidor informar extensão válida, atualizar imediatamente deadline e estado, exibir “Encerramento prorrogado até 16h02” e restaurar a ação conforme elegibilidade. O relógio troca de valor diretamente. Se o servidor confirmar fim, mostrar resultado correspondente, ou “Encerrado. Resultado em apuração” quando esse for o estado real.

Não adicionar tempo extra no frontend. O documento de movimento especifica somente como exibir a regra do leilão aprovada no PROJECT_MASTER.

## 6. Eventos em alta frequência

Valores financeiros refletem o último estado confirmado em ordem. Efeito decorativo M12 pode ocorrer no máximo uma vez a cada 2 s; eventos intermediários continuam atualizando dados sem efeito. Não transformar fluxo rápido em pisca-pisca. Agregar notificações de “superado” conforme regra do produto, mantendo histórico e estado atual legíveis.

Atualizações não roubam foco, não substituem o valor que o usuário está digitando e não reorganizam o catálogo involuntariamente. Badge com quantidade de novas ocorrências pode sugerir “Ver atualizações”. Mudanças críticas na revisão impedem confirmar valor desatualizado e explicam o motivo.

## 7. Acessibilidade e interrupção

Movimento reduzido elimina translação, escala, rotação decorativa e fades não essenciais. Foco continua imediato e visível. Animação cancelada chega ao estado lógico mais recente; não existe estado intermediário que permita enviar duas vezes.

Leitor de tela recebe mensagens de confirmação/erro uma vez por tentativa, sem anunciar a cada segundo. Mudança de estado é textual. Indisponibilidade/reconexão persistem enquanto necessárias. Toast não contém a única cópia de dado financeiro.

## 8. Performance e QA de motion

Preferir opacidade/transformação para efeitos decorativos; componentes mantêm área reservada. Nenhuma dependência pesada de animação é exigida por este plano. Testar em aparelho intermediário, teclado, zoom, rede lenta e preferência de movimento reduzido.

Critérios de aceite: sem saltos de layout do valor/CTA; sem loop de urgência; sem foco perdido; sem dado financeiro interpolado; cliques rápidos não empilham transições; modal nunca habilita envio duplicado; todos os estados compreensíveis em captura estática.

