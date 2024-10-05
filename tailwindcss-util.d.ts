// tailwindcss-util.d.ts
declare module 'tailwindcss/lib/util/flattenColorPalette' {
    export default function flattenColorPalette(colors: any): Record<string, string>;
  }
  
export function addVariablesForColors({ addBase, theme }: { addBase: (styles: Record<string, Record<string, string>>) => void, theme: (path: string) => Record<string, string> }): void;
