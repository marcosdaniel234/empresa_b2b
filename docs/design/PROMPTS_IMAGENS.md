# Prompts para gerar imagens da marca

Guia para criar, num gerador de imagens (Midjourney, Firefly, Ideogram,
DALL·E etc.), peças que podem substituir ou complementar os fundos
desenhados em código. Os prompts estão em inglês porque a maioria dos
geradores responde melhor assim; a explicação está em português.

## Regras que valem para todas

- **Cores**: fundo vinho profundo `#2A0E12`; destaques em cobre `#D9936A` /
  `#C9824F`; nada de azul, verde saturado ou neon.
- **Espaço para texto**: os títulos ficam à esquerda. Deixe os **45% da
  esquerda quase vazios** e escuros; o assunto vai à direita.
- **Bordas**: as quatro bordas devem terminar em vinho liso, para a imagem
  se fundir com as faixas vizinhas.
- **Nada de texto, logotipo, marca-d'água, pessoas identificáveis ou marcas
  reais** (Caterpillar, Scania, John Deere…).
- **Formato**: 16:9, pelo menos 2560 × 1440 px, PNG ou JPG.
- **Contraste baixo**: é fundo, não protagonista. Na dúvida, mais escuro.

Negativo sugerido (onde o gerador aceitar): `text, letters, logo, watermark,
brand names, people faces, blue, neon, oversaturated, busy composition,
lens flare, frame, border`.

## 1. Brasil em fios de cobre — fundo das faixas e do rodapé

A mesma ideia do fundo atual (o Brasil e as rotas entre estados), em versão
fotográfica.

```
Macro photograph of a map of Brazil formed by thousands of fine glowing
copper wires and tiny copper beads, some wires arcing between cities like
logistics routes, placed on the right side of the frame, deep wine-red
velvet background (#2A0E12), left 45% of the image empty and dark, soft
warm rim light, shallow depth of field, elegant, premium, minimal,
low contrast, 16:9 --ar 16:9 --style raw
```

## 2. Planta técnica dos ativos — faixas internas (Lojas, Leilões, Ajuda)

Desenho técnico de máquinas, como uma planta de engenharia em cobre. Conversa
direto com o que o site vende.

```
Technical blueprint line drawing of industrial assets — a forklift, a
semi-truck cab, a diesel generator and a CNC lathe — drawn as fine copper
(#D9936A) engineering linework with measurement lines and callout circles,
exploded-view style, on a flat deep wine background (#2A0E12), drawings
concentrated on the right half, left side empty, very subtle, 20% opacity
feel, no text, 16:9 --ar 16:9 --style raw
```

## 3. Rastros de luz de uma rodovia — abertura da página de quem vende

“Da sua empresa para a próxima operação”: movimento, logística, chegada.

```
Aerial night photograph of a highway interchange near an industrial
district in Brazil, long-exposure light trails, color graded to a duotone
of deep wine red (#2A0E12) and copper (#D9936A), very dark overall,
cinematic, the light trails flowing from the left edge toward the right,
left 40% nearly black, no text, 16:9 --ar 16:9
```

## 4. Metal escovado com pátina — textura curta (menu do celular, rodapé)

Textura abstrata, sem assunto, para superfícies pequenas.

```
Seamless abstract texture of brushed dark copper with a deep burgundy
patina, fine horizontal brushing marks, subtle hammered dents, very dark,
low contrast, matte, even lighting, no objects, tileable, 1:1
--ar 1:1 --tile --style raw
```

## Outras peças que faltam no site

| Peça | Onde entra | Prompt-base |
| --- | --- | --- |
| Foto de trabalhador no galpão | Abertura de `/anunciar` (hoje usa a foto institucional) | `Brazilian warehouse supervisor in a navy work shirt checking a tablet next to palletized industrial equipment, natural light from a high window, warm tones, shallow depth of field, editorial photography, subject on the right, 16:9` |
| Fachadas das sedes | Capa de cada loja em `/loja/[empresa]` | `Exterior of a mid-size Brazilian industrial company building, clean concrete and metal facade, loading docks, late afternoon light, no signage, no logos, architectural photography, 16:9` |
| Pátio de leilão | Faixas de Leilões | `Rows of used industrial machinery and trucks parked in an open auction yard at golden hour, shot from a low angle, warm copper light, dark sky, no people, no logos, 16:9` |

## Como me entregar

1. Salve os arquivos em `assets-src/fundos/` (ou `assets-src/institutional/`
   para fotos), com nomes curtos: `brasil-cobre.png`, `planta-ativos.png`…
2. Rode `npm run images`: cada arquivo vira WebP em 1600 e 640 px (em torno
   de 150–250 KB), já no formato que o site usa.
3. Eu ligo cada imagem à faixa certa. O `Backdrop` aceita uma nova variante
   de imagem, mantendo as máscaras que protegem o texto e dissolvem as bordas.
