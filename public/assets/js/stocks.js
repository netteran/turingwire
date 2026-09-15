/* ==========================================================================
   Turing Wire — stocks.js
   AIStocks dashboard: heatmap treemap + AI Index line chart using ECharts
   ========================================================================== */

(function () {
  'use strict';

  var heatmapChart = null;
  var indexChart = null;

  // Safe ready — calls fn immediately if DOM already loaded, otherwise waits.
  // This avoids the race where DOMContentLoaded fires before this script loads.
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  // ── Theme-aware colors ─────────────────────────────────────────────────────

  function getThemeColors() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      bg:       isDark ? '#0d1732' : '#ffffff',
      text:     isDark ? '#e2e8f0' : '#0f172a',
      muted:    isDark ? '#94a3b8' : '#64748b',
      border:   isDark ? '#1e3055' : '#dde3f5',
      gridLine: isDark ? '#1a2d50' : '#eef2ff',
      positive: '#16a34a',
      negative: '#dc2626',
      accent:   isDark ? '#22d3ee' : '#0891b2',
    };
  }

  // ── Heatmap treemap ────────────────────────────────────────────────────────

  function buildHeatmapOption(data, colors) {
    var treeData = data.map(function (d) {
      var pct = d.change_pct || 0;
      var color;
      if      (pct >  3)   color = '#15803d';
      else if (pct >  1.5) color = '#16a34a';
      else if (pct >  0)   color = '#22c55e';
      else if (pct < -3)   color = '#991b1b';
      else if (pct < -1.5) color = '#dc2626';
      else if (pct <  0)   color = '#ef4444';
      else                 color = colors.muted;

      return {
        name: d.symbol,
        value: Math.abs(d.price || 100),
        label: d.symbol,
        pct: pct,
        price: d.price,
        fullName: d.name,
        itemStyle: { color: color },
      };
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: colors.bg,
        borderColor: colors.border,
        textStyle: { color: colors.text, fontFamily: 'JetBrains Mono' },
        formatter: function (params) {
          var d = params.data;
          if (!d || !d.price) return '';
          var sign = d.pct >= 0 ? '+' : '';
          return '<strong>' + d.label + '</strong> · ' + d.fullName + '<br>' +
            '$' + d.price.toFixed(2) + ' &nbsp;' +
            '<span style="color:' + (d.pct >= 0 ? '#16a34a' : '#dc2626') + '">' +
            sign + d.pct.toFixed(2) + '%</span>';
        },
      },
      series: [{
        type: 'treemap',
        data: treeData,
        width: '100%',
        height: '100%',
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: {
          show: true,
          formatter: function (params) {
            var d = params.data;
            var sign = d.pct >= 0 ? '+' : '';
            return d.label + '\n' + sign + (d.pct || 0).toFixed(2) + '%';
          },
          color: '#ffffff',
          fontFamily: 'JetBrains Mono',
          fontSize: 11,
          fontWeight: 500,
        },
        itemStyle: { borderWidth: 2, borderColor: colors.bg, gapWidth: 2 },
        levels: [{ itemStyle: { borderWidth: 3, borderColor: colors.bg, gapWidth: 3 } }],
      }],
    };
  }

  // ── AI Index line chart ────────────────────────────────────────────────────

  function buildIndexOption(series, range, colors) {
    var now = new Date();
    var cutoff;
    if      (range === '1D')  cutoff = new Date(now - 1   * 86400000);
    else if (range === '1W')  cutoff = new Date(now - 7   * 86400000);
    else if (range === '1M')  cutoff = new Date(now - 30  * 86400000);
    else if (range === '3M')  cutoff = new Date(now - 90  * 86400000);
    else if (range === 'YTD') cutoff = new Date(now.getFullYear(), 0, 1);
    else if (range === '1Y')  cutoff = new Date(now - 365 * 86400000);
    else                      cutoff = new Date(0);

    var filtered = (series || []).filter(function (p) {
      return new Date(p.timestamp) >= cutoff;
    });

    var dates  = filtered.map(function (p) { return p.timestamp.slice(0, 10); });
    var values = filtered.map(function (p) { return p.value; });
    var latest = values.length ? values[values.length - 1] : 100;
    var first  = values.length ? values[0] : 100;
    var lineColor = latest >= first ? colors.positive : colors.negative;

    return {
      backgroundColor: 'transparent',
      grid: { left: 50, right: 16, top: 16, bottom: 32 },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: colors.border } },
        axisTick: { show: false },
        axisLabel: {
          color: colors.muted,
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          interval: Math.max(0, Math.floor(dates.length / 5) - 1),
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: colors.muted,
          fontFamily: 'JetBrains Mono',
          fontSize: 10,
          formatter: function (v) { return v.toFixed(1); },
        },
        splitLine: { lineStyle: { color: colors.gridLine } },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: colors.bg,
        borderColor: colors.border,
        textStyle: { color: colors.text, fontFamily: 'JetBrains Mono', fontSize: 12 },
        formatter: function (params) {
          var p = params[0];
          return p.axisValue + '<br><strong>' + p.value.toFixed(2) + '</strong>';
        },
      },
      series: [{
        type: 'line',
        data: values,
        smooth: false,
        symbol: 'none',
        lineStyle: { color: lineColor, width: 2 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: lineColor + '33' },
              { offset: 1, color: lineColor + '05' },
            ],
          },
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: colors.muted, type: 'dashed', width: 1 },
          data: [{ yAxis: 100, label: { formatter: 'Base 100', color: colors.muted, fontSize: 10 } }],
        },
      }],
    };
  }

  // ── Sparkline (homepage sidebar) ───────────────────────────────────────────

  function buildSparklineOption(series, colors) {
    var pts = (series || []).slice(-48); // last 48 data points
    var values = pts.map(function (p) { return p.value; });
    if (!values.length) return null;

    var latest = values[values.length - 1];
    var first  = values[0];
    var lineColor = latest >= first ? colors.positive : colors.negative;

    return {
      backgroundColor: 'transparent',
      grid: { left: 0, right: 0, top: 2, bottom: 2 },
      xAxis: { type: 'category', show: false },
      yAxis: { type: 'value', show: false, scale: true },
      tooltip: { show: false },
      series: [{
        type: 'line',
        data: values,
        smooth: true,
        symbol: 'none',
        lineStyle: { color: lineColor, width: 1.5 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: lineColor + '40' },
              { offset: 1, color: lineColor + '05' },
            ],
          },
        },
      }],
    };
  }

  // ── Initialize ─────────────────────────────────────────────────────────────

  function initHeatmap(stockData) {
    var el = document.getElementById('tw-heatmap');
    if (!el || typeof echarts === 'undefined') return;
    heatmapChart = echarts.init(el, null, { renderer: 'canvas' });
    var quotes = Object.values(stockData.quotes || {});
    heatmapChart.setOption(buildHeatmapOption(quotes, getThemeColors()));
    window.addEventListener('resize', function () { heatmapChart.resize(); });
  }

  function initIndexChart(historyData) {
    var el = document.getElementById('tw-index-chart');
    if (!el || typeof echarts === 'undefined') return;

    indexChart = echarts.init(el, null, { renderer: 'canvas' });
    var currentRange = '3M';

    // Set initial option — show empty axes if no data yet
    indexChart.setOption(buildIndexOption(historyData.series || [], currentRange, getThemeColors()));

    // Show "no data" text when series is empty
    if (!(historyData.series || []).length) {
      indexChart.setOption({
        graphic: [{
          type: 'text',
          left: 'center',
          top: 'middle',
          style: { text: 'Awaiting first data — stocks workflow runs every 15 min during market hours', fill: getThemeColors().muted, fontSize: 12, fontFamily: 'JetBrains Mono' },
        }],
      });
    }

    document.querySelectorAll('[data-range]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentRange = btn.getAttribute('data-range');
        document.querySelectorAll('[data-range]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        indexChart.setOption(buildIndexOption(historyData.series || [], currentRange, getThemeColors()), true);
      });
    });

    window.addEventListener('resize', function () { indexChart.resize(); });
  }

  function initSparkline(historyData) {
    var el = document.getElementById('tw-sparkline-chart');
    if (!el || typeof echarts === 'undefined') return;
    var opt = buildSparklineOption(historyData.series || [], getThemeColors());
    if (!opt) return;
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(opt);
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ── Theme change observer ──────────────────────────────────────────────────

  var observer = new MutationObserver(function () {
    var colors = getThemeColors();
    if (heatmapChart) {
      var quotes = Object.values((window._twStockData || {}).quotes || {});
      heatmapChart.setOption(buildHeatmapOption(quotes, colors), true);
    }
    if (indexChart) {
      var range = (document.querySelector('[data-range].active') || {}).getAttribute &&
                  document.querySelector('[data-range].active').getAttribute('data-range') || '3M';
      indexChart.setOption(buildIndexOption(((window._twIndexHistory || {}).series) || [], range, colors), true);
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ── Bootstrap ──────────────────────────────────────────────────────────────

  ready(function () {
    var stockData   = window._twStockData   || {};
    var historyData = window._twIndexHistory || {};
    initHeatmap(stockData);
    initIndexChart(historyData);
    initSparkline(historyData);
  });

})();
