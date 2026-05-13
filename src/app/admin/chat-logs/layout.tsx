import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat Logs | Admin",
};

export default function ChatLogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
