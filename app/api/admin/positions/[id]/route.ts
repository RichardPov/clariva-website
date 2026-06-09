import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import {
  deletePosition,
  getPositionById,
  updatePosition,
} from '@/lib/db/positions'
import { normalizePositionPayload } from '@/lib/positions-payload'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const row = await getPositionById(params.id)
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(row)
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
  // slug is recomputed in the data layer only if the title changed
  const { slug: _omit, ...rest } = payload
  const updated = await updatePosition(params.id, rest)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await deletePosition(params.id)
  return NextResponse.json({ ok: true })
}
