import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// vercel env pull writes to .env.local
config({ path: '.env.local' })
config({ path: '.env' })

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '',
  },
})
