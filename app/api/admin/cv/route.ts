import { NextResponse } from 'next/server'
import { get } from '@vercel/blob'
import { isAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'

// Authenticated proxy that streams a private CV blob back to a logged-in admin.
// The blob store is private, so the raw URL is not directly downloadable.
export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url).searchParams.get('url')
  if (!url) {
    return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  }

  try {
    const result = await get(url, { access: 'private' })
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const filename = result.blob.pathname.split('/').pop() || 'cv'
    return new Response(result.stream, {
      headers: {
        'Content-Type': result.blob.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    )
  }
}
