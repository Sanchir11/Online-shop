(() => {
  const categories = ['watches', 'shoes', 'bags', 'perfumes', 'jewelry', 'accessories'];
  const collections = ['new', 'bestsellers', 'limited', 'sale'];
  const collectionLabels = {
    new: 'New Arrivals',
    bestsellers: 'Best Sellers',
    limited: 'Limited Edition',
    sale: 'Sale',
  };

  const collectionProductNames = {
    new: ['Royal Black Watch', 'Premium Leather Bag', 'Designer Sneakers', 'Rose Gold Jewelry Set', 'Mini Leather Crossbody'],
    bestsellers: ['Elite Gold Watch', 'Classic Designer Bag', 'Luxury Sunglasses', 'Diamond Pendant Necklace'],
    limited: ['Elite Gold Watch', 'Luxury Sunglasses', 'Signature Eau De Parfum', 'Mini Leather Crossbody'],
    sale: ['Luxury Sneakers', 'Classic Designer Bag', 'Luxury Jacket'],
  };

  document.querySelectorAll('a[href="#"]').forEach(link => {
    const label = link.textContent.trim().toLowerCase();
    const category = label;
    if (categories.includes(category)) {
      link.href = `/shop?cat=${category}`;
    }

    const collection = {
      'new arrivals': 'new',
      'best sellers': 'bestsellers',
      'limited edition': 'limited',
      sale: 'sale',
    }[label];

    if (collection) link.href = `/shop?collection=${collection}`;
  });

  const sidebar = document.getElementById('shopSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const openBtn = document.getElementById('filterToggleBtn');
  const closeBtn = document.getElementById('sidebarClose');
  const grid = document.getElementById('shopGrid');
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
  const cards = grid ? [...grid.querySelectorAll('.product-card')] : [];

  if (!grid) return;

  cards.forEach(card => {
    const name = card.querySelector('.product-name')?.textContent.trim();
    const matchedCollections = collections.filter(collection => collectionProductNames[collection].includes(name));
    card.dataset.collections = matchedCollections.join(',');
  });

  if (categoryFilter && !document.getElementById('collectionFilter')) {
    const collectionBlock = document.createElement('div');
    collectionBlock.className = 'filter-block';
    collectionBlock.innerHTML = `
      <h4 class="filter-label">Collections</h4>
      <ul class="filter-list" id="collectionFilter">
        <li><label class="filter-checkbox-label"><input type="checkbox" value="all" checked class="filter-cb" /> All Collections</label></li>
        ${collections.map(collection => `<li><label class="filter-checkbox-label"><input type="checkbox" value="${collection}" class="filter-cb" /> ${collectionLabels[collection]}</label></li>`).join('')}
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

  gridBtn?.addEventListener('click', () => { grid?.classList.remove('list-view'); gridBtn.classList.add('active'); listBtn?.classList.remove('active'); });
  listBtn?.addEventListener('click', () => { grid?.classList.add('list-view'); listBtn.classList.add('active'); gridBtn?.classList.remove('active'); });

  const money = value => '$' + Number(value || 0).toLocaleString();
  const updatePrices = () => { if (!min || !max) return; if (+min.value > +max.value) [min.value, max.value] = [max.value, min.value]; if (minLabel) minLabel.textContent = money(min.value); if (maxLabel) maxLabel.textContent = money(max.value); filter(); };
  min?.addEventListener('input', updatePrices);
  max?.addEventListener('input', updatePrices);

  const getSelectedCategories = () => {
    const selected = categoryCbs
      .filter(cb => cb.checked && cb.value !== 'all')
      .map(cb => cb.value);

    return selected.length ? selected : ['all'];
  };

  const getSelectedCollections = () => {
    const selected = collectionCbs
      .filter(cb => cb.checked && cb.value !== 'all')
      .map(cb => cb.value);

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

  const syncCategoryUrl = () => {
    const selected = getSelectedCategories();
    const selectedCollections = getSelectedCollections();
    const url = new URL(window.location.href);

    if (selected.length === 1 && selected[0] !== 'all') {
      url.searchParams.set('cat', selected[0]);
    } else {
      url.searchParams.delete('cat');
    }

    if (selectedCollections.length === 1 && selectedCollections[0] !== 'all') {
      url.searchParams.set('collection', selectedCollections[0]);
    } else {
      url.searchParams.delete('collection');
    }

    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  };

  const renderActiveFilters = visible => {
    if (!activeFilters) return;

    const selected = getSelectedCategories();
    const selectedCollections = getSelectedCollections();
    const tags = [];

    if (selected[0] === 'all') {
      tags.push('All Products');
    } else {
      tags.push(...selected.map(category => category.charAt(0).toUpperCase() + category.slice(1)));
    }

    if (selectedCollections[0] !== 'all') {
      tags.push(...selectedCollections.map(collection => collectionLabels[collection]));
    }

    const term = search?.value.trim();
    if (term) tags.push(`Search: ${term}`);
    if (min && max && (+min.value > 0 || +max.value < +max.max)) {
      tags.push(`${money(min.value)} - ${money(max.value)}`);
    }

    activeFilters.innerHTML = tags
      .map(tag => `<span class="active-filter-tag">${tag}<button class="tag-remove" aria-label="Clear filter"><i class="fas fa-times"></i></button></span>`)
      .join('');

    activeFilters.querySelectorAll('.tag-remove').forEach(button => {
      button.addEventListener('click', () => {
        setSelectedCategory('all');
        if (search) search.value = '';
        if (min) min.value = 0;
        if (max) max.value = max.max;
        syncCategoryUrl();
        updatePrices();
      });
    });

    if (results) results.textContent = visible;
  };

  function filter() {
    const term = (search?.value || '').toLowerCase().trim();
    const low = min ? +min.value : 0;
    const high = max ? +max.value : Infinity;
      const selectedCategories = getSelectedCategories();
    const selectedCollections = getSelectedCollections();
    const showAllCategories = selectedCategories.includes('all');
    const showAllCollections = selectedCollections.includes('all');
    let visible = 0;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const price = +(card.dataset.price || 0);
      const category = card.dataset.category;
      const productCollections = (card.dataset.collections || '').split(',').filter(Boolean);
      const ok =
        text.includes(term) &&
        price >= low &&
        price <= high &&
        (showAllCategories || selectedCategories.includes(category)) &&
        (showAllCollections || selectedCollections.some(collection => productCollections.includes(collection)));

      card.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });

    renderActiveFilters(visible);
  }

  categoryCbs.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.value === 'all' && cb.checked) {
        categoryCbs.forEach(other => {
          if (other !== cb) other.checked = false;
        });
      } else if (cb.checked) {
        if (allCategoryCb) allCategoryCb.checked = false;
      }

      if (!categoryCbs.some(input => input.checked)) {
        if (allCategoryCb) allCategoryCb.checked = true;
      }

      syncCategoryUrl();
      filter();
    });
  });

  collectionCbs.forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.value === 'all' && cb.checked) {
        collectionCbs.forEach(other => {
          if (other !== cb) other.checked = false;
        });
      } else if (cb.checked && allCollectionCb) {
        allCollectionCb.checked = false;
      }

      if (!collectionCbs.some(input => input.checked) && allCollectionCb) {
        allCollectionCb.checked = true;
      }

      syncCategoryUrl();
      filter();
    });
  });

  search?.addEventListener('input', filter);
  document.getElementById('applyFilters')?.addEventListener('click', () => { syncCategoryUrl(); filter(); hideSidebar(); });
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    if (search) search.value = '';
    if (min) min.value = 0;
    if (max) max.value = max.max;
    syncCategoryUrl();
    updatePrices();
  });

  const params = new URLSearchParams(window.location.search);
  setSelectedCategory(params.get('cat') || 'all');
  setSelectedCollection(params.get('collection') || params.get('filter') || 'all');
  updatePrices();
})();
