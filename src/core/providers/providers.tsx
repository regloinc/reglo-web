import { I18nProvider } from '@core/providers/i18n-provider'
import { QueryProvider } from '@core/providers/query-provider'
import { ThemeProvider } from '@core/providers/theme-provider'
import { Toaster } from '@core/ui/primitives'
import type { Locale } from '@i18n/locale.type'
import type { PropsWithChildren } from 'react'

type ProvidersProps = PropsWithChildren<{
  locale: Locale
}>

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <QueryProvider>
      <I18nProvider locale={locale}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  )
}
