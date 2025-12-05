import type { Locale } from '@i18n/locale.type'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { PropsWithChildren } from 'react'

type I18nProviderProps = PropsWithChildren<{
  locale: Locale
}>

export async function I18nProvider({ children, locale }: I18nProviderProps) {
  const messages = await getMessages({ locale })
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  )
}
