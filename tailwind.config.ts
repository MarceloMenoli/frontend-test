import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      'lg-custom': '1050px',
    },
    colors: {
      "text-black": "#000",
      "primary": "var(--first-color)",
      "secondary": "var(--second-color)",
      "tertiary": "var(--third-color)",
      "bg-color": "var(--bg-color)",
      "bg-color-table": "var(--bg-color-table)"
    }
  },
  plugins: [],
};
export default config;
