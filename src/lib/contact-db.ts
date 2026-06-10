import { getDb } from "@/lib/chat-log/db";

/**
 * Initialize the contact_submissions table
 */
export async function initContactSchema() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      reason TEXT NOT NULL,
      zipcode TEXT,
      message TEXT,
      is_customer TEXT,
      submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      status TEXT DEFAULT 'new'
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_contact_submitted_at ON contact_submissions(submitted_at)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email)
  `;
}
