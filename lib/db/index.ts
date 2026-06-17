import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Vercel's native Neon integration injects DATABASE_URL; older Vercel Postgres
// stores expose POSTGRES_URL. Support both.
function connectionString(): string {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? ''
  if (!url) {
    throw new Error(
      'No database connection string (DATABASE_URL / POSTGRES_URL) is set.'
    )
  }
  return url
}

// Lazy singleton so that merely importing this module during build (when no env
// is present) never throws — the client is created on first query instead.
let _db: NeonHttpDatabase<typeof schema> | null = null

function getDb(): NeonHttpDatabase<typeof schema> {
  if (!_db) {
    // The Neon HTTP driver runs over fetch, which Next.js caches by default in
    // server components/route handlers. Force no-store so reads are always fresh
    // (e.g. an admin toggling "filled" reflects immediately on the site).
    _db = drizzle(neon(connectionString(), { fetchOptions: { cache: 'no-store' } }), {
      schema,
    })
  }
  return _db
}

// Proxy that forwards all property access to the lazily-created drizzle client.
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    const client = getDb()
    const value = (client as unknown as Record<string | symbol, unknown>)[prop]
    return typeof value === 'function' ? value.bind(client) : value
  },
})

export { schema }
