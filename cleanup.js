import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'nosotros.html', 'servicios.html', 
  'proyectos.html', 'calculadora.html', 'dashboard-web3.html', 
  'zolaris-token.html'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Remove CDN script
  content = content.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g, '');

  // 2. Remove inline tailwind config script
  content = content.replace(/<script>[\s\S]*?tailwind\.config[\s\S]*?<\/script>/g, '');

  // 3. Add <script type="module" src="/src/main.js"></script> before </head> if not exists
  if (!content.includes('src="/src/main.js"')) {
    content = content.replace('</head>', '    <script type="module" src="/src/main.js"></script>\n</head>');
  }

  // 4. Remove inline <style>#page-progress...</style> near the bottom
  content = content.replace(/<!-- Barra de progreso de carga \(top\)? -->[\s\S]*?<style>[\s\S]*?#page-progress[\s\S]*?<\/style>/g, '<!-- Barra de progreso de carga -->');
  content = content.replace(/<!-- Barra de progreso de carga -->[\s\S]*?<style>[\s\S]*?#page-progress[\s\S]*?<\/style>/g, '<!-- Barra de progreso de carga -->');

  // 5. Remove the inline script that was added near the bottom
  content = content.replace(/<script>[\s\S]*?const progressBar = document\.getElementById\('page-progress'\);[\s\S]*?<\/script>/g, '');

  // Write back
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Cleaned ${file}`);
});
