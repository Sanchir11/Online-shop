const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const replacements = [
  ['Secret Shop', 'Secret Shop'],
  ['SECRET SHOP', 'SECRET SHOP'],
  ['Luxury Collection 2026', 'Adult Collection 2026'],
  ['Search for luxury items...', 'Search products...'],
  ['Discover The Secret', 'Discover Your'],
  ['Of Luxury', 'Private World'],
  ['Premium Quality, Timeless Design, For Those<br />Who Deserve The Best.', 'Premium adult products with discreet packaging<br />and fast private delivery.'],
  ['Exclusive Drops', 'New Arrivals'],
  ['Elegance Is Not', 'Privacy Is'],
  ['An Option', 'Guaranteed'],
  ["Curated luxury pieces from the world's<br />most prestigious brands.", 'Carefully selected adult wellness products<br />for comfort, quality, and discretion.'],
  ['New Season 2026', 'Fresh Stock 2026'],
  ['Wear The World\'s', 'Explore Premium'],
  ['Finest', 'Adult Essentials'],
  ['From timepieces to haute couture —<br />only the best deserves your attention.', 'From wellness kits to premium accessories —<br />only quality products for adults.'],
  ['Explore Collection', 'Browse Categories'],
  ['Featured Products', 'Featured Products'],
  ['Handpicked Luxury Items Just For You', 'Top picks for adults — curated for you'],
  ['Shop By Category', 'Shop By Category'],
  ['Explore our curated collections', 'Browse our adult product categories'],
  ['Our most-loved luxury pieces', 'Our best-selling adult products'],
  ['Luxury Beyond Limits', 'New Private Arrivals'],
  ['Brand Partners', 'Trusted Brands'],
  ['We carry only the world\'s finest', 'Quality brands you can trust'],
  ['What Our Clients Say', 'Customer Reviews'],
  ['Real reviews from real luxury lovers', 'Real feedback from verified customers'],
  ['Join Our Luxury Club', 'Join Our Private Club'],
  ['Get Exclusive Offers, New Arrivals & Special Discounts.', 'Get discreet offers, new arrivals, and member discounts.'],
  ['We provide the best quality luxury products for our prestigious customers.', 'We provide premium adult products with discreet shipping and private packaging.'],
  ['The Collection', 'All Products'],
  ['Discover every piece of our luxury universe', 'Browse our full range of adult products'],
  ['Royal Black Watch', 'Velvet Pulse Massager'],
  ['Luxury Sneakers', 'Silk Lace Bodysuit'],
  ['Premium Leather Bag', 'Couples Wellness Kit'],
  ['Luxury Jacket', 'Premium Water Lube 250ml'],
  ['Gold Prestige Watch', 'Rechargeable Wand Pro'],
  ['Gold Luxury Watch', 'Rechargeable Wand Pro'],
  ['Designer Handbag', 'Satin Robe Set'],
  ['Luxury Sunglasses', 'Aroma Massage Oil'],
  ['White Sneakers', 'Lace Bralette Set'],
  ['White Elite Sneakers', 'Lace Bralette Set'],
  ['Luxury Perfume', 'Intimate Gel Classic'],
  ['Noir Elegance Parfum', 'Intimate Gel Classic'],
  ['Gold Love Bracelet', 'Satin Blindfold Set'],
  ['Gold Bracelet', 'Satin Blindfold Set'],
  ['Diamond Pendant', 'Remote Couples Kit'],
  ['Noir Tote Bag', 'Wellness Starter Pack'],
  ['Obsidian Chronograph', 'Pulse Mini Wand'],
  ['Satin Stilettos', 'Sheer Stockings Pack'],
  ['Bag', 'Wellness Kit'],
  ['Shoes', 'Lingerie Set'],
  ['Watch', 'Massager'],
  ['Luxury Swiss automatic watch.', 'Premium rechargeable massager with quiet motor.'],
  ['Premium luxury product page starter.', 'Discreet packaging. Adults only (18+).'],
  ['Watches', 'Toys'],
  ['Shoes', 'Lingerie'],
  ['Bags', 'Wellness'],
  ['Perfumes', 'Couples'],
  ['Jewelry', 'Lubricants'],
  ['cat=watches', 'cat=toys'],
  ['cat=shoes', 'cat=lingerie'],
  ['cat=bags', 'cat=wellness'],
  ['cat=perfumes', 'cat=couples'],
  ['cat=jewelry', 'cat=lubricants'],
  ['value="watches"', 'value="toys"'],
  ['value="shoes"', 'value="lingerie"'],
  ['value="bags"', 'value="wellness"'],
  ['value="perfumes"', 'value="couples"'],
  ['value="jewelry"', 'value="lubricants"'],
  ['data-category="watches"', 'data-category="toys"'],
  ['data-category="shoes"', 'data-category="lingerie"'],
  ['data-category="bags"', 'data-category="wellness"'],
  ['data-category="perfumes"', 'data-category="couples"'],
  ['data-category="jewelry"', 'data-category="lubricants"'],
  ['Rolex', 'Velvet'],
  ['Louis Vuitton', 'Pulse'],
  ['Gucci', 'Silk'],
  ['Dior', 'Aura'],
  ['Nike', 'Bloom'],
  ['Tiffany', 'Private'],
  ['Cartier', 'Silk'],
  ['brand-rolex', 'brand-velvet'],
  ['brand-nike', 'brand-bloom'],
  ['brand-dior', 'brand-aura'],
  ['brand-lv', 'brand-pulse'],
  ['brand-gucci', 'brand-silk'],
  ['ROLEX', 'VELVET'],
  ['DIOR', 'AURA'],
  ['GUCCI', 'SILK'],
  ['LV', 'PULSE'],
  ['fab fa-nike', 'fas fa-heart'],
  [' Nike', ' Bloom'],
  ['Apple', 'Private'],
  ['fab fa-apple', 'fas fa-lock'],
  ['John Smith', 'Anonymous A.'],
  ['Sarah Lee', 'Anonymous B.'],
  ['Michael Chen', 'Anonymous C.'],
  ['Secret Shop has the most premium quality products. The packaging, the details, everything is perfect. Highly recommended!"', 'Discreet packaging and fast delivery. Product quality exceeded expectations. Highly recommended!"'],
  ['Absolutely stunning collection. I ordered the Royal Black Watch and I get compliments every single day. World-class service too."', 'Great selection and very discreet service. The wellness kit was exactly as described."'],
  ['The leather bag I purchased exceeded all my expectations. The quality is unmatched. Secret Shop is my go-to for luxury now."', 'Private packaging and helpful support. This is my go-to shop for adult products now."'],
  ['fas fa-crown', 'fas fa-heart'],
  ['hero-watch.png', 'hero-1.jpg'],
  ['hero-bag.png', 'hero-2.jpg'],
  ['hero-shoes.png', 'hero-3.jpg'],
  ['watch-black.jpg', 'product-1.jpg'],
  ['sneakers.jpg', 'product-2.jpg'],
  ['leather-bag.jpg', 'product-3.jpg'],
  ['jacket.jpg', 'product-4.jpg'],
  ['watch-gold.jpg', 'product-5.jpg'],
  ['handbag.jpg', 'product-6.jpg'],
  ['sunglasses.jpg', 'product-7.jpg'],
  ['sneakers-white.jpg', 'product-8.jpg'],
  ['perfume.jpg', 'product-9.jpg'],
  ['bracelet.jpg', 'product-10.jpg'],
  ['arrival-1.jpg', 'product-11.jpg'],
  ['arrival-2.jpg', 'product-12.jpg'],
  ['arrival-3.jpg', 'product-13.jpg'],
  ['arrival-4.jpg', 'product-14.jpg'],
  ['categories/watches.jpg', 'categories/toys.jpg'],
  ['categories/shoes.jpg', 'categories/lingerie.jpg'],
  ['categories/bags.jpg', 'categories/wellness.jpg'],
  ['categories/perfumes.jpg', 'categories/couples.jpg'],
  ['categories/jewelry.jpg', 'categories/lubricants.jpg'],
  ['20 Items', '24 Items'],
  ['15 Items', '18 Items'],
  ['25 Items', '20 Items'],
  ['18 Items', '16 Items'],
  ['30 Items', '22 Items'],
  ['22 Items', '19 Items'],
];

