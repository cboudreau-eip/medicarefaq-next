import { NextRequest, NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";

/**
 * Fetch file content and SHA from GitHub. Handles large files (>1MB)
 * by falling back to the raw download URL.
 */
async function githubGetFileContent(path: string): Promise<{ content: string; sha: string }> {
  const metaRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!metaRes.ok) throw new Error(`GitHub GET error: ${metaRes.status} for ${path}`);
  const meta = await metaRes.json();
  const sha = meta.sha;

  // If content is available (small files), decode base64
  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }

  // For large files, use the raw download URL
  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      cache: "no-store",
    });
    if (!rawRes.ok) throw new Error(`GitHub raw download error: ${rawRes.status} for ${path}`);
    const content = await rawRes.text();
    return { content, sha };
  }

  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

/**
 * Replace the SEO block and title in the source for a given slug.
 */
function patchArticleInSource(
  src: string,
  slug: string,
  updates: {
    newSlug?: string;
    title?: string;
    seoTitle?: string;
    seoDescription?: string;
    ogImage?: string;
    image?: string;
    imageAlt?: string;
    sectionsRaw?: string;
    customSchemaRaw?: string;
  }
): string {
  // Find the slug entry
  const slugPattern = new RegExp(`slug:\\s*["']${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "");
  const slugIdx = src.search(slugPattern);
  if (slugIdx === -1) throw new Error(`Slug "${slug}" not found in source`);

  // Walk back to find the opening brace of this object
  let braceStart = slugIdx;
  while (braceStart > 0 && src[braceStart] !== "{") braceStart--;

  // Walk forward to find the matching closing brace
  let depth = 0;
  let i = braceStart;
  while (i < src.length) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
    i++;
  }
  const blockEnd = i + 1;
  let block = src.slice(braceStart, blockEnd);

  // Patch slug if changed
  if (updates.newSlug && updates.newSlug !== slug) {
    block = block.replace(
      /(\bslug:\s*)["'](?:[^"'\\]|\\.)*["']/,
      `$1"${updates.newSlug.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    );
    // Also update canonical URL if it contains the old slug
    const oldSlugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const canonicalRegex = new RegExp(`(canonical:\\s*")[^"]*${oldSlugEscaped}[^"]*"`);
    const canonicalMatch = block.match(canonicalRegex);
    if (canonicalMatch) {
      block = block.replace(
        canonicalRegex,
        `$1${canonicalMatch[0].slice(canonicalMatch[1].length).replace(slug, updates.newSlug)}`
      );
    }
  }

  // Patch title
  if (updates.title != null) {
    block = block.replace(
      /(\btitle:\s*)"(?:[^"\\]|\\.)*"/,
      `$1"${(updates.title || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    );
  }

  // Patch image field
  if (updates.image != null) {
    block = block.replace(
      /(\bimage:\s*)["'](?:[^"'\\]|\\.)*["']/,
      `$1"${(updates.image || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
    );
  }
  // Patch imageAlt field
  if (updates.imageAlt != null) {
    const imageAltVal = updates.imageAlt || "";
    const hasImageAlt = /imageAlt:\s*"/.test(block);
    if (hasImageAlt) {
      block = block.replace(
        /(\bimageAlt:\s*)"(?:[^"\\]|\\.)*"/,
        `$1"${imageAltVal.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
      );
    } else if (imageAltVal) {
      // Insert imageAlt after image field if it doesn't exist
      block = block.replace(
        /(\bimage:\s*"(?:[^"\\]|\\.)*")(,?)/,
        `$1,\n      imageAlt: "${imageAltVal.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}",`
      );
    }
  }
  // Patch seo fields
  if (updates.seoTitle !== undefined || updates.seoDescription !== undefined || updates.ogImage !== undefined) {
    // Find seo block within the article block
    const seoStart = block.indexOf("seo:");
    if (seoStart !== -1) {
      const seoOpenBrace = block.indexOf("{", seoStart);
      let seoDepth = 0;
      let j = seoOpenBrace;
      while (j < block.length) {
        if (block[j] === "{") seoDepth++;
        else if (block[j] === "}") {
          seoDepth--;
          if (seoDepth === 0) break;
        }
        j++;
      }
      let seoBlock = block.slice(seoOpenBrace, j + 1);

      if (updates.seoTitle != null) {
        seoBlock = seoBlock.replace(
          /(\btitle:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${(updates.seoTitle || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }
      if (updates.seoDescription != null) {
        seoBlock = seoBlock.replace(
          /(\bdescription:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${(updates.seoDescription || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }
      if (updates.ogImage != null) {
        seoBlock = seoBlock.replace(
          /(\bogImage:\s*)"(?:[^"\\]|\\.)*"/,
          `$1"${(updates.ogImage || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
        );
      }

      block = block.slice(0, seoOpenBrace) + seoBlock + block.slice(j + 1);
    }
  }

  // Patch sections if provided
  if (updates.sectionsRaw !== undefined) {
    const sectionsIdx = block.indexOf("sections:");
    if (sectionsIdx !== -1) {
      const arrStart = block.indexOf("[", sectionsIdx);
      if (arrStart !== -1) {
        let depth2 = 0;
        let k = arrStart;
        while (k < block.length) {
          if (block[k] === "[") depth2++;
          else if (block[k] === "]") {
            depth2--;
            if (depth2 === 0) break;
          }
          k++;
        }
        block = block.slice(0, arrStart) + updates.sectionsRaw + block.slice(k + 1);
      }
    }
  }

  // Patch customSchema if provided
  if (updates.customSchemaRaw !== undefined) {
    const csIdx = block.indexOf("customSchema:");
    if (csIdx !== -1) {
      // Replace existing customSchema array
      const csArrStart = block.indexOf("[", csIdx);
      if (csArrStart !== -1) {
        let depth2 = 0;
        let k = csArrStart;
        while (k < block.length) {
          if (block[k] === "[") depth2++;
          else if (block[k] === "]") {
            depth2--;
            if (depth2 === 0) break;
          }
          k++;
        }
        if (updates.customSchemaRaw) {
          block = block.slice(0, csArrStart) + updates.customSchemaRaw + block.slice(k + 1);
        } else {
          // Remove the customSchema field entirely if empty
          // Find the start of the line containing customSchema
          let lineStart = csIdx;
          while (lineStart > 0 && block[lineStart - 1] !== '\n') lineStart--;
          let lineEnd = k + 1;
          // Skip trailing comma and whitespace
          while (lineEnd < block.length && (block[lineEnd] === ',' || block[lineEnd] === '\n' || block[lineEnd] === ' ')) lineEnd++;
          block = block.slice(0, lineStart) + block.slice(lineEnd);
        }
      }
    } else if (updates.customSchemaRaw) {
      // Insert customSchema before the closing brace of the article
      // Find the last closing brace
      const lastBrace = block.lastIndexOf("}");
      const insertPoint = block.lastIndexOf(",", lastBrace);
      if (insertPoint !== -1) {
        block = block.slice(0, insertPoint + 1) + `\n    customSchema: ${updates.customSchemaRaw},` + block.slice(insertPoint + 1);
      } else {
        // Insert before the final closing brace with a comma
        block = block.slice(0, lastBrace) + `,\n    customSchema: ${updates.customSchemaRaw},\n  ` + block.slice(lastBrace);
      }
    }
  }

  return src.slice(0, braceStart) + block + src.slice(blockEnd);
}

