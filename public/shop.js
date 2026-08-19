(() => {
  window.sortShopProducts = window.sortShopProducts || function () {};

  const PRICE_CEILING = 5000000;
  const categories = ['toys', 'lingerie', 'wellness', 'couples', 'lubricants', 'accessories'];
  const collections = ['new', 'bestsellers', 'sale'];
  const collectionLabels = {
    new: 'Шинэ бүтээгдэхүүн',
    bestsellers: 'Шилдэг борлуулалт',
    sale: 'Хямдрал',
  };
  const categoryLabels = {
    toys: 'Тоглоом',
    lingerie: 'Дотуур хувцас',
    wellness: 'Эрүүл мэнд',
    couples: 'Хосын',
    lubricants: 'Тос, гель',
    accessories: 'Дагалдах',
  };
  const collectionProductNames = {
    new: ['Velvet Pulse массажер', 'Хосын wellness багц', 'Silk Lace боди', 'Remote хосын багц', 'Эрүүл мэнд starter багц'],
    bestsellers: ['Цэнэглэдэг Wand Pro', 'Satin халатны багц', 'Aroma массаж тос', 'Remote хосын багц'],
    sale: ['Silk Lace боди', 'Satin халатны багц', 'Premium усан суурьт тос 250мл'],
  };

  const money = value => `${Number(value || 0).toLocaleString('en-US')}₮`;

  function bindNavLinks() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
      const label = link.textContent.trim().toLowerCase();
      const categoryMap = {
        toys: 'toys', lingerie: 'lingerie', wellness: 'wellness', couples: 'couples',
        lubricants: 'lubricants', accessories: 'accessories',
        тоглоом: 'toys', 'дотуур хувцас': 'lingerie', 'эрүүл мэнд': 'wellness',
        хосын: 'couples', 'тос, гель': 'lubricants', дагалдах: 'accessories',
      };
      const category = categoryMap[label];
      if (category) link.href = `/shop?cat=${category}`;

      const collection = {
        'new arrivals': 'new', 'best sellers': 'bestsellers', sale: 'sale',
        'шинэ бүтээгдэхүүн': 'new', 'шилдэг борлуулалт': 'bestsellers', хямдрал: 'sale',
      }[label];
      if (collection) link.href = `/shop?collection=${collection}`;
    });
  }

  function initShop() {
    const grid = document.getElementById('shopGrid');
    if (!grid || grid.dataset.shopReady === 'sort-v2') return;
    grid.dataset.shopReady = 'sort-v2';

    const sidebar = document.getElementById('shopSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const openBtn = document.getElementById('filterToggleBtn');
    const closeBtn = document.getElementById('sidebarClose');
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    const min = document.getElementById('priceMin');
    const max = document.getElementById('priceMax');
    const minLabel = document.getElementById('priceMinLabel');
    const maxLabel = document.getElementById('priceMaxLabel');
    const search = document.getElementById('productSearch');
    const results = document.getElementById('resultsCount');
    const activeFilters = document.getElementById('activeFilters');
    const categoryFilter = document.getElementById('categoryFilter');
    const categoryCbs = categoryFilter ? [...categoryFilter.querySelectorAll('input[type="checkbox"]')] : [];
    const allCategoryCb = categoryCbs.find(cb => cb.value === 'all');
    const cards = [...grid.querySelectorAll('.product-card')];
    const sortSelect = document.getElementById('sortSelect');

    cards.forEach((card, index) => {
      card.classList.add('revealed');
      card.style.opacity = '';
      card.style.transform = '';
      card.style.display = '';
      card.dataset.originalIndex = String(index);
      const name = card.querySelector('.product-name')?.textContent.trim();
      const matched = collections.filter(col => collectionProductNames[col].includes(name));
      card.dataset.collections = matched.join(',');
      const reviews = parseInt(card.querySelector('.review-count')?.textContent.replace(/\D/g, '') || '0', 10);
      card.dataset.reviews = String(reviews);
      const starsText = card.querySelector('.product-stars')?.textContent || '';
      card.dataset.rating = String((starsText.match(/★/g) || []).length);
      card.dataset.isNew = card.querySelector('.badge-new') ? '1' : '0';
    });

    if (min) {
      min.max = String(PRICE_CEILING);
      min.value = '0';
    }
    if (max) {
      max.max = String(PRICE_CEILING);
      max.value = String(PRICE_CEILING);
    }

    if (categoryFilter && !document.getElementById('collectionFilter')) {
      const collectionBlock = document.createElement('div');
      collectionBlock.className = 'filter-block';
      collectionBlock.innerHTML = `
        <h4 class="filter-label">Цуглуулгууд</h4>
        <ul class="filter-list" id="collectionFilter">
          <li><label class="filter-checkbox-label"><input type="checkbox" value="all" checked class="filter-cb" /> Бүх цуглуулга</label></li>
          ${collections.map(col => `<li><label class="filter-checkbox-label"><input type="checkbox" value="${col}" class="filter-cb" /> ${collectionLabels[col]}</label></li>`).join('')}
        </ul>`;
      categoryFilter.closest('.filter-block')?.after(collectionBlock);
    }

    const collectionFilter = document.getElementById('collectionFilter');
    const collectionCbs = collectionFilter ? [...collectionFilter.querySelectorAll('input[type="checkbox"]')] : [];
    const allCollectionCb = collectionCbs.find(cb => cb.value === 'all');

    const showSidebar = () => { sidebar?.classList.add('open'); overlay?.classList.add('visible'); };
    const hideSidebar = () => { sidebar?.classList.remove('open'); overlay?.classList.remove('visible'); };
    openBtn?.addEventListener('click', showSidebar);
    closeBtn?.addEventListener('click', hideSidebar);
    overlay?.addEventListener('click', hideSidebar);

    gridBtn?.addEventListener('click', () => { grid.classList.remove('list-view'); gridBtn.classList.add('active'); listBtn?.classList.remove('active'); });
    listBtn?.addEventListener('click', () => { grid.classList.add('list-view'); listBtn.classList.add('active'); gridBtn?.classList.remove('active'); });

    const getSelectedCategories = () => {
      const selected = categoryCbs.filter(cb => cb.checked && cb.value !== 'all').map(cb => cb.value);
      return selected.length ? selected : ['all'];
    };

    const getSelectedCollections = () => {
      const selected = collectionCbs.filter(cb => cb.checked && cb.value !== 'all').map(cb => cb.value);
      return selected.length ? selected : ['all'];
    };

    const setSelectedCategory = category => {
      if (!categoryCbs.length) return;
      const normalized = categories.includes(category) ? category : 'all';
      categoryCbs.forEach(cb => {
        cb.checked = normalized === 'all' ? cb.value === 'all' : cb.value === normalized;
      });
    };

    const setSelectedCollection = collection => {
      if (!collectionCbs.length) return;
      const normalized = collections.includes(collection) ? collection : 'all';
      collectionCbs.forEach(cb => {
        cb.checked = normalized === 'all' ? cb.value === 'all' : cb.value === normalized;
      });
    };

    const priceBounds = () => {
      let low = min ? Number(min.value) : 0;
      let high = max ? Number(max.value) : PRICE_CEILING;
      if (!Number.isFinite(low) || low < 0) low = 0;
      if (!Number.isFinite(high) || high <= 0) high = PRICE_CEILING;
      if (low > high) [low, high] = [high, low];
      return { low, high };
    };

    const syncCategoryUrl = () => {
      const selected = getSelectedCategories();
      const selectedCollections = getSelectedCollections();
      const url = new URL(window.location.href);
      if (selected.length === 1 && selected[0] !== 'all') url.searchParams.set('cat', selected[0]);
      else url.searchParams.delete('cat');
      if (selectedCollections.length === 1 && selectedCollections[0] !== 'all') url.searchParams.set('collection', selectedCollections[0]);
      else url.searchParams.delete('collection');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    };

    const renderActiveFilters = visible => {
      if (!activeFilters) return;
      const selected = getSelectedCategories();
      const selectedCollections = getSelectedCollections();
      const { low, high } = priceBounds();
      const tags = [];

      if (selected[0] === 'all') tags.push('Бүх бүтээгдэхүүн');
      else tags.push(...selected.map(cat => categoryLabels[cat] || cat));
      if (selectedCollections[0] !== 'all') {
        tags.push(...selectedCollections.map(col => collectionLabels[col]));
      }
      const term = search?.value.trim();
      if (term) tags.push(`Хайлт: ${term}`);
      if (low > 0 || high < PRICE_CEILING) tags.push(`${money(low)} - ${money(high)}`);

      activeFilters.innerHTML = tags
        .map(tag => `<span class="active-filter-tag">${tag}<button class="tag-remove" aria-label="Шүүлтүүр цэвэрлэх"><i class="fas fa-times"></i></button></span>`)
        .join('');

      activeFilters.querySelectorAll('.tag-remove').forEach(button => {
        button.addEventListener('click', () => {
          setSelectedCategory('all');
          setSelectedCollection('all');
          if (search) search.value = '';
          if (min) min.value = '0';
          if (max) max.value = String(PRICE_CEILING);
          syncCategoryUrl();
          updatePrices();
        });
      });

      if (results) results.textContent = visible;
    };

    function filter() {
      const term = (search?.value || '').toLowerCase().trim();
      const { low, high } = priceBounds();
      const selectedCategories = getSelectedCategories();
      const selectedCollections = getSelectedCollections();
      const showAllCategories = selectedCategories.includes('all');
      const showAllCollections = selectedCollections.includes('all');
      let visible = 0;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const price = Number(card.dataset.price || 0);
        const category = card.dataset.category;
        const productCollections = (card.dataset.collections || '').split(',').filter(Boolean);
        const ok =
          text.includes(term) &&
          price >= low &&
          price <= high &&
          (showAllCategories || selectedCategories.includes(category)) &&
          (showAllCollections || selectedCollections.some(col => productCollections.includes(col)));

        card.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });

      renderActiveFilters(visible);
    }

    function sortCards() {
      const mode = sortSelect?.value || 'featured';
      const ordered = [...cards].sort((a, b) => {
        const priceA = Number(a.dataset.price || 0);
        const priceB = Number(b.dataset.price || 0);
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

      ordered.forEach(card => grid.appendChild(card));
    }

    function apply() {
      sortCards();
      filter();
    }

    function updatePrices() {
      const { low, high } = priceBounds();
      if (min && Number(min.value) !== low) min.value = String(low);
      if (max && Number(max.value) !== high) max.value = String(high);
      if (minLabel) minLabel.textContent = money(low);
      if (maxLabel) maxLabel.textContent = money(high);
      apply();
    }

    categoryCbs.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.value === 'all' && cb.checked) {
          categoryCbs.forEach(other => { if (other !== cb) other.checked = false; });
        } else if (cb.checked && allCategoryCb) {
          allCategoryCb.checked = false;
        }
        if (!categoryCbs.some(input => input.checked) && allCategoryCb) allCategoryCb.checked = true;
        syncCategoryUrl();
        apply();
      });
    });

    collectionCbs.forEach(cb => {
      cb.addEventListener('change', () => {
        if (cb.value === 'all' && cb.checked) {
          collectionCbs.forEach(other => { if (other !== cb) other.checked = false; });
        } else if (cb.checked && allCollectionCb) {
          allCollectionCb.checked = false;
        }
        if (!collectionCbs.some(input => input.checked) && allCollectionCb) allCollectionCb.checked = true;
        syncCategoryUrl();
        apply();
      });
    });

    min?.addEventListener('input', updatePrices);
    max?.addEventListener('input', updatePrices);
    search?.addEventListener('input', apply);
    sortSelect?.addEventListener('change', apply);
    document.getElementById('applyFilters')?.addEventListener('click', () => { syncCategoryUrl(); apply(); hideSidebar(); });
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      setSelectedCategory('all');
      setSelectedCollection('all');
      if (search) search.value = '';
      if (min) min.value = '0';
      if (max) max.value = String(PRICE_CEILING);
      syncCategoryUrl();
      updatePrices();
    });

    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(params.get('cat') || 'all');
    setSelectedCollection(params.get('collection') || params.get('filter') || 'all');
    updatePrices();
    apply();
  }

  function boot() {
    bindNavLinks();
    initShop();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);
  setTimeout(boot, 200);
})();
