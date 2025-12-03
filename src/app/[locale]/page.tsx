import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('app')

  return (
    <main>
      <h1>{t('hello')}</h1>
    </main>
  )
}
