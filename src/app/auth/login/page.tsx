'use client'

import LoginForm from '@/components/organisms/LoginForm'
import AuthTemplate from '@/components/templates/AuthTemplate'

export default function LoginPage() {
  return (
    <AuthTemplate
      title="Bienvenido al Centro de Mando"
      subtitle="Inicia sesión para comenzar tu viaje por el universo"
    >
      <LoginForm />
    </AuthTemplate>
  )
}
