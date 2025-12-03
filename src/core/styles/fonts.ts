import {
  Fira_Code,
  Fira_Mono,
  Fira_Sans,
  Fira_Sans_Condensed,
  Fira_Sans_Extra_Condensed,
} from 'next/font/google'

export const firaSans = Fira_Sans({
  variable: '--font-fira-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const firaMono = Fira_Mono({
  variable: '--font-fira-mono',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const firaSansCondensed = Fira_Sans_Condensed({
  variable: '--font-fira-sans-condensed',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const firaSansExtraCondensed = Fira_Sans_Extra_Condensed({
  variable: '--font-fira-sans-extra-condensed',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const firaClassNames = `${firaSans.variable} ${firaCode.variable} ${firaMono.variable} ${firaSansCondensed.variable} ${firaSansExtraCondensed.variable}`
