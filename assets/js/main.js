/* ==========================================================================
   Turing Wire — main.js
   Theme toggle, mobile nav, search keyboard shortcut, header scroll state
   ========================================================================== */

(function () {
  'use strict';

  // ── Theme toggle ──────────────────────────────────────────────────────────

  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function getTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('tw-theme', theme);
    if (iconSun && iconMoon) {
      if (theme === 'dark') {
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
      } else {
        iconSun.classList.add('hidden');
        iconMoon.classList.remove('hidden');
      }
    }
  }

  applyTheme(getTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // ── Mobile nav ────────────────────────────────────────────────────────────

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !expanded);
      mobileNav.classList.toggle('hidden');
      if (iconMenu && iconClose) {
        iconMenu.classList.toggle('hidden');
        iconClose.classList.toggle('hidden');
      }
    });
  }

  // ── Header scroll state ───────────────────────────────────────────────────

  const header = document.getElementById('site-header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 4) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Search keyboard shortcut (/) ──────────────────────────────────────────

  const searchInput = document.getElementById('header-search');
  if (searchInput) {
    document.addEventListener('keydown', function (e) {
      if (
        e.key === '/' &&
        document.activeElement !== searchInput &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });

    const searchKbd = searchInput.parentElement.querySelector('.tw-search-kbd');
    if (searchKbd) {
      searchInput.addEventListener('focus', function () { searchKbd.style.opacity = '0'; });
      searchInput.addEventListener('blur', function () { searchKbd.style.opacity = ''; });
    }
  }

  // ── Breaking strip dismiss ────────────────────────────────────────────────

  const breakingStrip = document.getElementById('breaking-strip');
  const breakingDismiss = document.getElementById('breaking-dismiss');
  if (breakingStrip && breakingDismiss) {
    breakingDismiss.addEventListener('click', function () {
      breakingStrip.style.display = 'none';
    });
  }

  // ── Combined impact + subcategory filter ──────────────────────────────────

  var activeImpact = 'all';
  var activeSubcat = 'all';

  function applyFilters() {
    document.querySelectorAll('[data-impact]').forEach(function (card) {
      var impact = card.getAttribute('data-impact') || '';
      var subcat = card.getAttribute('data-subcategory') || '';

      var impactOk = activeImpact === 'all' ||
        (activeImpact === 'major+' && (impact === 'critical' || impact === 'major')) ||
        (activeImpact === 'critical' && impact === 'critical');

      var subcatOk = activeSubcat === 'all' || subcat === activeSubcat;

      card.style.display = (impactOk && subcatOk) ? '' : 'none';
    });
  }

  document.querySelectorAll('[data-filter-impact]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeImpact = chip.getAttribute('data-filter-impact');
      document.querySelectorAll('[data-filter-impact]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      applyFilters();
    });
  });

  document.querySelectorAll('[data-filter-subcategory]').forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeSubcat = chip.getAttribute('data-filter-subcategory');
      document.querySelectorAll('[data-filter-subcategory]').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      applyFilters();
    });
  });

  // ── Scroll to top ─────────────────────────────────────────────────────────

  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    function onScrollTop() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', onScrollTop, { passive: true });
    onScrollTop();
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Stocks: format change colors ──────────────────────────────────────────

  document.querySelectorAll('[data-change]').forEach(function (el) {
    const val = parseFloat(el.getAttribute('data-change') || '0');
    el.classList.remove('tw-change-pos', 'tw-change-neg', 'tw-change-neu');
    if (val > 0) el.classList.add('tw-change-pos');
    else if (val < 0) el.classList.add('tw-change-neg');
    else el.classList.add('tw-change-neu');
  });

})();
