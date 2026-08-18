#!/usr/bin/env node
/**
 * Copy user-provided sketch images into public/assets and map to all site slots.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(
  process.env.HOME,
  '.cursor/projects/Users-macbookpro-Documents-soyloo-shop-Online-shop/assets'
);

const sources = [
  'image-287c412b-02d8-4506-bfd6-b59f6d4e59bb.png',
  'image-64807b12-3493-4fb7-8873-6b8f4921fb5e.png',
  'image-39a9bfd1-8fc9-458b-96d3-3977aca0bd80.png',
  'image-75d33a20-f317-4fae-87bf-c84a1f2cd676.png',
  'image-1ba81f75-afaf-4481-ad78-ed69b3b40b6b.png',
];

const img = (n) => path.join(SRC, sources[(n - 1) % sources.length]);

const targets = [
  ['hero-1.png', img(1)],
  ['hero-2.png', img(2)],
  ['hero-3.png', img(3)],
  ['flash-sale-product.png', img(4)],
  ...Array.from({ length: 14 }, (_, i) => [`products/product-${i + 1}.png`, img(i + 1)]),
  ['categories/toys.png', img(1)],
  ['categories/lingerie.png', img(2)],
  ['categories/wellness.png', img(3)],
  ['categories/couples.png', img(4)],
  ['categories/lubricants.png', img(5)],
  ['categories/accessories.png', img(1)],
  ['testimonials/john.png', img(1)],
  ['testimonials/sarah.png', img(2)],
  ['testimonials/mike.png', img(3)],
];

const outDir = path.join(ROOT, 'public/assets/images');
fs.mkdirSync(outDir, { recursive: true });

for (const [rel, src] of targets) {
  const dest = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(src)) {
    console.error('Missing source:', src);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log('✓', rel);
}

const pages = ['app/page.jsx', 'app/shop/page.jsx', 'app/product/page.jsx'];
for (const rel of pages) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  const next = content.replace(/\/assets\/images\/([^"']+)\.jpg/g, '/assets/images/$1.png');
  if (next !== content) {
    fs.writeFileSync(file, next);
    console.log('Updated', rel);
  }
}

console.log('\nPlaceholder images ready.');
