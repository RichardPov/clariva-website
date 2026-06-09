import { desc, eq } from 'drizzle-orm'
import { db } from './index'
import {
  positions,
  submissions,
  type NewPosition,
  type NewSubmission,
} from './schema'
import { slugify } from '@/lib/slug'

/** All positions (admin view), newest first. */
export async function listAllPositions() {
  return db.select().from(positions).orderBy(desc(positions.createdAt))
}

/** Published positions only (public), newest first. */
export async function listPublishedPositions() {
  return db
    .select()
    .from(positions)
    .where(eq(positions.status, 'published'))
    .orderBy(desc(positions.createdAt))
}

/** Latest N published positions (landing). */
export async function listLatestPublished(limit = 3) {
  return db
    .select()
    .from(positions)
    .where(eq(positions.status, 'published'))
    .orderBy(desc(positions.createdAt))
    .limit(limit)
}

export async function getPositionBySlug(slug: string) {
  const rows = await db
    .select()
    .from(positions)
    .where(eq(positions.slug, slug))
    .limit(1)
  return rows[0]
}

export async function getPositionById(id: string) {
  const rows = await db
    .select()
    .from(positions)
    .where(eq(positions.id, id))
    .limit(1)
  return rows[0]
}

/** Create a position, ensuring a unique slug derived from the title. */
export async function createPosition(data: NewPosition) {
  const slug = await uniqueSlug(data.title)
  const rows = await db
    .insert(positions)
    .values({ ...data, slug })
    .returning()
  return rows[0]
}

export async function updatePosition(id: string, data: Partial<NewPosition>) {
  // Keep slug in sync if the title changed.
  let patch = data
  if (data.title) {
    const existing = await getPositionById(id)
    if (existing && existing.title !== data.title) {
      patch = { ...data, slug: await uniqueSlug(data.title, id) }
    }
  }
  const rows = await db
    .update(positions)
    .set(patch)
    .where(eq(positions.id, id))
    .returning()
  return rows[0]
}

export async function deletePosition(id: string) {
  await db.delete(positions).where(eq(positions.id, id))
}

async function uniqueSlug(title: string, ignoreId?: string): Promise<string> {
  const base = slugify(title) || 'position'
  let candidate = base
  let n = 1
  // Small dataset — linear probe is fine.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await getPositionBySlug(candidate)
    if (!existing || existing.id === ignoreId) return candidate
    n += 1
    candidate = `${base}-${n}`
  }
}

// ── Submissions ─────────────────────────────────────────────
export async function listSubmissions() {
  return db.select().from(submissions).orderBy(desc(submissions.createdAt))
}

export async function createSubmission(data: NewSubmission) {
  const rows = await db.insert(submissions).values(data).returning()
  return rows[0]
}
