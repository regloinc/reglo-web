import { getLocaleFromPathname, getPathnameWithoutLocale } from '@i18n/helpers'
import { routing } from '@i18n/routing'
import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const handleI18n = createMiddleware(routing)
const publicRoutes = ['/', '/privacy-policy', '/terms-of-service']
const authRoutes = ['/sign-in', '/sign-up', '/forgot-password']

export default function proxy(request: NextRequest) {
  // full pathname with locale
  const pathname = request.nextUrl.pathname

  // get locale from pathname
  const locale = getLocaleFromPathname(pathname) || routing.defaultLocale

  // get pathname without locale
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)

  // check if route is public
  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale)

  // check if route is auth
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale)

  // handle i18n
  const next = () => handleI18n(request)

  // if route is public, continue
  if (isPublicRoute) {
    return next()
  }

  // get session token from cookie
  const sessionToken = getSessionCookie(request, {
    cookiePrefix: 'reglo',
  })

  // check if user is authenticated
  const isAuthenticated = Boolean(sessionToken)

  // if user is authenticated and trying to access auth routes, redirect to console
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}/console`, request.url))
  }

  // if user is not authenticated and trying to access auth routes, continue
  if (isAuthRoute && !isAuthenticated) {
    return next()
  }

  // if user is not authenticated, redirect to sign-in
  if (!isAuthenticated) {
    return NextResponse.redirect(
      new URL(`/${locale}/sign-in?redirect=${pathnameWithoutLocale}`, request.url)
    )
  }

  //continue
  return next()
}

// matcher for all routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon/|image/|svg/|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
