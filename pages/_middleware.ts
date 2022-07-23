// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from 'next/server'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { userId, orgId } = req.cookies
  if (!req.nextUrl.pathname.startsWith('/login') && !userId && !orgId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
