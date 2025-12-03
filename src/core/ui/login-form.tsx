'use client'

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
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const t = useTranslations('auth')

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('welcome')}</CardTitle>
          <CardDescription>{t('loginDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
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
                <Input id="email" type="email" placeholder={t('emailPlaceholder')} required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
                </div>
                <Input id="password" type="password" required />
                <Link
                  href="/forgot-password"
                  className="text-right text-xs underline-offset-4 hover:underline"
                >
                  {t('forgotPassword')}
                </Link>
              </Field>
              <Field>
                <Button type="submit">{t('login')}</Button>
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
