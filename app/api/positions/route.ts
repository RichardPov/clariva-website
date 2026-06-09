import { NextResponse } from 'next/server'
import { listPublishedPositions, listLatestPublished } from '@/lib/db/positions'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const limit = Number(searchParams.get('limit'))
  try {
    const rows =
      limit && limit > 0
        ? await listLatestPublished(limit)
        : await listPublishedPositions()
    return NextResponse.json(rows)
  } catch {
    // DB not provisioned yet — degrade gracefully so the public site still works.
    return NextResponse.json([])
  }
}