export async function POST(req: NextRequest) {
  if (!checkCmsAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, type, title, seoTitle, seoDescription, ogImage, image, imageAlt, sectionsRaw, customSchemaRaw, newSlug } = body;

    if (!slug || !type) {
      return NextResponse.json({ error: "slug and type required" }, { status: 400 });
    }

    const filePath =
      type === "blog"
        ? "src/lib/blog-articles-data.ts"
        : "src/lib/coverage-data.ts";

    // Get current file content and SHA
    const { content: currentSrc, sha: fileSha } = await githubGetFileContent(filePath);

    // Apply patches
    const patchedSrc = patchArticleInSource(currentSrc, slug, {
      newSlug: newSlug || undefined,
      title,
      seoTitle,
      seoDescription,
      ogImage,
      image,
      imageAlt,
      sectionsRaw,
      customSchemaRaw,
    });

    if (patchedSrc === currentSrc) {
      return NextResponse.json({ message: "No changes detected", committed: false });
    }

    // Commit to GitHub via the Git Blobs + Trees API for large files
    // (The Contents API has a 100MB limit but requires base64 which doubles size)
    // For files under ~50MB, the Contents API PUT still works with base64
    const commitRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `cms: update "${newSlug || slug}" - title, SEO, and content`,
          content: encodeBase64(patchedSrc),
          sha: fileSha,
          branch: BRANCH,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.text();
      throw new Error(`GitHub commit failed: ${commitRes.status} - ${err}`);
    }

    const commitData = await commitRes.json();

    return NextResponse.json({
      committed: true,
      commitSha: commitData.commit?.sha,
      message: `Published "${slug}" successfully. Vercel deploy triggered.`,
    });
  } catch (err) {
    console.error("[CMS publish]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
