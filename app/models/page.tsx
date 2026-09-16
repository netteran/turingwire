import type { Metadata } from "next";
import { ModelsTable, type ModelRow } from "@/components/ModelsTable";
import { ShareButtons } from "@/components/ShareButtons";
import { getModels } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Model Pricing",
  description:
    "Live comparison of AI model pricing, context windows, and capabilities across OpenAI, Anthropic, Google, Meta, and Mistral. Updated regularly.",
  alternates: { canonical: "/models/" },
};

interface ModelsData {
  updated_at?: string;
  note?: string;
  models?: ModelRow[];
}

export default function ModelsPage() {
  const data = getModels<ModelsData>();
  const models = data.models ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-2xl font-bold tw-heading font-mono">AI Model Pricing</h1>
            <p className="tw-muted text-sm mt-1">
              Token pricing, context windows, and capabilities across major providers.
            </p>
          </div>
          <div className="flex items-start gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs tw-muted font-mono">Updated {data.updated_at}</p>
            </div>
            <ShareButtons
              url={absoluteUrl("/models/")}
              title="AI Model Pricing"
              summary="Token pricing, context windows, and capabilities across major providers."
              variant="popover"
              align="right"
            />
          </div>
        </div>

        <div className="tw-card rounded-lg border tw-border px-4 py-3 text-xs tw-muted leading-relaxed">
          <strong
            className="tw-heading"
            style={{
              display: "inline",
              fontSize: "inherit",
              textTransform: "none",
              letterSpacing: "normal",
              color: "inherit",
              fontWeight: 600,
            }}
          >
            Prices in USD per million tokens.
          </strong>{" "}
          Providers update pricing without notice. Verify with the provider before
          estimating production costs. Open-source model prices reflect representative
          third-party inference rates and vary by provider.
        </div>
      </div>

      <ModelsTable models={models} />
    </div>
  );
}
