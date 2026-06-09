import { sql } from 'drizzle-orm'
import { db } from './index'

// Idempotent schema bootstrap. Because the Neon connection string is stored as a
// Vercel "Sensitive" env var (not readable locally), we can't run drizzle-kit
// push from a dev machine — so the deployed app creates its own tables on first
// use. Memoized per server instance so it only runs once per cold start.
let ran: Promise<void> | null = null

const DEFAULT_SECTION = `'{"mode":"bullets","items":[]}'::jsonb`

export function ensureSchema(): Promise<void> {
  if (!ran) {
    ran = (async () => {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS positions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          slug text NOT NULL UNIQUE,
          status text NOT NULL DEFAULT 'draft',
          filled boolean NOT NULL DEFAULT false,
          title text NOT NULL,
          summary text NOT NULL DEFAULT '',
          type_of_job_offer text NOT NULL DEFAULT '',
          country text NOT NULL DEFAULT '',
          place_of_work text NOT NULL DEFAULT '',
          type_of_cooperation text NOT NULL DEFAULT '',
          language_skills text[] NOT NULL DEFAULT '{}',
          city text NOT NULL DEFAULT '',
          reward text NOT NULL DEFAULT '',
          allocation_duration text NOT NULL DEFAULT '',
          seniority text NOT NULL DEFAULT '',
          start_date text NOT NULL DEFAULT '',
          responsibilities jsonb NOT NULL DEFAULT ${sql.raw(DEFAULT_SECTION)},
          requirements jsonb NOT NULL DEFAULT ${sql.raw(DEFAULT_SECTION)},
          language_requirements jsonb NOT NULL DEFAULT ${sql.raw(DEFAULT_SECTION)},
          benefits jsonb NOT NULL DEFAULT ${sql.raw(DEFAULT_SECTION)},
          created_at timestamptz NOT NULL DEFAULT now()
        );
      `)

      // In case the table predates the "filled" column.
      await db.execute(
        sql`ALTER TABLE positions ADD COLUMN IF NOT EXISTS filled boolean NOT NULL DEFAULT false;`
      )

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS submissions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          position_id uuid REFERENCES positions(id) ON DELETE SET NULL,
          position_title text NOT NULL DEFAULT '',
          email text NOT NULL,
          phone text NOT NULL DEFAULT '',
          message text NOT NULL DEFAULT '',
          cv_url text NOT NULL,
          cv_filename text NOT NULL DEFAULT '',
          created_at timestamptz NOT NULL DEFAULT now()
        );
      `)
    })().catch((err) => {
      // Reset so a later request can retry after a transient failure.
      ran = null
      throw err
    })
  }
  return ran
}
