import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { createSubmission } from '@/lib/db/positions'

export const runtime = 'nodejs'

const MAX_BYTES = 4 * 1024 * 1024 // 4 MB (Vercel serverless body limit is ~4.5 MB)
const ACCEPTED = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

function str(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : ''
}

export async function POST(req: Request) {
  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const email = str(form.get('email'))
  const file = form.get('cv')

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'CV file is required' }, { status: 400 })
  }
  if (!ACCEPTED.includes(file.type)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 4 MB)' }, { status: 400 })
  }

  // Upload directly to Vercel Blob from the server (token read from env).
  let cvUrl = ''
  try {
    const blob = await put(`cv/${file.name}`, file, {
      // Private store — CVs are personal data and must not be publicly readable.
      // Downloads happen through the authenticated admin proxy (/api/admin/cv).
      access: 'private',
      addRandomSuffix: true,
      contentType: file.type,
    })
    cvUrl = blob.url
  } catch (err) {
    return NextResponse.json(
      { error: `Upload failed: ${(err as Error).message}` },
      { status: 500 }
    )
  }

  try {
    const created = await createSubmission({
      email,
      phone: str(form.get('phone')),
      message: str(form.get('message')),
      cvUrl,
      cvFilename: file.name,
      positionId: str(form.get('positionId')) || null,
      positionTitle: str(form.get('positionTitle')),
    })
    return NextResponse.json({ ok: true, id: created.id }, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: `Save failed: ${(err as Error).message}` },
      { status: 500 }
    )
  }
}
