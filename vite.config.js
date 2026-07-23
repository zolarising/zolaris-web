import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  // Ruta base para GitHub Pages (el sitio vive en /zolaris-web/)
  base: '/zolaris-web/',
  plugins: [
    tailwindcss(),
  ],
  build: {
    // Compila a docs/ para poder publicar en GitHub Pages (opcion /docs)
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:       resolve(__dirname, 'index.html'),
        nosotros:   resolve(__dirname, 'nosotros.html'),
        proyectos:  resolve(__dirname, 'proyectos.html'),
        servicios:  resolve(__dirname, 'servicios.html'),
        calculadora: resolve(__dirname, 'calculadora.html'),
        dashboard:  resolve(__dirname, 'dashboard-web3.html'),
        zolaris:    resolve(__dirname, 'zolaris-token.html'),
      },
    },
  },
  // Evita que Vite use 404.html como fallback SPA en desarrollo
  server: {
    open: false,
  }
});