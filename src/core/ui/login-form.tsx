'use client'

import { auth } from '@auth/config'
import { useSignInFormSchema } from '@auth/schemas'
import { useToastErrorCode } from '@core/helpers/toast-error'
import { cn } from '@core/lib/utils'
import { Icon } from '@core/ui/icons'
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
  FieldSeparator,
  Input,
} from '@core/ui/primitives'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

type LoginFormValues = {
  email: string
  password: string
}

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth')
  const schema = useSignInFormSchema()
  const toastErrorCode = useToastErrorCode()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (result: LoginFormValues) => {
      const { data, error } = await auth.signIn.email({
        email: result.email,
        password: result.password,
      })

      if (error) throw new Error(error.code)
      return data
    },
    onSuccess: () => {
      router.push('/console')
    },
    onError: (error) => {
      toastErrorCode(error.message)
    },
  })

  const onSubmit = (params: LoginFormValues) => {
    clearErrors()
    const result = schema.safeParse(params)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const [field] = issue.path
        if (!field) return
        setError(field as keyof LoginFormValues, {
          type: issue.code,
          message: issue.message,
        })
      })

      return
    }
    mutate(result.data as LoginFormValues)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('welcome')}</CardTitle>
          <CardDescription>{t('loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <Icon.Google className="size-4" />
                  <span className="mt-0.5">{t('loginWithGoogle')}</span>
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {t('orContinueWith')}
              </FieldSeparator>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                </div>
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
                <Link
                  href="/forgot-password"
                  className="text-right text-xs underline-offset-4 hover:underline"
                >
                  {t('forgotPassword')}
                </Link>
              </Field>
              <Field className="gap-4">
                <Button loading={isPending} type="submit" disabled={isPending}>
                  {t('login')}
                </Button>
                <FieldDescription className="text-center">
                  {t('noAccount')} <Link href="/sign-up">{t('signUp')}</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t('termsAgreement')} <Link href="#">{t('termsOfService')}</Link> {t('and')}{' '}
        <Link href="#">{t('privacyPolicy')}</Link>.
      </FieldDescription>
    </div>
  )
}
