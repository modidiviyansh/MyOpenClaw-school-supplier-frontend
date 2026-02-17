import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Instrument Sans", "sans-serif"],
      },
      colors: {
        // Reverting to literal values to avoid CSS variable parsing issues in globals.css
        primary: "#4F46E5", // Indigo 600
        secondary: "#6366F1", // Indigo 500
        accent: "#EC4899", // Pink 500 (a sharp, contrasting accent)
        background: "#FDFDFA", // Off-white for luxury feel
        foreground: "#0A0A0A", // Near-black for text
        card: "#FFFFFF",
        "card-foreground": "#0A0A0A",

        // Define specific shades of gray for better dark mode control
        // These will be overridden by the .dark class directly if needed, or by theme-aware components
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#0B101B",
        },
        // Define specific colors for categories and stock status
        green: {
          100: "#D1FAE5",
          700: "#047857",
          900: "#064E3B",
          300: "#6EE7B7",
        },
        amber: {
          100: "#FEF3C7",
          700: "#B45309",
          900: "#78350F",
          300: "#FCD34D",
        },
        indigo: {
          50: "#EEF2FF",
          950: "#1E1B4B",
        },
        yellow: {
          50: "#FEFCE8",
          950: "#422006",
          500: "#EAB308",
        },
        orange: {
          500: "#F97316",
        },
        emerald: {
          500: "#10B981",
        },
        rose: {
          500: "#F43F5E",
        },
        violet: {
          50: "#F5F3FF",
          950: "#2A0F55",
          500: "#8B5CF6",
        },
        purple: {
          500: "#A855F7",
        },
        red: {
          50: "#FEF2F2",
          950: "#450A0A",
          500: "#EF4444",
        },
        blue: {
          500: "#3B82F6",
        },

      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        "text-reveal": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)",
            filter: "blur(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)"
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "grain-shift": "grain-shift 8s steps(10) infinite",
        "text-reveal": "text-reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
