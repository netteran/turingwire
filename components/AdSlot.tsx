"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type AdsWindow = Window & {
  adsbygoogle?: { push: (request: object) => unknown; loaded?: boolean };
};

export function AdSlot({ placement }: { placement: "feed" | "article" }) {
  const element = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const loaded = useRef(false);
  const [unavailable, setUnavailable] = useState(false);

  const onReady = () => {
    loaded.current = true;
    setUnavailable(false);
    if (requested.current) return;
    requested.current = true;
    const adWindow = window as AdsWindow;
    const queue = adWindow.adsbygoogle || ([] as object[]);
    adWindow.adsbygoogle = queue;
    queue.push({});
  };

  useEffect(() => {
    // No inventory is not evidence of blocking: check the script and CSS only.
    const check = () => {
      const slot = element.current;
      if (!slot) return;
      const style = window.getComputedStyle(slot);
      const noInventory = slot.getAttribute("data-ad-status") === "unfilled";
      const hidden = !noInventory &&
        (style.display === "none" || style.visibility === "hidden");
      const scriptLoaded = loaded.current || (window as AdsWindow).adsbygoogle?.loaded;
      setUnavailable(hidden || !scriptLoaded);
    };
    const grace = window.setTimeout(check, 12000);
    // Allow recovery after a late load or changed blocking rules.
    const poll = window.setInterval(check, 15000);
    return () => {
      window.clearTimeout(grace);
      window.clearInterval(poll);
    };
  }, []);

  const article = placement === "article";

  return (
    <aside className={article ? "my-6" : "mt-3"} aria-label="Advertisement">
      <p className="text-xs font-mono tw-muted mb-2">Advertisement</p>
      {unavailable && (
        <div className="tw-support-notice" role="status">
          <p className="tw-support-notice-title">Help keep Turing Wire running</p>
          <p>
            Ads appear to be blocked or unavailable. Advertising helps cover the
            cost of running Turing Wire and keeps our coverage free. If you use
            an ad blocker or browser tracking protection, please allow ads on
            this site, then refresh the page. Thank you for your support.
          </p>
        </div>
      )}
      <ins
        ref={element}
        className="adsbygoogle"
        style={{ display: "block", ...(article ? { textAlign: "center" } as const : {}) }}
        data-ad-layout={article ? "in-article" : undefined}
        data-ad-format="fluid"
        data-ad-layout-key={article ? undefined : "-f9+5v+4m-d8+7b"}
        data-ad-client="ca-pub-4411470587763033"
        data-ad-slot={article ? "5030294302" : "9540299234"}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4411470587763033"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onReady={onReady}
        onError={() => setUnavailable(true)}
      />
    </aside>
  );
}
