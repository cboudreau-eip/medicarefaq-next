import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(databaseUrl);
}

export async function initHeatmapSchema() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS heatmap_clicks (
      id SERIAL PRIMARY KEY,
      page_path TEXT NOT NULL,
      x_percent REAL NOT NULL,
      y_percent REAL NOT NULL,
      viewport_width INTEGER NOT NULL,
      viewport_height INTEGER NOT NULL,
      element_tag TEXT,
      element_id TEXT,
      element_class TEXT,
      element_text TEXT,
      device_type TEXT NOT NULL DEFAULT 'desktop',
      session_id TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS heatmap_scroll (
      id SERIAL PRIMARY KEY,
      page_path TEXT NOT NULL,
      max_scroll_percent REAL NOT NULL,
      viewport_height INTEGER NOT NULL,
      page_height INTEGER NOT NULL,
      device_type TEXT NOT NULL DEFAULT 'desktop',
      session_id TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Create indexes for faster queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_clicks_page_path ON heatmap_clicks(page_path)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_clicks_created_at ON heatmap_clicks(created_at)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_scroll_page_path ON heatmap_scroll(page_path)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_scroll_created_at ON heatmap_scroll(created_at)
  `;
}
