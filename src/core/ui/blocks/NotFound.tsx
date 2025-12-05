'use client'

import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@core/ui/primitives'
import { Link } from '@i18n/routing'
import { HistoryIcon, Home, Layers2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function NotFound() {
  const router = useRouter()
  const t = useTranslations('notFound')

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Empty className="gap-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Layers2 strokeWidth={1.5} className="size-12" />
          </EmptyMedia>
          <EmptyTitle className="font-medium text-2xl">{t('title')}</EmptyTitle>
          <EmptyDescription>{t('description')}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                {t('goHome')}
              </Link>
            </Button>
            <Button variant="outline" className="cursor-pointer" onClick={router.back}>
              <HistoryIcon className="size-4" />
              {t('goBack')}
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </main>
  )
}
