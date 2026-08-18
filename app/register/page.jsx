import HtmlPage from '../components/HtmlPage';

export const metadata = { title: 'Бүртгүүлэх — Secret Shop' };

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
        <a href="/login" class="nav-link">Нэвтрэх</a>
      </nav>
    </div>
  </header>

  <section class="auth-page section-pad">
    <div class="container auth-container">
      <div class="auth-card">
        <h1>Бүртгүүлэх</h1>
        <p class="auth-sub">Бүртгүүлээд захиалгаа хийгээрэй</p>
        <form id="registerForm" class="auth-form">
          <label>Нэр
            <input type="text" name="name" required placeholder="Таны нэр" />
          </label>
          <label>И-мэйл
            <input type="email" name="email" required placeholder="name@example.com" />
          </label>
          <label>Утас
            <input type="tel" name="phone" placeholder="99001122" />
          </label>
          <label>Нууц үг
            <input type="password" name="password" required minlength="6" placeholder="Хамгийн багадаа 6 тэмдэгт" />
          </label>
          <label>Нууц үг давтах
            <input type="password" name="confirmPassword" required minlength="6" placeholder="Нууц үгээ давт" />
          </label>
          <p class="auth-message"></p>
          <button type="submit" class="btn btn-gold btn-full">Бүртгүүлэх</button>
        </form>
        <p class="auth-switch">Бүртгэлтэй юу? <a href="/login">Нэвтрэх</a></p>
      </div>
    </div>
  </section>
`;

export default function RegisterPage() {
  return <HtmlPage html={html} />;
}
