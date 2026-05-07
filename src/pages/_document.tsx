import { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom _document.tsx — used alongside App Router to inject scripts
 * that must appear at the very top of <head>, before Next.js injects
 * its own preload/chunk links.
 *
 * Invoca DNI requires its script to load before GTM and other third-party
 * scripts so it can intercept phone number elements on page load.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Invoca Call Tracking — MUST be first in <head> for DNI to work */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.InvocaTagId = '1925/3559588726';`,
          }}
        />
        <script
          async
          src="https://solutions.invocacdn.com/js/invoca-latest.min.js"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
