'use client'

import { useSignUp } from '@auth/hooks/mutations'
import { useSignUpFormSchema } from '@auth/schemas'
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
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

export type SignupFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth')
  const schema = useSignUpFormSchema()
  const { mutate, isPending } = useSignUp()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (formData: SignupFormValues) => {
    clearErrors()
    const result = schema.safeParse(formData)

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const [field] = issue.path
        if (!field) return

        setError(field as keyof SignupFormValues, {
          type: issue.code,
          message: issue.message,
        })
      })

      return
    }

    mutate(result.data)
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
                <Field className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('passwordPlaceholder')}
                      {...register('password')}
                    />
                    {errors.password && (
                      <FieldDescription className="text-destructive text-xs">
                        {errors.password.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">{t('confirmPassword')}</FieldLabel>
                    <Input
                      id="confirmPassword"
                      placeholder={t('passwordPlaceholder')}
                      type="password"
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && (
                      <FieldDescription className="text-destructive text-xs">
                        {errors.confirmPassword.message}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
              </Field>
              <Field className="gap-4 pt-6">
                <Button loading={isPending} type="submit" disabled={isPending}>
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
