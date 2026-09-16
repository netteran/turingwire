(function () {
  var STORAGE_KEY  = 'tw-missions-v1';
  var LASTSEEN_KEY = 'tw-missions-lastseen';
  var INDEX_URL    = '/missions-index.json';

  var IMPACT_RANK = { '': 0, notable: 1, major: 2, critical: 3 };

  var state = {
    missions: load(),
    items: [],
    lastSeen: parseInt(localStorage.getItem(LASTSEEN_KEY) || '0', 10),
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.missions)); }

  function newId() { return 'm_' + Math.random().toString(36).slice(2, 9); }

  function parseList(s) {
    return (s || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean);
  }

  function readForm() {
    return {
      id: newId(),
      name: document.getElementById('m-name').value.trim() || 'Untitled mission',
      companies: parseList(document.getElementById('m-companies').value),
      keywords:  parseList(document.getElementById('m-keywords').value),
      minImpact: document.getElementById('m-impact').value,
      type:      document.getElementById('m-type').value,
      format:    document.getElementById('m-format').value,
      created:   Date.now(),
    };
  }

  function clearForm() {
    ['m-name','m-companies','m-keywords'].forEach(function (id) {
      document.getElementById(id).value = '';
    });
  }

  function matches(item, m) {
    if (m.type && item.type !== m.type) return false;

    if (m.minImpact && IMPACT_RANK[item.impact] < IMPACT_RANK[m.minImpact]) return false;

    if (m.companies.length) {
      var pool = ([item.company || ''])
        .concat(item.secondary_companies || [])
        .concat(item.companies || [])
        .map(function (s) { return (s || '').toLowerCase(); });
      var hit = m.companies.some(function (c) {
        return pool.indexOf(c.toLowerCase()) !== -1;
      });
      if (!hit) return false;
    }

    if (m.keywords.length) {
      var hay = ((item.title || '') + ' ' + (item.summary || '')).toLowerCase();
      var hit2 = m.keywords.some(function (k) { return hay.indexOf(k.toLowerCase()) !== -1; });
      if (!hit2) return false;
    }
    return true;
  }

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); }
    catch (e) { return iso; }
  }

  function renderResults(m) {
    var hits = state.items.filter(function (i) { return matches(i, m); });
    hits.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var newCount = hits.filter(function (h) {
      return state.lastSeen && (new Date(h.date).getTime() > state.lastSeen);
    }).length;

    var list;
    if (m.format === 'json') {
      list = '<pre class="text-xs font-mono tw-muted overflow-auto p-3 rounded border tw-border" style="background:var(--bg);max-height:340px">'
           + escapeHtml(JSON.stringify(hits.slice(0, 50), null, 2))
           + '</pre>';
    } else if (m.format === 'brief') {
      list = '<div class="space-y-3 text-sm leading-relaxed">'
           + hits.slice(0, 5).map(function (h, i) {
               return '<p><span class="font-mono text-xs tw-muted">[' + (i + 1) + '·' + fmtDate(h.date) + ']</span> '
                    + '<a href="' + h.url + '" class="tw-heading font-medium hover:tw-accent">' + escapeHtml(h.title) + '</a> — '
                    + '<span class="tw-muted">' + escapeHtml((h.summary || '').slice(0, 220)) + '</span></p>';
             }).join('')
           + '</div>';
    } else {
      list = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2">'
           + hits.slice(0, 12).map(function (h) {
               var isNew = state.lastSeen && (new Date(h.date).getTime() > state.lastSeen);
               return '<a href="' + h.url + '" class="block border tw-border rounded p-3 hover:border-cyan-600 transition-colors">'
                    + (isNew ? '<span class="tw-mission-tag mb-1.5">new</span> ' : '')
                    + '<div class="text-sm tw-heading font-medium leading-snug">' + escapeHtml(h.title) + '</div>'
                    + '<div class="text-[11px] font-mono tw-muted mt-1">'
                    + (h.company ? escapeHtml(h.company) + ' · ' : '')
                    + fmtDate(h.date)
                    + (h.impact ? ' · ' + escapeHtml(h.impact) : '')
                    + '</div></a>';
             }).join('')
           + '</div>';
    }
    if (!hits.length) {
      list = '<p class="text-sm tw-muted">No matches in the current index.</p>';
    }

    var subscribeUrl = location.origin + location.pathname + '#mission=' + encodeURIComponent(JSON.stringify(m));

    return ''
      + '<div class="tw-mission-card" data-mission-id="' + m.id + '">'
      +   '<div class="flex items-start justify-between gap-3 mb-3">'
      +     '<div class="min-w-0">'
      +       '<h3 class="tw-heading font-semibold text-base">' + escapeHtml(m.name) + '</h3>'
      +       '<div class="flex flex-wrap gap-1.5 mt-1.5">'
      +         (m.companies.map(function (c) { return '<span class="tw-mission-tag">' + escapeHtml(c) + '</span>'; }).join(''))
      +         (m.keywords.map(function (k)  { return '<span class="tw-mission-tag" style="background:transparent;border-color:var(--border);color:var(--fg-muted)">' + escapeHtml(k) + '</span>'; }).join(''))
      +         (m.minImpact ? '<span class="tw-mission-tag" style="background:transparent;border-color:var(--border);color:var(--fg-muted)">' + escapeHtml(m.minImpact) + '+</span>' : '')
      +         (m.type ? '<span class="tw-mission-tag" style="background:transparent;border-color:var(--border);color:var(--fg-muted)">' + escapeHtml(m.type) + 's</span>' : '')
      +       '</div>'
      +     '</div>'
      +     '<div class="flex items-center gap-2 flex-shrink-0">'
      +       '<span class="font-mono text-[11px] tw-muted">' + hits.length + ' matches' + (newCount ? ' · ' + newCount + ' new' : '') + '</span>'
      +       '<button class="tw-mission-btn" data-act="copy" title="Copy shareable URL">⎘</button>'
      +       '<button class="tw-mission-btn" data-act="delete" title="Delete mission">✕</button>'
      +     '</div>'
      +   '</div>'
      +   list
      +   '<input type="hidden" data-share-url value="' + escapeHtml(subscribeUrl) + '">'
      + '</div>';
  }

  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]);
    });
  }

  function render() {
    var listEl  = document.getElementById('m-list');
    var emptyEl = document.getElementById('m-empty');
    if (!state.missions.length) {
      listEl.innerHTML = '';
      emptyEl.classList.remove('hidden');
      return;
    }
    emptyEl.classList.add('hidden');
    listEl.innerHTML = state.missions.map(renderResults).join('');
  }

  function bindActions() {
    document.getElementById('m-save').addEventListener('click', function () {
      var m = readForm();
      state.missions.unshift(m);
      save(); clearForm(); render();
    });

    document.getElementById('m-list').addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-act]');
      if (!btn) return;
      var card = btn.closest('[data-mission-id]');
      var id = card && card.dataset.missionId;
      if (!id) return;

      if (btn.dataset.act === 'delete') {
        state.missions = state.missions.filter(function (m) { return m.id !== id; });
        save(); render();
      } else if (btn.dataset.act === 'copy') {
        var url = card.querySelector('[data-share-url]').value;
        navigator.clipboard.writeText(url).then(function () {
          btn.textContent = '✓';
          setTimeout(function () { btn.textContent = '⎘'; }, 1200);
        });
      }
    });

    document.getElementById('m-export').addEventListener('click', function () {
      document.getElementById('m-iobox').value = JSON.stringify(state.missions, null, 2);
    });
    document.getElementById('m-import').addEventListener('click', function () {
      try {
        var arr = JSON.parse(document.getElementById('m-iobox').value);
        if (Array.isArray(arr)) {
          state.missions = arr.concat(state.missions);
          save(); render();
        }
      } catch (e) { alert('Invalid JSON'); }
    });

    document.getElementById('m-notify').addEventListener('click', function () {
      if (!('Notification' in window)) { alert('This browser does not support notifications.'); return; }
      Notification.requestPermission().then(function (p) {
        if (p === 'granted') {
          new Notification('Turing Wire missions', { body: 'Alerts enabled. New mission matches will notify you on visit.' });
        }
      });
    });
  }

  function maybeNotifyNew() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    state.missions.forEach(function (m) {
      var newHits = state.items.filter(function (i) {
        return matches(i, m) && state.lastSeen && (new Date(i.date).getTime() > state.lastSeen);
      });
      if (newHits.length) {
        new Notification('Mission "' + m.name + '"', {
          body: newHits.length + ' new ' + (newHits.length === 1 ? 'item' : 'items') + ' match.',
        });
      }
    });
  }

  function importFromHash() {
    var m = (location.hash.match(/mission=([^&]+)/) || [])[1];
    if (!m) return;
    try {
      var obj = JSON.parse(decodeURIComponent(m));
      obj.id = newId();
      state.missions.unshift(obj);
      save();
    } catch (e) {}
    history.replaceState(null, '', location.pathname);
  }

  function init() {
    importFromHash();
    fetch(INDEX_URL).then(function (r) { return r.json(); }).then(function (data) {
      state.items = data || [];
      bindActions();
      render();
      maybeNotifyNew();
      localStorage.setItem(LASTSEEN_KEY, String(Date.now()));
    }).catch(function () {
      document.getElementById('m-list').innerHTML = '<p class="text-sm tw-muted">Could not load index.</p>';
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();