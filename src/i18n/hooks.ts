import { getLocaleFromPathname, getPathnameWithoutLocale } from '@i18n/helpers'
import { routing } from '@i18n/routing'
import { useLocale } from 'next-intl'

export function useLocalePathname() {
  const locale = useLocale()

  return (pathname?: string): string => {
    if (!pathname) return `/${locale}`

    const normalizedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`
    const localeFromPathname = getLocaleFromPathname(normalizedPathname)

    if (localeFromPathname && routing.locales.includes(localeFromPathname)) {
      return normalizedPathname
    }

    const pathnameWithoutLocale = getPathnameWithoutLocale(normalizedPathname)

    return `/${locale}${pathnameWithoutLocale === '/' ? '' : pathnameWithoutLocale}`
  }
}
