import { routing } from '@i18n/routing'
import createMiddleware from 'next-intl/middleware'

const handleI18n = createMiddleware(routing)

export default handleI18n

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon/|image/|svg/|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
