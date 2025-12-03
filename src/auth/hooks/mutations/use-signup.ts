import { auth } from '@auth/config'
import type { SignupFormValues } from '@auth/ui/signup-form'
import { useToastErrorCode } from '@core/helpers/toast-error'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useSignUp() {
  const router = useRouter()
  const toastErrorCode = useToastErrorCode()

  const { mutate, isPending } = useMutation({
    mutationFn: async (result: SignupFormValues) => {
      const { data, error } = await auth.signUp.email({
        email: result.email,
        password: result.password,
        name: result.name,
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
