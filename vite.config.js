import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  // IMPORTANTE: nombre del repositorio de GitHub
  base: '/zolaris-web/',

  plugins: [
    tailwindcss(),
  ],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        calculadora: resolve(__dirname, 'calculadora.html'),
        dashboard: resolve(__dirname, 'dashboard-web3.html'),
        zolaris: resolve(__dirname, 'zolaris-token.html'),
      },
    },
  },

  server: {
    open: false,
  },
});