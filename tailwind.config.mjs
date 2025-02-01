// tailwind.config.js
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#C22F67",
        secondary: "#808080",
        tertiary: "#404040",
        customGray: "#4D4D4D",
      },
      fontFamily: {
        primary: "var(--font_primary)",
        secondary: "var(--font_secondary)",
        tertiary: "var(--font_tertiary)",
        quaternary: "var(--font_quaternary)",
        generic: "var(--font_generic)",
      },
      lineHeight: {
        primary: "var(--lineheight_primary)",
        secondary: "var(--lineheight_secondary)",
        tertiary: "var(--lineheight_tertiary)",
        quaternary: "var(--lineheight_quaternary)",
        generic: "var(--lineheight_generic)",
      },
      fontWeight: {
        between: 550, // Custom font weight between medium (500) and semibold (600)
      },
      keyframes: {
        textInOut: {
          "0%": { opacity: 0, transform: "translateY(-100%)" },
          "20%": { opacity: 1, transform: "translateY(0)" },
          "80%": { opacity: 1, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(100%)" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        textInOut: "textInOut 3s ease-in-out infinite",
        "slide-in": "slideIn 0.25s ease-in-out forwards",
        "slide-out": "slideOut 0.25s ease-in-out forwards",
      },
    },
    plugins: [],
  },
};
