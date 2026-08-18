import HtmlPage from '../components/HtmlPage';

export const metadata = { title: 'Миний бүртгэл — Secret Shop' };

const html = `
  <header class="navbar store-navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <span class="logo-icon"><i class="fas fa-heart"></i></span>
        <span class="logo-text">Secret Shop</span>
      </a>
      <nav class="nav-links">
        <a href="/" class="nav-link">Нүүр</a>
        <a href="/shop" class="nav-link">Дэлгүүр</a>
        <a href="/cart" class="nav-link">Сагс</a>
        <a href="/account" class="nav-link active">Бүртгэл</a>
      </nav>
      <div class="nav-actions">
        <a href="/wishlist" class="nav-icon-btn wishlist-btn" aria-label="Зүрхэлсэн">
          <i class="fas fa-heart"></i>
          <span class="wishlist-badge">0</span>
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
        <h1 class="section-title">Миний бүртгэл</h1>
        <p class="section-sub">Захиалга болон хувийн мэдээлэл</p>
      </div>
      <div id="accountPageContent"></div>
    </div>
  </section>
`;

export default function AccountPage() {
  return <HtmlPage html={html} />;
}
