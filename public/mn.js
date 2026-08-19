/* Secret Shop — Mongolian UI (Adult store) */
(function () {
  'use strict';

  const text = {
    'Free Shipping Worldwide': 'Шуурхай хүргэлт',
    '50% Off This Week': 'Энэ долоо хоногт 50% хямдралтай',
    'Support 24/7': '24/7 хэрэглэгчийн үйлчилгээ',
    'Adult Collection 2026': 'Насанд хүрэгчдийн цуглуулга 2026',
    'Home': 'Нүүр', 'Shop': 'Дэлгүүр', 'Collections': 'Цуглуулгууд', 'Categories': 'Ангиллууд',
    'Contact': 'Холбоо барих', 'New Arrivals': 'Шинэ бүтээгдэхүүн', 'Best Sellers': 'Шилдэг борлуулалт',
    'Limited Edition': 'Хязгаарлагдмал', 'Sale': 'Хямдрал',
    'Toys': 'Тоглоом', 'Lingerie': 'Дотуур хувцас', 'Wellness': 'Эрүүл мэнд',
    'Couples': 'Хосын', 'Lubricants': 'Тос, гель', 'Accessories': 'Дагалдах',
    'Discover Your': 'Хувийн ертөнцөө', 'Private World': 'нээн ол',
    'Premium adult products with discreet packaging<br />and fast private delivery.': 'Хурдан шуурхай чанартай бүтээгдэхүүн санал болгоноооооо',
    'Privacy Is': 'Нууцлал бол', 'Guaranteed': 'баталгаатай',
    'Carefully selected adult wellness products<br />for comfort, quality, and discretion.': 'Чанар, тав тух, нууцлалыг эрхэмлэн сонгосон бүтээгдэхүүн.',
    'Fresh Stock 2026': '2026 шинэ нөөц', 'Explore Premium': 'Дээд зэргийн',
    'Adult Essentials': 'бүтээгдэхүүн',
    'From wellness kits to premium accessories —<br />only quality products for adults.': 'Эрүүл мэндийн багцаас дагалдах хэрэгслүүд хүртэл — зөвхөн чанартай.',
    'Shop Now': 'Одоо худалдаж авах', 'Browse Categories': 'Ангилал үзэх',
    'Featured Products': 'Онцлох бүтээгдэхүүн', 'Top picks for adults — curated for you': 'Танд зориулсан шилдэг сонголтууд',
    'View All Products': 'Бүх бүтээгдэхүүн', 'Shop By Category': 'Ангиллаар үзэх',
    'Browse our adult product categories': 'Бүтээгдэхүүний ангиллуудыг үзэх',
    'Items': 'бүтээгдэхүүн', 'Flash Sale': 'Шуурхай хямдрал', 'Limited Time Offer': 'Хугацаа хязгаартай',
    'Days': 'Өдөр', 'Hours': 'Цаг', 'Minutes': 'Минут', 'Seconds': 'Секунд',
    'Our best-selling adult products': 'Хамгийн их борлогдсон бүтээгдэхүүн',
    'New Private Arrivals': 'Шинэ ирц', 'Discover what just landed': 'Шинээр ирсэн бүтээгдэхүүн',
    'New': 'Шинэ', 'View': 'Үзэх', 'Trusted Brands': 'Найдвартай брэнд',
    'Quality brands you can trust': 'Чанартай, найдвартай брэндүүд',
    'Customer Reviews': 'Хэрэглэгчийн сэтгэгдэл', 'Real feedback from verified customers': 'Баталгаажсан хэрэглэгчдийн сэтгэгдэл',
    'Join Our Private Club': 'Бүртгүүлээд захиалга хийгээрэй',
    'Get discreet offers, new arrivals, and member discounts.': 'Нууц санал, шинэ бүтээгдэхүүн, гишүүний хямдрал.',
    'Subscribe': 'Бүртгүүлэх',
    'We provide premium adult products with discreet shipping and private packaging.': 'Нууц хүргэлт, чанартай бүтээгдэхүүн.',
    'All Products': 'Бүх бүтээгдэхүүн', 'Customer Service': 'Үйлчилгээ', 'Contact Us': 'Холбоо барих',
    'FAQs': 'Асуулт хариулт', 'Shipping Policy': 'Хүргэлт', 'Return Policy': 'Буцаалт',
    'Privacy Policy': 'Нууцлал', 'Secure Payment': 'ТӨЛБӨРИЙН НӨХЦӨЛ',
    'All Rights Reserved.': 'Бүх эрх хуулиар хамгаалагдсан.',
    'All Products': 'Бүх бүтээгдэхүүн', 'Discover every piece of our luxury universe': 'Бүх бүтээгдэхүүнийг үзэх',
    'The Collection': 'Бүх бүтээгдэхүүн', 'Browse our full range of adult products': 'Насанд хүрэгчдийн бүтээгдэхүүний каталог',
    'Filter': 'Шүүлтүүр', 'Search': 'Хайх', 'Search products...': 'Бүтээгдэхүүн хайх...',
    'Price Range': 'Үнийн хязгаар', 'Brands': 'Брэнд', 'Rating': 'Үнэлгээ',
    'Apply Filters': 'Шүүх', 'Clear All': 'Цэвэрлэх', 'Add To Cart': 'Сагсанд нэмэх',
    'Quick View': 'Харах', 'Related Products': 'Төстэй бүтээгдэхүүн', 'Buy Now': 'Одоо авах',
    'Description': 'Тайлбар', 'Cart': 'Сагс', 'Wishlist': 'Хадгалсан',
    'Item added to cart!': 'Сагсанд нэмэгдлээ!',
    'Velvet Pulse Massager': 'Velvet Pulse массажер',
    'Silk Lace Bodysuit': 'Silk Lace боди',
    'Couples Wellness Kit': 'Хосын wellness багц',
    'Premium Water Lube 250ml': 'Premium усан суурьт тос 250мл',
    'Rechargeable Wand Pro': 'Rechargeable Wand Pro',
    'Satin Robe Set': 'Satin халатны багц',
    'Aroma Massage Oil': 'Aroma массаж тос',
    'Lace Bralette Set': 'Lace bralette багц',
    'Intimate Gel Classic': 'Intimate gel classic',
    'Satin Blindfold Set': 'Satin blindfold багц',
    'Remote Couples Kit': 'Remote хосын багц',
    'Wellness Starter Pack': 'Wellness starter багц',
    'Pulse Mini Wand': 'Pulse mini wand',
    'Sheer Stockings Pack': 'Sheer stockings багц',
    'Premium rechargeable massager with quiet motor.': 'Чимээгүй мотортой дахин цэнэглэдэг массажер.',
    'Discreet packaging. Adults only (18+).': 'Нууц бүрхүүл. Зөвхөн 18+.'
  };

  const attrs = {
    'Search': 'Хайх', 'Wishlist': 'Хадгалсан', 'Account': 'Бүртгэл', 'Cart': 'Сагс', 'Menu': 'Цэс',
    'Previous': 'Өмнөх', 'Next': 'Дараах', 'Back to top': 'Дээш',
    'Search products...': 'Бүтээгдэхүүн хайх...', 'Enter Your Email': 'И-мэйл оруулна уу'
  };

  function normalize(value) { return value.replace(/\s+/g, ' ').trim(); }
  function translateNode(node) {
    const raw = node.nodeValue;
    const key = normalize(raw);
    if (!key || !text[key]) return;
    const before = raw.match(/^\s*/)[0];
    const after = raw.match(/\s*$/)[0];
    node.nodeValue = `${before}${text[key]}${after}`;
  }
  function translate(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const tag = node.parentElement && node.parentElement.tagName;
        return tag === 'SCRIPT' || tag === 'STYLE' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateNode);
    root.querySelectorAll?.('[placeholder],[aria-label],[alt],[title]').forEach((el) => {
      ['placeholder', 'aria-label', 'alt', 'title'].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (value && attrs[value]) el.setAttribute(attr, attrs[value]);
      });
    });
  }

  function start() {
    document.documentElement.lang = 'mn';
    translate(document.body);
    new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) translate(node);
        if (node.nodeType === Node.TEXT_NODE) translateNode(node);
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
