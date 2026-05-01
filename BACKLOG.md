# MedicareFAQ Site — Backlog

Items noted here are ideas or features to revisit after launch.

---

## Custom Heatmap System

**Status:** Backburner — revisit post-launch

**Summary:** Build a first-party heatmap tool directly into the site (no third-party services like Clarity or Hotjar). All data stays in our own database.

**Planned scope:**
- Client-side click and scroll tracking script (lightweight, batched events)
- Server-side API endpoint to receive and store events
- MySQL storage: page path, normalized x/y coordinates, timestamp, device type
- Password-protected admin viewer at `/admin/heatmap` with:
  - Page URL selector
  - Color overlay showing click density (red = high, blue = low)
  - Date range and device type filters
  - Scroll depth map

**Not included in v1:**
- Session recordings (video replay)
- Rage-click / dead-click detection (can add later)

---
