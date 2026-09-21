# Revisão profissional da interface

Este documento registra a revisão visual e de experiência aplicada ao ATIVOS B2B. Ele complementa os documentos originais de fundação, telas, animações e entrega.

## Princípio da experiência

A interface foi posicionada como uma plataforma B2B de ativos com a clareza de um classificado digital, inspirada na facilidade de exploração da OLX, mas com linguagem mais sóbria e adequada a compras corporativas. O objetivo é permitir que uma pessoa entenda rapidamente o ativo, a empresa anunciante, o valor, o prazo e a próxima ação.

Como esta versão não possui autenticação, backend nem motor de leilão, nenhuma interação deve sugerir uma transação real. Avisos permanentes e mensagens contextuais deixam esse limite visível sem interromper a navegação.

## Direção visual

- Verde profundo como cor institucional e verde claro como acento.
- Fundos neutros e levemente quentes para reduzir o aspecto genérico de painel administrativo.
- Tipografia Inter com hierarquia editorial, títulos concisos e valores em algarismos tabulares.
- Cartões com bordas discretas, sombras suaves e áreas de toque de pelo menos 44 pixels.
- Ilustrações vetoriais próprias por categoria, sempre identificadas como ilustração.
- Destaques de foco visíveis em navegação por teclado.

## Componentes e jornadas revisados

### Cabeçalho e busca

O cabeçalho mantém marca, busca, favoritos, entrada e anúncio em uma hierarquia única. Em telas pequenas, a busca ocupa uma linha própria. O formulário funciona por navegação nativa e aceita termos de ativo, categoria, empresa e localidade.

### Catálogo e filtros

Os filtros validam os parâmetros recebidos e ignoram valores desconhecidos. A busca não diferencia acentos ou maiúsculas. No celular e em tablets estreitos, os filtros usam uma janela modal nativa; no desktop, permanecem visíveis ao lado dos resultados. Filtros ativos podem ser removidos individualmente.

### Favoritos e personalização

Os favoritos ficam no navegador e não simulam uma conta. Dados inválidos no armazenamento local não interrompem a tela. A página inicial oferece uma vitrine personalizada por categoria ou favoritos, sem atribuir ao produto uma personalização que não existe.

### Detalhe e simulação de lance

No celular, a sequência de leitura é imagem, painel do leilão e informações detalhadas. A entrada monetária preserva centavos e aceita o formato brasileiro. Antes da conclusão, a pessoa revisa o ativo, a empresa, o valor e a retirada.

A conclusão é chamada de simulação e informa claramente que nenhum lance foi enviado, registrado ou cobrado. O fluxo impede envio duplicado e revalida o prazo antes da confirmação.

### Ajuda e anúncio

A central de ajuda responde dúvidas reais da demonstração. A área de anúncio oferece uma lista interativa do que uma empresa deve preparar, sem apresentar upload, cadastro ou publicação inexistentes.

## Movimento e microinterações

- Entrada de diálogos: opacidade e deslocamento vertical de 8 pixels em 180 ms.
- Estados de hover: transição curta de cor, borda ou sombra.
- Contagem regressiva: atualização a cada segundo com uma única fonte de tempo compartilhada.
- Confirmação da simulação: estado intermediário bloqueado por 600 ms, seguido de retorno explícito.
- Preferência por movimento reduzido: animações e transições são reduzidas globalmente quando solicitadas pelo sistema.
- Sem parallax, confete, som ou movimento decorativo contínuo.

## Acessibilidade

- Estrutura semântica com navegação, busca, artigos, listas de definição e regiões de status.
- Diálogos nativos com foco inicial, contenção de foco, fechamento por Escape e devolução do foco ao acionador.
- Rótulos únicos mesmo quando controles responsivos coexistem no documento.
- Mensagens de erro ligadas ao campo correspondente.
- Botões de favorito com estado pressionado e anúncio por leitor de tela.
- Contraste e foco visual preservados em superfícies claras e escuras.

## Verificações realizadas

- Testes de valores monetários, filtros, busca, favoritos e prazo.
- Análise estática, verificação de tipos e build de produção.
- Revisão no navegador em desktop, celular e largura intermediária.
- Exercício completo da busca, filtros e simulação de lance com centavos.

## Limites da versão

Ainda não existem autenticação, perfis reais, banco de dados, envio de documentos, fotos reais, mensageria, pagamentos, trilha de auditoria nem motor concorrente de lances. Esses recursos exigem decisões de produto, segurança e operação antes de qualquer uso comercial.

