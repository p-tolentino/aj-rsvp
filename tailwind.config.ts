import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7d9cb9",
          foreground: "#f0f0f0",
        },
        secondary: {
          DEFAULT: "#1c2f4f",
          foreground: "#f0f0f0",
        },
        accent: {
          DEFAULT: "#1c2f4f",
          foreground: "#f0f0f0",
        },
        muted: {
          DEFAULT: "#f0f0f0",
          foreground: "#1c2f4f",
        },
        card: {
          DEFAULT: "#f0f0f0",
          foreground: "#020403",
        },
        dark: "#020403",
        light: "#f0f0f0",
        blue: {
          light: "#7d9cb9",
          dark: "#1c2f4f",
        },
        brown: {
          "50": "#fdf8f6",
          "100": "#f2e8e5",
          "200": "#eaddd7",
          "300": "#e0cec7",
          "400": "#d2bab0",
          "500": "#bfa094",
          "600": "#a18072",
          "700": "#977669",
          "800": "#846358",
          "900": "#43302b",
        },
        gold: {
          "50": "#fffdf0",
          "100": "#fff9c4",
          "200": "#fff59d",
          "300": "#fff176",
          "400": "#ffee58",
          "500": "#ffeb3b",
          "600": "#fdd835",
          "700": "#fbc02d",
          "800": "#f9a825",
          "900": "#f57f17",
        },
        rose: {
          "50": "#fff1f2",
          "100": "#ffe4e6",
          "200": "#fecdd3",
          "300": "#fda4af",
          "400": "#fb7185",
          "500": "#f43f5e",
          "600": "#e11d48",
          "700": "#be123c",
          "800": "#9f1239",
          "900": "#881337",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        script: ["var(--font-dancing-script)", "cursive"],
      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
