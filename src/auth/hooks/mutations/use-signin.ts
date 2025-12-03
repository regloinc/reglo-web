import { auth } from '@auth/config'
import { useToastErrorCode } from '@core/helpers/toast-error'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export type LoginFormValues = {
  email: string
  password: string
}

export function useSignIn() {
  const router = useRouter()
  const toastErrorCode = useToastErrorCode()

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

  return {
    mutate,
    isPending,
  }
}
