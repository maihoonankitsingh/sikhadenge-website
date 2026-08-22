import type { FunnelConfig } from "../../lib/funnel/types";

export default function ProductGlyph({ product }: { product: FunnelConfig["product"] }) {
  return (
    <div className="funnel-product-glyph" aria-hidden="true">
      <span>{product === "chatgpt" ? "GPT" : "C"}</span>
    </div>
  );
}
