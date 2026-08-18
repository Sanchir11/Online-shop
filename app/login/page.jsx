import HtmlPage from '../components/HtmlPage';

export const metadata = { title: 'Нэвтрэх — Secret Shop' };

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
        <a href="/register" class="nav-link">Бүртгүүлэх</a>
      </nav>
    </div>
  </header>

  <section class="auth-page section-pad">
    <div class="container auth-container">
      <div class="auth-card">
        <h1>Нэвтрэх</h1>
        <p class="auth-sub">Захиалга хийхийн тулд нэвтэрнэ үү</p>
        <form id="loginForm" class="auth-form">
          <label>И-мэйл
            <input type="email" name="email" required placeholder="name@example.com" />
          </label>
          <label>Нууц үг
            <input type="password" name="password" required minlength="6" placeholder="••••••" />
          </label>
          <p class="auth-message"></p>
          <button type="submit" class="btn btn-gold btn-full">Нэвтрэх</button>
        </form>
        <p class="auth-switch">Бүртгэл байхгүй юу? <a href="/register">Бүртгүүлэх</a></p>
      </div>
    </div>
  </section>
`;

export default function LoginPage() {
  return <HtmlPage html={html} />;
}
