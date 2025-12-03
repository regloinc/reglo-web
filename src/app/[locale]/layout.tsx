import '@core/styles/globals.css'
import { Providers } from '@core/providers/providers'
import { firaClassNames } from '@core/styles/fonts'
import type { PropsWithParamsLocale } from '@core/types'
import type { Locale } from '@i18n/locale.type'
import { routing } from '@i18n/routing'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { PropsWithChildren } from 'react'

// Generate the metadata for the locale
export async function generateMetadata({
  params,
}: Readonly<PropsWithParamsLocale>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'app' })

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        {
          url: '/favicon/dark.svg',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/favicon/light.svg',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
  }
}

// Generate the static params for the locale
export function generateStaticParams() {
  // Return the locales supported
  return routing.locales.map((locale: Locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<PropsWithChildren<PropsWithParamsLocale>>) {
  // Get the locale from the params
  const { locale } = await params

  // If the locale is not supported, return a 404
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${firaClassNames} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
