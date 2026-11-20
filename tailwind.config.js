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
        // Paleta nocturna inspirada en el atardecer urbano (original, sin logos de terceros)
        neon: {
          blue: '#45D6DA',   // turquesa: jugador
          purple: '#3A3766', // bordes
          green: '#45D6DA',
          pink: '#FF985C',   // atardecer
          lila: '#FC529C',   // rosa neón: títulos y etiquetas
        },
        dark: {
          bg: '#111021',
          card: '#1B1A33',
          hover: '#26244A',
        },
        // Violeta: acción principal y tintes de fondo (sustituye al ocre)
        ochre: {
          50: '#F7F0FF',
          200: '#D9C2F5',
          300: '#C29BEE',
          400: '#B07AF0',
          500: '#9956EB',
          600: '#8A45DA',
          700: '#6E31B0',
          800: '#4F2384',
          900: '#2E1452',
          950: '#1A0B30',
        },
        // Rosa y magenta: impostor y acciones peligrosas (sustituye a la ceniza)
        ember: {
          400: '#FF985C',
          500: '#FC529C',
          600: '#D63A85',
          700: '#A8286A',
          900: '#3E0F2E',
        },
      },
      boxShadow: {
        // Resplandor suave de neón en lugar de sombra dura
        'neon-blue': '0 0 0 1px rgba(69,214,218,0.35), 0 8px 28px rgba(69,214,218,0.18)',
        'neon-purple': '0 0 0 1px rgba(153,86,235,0.35), 0 8px 28px rgba(153,86,235,0.18)',
        'neon-green': '0 0 0 1px rgba(69,214,218,0.35), 0 8px 28px rgba(69,214,218,0.18)',
        'neon-lila': '0 0 0 1px rgba(252,82,156,0.35), 0 8px 28px rgba(252,82,156,0.2)',
      },
    },
  },
  plugins: [],
}
