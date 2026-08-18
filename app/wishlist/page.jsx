import HtmlPage from '../components/HtmlPage';
import Script from 'next/script';

export const metadata = { title: 'Зүрхэлсэн — Secret Shop' };

const html = `
  <header class="navbar store-navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <span class="logo-icon"><i class="fas fa-heart"></i></span>
        <span class="logo-text">Secret Shop</span>
      </a>
      <nav class="nav-links" id="navLinks">
        <a href="/" class="nav-link">Нүүр</a>
        <a href="/shop" class="nav-link">Дэлгүүр</a>
        <a href="/wishlist" class="nav-link active">Зүрхэлсэн</a>
        <a href="/cart" class="nav-link">Сагс</a>
      </nav>
      <div class="nav-actions">
        <a href="/wishlist" class="nav-icon-btn" aria-label="Зүрхэлсэн">
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

  <section class="store-page section-pad">
    <div class="container">
      <div class="section-header">
        <h1 class="section-title">Зүрхэлсэн</h1>
        <p class="section-sub">Танд таалагдсан бүтээгдэхүүнүүд</p>
      </div>
      <div id="wishlistPageContent"></div>
    </div>
  </section>

  <div class="toast" id="toast">
    <i class="fas fa-check-circle"></i>
    <span id="toastMsg">Зүрхэлсэн жагсаалтад нэмэгдлээ!</span>
  </div>
`;

export default function WishlistPage() {
  return (
    <>
      <HtmlPage html={html} />
      <Script src="/wishlist.js" strategy="afterInteractive" />
    </>
  );
}
