/** Ported from _includes/inference_engines_carousel.html. */
export function PartnerSpotlight() {
  return (
    <div className="tw-card rounded-lg border tw-border p-5 inference-carousel-wrap">
      <p className="text-xs font-mono tw-muted mb-3 uppercase tracking-widest">
        Partner Spotlight
      </p>
      <div style={{ textAlign: "center", padding: "18px 8px" }}>
        <p className="text-xs font-semibold tw-heading mb-2">
          This space is available
        </p>
        <p className="text-xs tw-muted leading-relaxed">
          Want to reach practitioners building with AI?
          <br />
          We&apos;d love to hear from you.
        </p>
        <a
          href="/contact/"
          className="text-xs font-mono text-cyan-600 mt-3 inline-block hover:underline"
        >
          Get in touch →
        </a>
      </div>
    </div>
  );
}
