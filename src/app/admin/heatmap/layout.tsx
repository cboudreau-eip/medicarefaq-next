import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heatmap Admin",
  icons: {
    icon: "/heatmap-favicon.png",
    apple: "/heatmap-favicon.png",
  },
};

export default function HeatmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
