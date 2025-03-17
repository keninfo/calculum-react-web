/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'carousel-background': "url('/backgrounds/carousel-bg.svg')",
      },
      colors: {
        primary: 'var(--color-primary)',
        dark: 'var(--color-dark)',
        eerie: 'var(--color-eerie)',
        payne: 'var(--color-payne)',
        grey: 'var(--color-grey)',
        anti: 'var(--color-anti)',
        offWhite: 'var(--color-offWhite)',
        spring: 'var(--color-spring)',
        atomic: 'var(--color-atomic)',
        fire: 'var(--color-fire)',
        robin: 'var(--color-robin)',
        true: 'var(--color-true)',
        burnt: 'var(--color-burnt)',
        citron: 'var(--color-citron)',
      },
    },
  },
  plugins: [],
}
