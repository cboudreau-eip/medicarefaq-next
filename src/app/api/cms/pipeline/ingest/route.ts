import { NextRequest, NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getPipelineItemIds } from "@/lib/pipeline-db";

function getS3Client() {
  return new S3Client({
    region: process.env.AWS_REGION || "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
}

const BUCKET = process.env.S3_BUCKET_NAME || "marketing-manus-scraper";
const PREFIX = "incoming/";

export interface S3Article {
  id: string; // e.g. incoming/filename.json#article-0
  url: string;
  title: string;
  source: string;
  sourceType: string;
  category: string;
  snippet: string;
  publishedAt: string;
  readingTimeMinutes: number;
  importanceScore: number;
  seo: {
    suggestedTitle: string;
    metaDescription: string;
    primaryKeyword: string;
    semanticKeywords: string[];
    contentAngle: string;
  };
  topic: string;
  ingestedAt: string;
  fileKey: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const prefix = (body.prefix as string) || PREFIX;

    // Server owns dedup: read the ids already in the database rather than
    // trusting a list sent by the browser. Fall back to any client-provided
    // list if the DB read fails, so ingest still works degraded.
    let alreadyIngested: string[] = [];
    try {
      alreadyIngested = await getPipelineItemIds();
    } catch (e) {
      console.error("Pipeline ingest: DB dedup read failed, falling back to client list", e);
      alreadyIngested = (body.alreadyIngested as string[]) || [];
    }

    // List all objects in the incoming prefix
    const s3 = getS3Client();
    const listResp = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
      })
    );

    const objects = listResp.Contents || [];
    const jsonFiles = objects.filter((o) => o.Key?.endsWith(".json"));

    const newArticles: S3Article[] = [];

    for (const file of jsonFiles) {
      const key = file.Key!;

      // Fetch the file content
      const getResp = await s3.send(
        new GetObjectCommand({ Bucket: BUCKET, Key: key })
      );
      const bodyStr = await getResp.Body?.transformToString("utf-8");
      if (!bodyStr) continue;

      let data: any;
      try {
        data = JSON.parse(bodyStr);
      } catch {
        continue;
      }

      const articles = data.articles || [];
      for (let i = 0; i < articles.length; i++) {
        const articleId = `${key}#article-${i}`;

        // Skip already ingested
        if (alreadyIngested.includes(articleId)) continue;

        const article = articles[i];
        newArticles.push({
          id: articleId,
          url: article.url || "",
          title: article.title || "",
          source: article.source || "",
          sourceType: article.sourceType || "",
          category: article.category || data.topic || "",
          snippet: article.snippet || "",
          publishedAt: article.publishedAt || "",
          readingTimeMinutes: article.readingTimeMinutes || 0,
          importanceScore: article.importanceScore || 0,
          seo: {
            suggestedTitle: article.seo?.suggestedTitle || article.title || "",
            metaDescription: article.seo?.metaDescription || "",
            primaryKeyword: article.seo?.primaryKeyword || data.topic || "",
            semanticKeywords: article.seo?.semanticKeywords || [],
            contentAngle: article.seo?.contentAngle || "",
          },
          topic: data.topic || "",
          ingestedAt: data.ingestedAt || new Date().toISOString(),
          fileKey: key,
        });
      }
    }

    return NextResponse.json({
      success: true,
      newArticles,
      totalFiles: jsonFiles.length,
      totalNew: newArticles.length,
    });
  } catch (error: any) {
    console.error("Pipeline ingest error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to poll S3 bucket" },
      { status: 500 }
    );
  }
}
