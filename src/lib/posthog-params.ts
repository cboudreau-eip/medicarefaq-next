/**
 * PostHog Params Utility
 *
 * Appends PostHog distinct_id and session_id as hash parameters
 * to redirect URLs for cross-domain identity stitching.
 */
import posthog from "posthog-js";

export const appendPostHogParams = (url: string): string => {
  const distinctId = posthog.get_distinct_id();
  const sessionId = posthog.get_session_id();
  if (!distinctId && !sessionId) return url;

  const params: string[] = [];
  if (distinctId) params.push(`distinct_id=${distinctId}`);
  if (sessionId) params.push(`session_id=${sessionId}`);

  return `${url}#${params.join("&")}`;
};
