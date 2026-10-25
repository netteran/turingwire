"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type AdsWindow = Window & {
  adsbygoogle?: { push: (request: object) => unknown; loaded?: boolean };
};

export function AdSlot({ placement }: { placement: "feed" | "article" }) {
  const element = useRef<HTMLModElement>(null);
  const requested = useRef(false);
  const [unavailable, setUnavailable] = useState(false);

  const onReady = () => {
    if (requested.current) return;
    requested.current = true;
    const adWindow = window as AdsWindow;
    const queue = adWindow.adsbygoogle || ([] as object[]);
    adWindow.adsbygoogle = queue;
    try {
      queue.push({});
    } catch {
      setUnavailable(true);
    }
  };

  useEffect(() => {
    // No inventory is not evidence of blocking: check the script and CSS only.
    const check = () => {
      const slot = element.current;
      if (!slot) return;
      const noInventory = slot.getAttribute("data-ad-status") === "unfilled";
      let hidden = false;
      // Cosmetic filters can hide the whole advertising container.
      for (let node: HTMLElement | null = slot; node && node !== slot.parentElement?.parentElement; node = node.parentElement) {
        const style = window.getComputedStyle(node);
        hidden ||= style.display === "none" || style.visibility === "hidden" ||
          style.visibility === "collapse" || style.opacity === "0";
      }
      hidden &&= !noInventory;
      // Some blockers replace the script with a stub that still fires onReady.
      // Look for AdSense initialization or a completed ad response instead.
      const scriptLoaded = (window as AdsWindow).adsbygoogle?.loaded ||
        slot.hasAttribute("data-ad-status") || !!slot.querySelector("iframe");
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
    <div className={article ? "my-6" : "mt-3"}>
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
      <aside aria-label="Advertisement">
        <p className="text-xs font-mono tw-muted mb-2">Advertisement</p>
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
      </aside>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4411470587763033"
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onReady={onReady}
        onError={() => setUnavailable(true)}
      />
    </div>
  );
}
