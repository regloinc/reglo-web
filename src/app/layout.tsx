import '@core/styles/globals.css'
import { Providers } from '@core/providers/providers'
import { firaClassNames } from '@core/styles/fonts'
import { routing } from '@i18n/routing'
import type { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className={`${firaClassNames} antialiased`} suppressHydrationWarning>
        <Providers locale={routing.defaultLocale}>{children}</Providers>
      </body>
    </html>
  )
}
