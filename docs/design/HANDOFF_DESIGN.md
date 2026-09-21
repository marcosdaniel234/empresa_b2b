# Handoff e validação da fundação estética

Versão 1.0 · 21/09/2026

## 1. Inventário da entrega

| Arquivo | Função |
|---|---|
| MODELO_VISUAL_B2B.png | prancha raster ilustrativa, catálogo/detalhe/mobile |
| FUNDACAO_ESTETICA.md | direção, tokens, tipografia, grid, componentes e linguagem |
| TELAS_E_JORNADAS.md | T01–T12 e composição de estados principais |
| ANIMACOES_E_MICROINTERACOES.md | M01–M22, tempos, curvas, storyboard e fallback |
| HANDOFF_DESIGN.md | validação, organização futura e registros de produção |
| PROMPT_VISUAL.txt | instrução exata usada para gerar a prancha |

Nenhum desses arquivos implementa o site. Não foi produzido arquivo Figma, biblioteca de componentes, logotipo vetorial, vídeo ou protótipo navegável. A entrega oferece direção visual e documentação para esses trabalhos.

## 2. Hierarquia das decisões

Regras de negócio e segurança: PROJECT_MASTER. Aparência: FUNDACAO_ESTETICA. Composição: TELAS_E_JORNADAS. Movimento: ANIMACOES_E_MICROINTERACOES. A imagem ilustra a direção e não substitui regras textuais. O status desta entrega é **proposta**, sem alegação de aprovação do usuário.

## 3. Revisão da prancha gerada

A imagem foi inspecionada visualmente. Ela comunica o catálogo com busca/filtros, predominância da fotografia, paleta verde/clara, detalhe com valor e versão mobile coerente.

Ajustes obrigatórios para a futura versão editável:

- A prancha tem textos pequenos para caber em uma composição de apresentação; a interface deve usar a escala tipográfica da especificação.
- A combinação de filtro “Máquinas” selecionado com cards de outras categorias é demonstrativa; em produto, resultados precisam respeitar filtros e contagens reais.
- Textos/contagens/condição técnica nas fotografias e telas são ilustrativos, não dados comerciais.
- “Encerra hoje às 16h” deve ganhar data/fuso e contexto temporal suficiente conforme T03.
- O detalhe da prancha não mostra todos os campos requeridos: quantidade de lances, incremento, organização representada, termos, elegibilidade, conectividade e regras de extensão entram na tela editável.
- A barra de navegação mobile aparece junto da região de lance; na interação final, usar apenas uma barra fixa conforme T03.
- “Agendar visita” e “Ver no mapa” na imagem não adicionam essas funcionalidades ao MVP. Remover até que exista escopo aprovado; mostrar localização geral e condições textuais.
- Fotografias geradas podem conter lettering que lembra marcas; não são assets de anúncio e não deverão ser publicadas como mercadoria real.
- Tonalidades da imagem podem variar do hexadecimal especificado. Recriar com tokens oficiais, sem extrair cores pela imagem.
- Efeitos de luz sutis que o gerador adicionou não significam adoção de gradientes na interface.

## 4. Organização sugerida de arquivo de design futuro

Páginas: 00 Capa/decisões; 01 Foundations; 02 Components; 03 Marketplace; 04 Lance; 05 Empresa; 06 Plataforma; 07 Mobile; 08 Motion/estados; 09 Handoff.

Foundations inclui cores semânticas, tipografia, espaçamento, raios, elevação, grids e iconografia. Componentes com variantes de tamanho, hierarquia, estado e tema superficial. Exemplo de nomenclatura: “Button / Primary / Default”, “AuctionCard / Active”, “BidPanel / AwaitingResponse”.

Usar layout responsivo, conteúdo realista longo, componentes reutilizáveis e anotações sobre origem dos dados. Criar frames de referência 1440, 1280, 768, 390 e 320 px. Ligar os frames ao ID T e cada transição ao ID M. Este é um plano de organização, não afirmação de que o arquivo já existe.

## 5. Critérios de qualidade

### Visual

