import { LoginForm } from '@auth/ui/login-form'
import type { PropsWithParamsLocale } from '@core/types'
import { Icon } from '@core/ui/icons'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: Readonly<PropsWithParamsLocale>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'auth' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-3 self-center">
          <Icon.BrandLogoSquare className="size-6" />
          <span className="font-bold font-mono text-xl">REGLO</span>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
