"use client";

import Script from "next/script";

declare global {
  interface Window {
    __twInitStocks?: () => void;
  }
}

/**
 * Loads echarts + stocks.js and (re-)runs the chart bootstrap on every
 * mount via onReady rather than onLoad. next/script loads a given src only
 * once per browser session, so an App Router client-side navigation from a
 * page that already loaded these same scripts — the homepage carries this
 * same pair — would otherwise never re-initialize this page's own chart
 * containers. onReady fires on every mount regardless of whether the
 * script itself needed to be (re-)fetched.
 */
export function StocksScripts() {
  return (
    <>
      <Script src="/assets/js/echarts.min.js" strategy="afterInteractive" />
      <Script
        src="/assets/js/stocks.js?v=3"
        strategy="afterInteractive"
        onReady={() => {
          window.__twInitStocks?.();
        }}
      />
    </>
  );
}
