import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'clariva_admin'
const SESSION_HOURS = 12

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set')
  return new TextEncoder().encode(secret)
}

/** Validate username/password against env credentials. */
export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME
  const p = process.env.ADMIN_PASSWORD
  if (!u || !p) return false
  return username === u && password === p
}

/** Create a signed session JWT (12h). */
export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(secretKey())
}

/** Verify a session token string. Returns true if valid. Edge-safe. */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    const { payload } = await jwtVerify(token, secretKey())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

/** Read the session cookie in a route handler / server component and verify it. */
export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(ADMIN_COOKIE)?.value
  return verifySessionToken(token)
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_HOURS * 60 * 60,
}
