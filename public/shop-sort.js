function parseCardPrice(card) {
  const fromData = Number(card.getAttribute('data-price') || 0);
  if (fromData > 0) return fromData;
  const text = card.querySelector('.price-current')?.textContent || '';
  return parseInt(text.replace(/[^\d]/g, ''), 10) || 0;
}

function sortShopProducts() {
  const grid = document.getElementById('shopGrid');
  const select = document.getElementById('sortSelect');
  if (!grid || !select) return;

  const mode = select.value;
  const cards = [...grid.querySelectorAll('.product-card')];
  if (!cards.length) return;

  cards.forEach((card, index) => {
    if (card.dataset.originalIndex == null) card.dataset.originalIndex = String(index);
    card.dataset.priceValue = String(parseCardPrice(card));
    card.dataset.reviews = String(parseInt(card.querySelector('.review-count')?.textContent.replace(/\D/g, '') || '0', 10));
    card.dataset.rating = String((card.querySelector('.product-stars')?.textContent.match(/★/g) || []).length);
    card.dataset.isNew = card.querySelector('.badge-new') ? '1' : '0';
  });

  const ordered = [...cards].sort((a, b) => {
    const priceA = Number(a.dataset.priceValue || a.getAttribute('data-price') || 0);
    const priceB = Number(b.dataset.priceValue || b.getAttribute('data-price') || 0);
    const ratingA = Number(a.dataset.rating || 0);
    const ratingB = Number(b.dataset.rating || 0);
    const reviewsA = Number(a.dataset.reviews || 0);
    const reviewsB = Number(b.dataset.reviews || 0);
    const indexA = Number(a.dataset.originalIndex || 0);
    const indexB = Number(b.dataset.originalIndex || 0);
    const newA = a.dataset.isNew === '1' ? 1 : 0;
    const newB = b.dataset.isNew === '1' ? 1 : 0;
    const bestA = (a.dataset.collections || '').includes('bestsellers') ? 1 : 0;
    const bestB = (b.dataset.collections || '').includes('bestsellers') ? 1 : 0;

    if (mode === 'price-asc') return priceA - priceB || indexA - indexB;
    if (mode === 'price-desc') return priceB - priceA || indexA - indexB;
    if (mode === 'rating') return ratingB - ratingA || reviewsB - reviewsA || indexA - indexB;
    if (mode === 'newest') return newB - newA || indexB - indexA;
    if (mode === 'bestselling') return bestB - bestA || reviewsB - reviewsA || indexA - indexB;
    return indexA - indexB;
  });

  const frag = document.createDocumentFragment();
  ordered.forEach((card, i) => {
    card.style.order = String(i);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}

window.sortShopProducts = sortShopProducts;

document.addEventListener('change', (event) => {
  if (event.target && event.target.id === 'sortSelect') sortShopProducts();
});
document.addEventListener('input', (event) => {
  if (event.target && event.target.id === 'sortSelect') sortShopProducts();
});
