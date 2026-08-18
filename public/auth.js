(() => {
  const SESSION_KEY = 'secret-shop-session';

  function getToken() {
    return localStorage.getItem(SESSION_KEY) || '';
  }

  function setToken(token) {
    if (token) localStorage.setItem(SESSION_KEY, token);
    else localStorage.removeItem(SESSION_KEY);
    updateAccountNav();
    window.dispatchEvent(new CustomEvent('secret-shop-auth-changed'));
  }

  async function api(path, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(path, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Алдаа гарлаа.');
    return data;
  }

  async function register(payload) {
    const data = await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return data.user;
  }

  async function login(payload) {
    const data = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setToken(data.token);
    return data.user;
  }

  async function logout() {
    try {
      await api('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setToken('');
  }

  async function getCurrentUser() {
    if (!getToken()) return null;
    try {
      const data = await api('/api/auth/me');
      return data.user;
    } catch {
      setToken('');
      return null;
    }
  }

  async function requireLogin(nextPath) {
    const user = await getCurrentUser();
    if (user) return user;
    const next = nextPath || `${window.location.pathname}${window.location.search}`;
    window.location.href = `/login?next=${encodeURIComponent(next)}`;
    return null;
  }

  async function placeOrder({ items, total }) {
    return api('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ items, total }),
    });
  }

  async function getOrders() {
    const data = await api('/api/orders');
    return data.orders || [];
  }

  function updateAccountNav() {
    document.querySelectorAll('[data-account-link]').forEach(async (link) => {
      const user = await getCurrentUser();
      if (user) {
        link.href = '/account';
        link.setAttribute('aria-label', user.name);
        link.title = user.name;
        link.classList.add('account-logged-in');
      } else {
        link.href = '/login';
        link.setAttribute('aria-label', 'Нэвтрэх');
        link.title = 'Нэвтрэх';
        link.classList.remove('account-logged-in');
      }
    });
  }

  function bindAuthForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm && !loginForm.dataset.bound) {
      loginForm.dataset.bound = '1';
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const msg = form.querySelector('.auth-message');
        try {
          const user = await login({
            email: form.email.value.trim(),
            password: form.password.value,
          });
          if (msg) msg.textContent = `Тавтай морил, ${user.name}!`;
          const params = new URLSearchParams(window.location.search);
          window.location.href = params.get('next') || '/account';
        } catch (error) {
          if (msg) msg.textContent = error.message;
        }
      });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm && !registerForm.dataset.bound) {
      registerForm.dataset.bound = '1';
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = e.target;
        const msg = form.querySelector('.auth-message');
        if (form.password.value !== form.confirmPassword.value) {
          if (msg) msg.textContent = 'Нууц үг таарахгүй байна.';
          return;
        }
        try {
          await register({
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            password: form.password.value,
          });
          await login({
            email: form.email.value.trim(),
            password: form.password.value,
          });
          if (msg) msg.textContent = 'Бүртгэл амжилттай!';
          window.location.href = '/account';
        } catch (error) {
          if (msg) msg.textContent = error.message;
        }
      });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn && !logoutBtn.dataset.bound) {
      logoutBtn.dataset.bound = '1';
      logoutBtn.addEventListener('click', async () => {
        await logout();
        window.location.href = '/login';
      });
    }
  }

  async function renderAccountPage() {
    const root = document.getElementById('accountPageContent');
    if (!root) return;

    const user = await getCurrentUser();
    if (!user) {
      window.location.href = '/login?next=/account';
      return;
    }

    let orders = [];
    try {
      orders = await getOrders();
    } catch {
      orders = [];
    }

    root.innerHTML = `
      <div class="account-layout">
        <section class="account-card">
          <h2>Миний мэдээлэл</h2>
          <p><strong>Нэр:</strong> ${user.name}</p>
          <p><strong>И-мэйл:</strong> ${user.email}</p>
          ${user.phone ? `<p><strong>Утас:</strong> ${user.phone}</p>` : ''}
          <button type="button" class="btn btn-gold-outline" id="logoutBtn">Гарах</button>
        </section>
        <section class="account-card">
          <h2>Миний захиалгууд</h2>
          ${
            orders.length
              ? orders
                  .map(
                    (order) => `
              <article class="order-item">
                <div class="order-item-head">
                  <strong>#${order.id.slice(0, 8)}</strong>
                  <span>${new Date(order.createdAt).toLocaleString('mn-MN')}</span>
                </div>
                <p>${order.items.length} бүтээгдэхүүн · ${Number(order.total).toLocaleString('en-US')}₮</p>
                <p class="order-status">${order.status === 'pending' ? 'QPay хүлээгдэж байна' : order.status}</p>
              </article>`
                  )
                  .join('')
              : '<p class="account-empty">Одоогоор захиалга байхгүй.</p>'
          }
        </section>
      </div>`;

    bindAuthForms();
  }

  function init() {
    bindAuthForms();
    updateAccountNav();
    renderAccountPage();
  }

  window.SecretShopAuth = {
    register,
    login,
    logout,
    getCurrentUser,
    requireLogin,
    placeOrder,
    getOrders,
    updateAccountNav,
    renderAccountPage,
  };

  function boot() {
    init();
    [100, 500, 1200].forEach((ms) => setTimeout(init, ms));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', boot);
  window.addEventListener('secret-shop-auth-changed', init);
})();
