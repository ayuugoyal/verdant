import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isAuthenticated } from './lib/auth'

export const config = {
  matcher: ['/dashboard/:path*', "/mainApp/:path*"],
}

export function middleware(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}