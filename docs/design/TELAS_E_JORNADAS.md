# Telas e jornadas — especificação visual

Versão 1.0 · Complemento da [fundação estética](FUNDACAO_ESTETICA.md)

## 1. Arquitetura de navegação

**Área pública:** Explorar → resultados → leilão → loja. Apoios: como funciona, termos, privacidade, ajuda e denúncia.

**Área autenticada:** favoritos, notificações e Minha empresa. Nesta última: visão geral, ativos, meus leilões, participação, vitórias/fechamento, loja, membros e configurações. Operações de plataforma vivem em uma área separada, sempre rotulada “Administração da plataforma”.

Cabeçalho desktop: identificador do marketplace, busca, favoritos, notificações quando autenticado, seletor da empresa e botão “Anunciar ativo”. Visitante vê “Entrar”. Mobile: cabeçalho compacto e busca própria; navegação inferior “Explorar”, “Favoritos”, “Anunciar”, “Minha empresa”. Na tela de lance, a ação fixa substitui a navegação inferior para evitar duas barras competindo.

## 2. T01 — Home / Explorar

Objetivo: permitir iniciar uma busca e descobrir ativos em poucos segundos. Cabeçalho 72 px, bloco editorial de até 176 px, busca com termo/localização, categorias e primeira coleção de ativos. Fotos reais de anúncios representam o inventário; não usar carrossel publicitário no topo.

Seções: “Encerrando em breve”, “Novos leilões” e “Empresas com ativos disponíveis”, somente quando houver dados. “Encerrando em breve” ordena por encerramento efetivo. Vazio inicial informa que ainda não há leilões, sem preencher a página com anúncios fictícios.

Mobile: título em duas/três linhas, busca full-width, categorias com quebra ou navegação horizontal acessível, cards de uma coluna. Não obrigar cadastro para descobrir conteúdo público.

## 3. T02 — Resultados e filtros

Desktop: breadcrumb discreto, título/contagem, chips aplicados, ordenação à direita; filtro lateral de 240 px e grade. Filtros: categoria, condição, cidade/UF, faixa de lance exibido, empresa e estado do leilão. Nomear a faixa “Lance atual ou inicial (R$)” para não confundir preço final.

Mobile: linha “Filtrar” e “Ordenar”; painel de filtro com título, grupos, limpar e CTA “Aplicar filtros”. Estado aplicado aparece em chips. Botão indica número de filtros ativos, não número de resultados inventado. Voltar do detalhe restaura termo, filtros e posição.

Estados: carregando com skeleton; resultados; zero resultados; erro com tentar novamente; filtros inválidos com mensagem no campo; atualização dos valores sem reordenar automaticamente cards sob o ponteiro. Oferecer “Atualizar resultados” se a ordem ficou desatualizada.

## 4. T03 — Página de leilão

Desktop ≥1200 px: breadcrumb, título/empresa/localização; corpo com galeria (aprox. 2/3) e painel de lance (1/3). Abaixo da galeria: descrição, ficha técnica, condição/avarias, documentos permitidos, retirada/visitação quando prevista, regras e histórico público mascarado. Sidebar sticky somente enquanto não encobrir rodapé ou conteúdo.

Painel de lance, ordem obrigatória:

1. status e identificação do leilão;
2. lance inicial quando não houver lances, ou lance atual;
3. próximo mínimo e incremento;
4. quantidade de lances válidos;
5. data/hora com fuso e tempo restante;
6. regra de prorrogação, se ativada;
7. organização representada;
8. campo do valor, resumo de condições e “Revisar lance”;
9. estado de conexão e última atualização, quando relevante.

Mobile: galeria → título/vendedor → resumo financeiro → ação → ficha técnica/condições. Ao o resumo sair da tela, barra fixa apresenta próximo mínimo e “Revisar lance”, com safe area. Reservar espaço inferior; a barra não pode cobrir foco, teclado, avisos ou último conteúdo. Documentos e termos permanecem alcançáveis sem labirinto de abas.

A galeria abre lightbox acessível: título da foto, posição “2 de 6”, próximo/anterior e fechar. Gestos têm botões equivalentes. Zoom de foto é acionado pelo usuário, nunca automático.

### Estados da ação do leilão

| Condição | Região principal | Ação |
|---|---|---|
| Visitante | explicação curta da participação empresarial | Entrar para participar |
| Sem empresa | completar vínculo empresarial | Cadastrar empresa |
| Membro sem permissão | informar a restrição | Ver responsável, se disponível |
| Habilitação pendente | status e orientação | Consultar habilitação |
| Termos não aceitos | versão e conteúdo dos termos | Ler e aceitar termos |
| Agendado | início completo | Favoritar leilão |
| Aberto/elegível | valor e mínimo | Revisar lance |
| Prazo atingido, sem confirmação | aviso informativo persistente | Verificar atualização |
| Encerrado sem vencedor | resultado confirmado | Ver outros leilões |
| Encerrado, organização vencedora | resultado e próximas ações | Acompanhar fechamento |
| Encerrado, outra vencedora | resultado permitido | Ver outros leilões |
| Cancelado | data e motivo público permitido | Voltar aos resultados |

## 5. T04 — Revisão e confirmação de lance

Revisão abre diálogo com título “Revise seu lance”. Conteúdo: ativo, vendedor, organização representada, valor proposto em destaque, mínimo conhecido, condições relevantes e indicação de que o servidor valida o valor no envio. Não pré-marcar aceite de termos. Não sugerir alçada ou crédito que não exista.

Ações: secundário “Voltar e editar”; primário “Confirmar lance de R$ 28.500,00”. O ato de abrir a revisão não envia lance. Enter no campo de edição não deve pular a revisão. Foco inicial no título/resumo, não no botão de confirmação.

