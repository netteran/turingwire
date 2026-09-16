"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Share buttons built on plain intent URLs — no third-party scripts, so
 * nothing here loads a tracker on the reader's behalf.
 */

type Props = {
  url: string;
  title: string;
  summary?: string | null;
  variant?: "inline" | "popover";
  align?: "left" | "right";
};

const Icon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d={path} />
  </svg>
);

const PATHS = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.207-6.817L4.99 21.75H1.68l7.73-8.836L1.254 2.25h6.812l4.713 6.231 5.465-6.231Zm-1.16 17.52h1.834L7.084 4.126H5.117l11.967 15.644Z",
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z",
  hn: "M3 3h18v18H3V3Zm9 11.2 3.6-7.2h-1.7L11.7 11 9.5 7H7.8l3.4 7.1V18h1.6v-3.8Z",
  reddit:
    "M22 12.07a2.06 2.06 0 0 0-3.49-1.47c-1.36-.93-3.2-1.52-5.24-1.6l1.05-3.34 2.86.66a1.5 1.5 0 1 0 .15-.9l-3.2-.74a.45.45 0 0 0-.53.31l-1.18 3.74c-2.07.07-3.94.66-5.32 1.6A2.06 2.06 0 1 0 4 14.7c-.03.21-.05.43-.05.65 0 3.06 3.6 5.55 8.05 5.55s8.05-2.49 8.05-5.55c0-.22-.02-.44-.05-.65A2.06 2.06 0 0 0 22 12.07ZM7.5 13.5a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm7.79 3.7c-.85.85-2.48 1.16-3.29 1.16-.81 0-2.44-.31-3.29-1.16a.4.4 0 0 1 .56-.56c.54.54 1.69.74 2.73.74 1.04 0 2.19-.2 2.73-.74a.4.4 0 1 1 .56.56ZM14.75 14.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z",
  bluesky:
    "M6.34 4.6c2.65 1.99 5.5 6.02 6.55 8.18 1.05-2.16 3.9-6.19 6.55-8.18 1.91-1.43 5.01-2.54 5.01.99 0 .7-.4 5.91-.64 6.76-.82 2.94-3.83 3.69-6.51 3.23 4.69.8 5.88 3.45 3.3 6.1-4.9 5.04-7.04-1.27-7.59-2.89-.1-.3-.15-.44-.15-.32 0-.12-.05.02-.15.32-.55 1.62-2.69 7.93-7.59 2.89-2.58-2.65-1.39-5.3 3.3-6.1-2.68.46-5.69-.29-6.51-3.23C1.65 11.5 1.25 6.29 1.25 5.6c0-3.54 3.1-2.43 5.01-1l.08-.01Z",
  whatsapp:
    "M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.06l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm4.66 10.2c-.25-.13-1.48-.73-1.71-.82-.23-.08-.4-.12-.56.13-.17.25-.65.81-.8.98-.14.16-.29.18-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.18 1.13.16 1.55.1.47-.07 1.48-.6 1.69-1.19.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z",
  telegram:
    "M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.33-4.77 8.68-7.84c.38-.34-.08-.53-.59-.19L6.3 13.2l-4.62-1.45c-1-.31-1.02-1 .21-1.48l18.07-6.97c.84-.3 1.57.2 1.3 1Z",
  email:
    "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4.24-8 4.76-8-4.76V6l8 4.76L20 6v2.24Z",
  link: "M10.6 13.4a1 1 0 0 1 0-1.41l2.83-2.83a3 3 0 1 1 4.24 4.24l-1.41 1.42a1 1 0 0 1-1.42-1.42l1.42-1.41a1 1 0 0 0-1.42-1.42l-2.82 2.83a1 1 0 0 1-1.42 0Zm2.8-2.8a1 1 0 0 1 0 1.4l-2.83 2.83a3 3 0 1 1-4.24-4.24l1.41-1.42a1 1 0 1 1 1.42 1.42l-1.42 1.41a1 1 0 0 0 1.42 1.42l2.82-2.83a1 1 0 0 1 1.42 0Z",
};

export function ShareButtons({
  url,
  title,
  summary,
  variant = "inline",
  align = "left",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const s = encodeURIComponent(summary ?? "");

  const links: [keyof typeof PATHS, string, string][] = [
    ["x", "X", `https://twitter.com/intent/tweet?text=${t}&url=${u}`],
    ["linkedin", "LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ["hn", "HN", `https://news.ycombinator.com/submitlink?u=${u}&t=${t}`],
    ["reddit", "Reddit", `https://www.reddit.com/submit?url=${u}&title=${t}`],
    ["bluesky", "Bluesky", `https://bsky.app/intent/compose?text=${t}%20${u}`],
    ["whatsapp", "WhatsApp", `https://api.whatsapp.com/send?text=${t}%20%E2%80%94%20${u}`],
    ["telegram", "Telegram", `https://t.me/share/url?url=${u}&text=${t}`],
    ["email", "Email", `mailto:?subject=${t}&body=${t}%0A%0A${s}%0A%0A${u}`],
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; nothing useful to fall back to */
    }
  };

  const buttons = (
    <>
      {links.map(([key, label, href]) => (
        <a
          key={key}
          className="tw-share-btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
        >
          <Icon path={PATHS[key]} />
          <span className="tw-share-label">{label}</span>
        </a>
      ))}
      <button className="tw-share-btn" onClick={copy} aria-label="Copy link">
        <Icon path={PATHS.link} />
        <span className="tw-share-label">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </>
  );

  if (variant === "inline") {
    return <div className="tw-share-inline flex flex-wrap gap-2">{buttons}</div>;
  }

  return (
    <div className="tw-share-popover-wrap relative" ref={ref}>
      <button
        type="button"
        className="tw-icon-btn flex"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Share"
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </button>

      {open && (
        <div
          className={`tw-share-popover absolute z-40 mt-2 p-2 rounded-lg border tw-border tw-card flex flex-col gap-1 ${
            align === "right" ? "right-0" : "left-0"
          }`}
          role="menu"
        >
          {buttons}
        </div>
      )}
    </div>
  );
}
