import type { Config } from "tailwindcss";

/**
 * Tokens do ATIVOS B2B. Direção de portal de leilão industrial: superfícies
 * claras e neutras, cor de ação em verde-petróleo, acento verde-limão,
 * geometria reta (raios de 2-4px) e bordas de aço bem definidas.
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
          900: "#0E2B27",
          800: "#123C36",
          700: "#17514A",
        },
        action: {
          DEFAULT: "#17624B",
          hover: "#124C3B",
          pressed: "#0D382D",
        },
        accent: {
          soft: "#D9ED92",
          strong: "#B3D23F",
        },
        surface: {
          page: "#F2F4F2",
          card: "#FFFFFF",
          subtle: "#E9EDE9",
          raised: "#DFE5DF",
        },
        text: {
          primary: "#15201C",
          secondary: "#4B5C54",
          muted: "#6B7C73",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#D5DCD7",
          strong: "#B9C3BC",
          control: "#69796F",
        },
        focus: {
          ring: "#225CBE",
        },
        success: {
          text: "#166044",
          surface: "#E6F2EB",
        },
        warning: {
          text: "#7A4B00",
          surface: "#FCEFD2",
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
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
        card: "0 1px 2px rgba(14, 43, 39, 0.06)",
        elevated: "0 4px 14px rgba(14, 43, 39, 0.12)",
        modal: "0 18px 48px rgba(14, 43, 39, 0.24)",
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
    },
  },
  plugins: [],
};

export default config;
