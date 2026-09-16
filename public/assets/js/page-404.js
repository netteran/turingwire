(function () {
  // Show the current URL in the terminal command
  var urlEl = document.getElementById('page-url');
  if (urlEl) urlEl.textContent = window.location.pathname;

  var lines = [
    { id: 'tl-1', text: '  → resolving route against index…',      cls: 't-dim'  },
    { id: 'tl-2', text: '  → querying vector store…',              cls: 't-dim'  },
    { id: 'tl-3', text: '  ✗ ERROR 404: document not in corpus',   cls: 't-err'  },
    { id: 'tl-4', text: '  ⚠ Confidence: 0.00   Tokens matched: 0', cls: 't-warn' },
    { id: 'tl-5', text: '  hint: check the URL or start from /',   cls: 't-dim'  },
  ];

  var delay = 320;
  lines.forEach(function (line, i) {
    setTimeout(function () {
      var el = document.getElementById(line.id);
      if (!el) return;
      el.textContent = line.text;
      // update char count for accurate typing speed
      el.style.setProperty('--chars', line.text.length);
      el.classList.add('visible');
    }, delay);
    delay += 550 + i * 80;
  });
})();