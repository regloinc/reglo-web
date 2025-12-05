import type { Locale } from '@i18n/locale.type'
import { routing } from '@i18n/routing'
import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const publicRoutes = ['/', '/privacy-policy', '/terms-of-service']
const authRoutes = ['/sign-in', '/sign-up', '/forgot-password']

const handleI18n = createMiddleware(routing)

function getPathnameWithoutLocale(pathname: string): string {
  const locales = routing.locales
  const segments = pathname.split('/')

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return `/${segments.slice(2).join('/')}`
  }

  return pathname
}

function getLocaleFromPathname(pathname: string): Locale | null {
  const locales = routing.locales
  const segments = pathname.split('/')

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return segments[1] as Locale
  }

  return null
}

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = getLocaleFromPathname(pathname) || routing.defaultLocale
  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname)

  const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale)
  const isAuthRoute = authRoutes.includes(pathnameWithoutLocale)
  const next = () => handleI18n(request)

  if (isPublicRoute) {
    return next()
  }

  const sessionToken = getSessionCookie(request, {
    cookiePrefix: 'reglo',
  })

  const hasSession = Boolean(sessionToken)

  if (isAuthRoute) {
    if (hasSession) {
      return NextResponse.redirect(new URL(`/${locale}/console`, request.url))
    }
    return next()
  }

  if (!hasSession) {
    return NextResponse.redirect(
      new URL(`/${locale}/sign-in?redirect=${pathnameWithoutLocale}`, request.url)
    )
  }

  return next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon/|image/|svg/|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
