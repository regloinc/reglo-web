import { Icon } from '@core/ui/icons'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('app')

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-10 bg-[#D9D3F1] pt-6">
      <div className="flex items-center gap-6 self-center">
        <Icon.BrandLogoSquare className="size-14" />
        <span className="font-bold font-mono text-4xl">REGLO</span>
      </div>
      <h1 className="font-thin text-xl opacity-50">{t('coming-soon')}...</h1>
    </main>
  )
}
