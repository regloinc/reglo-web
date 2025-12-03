import '@core/styles/globals.css'
import { Providers } from '@core/providers/providers'
import { firaClassNames } from '@core/styles/fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaClassNames} antialiased`} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
