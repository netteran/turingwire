(function () {
  'use strict';

  function closeAllPanels(except) {
    document.querySelectorAll('.tw-share--popover .tw-share-panel:not([hidden])').forEach(function (p) {
      if (p === except) return;
      p.hidden = true;
      var t = p.parentElement && p.parentElement.querySelector('.tw-share-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.tw-share-trigger');
    if (trigger) {
      var wrap = trigger.parentElement;
      var panel = wrap.querySelector('.tw-share-panel');
      if (!panel) return;
      var willOpen = panel.hidden;
      closeAllPanels(willOpen ? panel : null);
      panel.hidden = !willOpen;
      trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');

      // Native share on mobile when opening — short-circuits the popover.
      if (willOpen && navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        var data = {
          title: panel.dataset.shareTitle || document.title,
          text: panel.dataset.shareText || '',
          url: panel.dataset.shareUrl || location.href
        };
        navigator.share(data).then(function () {
          panel.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        }).catch(function () { /* user dismissed; keep popover open */ });
      }
      return;
    }

    var copyBtn = e.target.closest('.tw-share-copy');
    if (copyBtn) {
      e.preventDefault();
      var url = copyBtn.dataset.shareUrl || location.href;
      var done = function () {
        copyBtn.querySelectorAll('.tw-share-copy-default').forEach(function (el) { el.style.display = 'none'; });
        copyBtn.querySelectorAll('.tw-share-copy-done').forEach(function (el) { el.style.display = ''; });
        setTimeout(function () {
          copyBtn.querySelectorAll('.tw-share-copy-default').forEach(function (el) { el.style.display = ''; });
          copyBtn.querySelectorAll('.tw-share-copy-done').forEach(function (el) { el.style.display = 'none'; });
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(function () {
          window.prompt('Copy link:', url);
        });
      } else {
        window.prompt('Copy link:', url);
      }
      return;
    }

    // Outside click — close all
    if (!e.target.closest('.tw-share--popover')) {
      closeAllPanels(null);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllPanels(null);
  });
})();
