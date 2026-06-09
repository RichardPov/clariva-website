import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { ADMIN_COOKIE, verifySessionToken } from './lib/auth'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin area is outside the i18n routing — gate it with the session cookie.
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value
    const valid = await verifySessionToken(token)
    const isLogin = pathname === '/admin'

    if (!valid && !isLogin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
    if (valid && isLogin) {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)', '/admin/:path*'],
}
