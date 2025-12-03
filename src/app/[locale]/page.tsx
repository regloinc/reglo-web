import { Icon } from '@core/ui/icons'
import { BRAND } from '@reglo-co/shared/consts'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('app')

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10 pt-6 bg-[#D9D3F1]">
      <div className="flex items-center gap-6 self-center">
        <Icon.BrandLogoSquare className="size-14" />
        <span className="font-bold font-mono text-4xl">{BRAND.NAME.toUpperCase()}</span>
      </div>
      <h1 className="text-xl font-thin opacity-50">{t('coming-soon')}...</h1>
    </main>
  )
}