function applyReplacements(content) {
  let out = content;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

for (const rel of ['app/page.jsx', 'app/shop/page.jsx', 'app/product/page.jsx']) {
  const file = path.join(root, rel);
  let c = fs.readFileSync(file, 'utf8');
  c = applyReplacements(c);
  fs.writeFileSync(file, c);
  console.log('Updated', rel);
}

// shop.js
const shopJs = path.join(root, 'public/shop.js');
let shop = fs.readFileSync(shopJs, 'utf8');
shop = shop.replace(
  "const categories = ['watches', 'shoes', 'bags', 'perfumes', 'jewelry', 'accessories'];",
  "const categories = ['toys', 'lingerie', 'wellness', 'couples', 'lubricants', 'accessories'];"
);
shop = shop.replace(
  `  const collectionProductNames = {
    new: ['Royal Black Watch', 'Premium Leather Bag', 'Designer Sneakers', 'Rose Gold Jewelry Set', 'Mini Leather Crossbody'],
    bestsellers: ['Elite Gold Watch', 'Classic Designer Bag', 'Luxury Sunglasses', 'Diamond Pendant Necklace'],
    limited: ['Elite Gold Watch', 'Luxury Sunglasses', 'Signature Eau De Parfum', 'Mini Leather Crossbody'],
    sale: ['Luxury Sneakers', 'Classic Designer Bag', 'Luxury Jacket'],
  };`,
  `  const collectionProductNames = {
    new: ['Velvet Pulse Massager', 'Couples Wellness Kit', 'Silk Lace Bodysuit', 'Remote Couples Kit', 'Wellness Starter Pack'],
    bestsellers: ['Rechargeable Wand Pro', 'Satin Robe Set', 'Aroma Massage Oil', 'Remote Couples Kit'],
    limited: ['Rechargeable Wand Pro', 'Aroma Massage Oil', 'Intimate Gel Classic', 'Wellness Starter Pack'],
    sale: ['Silk Lace Bodysuit', 'Satin Robe Set', 'Premium Water Lube 250ml'],
  };`
);
fs.writeFileSync(shopJs, shop);
console.log('Updated public/shop.js');
