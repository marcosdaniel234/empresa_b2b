import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#123C36",
        },
        action: {
          DEFAULT: "#17624B",
          hover: "#124C3B",
          pressed: "#0D382D",
        },
        accent: {
          soft: "#D9ED92",
        },
        surface: {
          page: "#F6F7F4",
          card: "#FFFFFF",
          subtle: "#EDF2EE",
        },
        text: {
          primary: "#182822",
          secondary: "#52635A",
          inverse: "#FFFFFF",
        },
        border: {
          subtle: "#D7DFD9",
          control: "#73877B",
        },
        focus: {
          ring: "#225CBE",
        },
        success: {
          text: "#166044",
          surface: "#E8F3EC",
        },
        warning: {
          text: "#815000",
          surface: "#FFF3D7",
        },
        danger: {
          text: "#A62C2C",
          surface: "#FCEBEC",
        },
        info: {
          text: "#2457A6",
          surface: "#EDF3FD",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["40px", { lineHeight: "48px", fontWeight: "700" }],
        "display-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "title-page": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "title-page-mobile": ["26px", { lineHeight: "34px", fontWeight: "700" }],
        "title-section": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "title-section-mobile": ["22px", { lineHeight: "30px", fontWeight: "600" }],
        "title-card": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        value: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "value-mobile": ["30px", { lineHeight: "38px", fontWeight: "700" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        label: ["14px", { lineHeight: "20px", fontWeight: "500" }],
        metadata: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "18px", fontWeight: "400" }],
      },
      borderRadius: {
        control: "8px",
        card: "12px",
        modal: "16px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(18, 40, 34, 0.06)",
        elevated: "0 8px 24px rgba(18, 40, 34, 0.12)",
        modal: "0 16px 48px rgba(18, 40, 34, 0.18)",
      },
      maxWidth: {
        content: "1280px",
      },
      transitionDuration: {
        micro: "100ms",
        quick: "160ms",
        standard: "220ms",
        panel: "280ms",
        emphasis: "600ms",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        exit: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "value-flash": {
          "0%": { backgroundColor: "#E8F3EC" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        "value-flash": "value-flash 600ms linear",
      },
    },
  },
  plugins: [],
};

export default config;

