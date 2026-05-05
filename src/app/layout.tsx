import type { Metadata } from "next";
import Script from "next/script";
import HeatmapTracker from "@/components/HeatmapTracker";
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
  },
  twitter: {
    card: "summary_large_image",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Invoca Call Tracking */}
        <Script
          id="invoca-tag"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(i,n,v,o,c,a) { i.InvocaTagId = o; var s = n.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = ('https:' === n.location.protocol ? 'https://' : 'http://' ) + v; var fs = n.getElementsByTagName('script')[0]; fs.parentNode.insertBefore(s, fs); })(window, document, 'solutions.invocacdn.com/js/invoca-latest.min.js', '1925/3559588726');`,
          }}
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
        {children}
        <HeatmapTracker />
      </body>
    </html>
  );
}
