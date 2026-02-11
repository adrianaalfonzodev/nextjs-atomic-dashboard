'use client'

import RegisterForm from '@/components/organisms/RegisterForm'
import AuthTemplate from '@/components/templates/AuthTemplate'

export default function RegisterPage() {
  return (
    <AuthTemplate
      title="Crea tu cuenta estelar"
      subtitle="Únete a la misión y accede a tu panel espacial"
    >
      <RegisterForm />
    </AuthTemplate>
  )
}
