'use client'

import { useAuthCheck } from '@/hooks/useAuthCheck'
import Spinner from '@/components/atoms/Spinner'

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { checkingAuth } = useAuthCheck({ redirectIfAuthenticated: true })
  if (checkingAuth) return <Spinner />

  return <>{children}</>
}
