"use client";
/**
 * PostHogProvider
 * Initializes PostHog with:
 *  - capture_pageview: false  (manual pageview tracking for Next.js App Router)
 *  - bootstrap: pre-seeds distinctID and sessionID when available to avoid
 *    anonymous-ID thrash on first event
 */
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

if (typeof window !== "undefined") {
  const distinctId =
    (typeof window !== "undefined" &&
      (window as Window & { _posthog_distinct_id?: string })
        ._posthog_distinct_id) ||
    undefined;
  const sessionId =
    (typeof window !== "undefined" &&
      (window as Window & { _posthog_session_id?: string })
        ._posthog_session_id) ||
    undefined;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    bootstrap: {
      ...(distinctId && { distinctID: distinctId }),
      ...(sessionId && { sessionID: sessionId }),
    },
  });
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  );
}
