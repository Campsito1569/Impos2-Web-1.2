/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Big Shoulders Display"', 'Impact', 'sans-serif'],
        body: ['"Atkinson Hyperlegible"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Tinta cálida: fondo de habitación con poca luz
        neon: {
          blue: '#8FB3C9',
          purple: '#4A3B2E',
          green: '#7FB69A',
          pink: '#E07A5F',
          lila: '#E2A93B',
        },
        dark: {
          bg: '#14100D',
          card: '#1E1915',
          hover: '#2A221C',
        },
        // Ocre: acción principal y tintes de fondo (sustituye al morado)
        ochre: {
          50: '#FBF5EA',
          200: '#EBD9B8',
          300: '#E2C28E',
          400: '#D9A35C',
          500: '#C98B3E',
          600: '#9A6228',
          700: '#7E5222',
          800: '#56381B',
          900: '#35220F',
          950: '#1E1409',
        },
        // Ceniza roja: impostor y acciones peligrosas (sustituye al fucsia)
        ember: {
          400: '#E8674B',
          500: '#D2503A',
          600: '#B8402B',
          700: '#962F20',
          900: '#4A170F',
        },
      },
      boxShadow: {
        // Sombras duras sin brillo: como una carta impresa sobre la mesa
        'neon-blue': '4px 4px 0 0 #0A0806',
        'neon-purple': '4px 4px 0 0 #0A0806',
        'neon-green': '4px 4px 0 0 #0A0806',
        'neon-lila': '4px 4px 0 0 #0A0806',
      },
    },
  },
  plugins: [],
}
