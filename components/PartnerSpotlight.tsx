/**
 * Sponsor slot. Tinted seafoam (--partner-* tokens in main.css), a hue used
 * nowhere else on the site, so it reads as distinct from editorial cards.
 */
export function PartnerSpotlight() {
  return (
    <aside className="tw-partner" aria-label="Partner spotlight">
      <p className="tw-partner-label">Partner Spotlight</p>
      <p className="tw-partner-title">This space is available</p>
      <p className="tw-partner-text">
        Reach practitioners building with AI. We&apos;d love to hear from you.
      </p>
      <a href="/contact/" className="tw-partner-cta">
        Get in touch →
      </a>
    </aside>
  );
}
