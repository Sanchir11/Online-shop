/* ============================================================
   SECRET SHOP — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   NAVBAR: Sticky scroll class + hamburger
   ============================================================ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }
}, { passive: true });

// Hamburger toggle
if (hamburger && navLinks) {
  let mobileOverlay = document.createElement('div');
  mobileOverlay.className = 'mobile-overlay';
  document.body.appendChild(mobileOverlay);

  const openMenu = () => {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    mobileOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMenu);

  // Mobile dropdown toggles
  const dropdownToggles = navLinks.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth < 992) {
        e.preventDefault();
        const parent = toggle.closest('.nav-dropdown');
        const isOpen = parent.classList.contains('open');
        // Close all
        navLinks.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
        if (!isOpen) {
          parent.classList.add('open');
        }
      }
    });
  });
}

/* ============================================================
   SEARCH BAR toggle
   ============================================================ */
const searchToggle = document.getElementById('searchToggle');
const searchBar    = document.getElementById('searchBar');
const searchClose  = document.getElementById('searchClose');

if (searchToggle && searchBar) {
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('open');
    if (searchBar.classList.contains('open')) {
      const input = searchBar.querySelector('.search-input');
      if (input) input.focus();
    }
  });

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('open');
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchBar.classList.contains('open')) {
      searchBar.classList.remove('open');
    }
  });
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
(function heroSlider() {
  const slides     = document.querySelectorAll('.hero-slide');
  const dots       = document.querySelectorAll('.hero-dot');
  const prevBtn    = document.getElementById('heroPrev');
  const nextBtn    = document.getElementById('heroNext');

  if (!slides.length) return;

  let current   = 0;
  let timer     = null;
  const DELAY   = 5000;

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, DELAY);
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  startTimer();
})();

/* ============================================================
   BEST SELLERS SLIDER
   ============================================================ */
(function bestSellersSlider() {
  const track   = document.getElementById('bsTrack');
  const prevBtn = document.getElementById('bsPrev');
  const nextBtn = document.getElementById('bsNext');

  if (!track) return;

  let position  = 0;
  const STEP    = 220; // card width + gap
  const MAX     = () => {
    const outer = track.parentElement;
    return Math.max(0, track.scrollWidth - outer.clientWidth);
  };

  const update = () => {
    const max = MAX();
    position = Math.max(0, Math.min(position, max));
    track.style.transform = `translateX(-${position}px)`;
    if (prevBtn) prevBtn.style.opacity = position <= 0 ? '0.4' : '1';
    if (nextBtn) nextBtn.style.opacity = position >= max ? '0.4' : '1';
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { position -= STEP; update(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { position += STEP; update(); });

  // Touch support
  addTouchSupport(track, () => { position += STEP; update(); }, () => { position -= STEP; update(); });

  update();
})();

/* ============================================================
   NEW ARRIVALS SLIDER
   ============================================================ */
(function newArrivalsSlider() {
  const track   = document.getElementById('naTrack');
  const prevBtn = document.getElementById('naPrev');
  const nextBtn = document.getElementById('naNext');
  const dots    = document.querySelectorAll('#naDots .slider-dot');

  if (!track) return;

  let position  = 0;
  const STEP    = 280;
  const MAX     = () => {
    const outer = track.parentElement;
    return Math.max(0, track.scrollWidth - outer.clientWidth);
  };

  const update = () => {
    const max = MAX();
    position = Math.max(0, Math.min(position, max));
    track.style.transform = `translateX(-${position}px)`;
    if (dots.length) {
      const ratio    = max > 0 ? position / max : 0;
      const dotIdx   = Math.round(ratio * (dots.length - 1));
      dots.forEach((d, i) => d.classList.toggle('active', i === dotIdx));
    }
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { position -= STEP; update(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { position += STEP; update(); });

  addTouchSupport(track, () => { position += STEP; update(); }, () => { position -= STEP; update(); });

  update();
})();

/* ============================================================
   TESTIMONIALS SLIDER
   ============================================================ */
(function testimonialsSlider() {
  const track   = document.getElementById('testTrack');
  const dots    = document.querySelectorAll('#testDots .slider-dot');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');

  if (!track) return;

  const cards   = track.querySelectorAll('.testimonial-card');
  let current   = 0;
  let timer     = null;
  const DELAY   = 6000;

  const goTo = (index) => {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const next = () => goTo(current + 1);

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, DELAY);
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  addTouchSupport(track, () => { next(); startTimer(); }, () => { goTo(current - 1); startTimer(); });

  startTimer();
})();

/* ============================================================
   COUNTDOWN TIMER (Flash Sale)
   ============================================================ */
(function countdown() {
  const daysEl    = document.getElementById('cd-days');
  const hoursEl   = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl) return;

  // Target: 2 days 18 hours 44 minutes from page load
  const target = Date.now() + (2 * 24 * 60 * 60 * 1000) + (18 * 60 * 60 * 1000) + (44 * 60 * 1000);

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  const tick = () => {
    const diff = Math.max(0, target - Date.now());
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent    = pad(days);
    hoursEl.textContent   = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);

    if (diff === 0) clearInterval(timer);
  };

  tick();
  const timer = setInterval(tick, 1000);
})();

/* ============================================================
   WISHLIST BUTTONS
   ============================================================ */
document.querySelectorAll('.product-wishlist').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('active')) {
      icon.classList.remove('fas');
      icon.classList.add('fas');
      showToast('Added to wishlist!');
    } else {
      showToast('Removed from wishlist.');
    }
  });
});

/* ============================================================
   ADD TO CART BUTTONS
   ============================================================ */
document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update cart badge
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const current = parseInt(badge.textContent) || 0;
      badge.textContent = current + 1;
      badge.style.transform = 'scale(1.3)';
      setTimeout(() => { badge.style.transform = ''; }, 300);
    }
    showToast('Item added to cart!');
  });
});

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('.newsletter-input');
  if (input && input.value) {
    showToast('You\'re subscribed! Welcome to the Luxury Club.');
    input.value = '';
  }
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
let toastTimer = null;
function showToast(msg) {
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;

  if (toastMsg) toastMsg.textContent = msg;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ============================================================
   TOUCH SWIPE SUPPORT (shared utility)
   ============================================================ */
function addTouchSupport(element, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let startY = 0;

  element.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  element.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - startX;
    const deltaY = e.changedTouches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }, { passive: true });
}

/* ============================================================
   LAZY IMAGE OBSERVER (intersection observer polyfill-safe)
   ============================================================ */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const observer   = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => observer.observe(img));
}

/* ============================================================
   SCROLL REVEAL — subtle entrance animations
   ============================================================ */
(function scrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll(
    '.product-card, .category-card, .arrival-card, .testimonial-card, .flash-sale-inner, .newsletter-inner'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();

/* ============================================================
   ACTIVE NAV LINK on scroll (section highlighting)
   ============================================================ */
(function activeNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   CATEGORY CARD active state on click (mobile-friendly)
   ============================================================ */
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Allow navigation for real hrefs; provide visual feedback
    card.style.borderColor = 'var(--gold)';
    setTimeout(() => { card.style.borderColor = ''; }, 600);
  });
});
