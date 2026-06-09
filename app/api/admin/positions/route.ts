import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPosition, listAllPositions } from '@/lib/db/positions'
import { normalizePositionPayload } from '@/lib/positions-payload'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rows = await listAllPositions()
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const payload = normalizePositionPayload(body)
  const created = await createPosition(payload)
  return NextResponse.json(created, { status: 201 })
}
