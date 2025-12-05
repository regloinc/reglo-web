import type { Locale } from '@i18n/locale.type'
import { routing } from '@i18n/routing'

export function getPathnameWithoutLocale(pathname: string): string {
  const locales = routing.locales
  const segments = pathname.split('/')

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return `/${segments.slice(2).join('/')}`
  }

  return pathname
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const locales = routing.locales
  const segments = pathname.split('/')

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    return segments[1] as Locale
  }

  return null
}
