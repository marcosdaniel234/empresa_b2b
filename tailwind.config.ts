import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B.
 *
 * Direção visual: marinho profundo como base institucional (topo, abertura,
 * faixas e rodapé) e laranja como única cor de ação — botão, preço, régua de
 * sobretítulo e estado ativo. O corpo do catálogo fica claro, para que as
 * fotos e as fichas de lote respirem entre as faixas escuras.
 *
 * O laranja existe em dois tons por uma razão de contraste: `action` é o
 * sólido que aceita texto branco em cima; `action-bright` é o vivo que só
 * aparece como texto sobre o marinho. Trocar um pelo outro quebra AA.
 *
 * Razões de contraste em scripts/check-contrast.mjs — todas passam WCAG AA.
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
          900: "#0E1B2A",
          800: "#16283C",
          700: "#22384F",
          600: "#33506D",
        },
        action: {
          DEFAULT: "#C2410C",
          hover: "#9A3412",
          pressed: "#7C2D12",
          bright: "#F97316",
          soft: "#FFF1E8",
        },
        accent: {
          soft: "#FFF1E8",
          strong: "#F97316",
        },
        surface: {
          page: "#EAF0F7",
          card: "#F9FBFE",
          subtle: "#EDF3F9",
          raised: "#E2EAF4",
        },
        text: {
          primary: "#0F1B2A",
          secondary: "#47566B",
          muted: "#5A6A80",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#D7E1ED",
          strong: "#B8C6D7",
          control: "#7C8899",
        },
        focus: {
          ring: "#1D4ED8",
        },
        success: {
          text: "#047857",
          surface: "#ECFDF5",
          solid: "#047857",
        },
        warning: {
          text: "#92400E",
          surface: "#FEF3C7",
        },
        danger: {
          text: "#B91C1C",
          surface: "#FEE2E2",
        },
        info: {
          text: "#1D4ED8",
          surface: "#EFF4FE",
        },
      },
      fontFamily: {
        sans: ["Aptos", "Segoe UI Variable", "Segoe UI", "Arial", "system-ui", "sans-serif"],
        mono: ["Cascadia Mono", "Consolas", "ui-monospace", "monospace"],
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
        control: "8px",
        card: "12px",
        panel: "16px",
        modal: "16px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14, 27, 42, 0.06), 0 10px 30px rgba(34, 56, 79, 0.05)",
        raised: "0 6px 18px rgba(14, 27, 42, 0.10), 0 1px 0 rgba(255,255,255,.9) inset",
        elevated: "0 18px 42px rgba(14, 27, 42, 0.16), 0 1px 0 rgba(255,255,255,.85) inset",
        float: "0 18px 40px rgba(14, 27, 42, 0.18)",
        modal: "0 24px 60px rgba(14, 27, 42, 0.26)",
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
