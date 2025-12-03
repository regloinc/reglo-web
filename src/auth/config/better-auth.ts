import { env } from '@env'
import { organizationClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const auth = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [organizationClient()],
})
