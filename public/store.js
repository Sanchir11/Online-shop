(() => {
  const CART_KEY = 'secret-shop-cart';
  const WISHLIST_KEY = 'secret-shop-wishlist';
  let clickBound = false;

  function slugify(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^\w\s\u0400-\u04FF-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 80);
  }

  function parsePrice(text) {
    return parseInt(String(text || '').replace(/[^\d]/g, ''), 10) || 0;
  }

  function formatMnt(amount) {
    return `${Number(amount).toLocaleString('en-US')}₮`;
  }

  function escapeHtml(text) {
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function read(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch {
      return [];
    }
  }

  function write(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function toast(msg) {
    if (typeof window.showToast === 'function') window.showToast(msg);
  }

  function getProductFromCard(card) {
    const nameEl = card.querySelector('.product-name');
    const imgEl = card.querySelector('.product-img');
    const name = (
      nameEl?.querySelector('a')?.textContent ||
      nameEl?.textContent ||
      imgEl?.getAttribute('alt') ||
      ''
    ).trim();
    const priceEl = card.querySelector('.price-current');
    const priceLabel = (priceEl?.textContent || '').trim();
    const price = parseInt(card.dataset.price, 10) || parsePrice(priceLabel);
    const image = imgEl?.getAttribute('src') || '';
    const id = slugify(name) || slugify(image);
    return { id, name, price, priceLabel: priceLabel || formatMnt(price), image };
  }

  function getCart() {
    return read(CART_KEY);
  }

  function setCart(items) {
    write(CART_KEY, items);
    syncBadges();
    renderCartPage();
    window.dispatchEvent(new CustomEvent('secret-shop-cart-updated'));
  }

  function addToCart(product, qty = 1) {
    if (!product?.id) return;
    const item = { ...product, name: product.name || 'Бүтээгдэхүүн' };
    const cart = getCart();
    const existing = cart.find((entry) => entry.id === item.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...item, qty });
    }
    setCart(cart);
    toast('Бүтээгдэхүүн сагсанд нэмэгдлээ!');
  }

  function removeFromCart(id) {
    setCart(getCart().filter((item) => item.id !== id));
  }

  function updateCartQty(id, qty) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    item.qty = qty;
    setCart(cart);
  }

  function getWishlist() {
    return read(WISHLIST_KEY);
  }

  function setWishlist(items) {
    write(WISHLIST_KEY, items);
    syncBadges();
    syncWishlistButtonStates();
    renderWishlistPage();
    window.dispatchEvent(new CustomEvent('secret-shop-wishlist-updated'));
  }

  function isInWishlist(id) {
    return getWishlist().some((item) => item.id === id);
  }

  function addToWishlist(product) {
    if (!product?.id || isInWishlist(product.id)) return;
    const item = { ...product, name: product.name || 'Бүтээгдэхүүн' };
    setWishlist([...getWishlist(), item]);
    toast('Зүрхэлсэн жагсаалтад нэмэгдлээ!');
  }

  function removeFromWishlist(id, silent) {
    setWishlist(getWishlist().filter((item) => item.id !== id));
    if (!silent) toast('Зүрхэлсэн жагсаалтаас хасагдлаа.');
  }

  function cartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function syncBadges() {
    document.querySelectorAll('.cart-badge').forEach((cartBadge) => {
      const count = cartCount();
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'flex' : 'none';
    });

    document.querySelectorAll('.wishlist-badge').forEach((wishlistBadge) => {
      const count = getWishlist().length;
      wishlistBadge.textContent = count;
      wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  function syncWishlistButtonStates() {
    document.querySelectorAll('.product-wishlist').forEach((btn) => {
      const card = btn.closest('.product-card');
      if (!card) return;
      const product = getProductFromCard(card);
      btn.classList.toggle('active', Boolean(product.id && isInWishlist(product.id)));
    });

    const detailBtn = document.querySelector('.btn-wishlist-detail');
    const detail = document.querySelector('[data-product-detail]');
    if (detailBtn && detail) {
      detailBtn.classList.toggle('active', isInWishlist(detail.dataset.productId));
    }
  }

  function getDetailProduct() {
    const detail = document.querySelector('[data-product-detail]');
    if (!detail) return null;
    return {
      id: detail.dataset.productId,
      name: detail.dataset.productName,
      price: parseInt(detail.dataset.productPrice, 10),
      priceLabel: detail.dataset.productPriceLabel,
      image: detail.dataset.productImage,
    };
  }

  function renderCartPage() {
    const root = document.getElementById('cartPageContent');
    if (!root) return;

    const cart = getCart();

    if (!cart.length) {
      root.innerHTML = `
        <div class="store-empty">
          <i class="fas fa-shopping-bag"></i>
          <h2>Сагс хоосон байна</h2>
          <p>Одоогоор сагсанд бүтээгдэхүүн байхгүй байна.</p>
          <a href="/shop" class="btn btn-gold">Дэлгүүр рүү очих</a>
        </div>`;
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    root.innerHTML = `
      <div class="store-layout">
        <div class="store-list">
          ${cart
            .map(
              (item) => `
            <article class="store-item" data-id="${escapeHtml(item.id)}">
              <a href="/product" class="store-item-image">
                <img src="${escapeHtml(item.image || '/assets/images/products/product-1.png')}" alt="${escapeHtml(item.name)}" loading="lazy" />
              </a>
              <div class="store-item-body">
                <h3 class="store-item-name">${escapeHtml(item.name)}</h3>
                <p class="store-item-price">${escapeHtml(item.priceLabel || formatMnt(item.price))}</p>
                <div class="store-qty">
                  <button type="button" class="qty-btn qty-minus" aria-label="Багасгах">−</button>
                  <span class="qty-value">${item.qty}</span>
                  <button type="button" class="qty-btn qty-plus" aria-label="Нэмэх">+</button>
                </div>
              </div>
              <div class="store-item-actions">
                <p class="store-item-subtotal">${formatMnt(item.price * item.qty)}</p>
                <button type="button" class="store-remove" aria-label="Устгах"><i class="fas fa-trash-alt"></i></button>
              </div>
            </article>`
            )
            .join('')}
        </div>
        <aside class="store-summary">
          <h2>Захиалгын дүн</h2>
          <div class="store-summary-row">
            <span>Нийт (${cart.reduce((s, i) => s + i.qty, 0)} бүтээгдэхүүн)</span>
            <strong>${formatMnt(total)}</strong>
          </div>
          <p class="store-summary-note">Төлбөр: QPay-ээр төлнө</p>
          <button type="button" class="btn btn-gold store-checkout-btn">QPay-ээр төлбөр төлөх</button>
          <a href="/shop" class="btn btn-gold-outline store-continue">Худалдан авалт үргэлжлүүлэх</a>
        </aside>
      </div>`;

    root.querySelectorAll('.store-item').forEach((row) => {
      const id = row.dataset.id;

      row.querySelector('.qty-minus')?.addEventListener('click', () => {
        const item = getCart().find((i) => i.id === id);
        if (item) updateCartQty(id, item.qty - 1);
      });
      row.querySelector('.qty-plus')?.addEventListener('click', () => {
        const item = getCart().find((i) => i.id === id);
        if (item) updateCartQty(id, item.qty + 1);
      });
      row.querySelector('.store-remove')?.addEventListener('click', () => {
        removeFromCart(id);
      });
    });

    root.querySelector('.store-checkout-btn')?.addEventListener('click', async () => {
      const auth = window.SecretShopAuth;
      if (!auth) {
        window.location.href = '/login?next=/cart';
        return;
      }

      const user = await auth.getCurrentUser();
      if (!user) {
        window.location.href = '/login?next=/cart';
        return;
      }

      const orderItems = getCart();
      const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

      try {
        await auth.placeOrder({ items: orderItems, total });
        setCart([]);
        toast('Захиалга амжилттай! QPay-ээр төлнө.');
        window.location.href = '/account';
      } catch (error) {
        toast(error.message || 'Захиалга амжилтгүй.');
      }
    });
  }

  function renderWishlistPage() {
    const root = document.getElementById('wishlistPageContent');
    if (!root) return;

    const wishlist = getWishlist();

    if (!wishlist.length) {
      root.innerHTML = `
        <div class="store-empty">
          <i class="fas fa-heart"></i>
          <h2>Зүрхэлсэн жагсаалт хоосон</h2>
          <p>Танд таалагдсан бүтээгдэхүүнээ зүрхээр хадгална уу.</p>
          <a href="/shop" class="btn btn-gold">Дэлгүүр рүү очих</a>
        </div>`;
      return;
    }

    root.innerHTML = `
      <div class="store-grid">
        ${wishlist
          .map(
            (item) => `
          <article class="store-card" data-id="${escapeHtml(item.id)}">
            <button type="button" class="store-card-remove" aria-label="Хасах"><i class="fas fa-times"></i></button>
            <a href="/product" class="store-card-image">
              <img src="${escapeHtml(item.image || '/assets/images/products/product-1.png')}" alt="${escapeHtml(item.name)}" loading="lazy" />
            </a>
            <div class="store-card-body">
              <h3>${escapeHtml(item.name)}</h3>
              <p class="store-item-price">${escapeHtml(item.priceLabel || formatMnt(item.price))}</p>
              <button type="button" class="btn btn-gold-sm store-add-cart">Сагсанд нэмэх</button>
            </div>
          </article>`
          )
          .join('')}
      </div>`;

    root.querySelectorAll('.store-card').forEach((card) => {
      const id = card.dataset.id;
      const item = getWishlist().find((i) => i.id === id);
      if (!item) return;

      card.querySelector('.store-card-remove')?.addEventListener('click', () => {
        removeFromWishlist(id);
      });

      card.querySelector('.store-add-cart')?.addEventListener('click', () => {
        addToCart(item);
      });
    });
  }

  function renderStorePages() {
    renderCartPage();
    renderWishlistPage();
  }

  function bindClickDelegation() {
    if (clickBound) return;
    clickBound = true;

    document.addEventListener('click', (e) => {
      const cartBtn = e.target.closest('.btn-add-cart');
      if (cartBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = cartBtn.closest('.product-card');
        if (card) {
          addToCart(getProductFromCard(card));
          const badge = document.querySelector('.cart-badge');
          if (badge) {
            badge.style.transform = 'scale(1.3)';
            setTimeout(() => {
              badge.style.transform = '';
            }, 300);
          }
        }
        return;
      }

      const wishBtn = e.target.closest('.product-wishlist');
      if (wishBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = wishBtn.closest('.product-card');
        if (!card) return;
        const product = getProductFromCard(card);
        if (!product.id) return;
        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
        return;
      }

      if (e.target.closest('.btn-add-cart-detail')) {
        e.preventDefault();
        const product = getDetailProduct();
        if (product) addToCart(product);
        return;
      }

      if (e.target.closest('.btn-wishlist-detail')) {
        e.preventDefault();
        const product = getDetailProduct();
        if (!product) return;
        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist(product);
        }
      }
    });
  }

  function init() {
    bindClickDelegation();
    syncBadges();
    syncWishlistButtonStates();
    renderStorePages();
  }

  function watchForStorePages() {
    const run = () => {
      const hasPage =
        document.getElementById('cartPageContent') ||
        document.getElementById('wishlistPageContent');
      if (hasPage) {
        renderStorePages();
        return true;
      }
      return false;
    };

    if (run()) {
      window.addEventListener('pageshow', renderStorePages);
      return;
    }

    const observer = new MutationObserver(() => {
      if (run()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener('pageshow', renderStorePages);
    setTimeout(() => observer.disconnect(), 5000);
    [100, 300, 600, 1200, 2000].forEach((ms) => setTimeout(run, ms));
  }

  window.SecretShopStore = {
    getCart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartQty,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    formatMnt,
    syncBadges,
    syncWishlistButtonStates,
    renderCartPage,
    renderWishlistPage,
    renderStorePages,
    init,
  };

  function boot() {
    init();
    watchForStorePages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', boot);
  setTimeout(boot, 300);
  setTimeout(boot, 1000);
})();
