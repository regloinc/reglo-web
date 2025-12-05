import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function useToastErrorCode() {
  const t = useTranslations('errors.code')

  return (code: string | undefined = 'UNKNOWN_ERROR') => {
    try {
      toast.error(t(code))
    } catch {
      toast.error(t('UNKNOWN_ERROR'))
    }
  }
}
