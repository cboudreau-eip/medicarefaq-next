# Project rules

## Content and code workflow

The CMS and coding assistants have separate responsibilities:

- **CMS** creates, edits, schedules, and publishes site content directly to `main`.
- **Coding assistants** handle templates, features, broken links, rendering problems, code defects, and technical maintenance. Do not use a coding assistant for routine CMS content work unless the user asks.

`main` is the production branch and the single source of truth. Vercel production deploys from `main`. There is no long-running staging branch because it would become stale whenever the CMS publishes content.

### Rules

1. Start every task from the latest production state:
   ```
   git fetch origin
   git switch main
   git pull --ff-only origin main
   ```
2. Create a short-lived branch from that exact commit. Use the branch prefix required by the active coding assistant.
3. Preserve all CMS commits and unrelated user changes. Never replace a current content file with an older copy from another branch or commit.
4. Before publishing code work, fetch `origin/main` again and incorporate any CMS commits created during the task. Resolve conflicts in favor of preserving the newest CMS content plus the intended code change.
5. Review the final diff against current `origin/main`. It must contain only the requested work.
6. Run checks appropriate to the change before publishing.
7. A request to make, fix, add, or update something authorizes committing and publishing the verified finished change to `main`. Do not ask for a separate push confirmation. Never force push.

Vercel preview deployments should use short-lived branches. Do not recreate a long-running `develop` branch.

## CMS / admin gate

All admin surfaces are gated behind the `ENABLE_CMS` env var (fail-closed: only the exact
string `"true"` enables them). The gate lives in `src/middleware.ts` (single chokepoint) with
defense-in-depth in `src/lib/cms-auth.ts` (`isCmsEnabled()` / `checkCmsAuth()`).

- Production (`main`): `ENABLE_CMS` unset → CMS/admin return 404.
- Firewalled deployment: `ENABLE_CMS=true` **plus** a network-level control
  (Vercel Deployment Protection / Trusted IPs / VPN). The flag alone is not a firewall.
- Local dev: `ENABLE_CMS=true` in `.env.local` (gitignored).

Public tracking endpoints (`/api/heatmap/track`, base `/api/chat-log` POST, `…/init`) are
intentionally NOT gated — see the matcher in `src/middleware.ts`.

## Chat widget gate

The public-facing chat widget (`src/components/ChatWidget.tsx`) is gated behind the
`ENABLE_CHAT` env var (fail-closed: only the exact string `"true"` renders it). The gate is a
single conditional in `src/app/layout.tsx`.

- Default (unset / any other value): the widget does not render anywhere.
- To re-enable on a deployment: set `ENABLE_CHAT=true` (or add it to `.env.local` for local dev).

Note: this only hides the widget. The chat API routes still exist server-side but go unused
when nothing calls them.