- [ ] contraste calculado para combinações efetivas, incluindo hover/foco/erro;
- [ ] valores e rótulos não truncam em largura estreita;
- [ ] identidade consistente entre marketplace, painel e administração;
- [ ] fotos com proporção estável e sem ocultar avarias;
- [ ] destaque comercial não compete com preço, prazo e confirmação;
- [ ] diferenças de estado legíveis em escala de cinza;
- [ ] um CTA principal por contexto e ações destrutivas distintas.

### Interação

- [ ] fluxo “buscar → analisar → habilitar → revisar → confirmar → consultar resultado” completo;
- [ ] todas as telas contemplam loading, vazio e falha aplicável;
- [ ] valores atualizados não substituem silenciosamente valor digitado;
- [ ] trocar de empresa encerra a revisão antiga;
- [ ] conectividade incerta tem tratamento persistente;
- [ ] fechamento de modal não é apresentado como cancelamento de lance;
- [ ] nenhuma página inventa verificação, reputação ou garantia.

### Acessibilidade e motion

- [ ] revisão por teclado, leitor de tela, zoom 200% e reflow equivalente a 320 px;
- [ ] nenhum elemento fixo cobre foco ou conteúdo;
- [ ] alvos de toque e contraste medidos na interface real;
- [ ] M01–M22 verificados no modo normal e reduzido;
- [ ] sem mudança involuntária de foco ou anúncio contínuo do timer;
- [ ] animação não interfere na confirmação nem exibe sucesso prematuro.

Esses itens são critérios futuros de aceite. Uma imagem raster não permite executá-los integralmente.

## 6. Roteiro de teste de usabilidade

### Verificação preliminar dos tokens

Foram calculadas as razões de contraste a partir dos valores sRGB sólidos especificados, usando luminância relativa. Resultados arredondados abaixo para leitura; todas as combinações de texto verificadas têm margem sobre 4,5:1.

| Combinação | Razão aproximada |
|---|---:|
| Branco / ação principal | 7,28:1 |
| Texto principal / fundo da página | 14,30:1 |
| Texto secundário / branco | 6,38:1 |
| Texto principal / acento claro | 12,07:1 |
| Borda de controle / branco | 3,83:1 |
| Texto de sucesso / fundo de sucesso | 6,62:1 |
| Texto de aviso / fundo de aviso | 6,18:1 |
| Texto de erro / fundo de erro | 6,04:1 |
| Texto informativo / fundo informativo | 6,30:1 |
| Anel azul de foco / branco | 6,28:1 |

Sobre o cabeçalho escuro, usar anel branco de foco; o azul é reservado às superfícies claras. A verificação não cobre transparências, imagens, renderização da fonte nem todos os estados futuros e não substitui a auditoria da interface implementada.

### Sessões propostas

Recrutar compradores e vendedores corporativos com experiências distintas. Proposta inicial: 5 sessões exploratórias, sem alegar representatividade estatística. Tarefas: encontrar uma máquina por localização/valor; identificar vendedor e condição; explicar lance atual versus próximo mínimo; verificar quem a pessoa representa; revisar sem enviar; interpretar lance superado e resposta incerta; publicar um rascunho e descobrir quem aprova.

Registrar tempo, hesitações, erros de interpretação, confiança declarada e ações equivocadas. Zero confirmação acidental é o objetivo de design; qualquer caso exige revisão. Só a avaliação posterior pode dizer se o objetivo foi atingido.

## 7. Sequência de trabalho após esta entrega

1. Refinar direção/nome conforme feedback do usuário.
2. Montar foundations e componentes editáveis.
3. Desenhar T02–T04 desktop/mobile com todos os estados críticos.
4. Testar a compreensão e a confirmação de lance.
5. Completar T01/T05–T12.
6. Prototipar M01–M22 e revisar acessibilidade.
7. Preparar handoff de design aprovado.
8. Programar somente quando o usuário autorizar essa fase.

## 8. Registro de geração

A prancha foi criada com a ferramenta integrada ImageGen, modo de geração de imagem nova, usando a skill imagegen para produzir e inspecionar um mockup raster. O prompt exato está em PROMPT_VISUAL.txt. A saída foi copiada para a pasta de entregas do projeto; não depende do arquivo temporário da ferramenta.

Nome, dados de ativos e imagens são demonstrativos. O modelo foi gerado para definir aparência, não para demonstrar uma aplicação existente.

