import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { z } from 'zod'

export const useSignUpFormSchema = () => {
  const t = useTranslations('auth')

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().min(1, { message: t('errors.fullNameRequired') }),
          email: z
            .string()
            .min(1, { message: t('errors.emailRequired') })
            .email({ message: t('errors.emailInvalid') }),
          password: z
            .string()
            .min(1, { message: t('errors.passwordRequired') })
            .min(8, { message: t('errors.passwordMin') }),
          confirmPassword: z.string().min(1, { message: t('errors.confirmPasswordRequired') }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ['confirmPassword'],
          message: t('errors.passwordsMismatch'),
        }),
    [t]
  )

  return schema
}
