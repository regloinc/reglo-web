import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'changelog' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ChangelogPage() {
  const filePath = join(process.cwd(), 'changelog.md')
  const content = await readFile(filePath, 'utf-8')
  const lines = content.split('\n')

  return (
    <main className="h-screen w-screen overflow-y-auto bg-zinc-900 font-code">
      <article className="container mx-auto flex max-w-4xl flex-col gap-2 px-4 pt-20 pb-10">
        {lines.map((line, index) => (
          <p key={`line-${index}-${line.slice(0, 20)}`} className="text-zinc-300">
            {line}
          </p>
        ))}
      </article>
    </main>
  )
}
