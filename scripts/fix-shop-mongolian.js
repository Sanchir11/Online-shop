#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app/shop/page.jsx');
let content = fs.readFileSync(file, 'utf8');
const match = content.match(/const html = "([\s\S]*)";/);
if (!match) {
  console.error('Could not parse shop html');
  process.exit(1);
}
let html = JSON.parse('"' + match[1] + '"');

const replacements = [
  ['<title>Shop - Secret Shop (18+)</title>', ''],
  ['50% Off This Week', 'Энэ долоо хоногт 50% хямдралтай'],
  ['Support 24/7', '24/7 хэрэглэгчийн үйлчилгээ'],
  ['Adult Collection 2026', 'Насанд хүрэгчдийн цуглуулга 2026'],
  ['>Home</a>', '>Нүүр</a>'],
  ['Collections <i', 'Цуглуулгууд <i'],
  ['New Arrivals', 'Шинэ бүтээгдэхүүн'],
  ['Best Sellers', 'Шилдэг борлуулалт'],
  ['>Sale</a>', '>Хямдрал</a>'],
  ['Categories <i', 'Ангиллууд <i'],
  ['>Toys</a>', '>Тоглоом</a>'],
  ['>Lingerie</a>', '>Дотуур хувцас</a>'],
  ['>Wellness</a>', '>Эрүүл мэнд</a>'],
  ['>Couples</a>', '>Хосын</a>'],
  ['>Lubricants</a>', '>Тос, гель</a>'],
  ['>Accessories</a>', '>Дагалдах</a>'],
  ['>Contact</a>', '>Холбоо барих</a>'],
  ['aria-label="Search"', 'aria-label="Хайх"'],
  ['placeholder="Search products..."', 'placeholder="Бүтээгдэхүүн хайх..."'],
  ['aria-label="Menu"', 'aria-label="Цэс"'],
  ['The <span class="gold">Collection</span>', 'Бүх <span class="gold">бүтээгдэхүүн</span>'],
  ['Browse our full range of adult products', 'Насанд хүрэгчдийн бүтээгдэхүүний каталог'],
  ['aria-label="Breadcrumb"', 'aria-label="Зам"'],
  ['<span>Shop</span>', '<span>Дэлгүүр</span>'],
  ['>Filter</h3>', '>Шүүлтүүр</h3>'],
  ['>Search</h4>', '>Хайх</h4>'],
  ['>Categories</h4>', '>Ангиллууд</h4>'],
  ['All Products', 'Бүх бүтээгдэхүүн'],
  ['value="watches"', 'value="toys"'],
  ['value="shoes"', 'value="lingerie"'],
  ['value="bags"', 'value="wellness"'],
  ['value="perfumes"', 'value="lubricants"'],
  ['value="jewelry"', 'value="couples"'],
  ['/> Toys <', '/> Тоглоом <'],
  ['/> Lingerie <', '/> Дотуур хувцас <'],
  ['/> Wellness <', '/> Эрүүл мэнд <'],
  ['/> Couples <', '/> Хосын <'],
  ['/> Lubricants <', '/> Тос, гель <'],
  ['/> Accessories <', '/> Дагалдах <'],
  ['>Price Range</h4>', '>Үнийн хязгаар</h4>'],
  ['min="0" max="5000" value="0"', 'min="0" max="17500000" value="0"'],
  ['min="0" max="5000" value="5000"', 'min="0" max="17500000" value="17500000"'],
  ['>Brands</h4>', '>Брэнд</h4>'],
  ['>Rating</h4>', '>Үнэлгээ</h4>'],
  ['5 Stars', '5 од'],
  ['4+ Stars', '4+ од'],
  ['3+ Stars', '3+ од'],
  ['>Availability</h4>', '>Боломж</h4>'],
  ['In Stock', 'Нөөцтэй'],
  ['Pre-Order', 'Урьдчилсан захиалга'],
  ['Apply Filters', 'Шүүх'],
  ['Clear All', 'Цэвэрлэх'],
  ['<i class="fas fa-sliders-h"></i> Filter', '<i class="fas fa-sliders-h"></i> Шүүлтүүр'],
  ['Showing <strong id="resultsCount">24</strong> of <strong>130</strong> results', '<strong id="resultsCount">12</strong> бүтээгдэхүүн'],
  ['aria-label="Grid view"', 'aria-label="Хүснэгт харагдац"'],
  ['aria-label="List view"', 'aria-label="Жагсаалт харагдац"'],
  ['>Sort:</label>', '>Эрэмбэ:</label>'],
  ['Featured', 'Онцлох'],
  ['Newest First', 'Шинэ нь эхэнд'],
  ['Price: Low to High', 'Үнэ: бага → их'],
  ['Price: High to Low', 'Үнэ: их → бага'],
  ['Top Rated', 'Өндөр үнэлгээ'],
  ['Best Selling', 'Шилдэг борлуулалт'],
  ['badge-new">New</div>', 'badge-new">Шинэ</div>'],
  ['badge-sale">Sale</div>', 'badge-sale">Хямдрал</div>'],
  ['aria-label="Wishlist"', 'aria-label="Зүрхэлсэн"'],
  ['Quick View', 'Харах'],
  ['Add To Cart', 'Сагсанд нэмэх'],
  ['data-category="watches"', 'data-category="toys"'],
  ['data-category="shoes"', 'data-category="lingerie"'],
  ['data-category="bags"', 'data-category="wellness"'],
  ['data-category="perfumes"', 'data-category="lubricants"'],
  ['data-category="jewelry"', 'data-category="couples"'],
  ['Velvet Pulse Massager', 'Velvet Pulse массажер'],
  ['Silk Lace Bodysuit', 'Silk Lace боди'],
  ['Couples Wellness Kit', 'Хосын wellness багц'],
  ['Premium Water Lube 250ml', 'Premium усан суурьт тос 250мл'],
  ['Rechargeable Wand Pro', 'Цэнэглэдэг Wand Pro'],
  ['Satin Robe Set', 'Satin халатны багц'],
  ['Aroma Massage Oil', 'Aroma массаж тос'],
  ['Lace Bralette Set', 'Lace bralette багц'],
  ['Intimate Gel Classic', 'Intimate gel classic'],
  ['Remote Couples Kit', 'Remote хосын багц'],
  ['Satin Blindfold Set', 'Satin blindfold багц'],
  ['Wellness Starter Pack', 'Эрүүл мэнд starter багц'],
  ['Customer Service', 'Харилцагчийн үйлчилгээ'],
  ['Contact Us', 'Бидэнтэй холбогдох'],
  ['FAQs', 'Түгээмэл асуултууд'],
  ['Shipping Policy', 'Хүргэлтийн нөхцөл'],
  ['Return Policy', 'Буцаалтын нөхцөл'],
  ['Privacy Policy', 'Нууцлалын бодлого'],
  ['We provide premium adult products with discreet shipping and private packaging.', 'Нууц хүргэлт, чанартай бүтээгдэхүүн санал болгодог.'],
  ['All Rights Reserved.', 'Бүх эрх хуулиар хамгаалагдсан.'],
  ['Item added to cart!', 'Бүтээгдэхүүн сагсанд нэмэгдлээ!'],
  ['aria-label="Back to top"', 'aria-label="Дээш буцах"'],
];

for (const [from, to] of replacements) {
  html = html.split(from).join(to);
}

const escaped = JSON.stringify(html).slice(1, -1);
content = content.replace(/const html = "[\s\S]*";/, `const html = "${escaped}";`);
content = content.replace(
  'export const metadata = { title: "Shop - Secret Shop (18+)" };',
  'export const metadata = { title: "Дэлгүүр — Secret Shop" };'
);
fs.writeFileSync(file, content);
console.log('Shop page updated');
console.log('price max 17500000', html.includes('max="17500000"'));
console.log('data-category toys', html.includes('data-category="toys"'));
console.log('still Collection', html.includes('The Collection'));
console.log('still max=5000', html.includes('max="5000"'));
