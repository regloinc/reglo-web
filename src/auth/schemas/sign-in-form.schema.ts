import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { z } from 'zod'

export const useSignInFormSchema = () => {
  const t = useTranslations('auth')

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email({ message: t('errors.emailInvalid') }),
        password: z.string().min(8, { message: t('errors.passwordMin') }),
      }),
    [t]
  )

  return schema
}
