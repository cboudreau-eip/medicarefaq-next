/**
 * Shared GitHub read/write helpers for CMS API routes.
 *
 * These centralize the logic that several CMS routes (create, upload-image,
 * and now the Pages metadata/schema editor) all need: reading a file's
 * content + SHA, and committing an updated file back to the repo.
 */

const GITHUB_TOKEN = process.env.GITHUB_PAT ?? process.env.GITHUB_TOKEN ?? "";
export const CMS_REPO = "cboudreau-eip/medicarefaq-next";
export const CMS_BRANCH = "main";

/**
 * Fetch a file's UTF-8 content and blob SHA from GitHub.
 */
export async function githubGetFileContent(
  path: string
): Promise<{ content: string; sha: string }> {
  const metaRes = await fetch(
    `https://api.github.com/repos/${CMS_REPO}/contents/${path}?ref=${CMS_BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    }
  );
  if (!metaRes.ok) {
    throw new Error(`GitHub GET error: ${metaRes.status} for ${path}`);
  }
  const meta = await metaRes.json();
  const sha = meta.sha;
  if (meta.content && meta.encoding === "base64") {
    const content = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf-8");
    return { content, sha };
  }
  if (meta.download_url) {
    const rawRes = await fetch(meta.download_url, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
      cache: "no-store",
    });
    if (!rawRes.ok) {
      throw new Error(`GitHub raw download error: ${rawRes.status} for ${path}`);
    }
    const content = await rawRes.text();
    return { content, sha };
  }
  throw new Error(`Cannot retrieve content for ${path} (encoding: ${meta.encoding})`);
}

function encodeBase64(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

/**
 * Commit updated UTF-8 content for a file back to the repo.
 * Returns the new commit SHA.
 */
export async function githubCommitFile(params: {
  path: string;
  content: string;
  sha: string;
  message: string;
}): Promise<{ commitSha: string | undefined }> {
  const { path, content, sha, message } = params;
  const commitRes = await fetch(
    `https://api.github.com/repos/${CMS_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: encodeBase64(content),
        sha,
        branch: CMS_BRANCH,
      }),
    }
  );
  if (!commitRes.ok) {
    const err = await commitRes.text();
    throw new Error(`GitHub commit failed: ${commitRes.status} - ${err}`);
  }
  const commitData = await commitRes.json();
  return { commitSha: commitData.commit?.sha };
}

export function hasGithubToken(): boolean {
  return !!GITHUB_TOKEN;
}
