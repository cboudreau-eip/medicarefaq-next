#!/usr/bin/env python3
"""
One-time cleanup: extract embedded base64 featured images from draft JSON files,
write them as real PNGs under public/images/generated/, replace the base64 with a
URL in the draft's `image` field, and remove the bulky pendingImage* fields.

Run from the repo root: python3 scripts/cleanup-draft-images.py
"""
import base64
import json
import os
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRAFTS_DIR = os.path.join(REPO_ROOT, "drafts")
IMAGES_DIR = os.path.join(REPO_ROOT, "public", "images", "generated")

os.makedirs(IMAGES_DIR, exist_ok=True)


def safe_filename(name: str, fallback: str) -> str:
    """Return a clean .png filename."""
    if not name:
        name = fallback
    name = name.strip()
    if not name.lower().endswith(".png"):
        name = re.sub(r"\.[a-zA-Z0-9]+$", "", name) + ".png"
    # sanitize
    base = re.sub(r"[^a-zA-Z0-9._-]+", "-", name).strip("-")
    return base or (fallback + ".png")


def main():
    results = []
    for fn in sorted(os.listdir(DRAFTS_DIR)):
        if not fn.endswith(".json"):
            continue
        path = os.path.join(DRAFTS_DIR, fn)
        try:
            with open(path, "r", encoding="utf-8") as fh:
                draft = json.load(fh)
        except Exception as e:
            results.append((fn, f"SKIP (parse error: {e})"))
            continue

        b64 = draft.get("pendingImageBase64")
        if not b64:
            results.append((fn, "skip (no embedded image)"))
            continue

        draft_id = draft.get("id") or fn[:-5]
        filename = safe_filename(draft.get("pendingImageFileName", ""), draft_id[:40])

        # Avoid collisions: prefix with draft id stem if the generic name is short/duplicated
        # Use the draft id to guarantee uniqueness.
        stem = re.sub(r"[^a-zA-Z0-9-]+", "-", draft_id)[:50].strip("-")
        filename = f"{stem}.png"

        out_path = os.path.join(IMAGES_DIR, filename)
        try:
            with open(out_path, "wb") as img:
                img.write(base64.b64decode(b64))
        except Exception as e:
            results.append((fn, f"SKIP (decode error: {e})"))
            continue

        # Update draft fields
        draft["image"] = f"/images/generated/{filename}"
        draft.pop("pendingImageBase64", None)
        draft.pop("pendingImageFileName", None)

        with open(path, "w", encoding="utf-8") as fh:
            json.dump(draft, fh, indent=2, ensure_ascii=False)

        new_size = os.path.getsize(path)
        results.append((fn, f"OK -> {filename} (draft now {new_size//1024} KB)"))

    print("\n=== Cleanup results ===")
    for fn, status in results:
        print(f"{status:55} {fn}")


if __name__ == "__main__":
    main()
