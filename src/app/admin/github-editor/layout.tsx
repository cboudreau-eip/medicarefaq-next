import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub CMS Editor | MedicareFAQ Admin",
  robots: "noindex, nofollow",
  icons: {
    icon: [
      { url: "/cms-favicon.png", type: "image/png" },
      { url: "/cms-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function GitHubEditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
