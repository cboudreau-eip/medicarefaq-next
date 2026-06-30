import type { Metadata } from "next";
import Script from "next/script";
import HeatmapTracker from "@/components/HeatmapTracker";
import InvocaRefresh from "@/components/InvocaRefresh";
import ChatWidget from "@/components/ChatWidget";
import PostHogProvider from "@/components/PostHogProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MedicareFAQ | Your Supplemental Medicare Resource Center",
    template: "%s | MedicareFAQ",
  },
  description:
    "MedicareFAQ specializes in supplemental Medicare insurance. We make Medicare plans easy to understand, as well as easy to enroll.",
  metadataBase: new URL("https://www.medicarefaq.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: "MedicareFAQ",
    locale: "en_US",
    images: [
      {
        url: "https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "MedicareFAQ - Your Supplemental Medicare Resource Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.medicarefaq.com/wp-content/uploads/medicarefaq-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect hints — open connections early to reduce latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d2xsxph8kpxj0f.cloudfront.net" />

        {/* Google Fonts — preloaded as non-render-blocking, then applied as stylesheet */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Invoca Call Tracking — loads after page is interactive so it can scan DOM for phone elements */}
        <Script
          id="invoca-tag-id"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.InvocaTagId = '1925/3559588726';`,
          }}
        />
        <Script
          id="invoca-script"
          strategy="afterInteractive"
          src="https://solutions.invocacdn.com/js/invoca-latest.min.js"
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5L4D58F');`,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5L4D58F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PostHogProvider>
          {children}
        </PostHogProvider>
        <HeatmapTracker />
        <InvocaRefresh />
        {/* Chat widget is fail-closed: only render when ENABLE_CHAT === "true".
            Unset / any other value (prod default) keeps the chat system off. */}
        {process.env.ENABLE_CHAT === "true" && <ChatWidget />}
      </body>
    </html>
  );
}
