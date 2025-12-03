import { I18nProvider } from '@core/providers/i18n-provider'
import { QueryProvider } from '@core/providers/query-provider'
import { ThemeProvider } from '@core/providers/theme-provider'
import { Toaster } from '@core/ui/primitives'
import type { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  )
}
