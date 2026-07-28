import fs from 'fs';
import path from 'path';

const files = [
  'index.html', 'nosotros.html', 'servicios.html', 
  'proyectos.html', 'calculadora.html', 'zolaris-token.html'
];

let changed = 0;
files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add CSS link directly BEFORE </head> if not already there
  if (!content.includes('href="/src/style.css"')) {
    content = content.replace('</head>', '    <link rel="stylesheet" href="/src/style.css">\n</head>');
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ CSS link added: ${file}`);
    changed++;
  } else {
    console.log(`⏭  Already has it: ${file}`);
  }
});

console.log(`\nDone: ${changed} files updated.`);
