#!/usr/bin/env node

/**
 * Script para preparar el directorio www
 * Ejecutar: node scripts/prepare-dist.js
 */

const fs = require('fs');
const path = require('path');

const WWW_DIR = path.join(__dirname, '..', 'www');
const INDEX_HTML_SOURCE = path.join(__dirname, '..', 'index.html');
const INDEX_HTML_DEST = path.join(WWW_DIR, 'index.html');

console.log('📦 Preparando directorio www...\n');

// Crear directorio www si no existe
if (!fs.existsSync(WWW_DIR)) {
  fs.mkdirSync(WWW_DIR, { recursive: true });
  console.log('✓ Creada carpeta www/');
} else {
  console.log('✓ Carpeta www/ ya existe');
}

// Copiar index.html a www
if (fs.existsSync(INDEX_HTML_SOURCE)) {
  fs.copyFileSync(INDEX_HTML_SOURCE, INDEX_HTML_DEST);
  console.log('✓ Copiado index.html a www/');
} else {
  console.error('❌ Error: index.html no encontrado en la raíz');
  process.exit(1);
}

console.log('\n✅ Directorio www preparado!');
console.log('\n📝 Próximo paso: npx cap sync');



