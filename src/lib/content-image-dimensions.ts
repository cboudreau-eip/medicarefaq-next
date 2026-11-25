type ImageDimensions = { width: number; height: number };

// Intrinsic sizes for uncropped article images. Keep these in sync when replacing
// an asset so lazy images reserve their final space before the download finishes.
const contentImageDimensions: Record<string, ImageDimensions> = {
  "/images/cta-banner-find-plan.jpg": { width: 1584, height: 672 },
  "/images/generated/medicare-combinations-pathway-diagram.png": { width: 2560, height: 1440 },
  "/images/generated/medicare-coverage-gaps-original.png": { width: 2560, height: 1440 },
  "/images/generated/medigap-vs-medicare-advantage-visual.png": { width: 2560, height: 1440 },
  "/images/generated/dual-eligible-medicare-medicaid-dsnp.png": { width: 2560, height: 1440 },
};

export function getContentImageDimensions(src: string): ImageDimensions | undefined {
  // Unknown images retain their natural proportions; never guess a crop ratio.
  return contentImageDimensions[src];
}
