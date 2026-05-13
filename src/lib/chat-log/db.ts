import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return neon(databaseUrl);
}

export async function initChatLogSchema() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS chat_conversations (
      id SERIAL PRIMARY KEY,
      session_id TEXT NOT NULL UNIQUE,
      page_path TEXT NOT NULL,
      started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      message_count INTEGER DEFAULT 0,
      device_type TEXT NOT NULL DEFAULT 'desktop'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Add unique constraint if table already exists without it
  await sql`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chat_conversations_session_id_key'
      ) THEN
        ALTER TABLE chat_conversations ADD CONSTRAINT chat_conversations_session_id_key UNIQUE (session_id);
      END IF;
    END
    $$;
  `;

  // Indexes for faster queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_conv_session ON chat_conversations(session_id)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_conv_started ON chat_conversations(started_at)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_msg_session ON chat_messages(session_id)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_msg_created ON chat_messages(created_at)
  `;
}
