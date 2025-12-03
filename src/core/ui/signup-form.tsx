'use client'

import { auth } from '@auth/config'
import { useToastErrorCode } from '@core/helpers/toast-error'
import { cn } from '@core/lib/utils'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from '@core/ui/primitives'
import { userCollection } from '@db/collections'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type SignupFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth')
  const toastErrorCode = useToastErrorCode()
  const router = useRouter()

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

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (formData: SignupFormValues) => {
    clearErrors()

    const result = schema.safeParse(formData)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]

        if (!field) {
          return
        }

        setError(field as keyof SignupFormValues, {
          type: issue.code,
          message: issue.message,
        })
      })

      return
    }

    const { data, error } = await auth.signUp.email({
      email: result.data.email,
      password: result.data.password,
      name: result.data.name,
    })

    if (error) {
      toastErrorCode(error.code)
      return
    }

    if (data?.user) {
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image ?? undefined,
      }

      if (userCollection.has(data.user.id)) {
        userCollection.update(data.user.id, (draft) => {
          draft.name = userData.name
          draft.email = userData.email
          draft.image = userData.image
        })
      } else {
        userCollection.insert(userData)
      }

      router.push('/console')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="pb-3 text-center">
          <CardTitle className="text-xl">{t('createAccount')}</CardTitle>
          <CardDescription>{t('signupDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="name">{t('fullName')}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('fullNamePlaceholder')}
                  {...register('name')}
                />
                {errors.name && (
                  <FieldDescription className="text-destructive text-xs">
                    {errors.name.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  {...register('email')}
                />
                {errors.email && (
                  <FieldDescription className="text-destructive text-xs">
                    {errors.email.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                    <Input id="password" type="password" {...register('password')} />
                    {errors.password && (
                      <FieldDescription className="text-destructive text-xs">
                        {errors.password.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                    <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                    {errors.confirmPassword && (
                      <FieldDescription className="text-destructive text-xs">
                        {errors.confirmPassword.message}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
              </Field>
              <Field className="gap-4 pt-6">
                <Button loading={isSubmitting} type="submit" disabled={isSubmitting}>
                  {t('createAccountButton')}
                </Button>
                <FieldDescription className="text-center">
                  {t('alreadyHaveAccount')} <Link href="/sign-in">{t('signIn')}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t('termsAgreement')} <Link href="/terms-of-service">{t('termsOfService')}</Link> {t('and')}{' '}
        <Link href="/privacy-policy">{t('privacyPolicy')}</Link>.
      </FieldDescription>
    </div>
  )
}
