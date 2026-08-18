#!/usr/bin/env node
/**
 * Convert all USD prices to Mongolian Tugrik (₮).
 * Rate: 1 USD ≈ 3,500₮, rounded to nearest 1,000₮.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RATE = 3500;

function usdToMnt(usd) {
  const n = Number(String(usd).replace(/,/g, ''));
  if (!n) return 0;
  return Math.round((n * RATE) / 1000) * 1000;
}

function formatMnt(amount) {
  return `${Number(amount).toLocaleString('en-US')}₮`;
}

function convertUsdString(match, amountStr) {
  const usd = parseFloat(amountStr.replace(/,/g, ''));
  return formatMnt(usdToMnt(usd));
}

function convertFile(relPath) {
  const file = path.join(ROOT, relPath);
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/\$([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?)/g, (m, amt) =>
    convertUsdString(m, amt)
  );
  content = content.replace(/\$([0-9]+(?:\.[0-9]{2})?)/g, (m, amt) =>
    convertUsdString(m, amt)
  );

  content = content.replace(
    /data-price=\\"(\d+)\\"((?:[^"\\]|\\.)*?class=\\"price-current\\">)([\d,]+)₮/g,
    (_, _old, mid, mntDisplay) => {
      const mnt = parseInt(mntDisplay.replace(/,/g, ''), 10);
      return `data-price=\\"${mnt}\\"${mid}${formatMnt(mnt)}`;
    }
  );

  content = content.replace(/min=\\"0\\" max=\\"5000\\"/g, 'min=\\"0\\" max=\\"17500000\\"');
  content = content.replace(
    /value=\\"5000\\" class=\\"price-range-slider price-max\\"/g,
    'value=\\"17500000\\" class=\\"price-range-slider price-max\\"'
  );

  fs.writeFileSync(file, content);
  console.log('Updated', relPath);
}

['app/page.jsx', 'app/shop/page.jsx', 'app/product/page.jsx'].forEach(convertFile);

const shopJs = path.join(ROOT, 'public/shop.js');
let shop = fs.readFileSync(shopJs, 'utf8');
shop = shop.replace(
  "const money = value => '$' + Number(value || 0).toLocaleString();",
  "const money = value => Number(value || 0).toLocaleString('en-US') + '₮';"
);
fs.writeFileSync(shopJs, shop);
console.log('Updated public/shop.js');

console.log('\nSample conversions:');
[29, 79, 799, 5000].forEach((u) => console.log(`  $${u} → ${formatMnt(usdToMnt(u))}`));
