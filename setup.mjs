#!/usr/bin/env node
// Accessibility Widget — Interactive Setup
// Kullanim: cd src/components/a11y && node setup.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const ALL = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ar', 'he', 'ru'];
const DEFAULT_LOCALE = 'tr';
const DEFAULT_FONT = "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const DEFAULT_BORDER_WIDTH = '3px';
const DEFAULT_BORDER_RADIUS = '0.5rem';
const DEFAULT_POSITION = 'bottom-left';

function findProjectTokens() {
  const candidates = [
    'src/lib/design-system/tokens.config.ts',
    '../../lib/design-system/tokens.config.ts',
    '../../../lib/design-system/tokens.config.ts',
    '../../../src/lib/design-system/tokens.config.ts',
  ];
  for (const p of candidates) {
    const abs = resolve(process.cwd(), p);
    if (existsSync(abs)) return { path: abs, content: readFileSync(abs, 'utf8') };
  }
  return null;
}

function extract(content, key, fallback) {
  const re = new RegExp(`${key}\\s*:\\s*['"\`]([^'"\`]+)['"\`]`);
  const m = content.match(re);
  return m ? m[1] : fallback;
}

const rl = createInterface({ input, output });
const ask = (q, def) => rl.question(`${q}${def ? ` (ENTER = ${def})` : ''}: `).then(a => a.trim() || def || '');

console.log('\n♿ Accessibility Widget — Kurulum');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const tokens = findProjectTokens();
let detectedFont = null, detectedRadius = null, detectedBorder = null;
if (tokens) {
  console.log(`📐 Proje tokens dosyasi bulundu: ${tokens.path}`);
  detectedFont = extract(tokens.content, 'fontFamily|family|sans', null);
  detectedRadius = extract(tokens.content, 'borderRadius|radius\\.md|radius', null);
  detectedBorder = extract(tokens.content, 'borderWidth|border', null);
  console.log(`   Font: ${detectedFont ?? '(yok)'} | Radius: ${detectedRadius ?? '(yok)'} | Border: ${detectedBorder ?? '(yok)'}\n`);
} else {
  console.log('ℹ️  tokens.config.ts bulunamadi — varsayilanlar kullanilacak.\n');
}

const langsAns = await ask(`Diller [${ALL.join(', ')}] virgulle ayirin`, DEFAULT_LOCALE);
const defaultLocale = await ask('Varsayilan dil', DEFAULT_LOCALE);
const font = await ask('Yazi tipi (font-family)', detectedFont ? `'${detectedFont}', system-ui, sans-serif` : DEFAULT_FONT);
const borderWidth = await ask('Buton border genisligi', detectedBorder || DEFAULT_BORDER_WIDTH);
const borderRadius = await ask('Buton kose yuvarliyi', detectedRadius || DEFAULT_BORDER_RADIUS);
const position = await ask('FAB butonu konumu (bottom-left / bottom-right / top-left / top-right)', DEFAULT_POSITION);

rl.close();

const requested = langsAns.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
if (!requested.includes(defaultLocale)) requested.unshift(defaultLocale);

const invalid = requested.filter(l => !ALL.includes(l));
if (invalid.length) {
  console.error(`\n❌ Gecersiz dil(ler): ${invalid.join(', ')}`);
  process.exit(1);
}

const validPositions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
if (!validPositions.includes(position)) {
  console.error(`\n❌ Gecersiz konum: ${position}. Gecerli: ${validPositions.join(', ')}`);
  process.exit(1);
}

const translations = JSON.parse(readFileSync('translations.json', 'utf8'));
const trimmed = Object.fromEntries(
  Object.entries(translations).filter(([k]) => requested.includes(k))
);
writeFileSync('translations.json', JSON.stringify(trimmed, null, 2));

let widget = readFileSync('AccessibilityWidget.tsx', 'utf8');
widget = widget.replace(/const DEFAULT_FONT = .+;/, `const DEFAULT_FONT = ${JSON.stringify(font)};`);
widget = widget.replace(/locale = '[a-z]{2}'/g, `locale = '${defaultLocale}'`);
widget = widget.replace(/borderWidth = '[^']+'/, `borderWidth = '${borderWidth}'`);
widget = widget.replace(/borderRadius = '[^']+'/, `borderRadius = '${borderRadius}'`);
widget = widget.replace(/position = '[^']+'/, `position = '${position}'`);
writeFileSync('AccessibilityWidget.tsx', widget);

console.log('\n✅ Kurulum tamamlandi.');
console.log(`   Diller:        ${requested.join(', ')}`);
console.log(`   Varsayilan:    ${defaultLocale}`);
console.log(`   Font:          ${font}`);
console.log(`   Border:        ${borderWidth} solid`);
console.log(`   Radius:        ${borderRadius}`);
console.log(`   Konum:         ${position}`);
console.log(`   Bundle azal.:  ~${Math.round((1 - requested.length / ALL.length) * 100)}%\n`);
console.log('Sonraki adim:');
console.log('  1. globals.css icine: @import "@/components/a11y/styles.css";');
console.log('  2. layout.tsx icine: <AccessibilityWidget /> (body sonunda)');
console.log('  3. (Opsiyonel) Disleksi font icin: <link href="https://cdn.jsdelivr.net/.../OpenDyslexic.css">');
