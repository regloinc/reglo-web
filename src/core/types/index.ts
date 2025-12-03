import type { SVGProps } from 'react'

export type PropsWithClassName = {
  className?: string
}

export type PropsToSVG = SVGProps<SVGSVGElement>

export type PropsWithParamsLocale = {
  params: Promise<{ locale: string }>
}
