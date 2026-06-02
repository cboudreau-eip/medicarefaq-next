import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
const CMS_PASSWORD = process.env.CMS_ADMIN_PASSWORD ?? "";
const REPO = "cboudreau-eip/medicarefaq-next";
const BRANCH = "main";
const DRAFTS_DIR = "drafts";

function checkCmsAuth(request: Request): boolean {
  if (!CMS_PASSWORD) return false;
  const pw = request.headers.get("x-cms-password") ?? "";
  return pw === CMS_PASSWORD;
}

/**
 * GitHub API helper: create or update a file.
 */
async function githubPutFile(
  path: string,
  content: string,
  message: string,
  sha?: string
): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub PUT error ${res.status}: ${err}`);
  }
}

/**
 * GitHub API helper: delete a file.
 */
async function githubDeleteFile(path: string, sha: string, message: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, sha, branch: BRANCH }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub DELETE error ${res.status}: ${err}`);
  }
}

/**
 * GitHub API helper: get file metadata (sha) and content.
 */
async function githubGetFile(path: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET error: ${res.status} for ${path}`);
  const meta = await res.json();
  const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
  return { content, sha: meta.sha };
}

/**
 * GitHub API helper: list files in a directory.
 */
async function githubListDir(path: string): Promise<{ name: string; sha: string; download_url: string }[]> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub list dir error: ${res.status}`);
  const items = await res.json();
  if (!Array.isArray(items)) return [];
  return items
    .filter((item: { type: string; name: string }) => item.type === "file" && item.name.endsWith(".json"))
    .map((item: { name: string; sha: string; download_url: string }) => ({
      name: item.name,
      sha: item.sha,
      download_url: item.download_url,
    }));
}

/**
 * GET /api/cms/drafts
 * 
 * Query params:
 *   - id: (optional) specific draft ID to load
 * 
 * Without id: returns list of all drafts with metadata
 * With id: returns full draft content
 */
export async function GET(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Load a specific draft
      const filePath = `${DRAFTS_DIR}/${id}.json`;
      const file = await githubGetFile(filePath);
      if (!file) {
        return NextResponse.json({ error: "Draft not found" }, { status: 404 });
      }
      const draft = JSON.parse(file.content);
      return NextResponse.json({ draft, sha: file.sha });
    }

    // List all drafts
    const files = await githubListDir(DRAFTS_DIR);
    
    // Fetch metadata from each draft file (title, updatedAt, category)
    const drafts = await Promise.all(
      files.map(async (file) => {
        try {
          const fileData = await githubGetFile(`${DRAFTS_DIR}/${file.name}`);
          if (!fileData) return null;
          const data = JSON.parse(fileData.content);
          return {
            id: file.name.replace(".json", ""),
            title: data.title || "Untitled",
            category: data.category || "General",
            updatedAt: data.updatedAt || data.createdAt || "",
            createdAt: data.createdAt || "",
            hasTransformed: !!data.sections && data.sections.length > 0,
          };
        } catch {
          return null;
        }
      })
    );

    return NextResponse.json({
      drafts: drafts.filter(Boolean).sort((a, b) => {
        const dateA = a?.updatedAt || "";
        const dateB = b?.updatedAt || "";
        return dateB.localeCompare(dateA);
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to load drafts: ${err}` },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cms/drafts
 * 
 * Body: { id?, title, rawContent, sections?, tableOfContents?, ...metadata }
 * 
 * Creates or updates a draft. If no id provided, generates one from the title.
 */
export async function PUT(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id: providedId, ...draftData } = body;

    // Generate an ID from title if not provided
    const id =
      providedId ||
      (draftData.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) +
        "-" +
        Date.now().toString(36);

    const now = new Date().toISOString();
    const draft = {
      ...draftData,
      id,
      updatedAt: now,
      createdAt: draftData.createdAt || now,
    };

    const filePath = `${DRAFTS_DIR}/${id}.json`;
    const content = JSON.stringify(draft, null, 2);

    // Check if file already exists (to get SHA for update)
    const existing = await githubGetFile(filePath);
    const sha = existing?.sha;

    await githubPutFile(
      filePath,
      content,
      sha ? `Update draft: ${draftData.title || id}` : `Save draft: ${draftData.title || id}`,
      sha
    );

    return NextResponse.json({ success: true, id, updatedAt: now });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to save draft: ${err}` },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cms/drafts
 * 
 * Body: { id }
 * 
 * Deletes a draft from the repo.
 */
export async function DELETE(request: Request) {
  if (!checkCmsAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Draft ID required" }, { status: 400 });
    }

    const filePath = `${DRAFTS_DIR}/${id}.json`;
    const existing = await githubGetFile(filePath);
    if (!existing) {
      return NextResponse.json({ error: "Draft not found" }, { status: 404 });
    }

    await githubDeleteFile(filePath, existing.sha, `Delete draft: ${id}`);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to delete draft: ${err}` },
      { status: 500 }
    );
  }
}