Após confirmar: ação fica ocupada e bloqueia novo envio daquela tentativa; diálogo preserva valor. Confirmado pelo servidor: recibo persistente com valor, horário e referência. Liderança é informação separada e pode mudar. Resposta incerta: mensagem de verificação, sem sucesso, sem novo valor automático e sem instruir a repetir com uma nova tentativa.

Se o mínimo mudar antes do envio: mostrar valor anterior e mínimo atualizado, exigir nova revisão e confirmação. Nunca aumentar o lance do usuário automaticamente. Troca de empresa invalida a revisão; reabrir no contexto correto.

## 6. T05 — Loja da empresa

Capa 1280×240 px de referência, com área segura central; logo em bloco próprio, nome, localização geral, descrição, informações institucionais e status de verificação real com explicação. Lista de leilões filtrável por ativos, próximos e encerrados permitidos.

Em mobile, reduzir capa sem cortar o logo; nome quebra linha. Não apresentar estrelas ou quantidade de operações antes de existir método verificável de reputação. Não expor CNPJ/documentos de responsáveis sem política explícita.

## 7. T06 — Conta e onboarding empresarial

Layout de formulário central ou duas colunas (formulário + orientação breve), sem campanha dominando a tela. Passos: conta → empresa → loja → equipe opcional → primeiro ativo. Progresso textual “Etapa 2 de 5” e nomes, sem porcentagem falsa.

Campos agrupados por propósito. CNPJ recebe máscara e validação, mas “formato válido” não vira selo “Empresa verificada”. Salvar e continuar quando suportado; indisponibilidade não apaga preenchimento. Convites podem ser pulados; verificação e permissões devem comunicar o que está permitido naquele momento.

## 8. T07 — Cadastro de ativo e publicação

Wizard: dados → fotos/documentos → informações técnicas → condições/configuração do leilão → revisão. Distinguir salvar ativo de publicar leilão. Preview mostra o resultado público e lista o que permanece privado.

Barra de ações: “Salvar rascunho”, “Voltar” e ação contextual “Continuar”, “Enviar para aprovação” ou “Publicar leilão”. Ação depende da permissão. Rótulo “Salvo às…” somente após confirmação. Estado pendente é “Salvando…”.

Ordenar fotos por arrastar e por botões acessíveis “Mover antes/depois”. Erro de um arquivo não apaga os demais. Após publicação, campos econômicos selados exibem explicação e caminho permitido, sem controles que sugiram edição livre.

## 9. T08 — Painel da empresa

Sidebar 224–240 px e conteúdo com título, seletor da empresa e ação principal. Primeiro bloco: tarefas (“2 leilões aguardam aprovação”), depois métricas úteis e tabelas. Métricas só aparecem quando definidas e com período explícito.

“Ativos” significa bens cadastrados; “Leilões abertos” significa estado de leilão. Evitar duas abas chamadas “Ativos”. As listas têm busca, filtros, status textual, data e ação de cada linha. Vazio orienta a primeira ação permitida.

Participação: leilão, meu último lance, lance atual, condição “Liderando/Superado”, encerramento e link. Atualização ao vivo não move linhas durante a interação; indicação de dados atualizados e ordenação explícita.

## 10. T09 — Membros e permissões

Nome/e-mail corporativo, papéis, status do convite e ações permitidas. Modal de alteração explica o acesso concedido ou removido. Convites não são contados como membros ativos. Transferência de ownership e remoção de acesso têm confirmação específica com a empresa visível.

Restrições devem explicar, por exemplo, “Mantenha ao menos um responsável pela empresa”. Não usar um ícone de lixeira sem rótulo para ações de acesso.

## 11. T10 — Fechamento pós-leilão

Cabeçalho com ativo, partes autorizadas, resultado e valor selado. Timeline de etapas: contato, documentação, pagamento externo, retirada e conclusão conforme fluxo aprovado. Cada etapa tem responsável e evidência permitida.

“Pagamento informado” e “Pagamento confirmado” não são sinônimos. Enquanto externo, indicar origem e responsável pelo registro. Disputa aparece como aviso persistente, não somente cor. Sem logos bancários, proteção de compra ou estimativa de frete inventados.

## 12. T11 — Administração da plataforma

Mesma base visual, barra superior claramente rotulada e navegação própria. Filtros por organização, ocorrência, estado e período. Ações críticas abrem revisão de alvo, motivo e consequência; trilha de auditoria sempre disponível a quem pode consultá-la.

Sem controle “Editar vencedor” ou edição livre de lances. Exceções somente pelos fluxos previstos no documento mestre. Não usar o mesmo menu de conta para misturar administração global e atuação como licitante.

## 13. T12 — Notificações, favoritos e erros gerais

Notificações agrupadas por data e tipo; lida/não lida difere por peso e marcador. Favoritos preservam leilões encerrados com estado correto e opção de remover. Busca salva descreve filtros e frequência de aviso antes de ativar.

Páginas 403/404 são coerentes com política de não revelar objeto privado; mensagens não expõem nome de outra organização. Falha de rede preserva conteúdo já carregado com aviso. Manutenção informa o estado conhecido e canal de ajuda, sem prometer horário de retorno inexistente.

## 14. Inventário de frames para edição futura

Referências desktop: 1440×1024 px e 1280×900 px; mobile: 390×844 px, estreito 320 px; tablet: 768×1024 px. Conteúdo pode exceder viewport; alturas não devem comprimir textos para caber na apresentação.

Cada T01–T12 terá default + loading + empty/error aplicável + mobile. T03/T04 adicionam estados de participação, conexão e resposta de lance. Frames devem manter nomes e IDs desta especificação para que revisão de design e testes usem o mesmo vocabulário.

