import { toast } from "sonner"
import { useTranslations } from 'next-intl'

export function useToastErrorCode() {
    const t = useTranslations('errors.code')

    return (code: string | undefined = 'UNKNOWN_ERROR') => {
        toast.error(t(code ?? 'UNKNOWN_ERROR'))
    }
}
