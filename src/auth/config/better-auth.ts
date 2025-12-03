import { env } from '@env'
import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
})
