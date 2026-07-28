/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zolaris: {
          dark: '#0B2B46',   // Azul oscuro del texto "Zolaris"
          blue: '#1B3D6D',   // Azul medio del isotipo
          orange: '#F7A600', // Naranja del sol
          yellow: '#FDCB58', // Amarillo del sol
          gray: '#F3F4F6',   // Fondo suave
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente limpia y moderna
      }
    },
  },
  plugins: [],
}