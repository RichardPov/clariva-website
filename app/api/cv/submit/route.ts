import { NextResponse } from 'next/server'
import { createSubmission } from '@/lib/db/positions'

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = str(body.email)
  const cvUrl = str(body.cvUrl)

  if (!email || !cvUrl) {
    return NextResponse.json(
      { error: 'Email and CV are required' },
      { status: 400 }
    )
  }
  if (!cvUrl.includes('blob.vercel-storage.com')) {
    return NextResponse.json({ error: 'Invalid CV reference' }, { status: 400 })
  }

  const created = await createSubmission({
    email,
    phone: str(body.phone),
    message: str(body.message),
    cvUrl,
    cvFilename: str(body.cvFilename),
    positionId: str(body.positionId) || null,
    positionTitle: str(body.positionTitle),
  })

  return NextResponse.json({ ok: true, id: created.id }, { status: 201 })
}
