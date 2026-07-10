#!/usr/bin/env node
// Extrae el <script> embebido en index.html y verifica que la sintaxis
// sea válida (node --check). No corre la lógica, solo valida que el
// archivo no tenga errores de sintaxis antes de commitear.
//
// Uso: node tests/syntax-check.js

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('No se encontró index.html en la raíz del repo.');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');
const match = html.match(/<script>([\s\S]*)<\/script>/);

if (!match) {
  console.error('No se encontró un bloque <script> en index.html.');
  process.exit(1);
}

const tmpPath = path.join(__dirname, '_extracted.tmp.js');
fs.writeFileSync(tmpPath, match[1]);

try {
  execSync(`node --check "${tmpPath}"`, { stdio: 'inherit' });
  console.log('OK — sintaxis válida.');
} catch (e) {
  console.error('FALLÓ — hay un error de sintaxis en el script.');
  process.exit(1);
} finally {
  fs.unlinkSync(tmpPath);
}
