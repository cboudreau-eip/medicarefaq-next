# Project rules

## Branching workflow

This repo uses a long-running `develop` branch as the integration/preview branch.

- **`main`** — production. Vercel production deploys from here. `ENABLE_CMS` is unset/false here, so the CMS and all admin surfaces 404 in prod.
- **`develop`** — preview/staging. Vercel preview deploys from here. This is the default base for all new work.

### Rules

1. **Always branch off `develop`**, never off `main`.
   ```
   git checkout develop && git pull
   git checkout -b feature/<short-name>
   ```
2. **Open PRs into `develop`**, not `main`. Feature branches merge to `develop` first.
3. **Releases go `develop` → `main`** via a PR, only when changes are ready to ship to production.
4. **Hotfixes**: if something must skip the queue, branch off `main`, PR into `main`, then merge `main` back into `develop` so the branches don't drift.
5. Keep `develop` ahead of (or equal to) `main` at all times — never let `main` contain commits that aren't in `develop`.

### Sync check — don't let `develop` fall behind `main`

Production (and the CMS) deploys from `main`, and release PRs merge `develop` → `main`, so
`main` regularly gains a merge commit (and the occasional hotfix) that `develop` does not have.
Left unchecked, `develop` drifts behind `main` and later merges get messy. **This has already
happened once** — treat it as a recurring chore, not a one-off.

**Run this at the start of any work session, and after every merge into `main`:**

```
git fetch origin
git log --oneline origin/develop..origin/main   # commits on main NOT yet on develop
```

- **Empty output** → branches are in sync. Proceed.
- **Any commits listed** → `develop` is behind. Resync it before doing anything else:
  ```
  git checkout develop && git pull
  git merge origin/main
  git push origin develop
  ```

This enforces rule 5 and keeps the branching graph linear instead of divergent.

### Branch naming

- `feature/<name>` — new functionality
- `fix/<name>` — bug fixes
- `chore/<name>` — tooling, deps, config

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
