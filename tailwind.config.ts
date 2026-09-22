import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B.
 *
 * Regra de cor do projeto: o laranja só é visível se o resto não for.
 * Os neutros são quentes mas quase acromáticos (croma baixíssimo), de modo
 * que o laranja de segurança apareça por CONTRASTE, não por quantidade. Ele
 * fica reservado a ação, link, estado ativo e urgência — nunca a superfície.
 * O escuro é um carvão amadeirado, que ancora as faixas e dá profundidade.
 *
 * Geometria reta (raios de 2-4px), tipografia IBM Plex (ver app/layout.tsx).
 * Razões de contraste calculadas em scripts/check-contrast.mjs — todas as
 * combinações de texto passam WCAG AA.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#1C1917",
          800: "#292524",
          700: "#44403C",
        },
        action: {
          DEFAULT: "#BC3F0C",
          hover: "#9A3412",
          pressed: "#7C2D12",
        },
        accent: {
          soft: "#FBBF24",
          strong: "#F59E0B",
        },
        surface: {
          page: "#F7F5F2",
          card: "#FFFFFF",
          subtle: "#F0EDE9",
          raised: "#EAE5E0",
        },
        text: {
          primary: "#1C1917",
          secondary: "#4A443F",
          muted: "#6B635B",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#E2DDD7",
          strong: "#CFC8C0",
          control: "#857C73",
        },
        focus: {
          ring: "#1D4ED8",
        },
        success: {
          text: "#1B7A43",
          surface: "#E5F3EA",
        },
        warning: {
          text: "#7A5D00",
          surface: "#FBF1D2",
        },
        danger: {
          text: "#A62C2C",
          surface: "#FBE9EA",
        },
        info: {
          text: "#22508F",
          surface: "#EAF1FB",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "title-page": ["26px", { lineHeight: "32px", fontWeight: "700" }],
        "title-page-mobile": ["21px", { lineHeight: "27px", fontWeight: "700" }],
        "title-section": ["18px", { lineHeight: "24px", fontWeight: "700" }],
        "title-section-mobile": [
          "16px",
          { lineHeight: "22px", fontWeight: "700" },
        ],
        "title-card": ["15px", { lineHeight: "20px", fontWeight: "600" }],
        value: ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "value-mobile": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        body: ["14px", { lineHeight: "21px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "18px", fontWeight: "500" }],
        metadata: ["13px", { lineHeight: "19px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "17px", fontWeight: "400" }],
        micro: ["11px", { lineHeight: "15px", fontWeight: "500" }],
      },
      borderRadius: {
        control: "3px",
        card: "3px",
        modal: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 25, 23, 0.08)",
        elevated: "0 6px 18px rgba(28, 25, 23, 0.14)",
        modal: "0 18px 48px rgba(28, 25, 23, 0.30)",
      },
      maxWidth: {
        content: "1440px",
      },
      transitionDuration: {
        micro: "100ms",
        quick: "140ms",
        standard: "200ms",
        panel: "260ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "panel-down": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "rule-in": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        "panel-down": "panel-down 200ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-up": "fade-up 260ms cubic-bezier(0.2, 0, 0, 1) both",
        "fade-in": "fade-in 180ms linear both",
        "rule-in": "rule-in 320ms cubic-bezier(0.2, 0, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
