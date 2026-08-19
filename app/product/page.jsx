import HtmlPage from '../components/HtmlPage';

export const metadata = { title: 'Бүтээгдэхүүн — Secret Shop' };

const html = `<header class="navbar store-navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <span class="logo-icon"><i class="fas fa-heart"></i></span>
        <span class="logo-text">Secret Shop</span>
      </a>
      <nav class="nav-links" id="navLinks">
        <a href="/" class="nav-link">Нүүр</a>
        <a href="/shop" class="nav-link">Дэлгүүр</a>
        <a href="/wishlist" class="nav-link">Зүрхэлсэн</a>
        <a href="/cart" class="nav-link">Сагс</a>
      </nav>
      <div class="nav-actions">
        <a href="/wishlist" class="nav-icon-btn wishlist-btn" aria-label="Зүрхэлсэн">
          <i class="fas fa-heart"></i>
          <span class="wishlist-badge">0</span>
        </a>
        <a href="/login" class="nav-icon-btn account-link" data-account-link aria-label="Нэвтрэх">
          <i class="fas fa-user"></i>
        </a>
        <a href="/cart" class="nav-icon-btn cart-btn" aria-label="Сагс">
          <i class="fas fa-shopping-bag"></i>
          <span class="cart-badge">0</span>
        </a>
      </div>
    </div>
  </header>
  <section class="product" data-product-detail data-product-id="velvet-pulse-massager" data-product-name="Velvet Pulse массажер" data-product-price="2797000" data-product-price-label="2,797,000₮" data-product-image="/assets/images/products/product-1.png">
    <div>
      <img class="main" src="/assets/images/products/product-1.png" alt="Velvet Pulse массажер" />
      <div class="thumbs">
        <img src="/assets/images/products/product-1.png" alt="Velvet Pulse массажер" />
        <img src="/assets/images/products/product-2.png" alt="Silk Lace боди" />
      </div>
    </div>
    <div>
      <span class="badge">Шинэ</span>
      <h1>Velvet Pulse массажер</h1>
      <h2>2,797,000₮ <del>3,497,000₮</del></h2>
      <p>Чимээгүй мотортой дахин цэнэглэдэг массажер.</p>
      <button class="btn-add-cart-detail">Сагсанд нэмэх</button>
      <button class="btn-wishlist-detail" aria-label="Зүрхэлсэн"><i class="fas fa-heart"></i></button>
      <h3>Тайлбар</h3>
      <p>Нууц хүргэлт. Зөвхөн 18+.</p>
    </div>
  </section>
  <section class="related">
    <h2>Төстэй бүтээгдэхүүн</h2>
    <div class="grid">
      <div class="card"><img src="/assets/images/products/product-3.png" alt="Хосын wellness багц" /><p>Хосын wellness багц</p></div>
      <div class="card"><img src="/assets/images/products/product-4.png" alt="Дотуур хувцасны багц" /><p>Дотуур хувцасны багц</p></div>
      <div class="card"><img src="/assets/images/products/product-5.png" alt="Массажер" /><p>Массажер</p></div>
    </div>
  </section>
  <div class="toast" id="toast"><i class="fas fa-check-circle"></i><span id="toastMsg"></span></div>`;

export default function Page() {
  return <HtmlPage html={html} />;
}
