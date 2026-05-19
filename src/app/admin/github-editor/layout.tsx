import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub CMS Editor | MedicareFAQ Admin",
  robots: "noindex, nofollow",
};

export default function GitHubEditorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
