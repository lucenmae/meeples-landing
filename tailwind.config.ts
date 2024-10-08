import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
      },
      gridTemplateColumns: {
        20: 'repeat(25, minmax(0, 1fr))',
      },
      keyframes: {
      },
      animation: {
        
      },
    },
  },
  plugins: [
    // addVariablesForColors,
    // function ({ matchUtilities, theme }: { matchUtilities: (arg0: Record<string, (value: string) => Record<string, string>>, arg1: { values: Record<string, string> }) => void, theme: (arg0: string) => Record<string, string> }) {
    //   matchUtilities(
    //     {
    //       "bg-grid": (value: string) => ({
    //         backgroundImage: `url("${svgToDataUri(
    //           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
    //         )}")`,
    //       }),
    //       "bg-grid-small": (value: string) => ({
    //         backgroundImage: `url("${svgToDataUri(
    //           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
    //         )}")`,
    //       }),
    //       "bg-dot": (value: string) => ({
    //         backgroundImage: `url("${svgToDataUri(
    //           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
    //         )}")`,
    //       }),
    //     },
    //     { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
    //   );
    // },
  ],
};

export default config;

// // This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
// function addVariablesForColors({ addBase, theme }: { addBase: any; theme: any }) {
//   const allColors = flattenColorPalette(theme('colors'));
//   const newVars = Object.fromEntries(
//     Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
//   );

//   addBase({
//     ':root': newVars,
//   });
// }
