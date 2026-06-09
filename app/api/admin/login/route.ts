import { NextResponse } from 'next/server'
import {
  ADMIN_COOKIE,
  checkCredentials,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/auth'

export async function POST(req: Request) {
  let body: { username?: string; password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { username = '', password = '' } = body
  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions)
  return res
}
