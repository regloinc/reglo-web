import { auth } from '@auth/config'
import { useToastErrorCode } from '@core/hooks'
import { useRouter } from '@i18n/routing'
import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export type LoginFormValues = {
  email: string
  password: string
}

export function useSignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const toastErrorCode = useToastErrorCode()
  const redirectPath = searchParams.get('redirect')

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
      router.push(redirectPath || '/console')
    },
    onError: (error) => {
      toastErrorCode(error.message)
    },
  })

  return {
    mutate,
    isPending,
  }
}
