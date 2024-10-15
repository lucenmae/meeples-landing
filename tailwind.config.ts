import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
// import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			primary: ['Inter', ...defaultTheme.fontFamily.sans],
  			poppins: ['Poppins', 'sans-serif']
  		},
  		colors: {
  			primary: {
  				'50': 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
  				'100': 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
  				'200': 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
  				'300': 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
  				'400': 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
  				'500': 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
  				'600': 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
  				'700': 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
  				'800': 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
  				'900': 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
  				'950': 'rgb(var(--tw-color-primary-950) / <alpha-value>)'
  			},
  			dark: '#222222',
  			meeple: {
  				primary: '#f3cc15',
  				secondary: '#f5bf22',
  				tertiary: '#86d3ea',
  				shadow: '#2b2a28'
  			}
  		},
  		gridTemplateColumns: {
  			'20': 'repeat(25, minmax(0, 1fr))'
  		},
  		keyframes: {},
  		animation: {},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
      require("tailwindcss-animate")
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
