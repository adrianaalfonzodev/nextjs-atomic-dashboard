'use client'

import { authStart, authSuccess, authFailure } from '@/features/auth/authSlice'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { registerUser } from '@/features/auth/auth'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import AppInput from '@/components/atoms/Input'
import AppCheckbox from '@/components/atoms/Checkbox'
import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import SocialLoginButton from '@/components/molecules/SocialLoginButton'
import Link from 'next/link'

export default function RegisterForm() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(authStart())
    e.preventDefault()
    try {
      const user = await registerUser(email, password, name, phone)
      dispatch(authSuccess(user))
      toast.success('Registro exitoso')
      router.push('/dashboard/home')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
        dispatch(authFailure(err.message))
      }
    }
  }

  const handleGoogleRegister = () => {
    toast.info('Funcionalidad de registro con Google aún no implementada')
  }

  return (
    <div className="flex flex-col gap-4 md:p-4 relative lg:w-[540px] w-full">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 relative w-full"
      >
        <AppInput
          type="text"
          value={name}
          onChange={setName}
          placeholder="Nombre"
          required
        />
        <AppInput
          type="text"
          value={phone}
          onChange={setPhone}
          placeholder="Teléfono"
          required
        />
        <AppInput
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Correo electrónico"
          required
        />

        <AppInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Contraseña"
          required
        />

        <AppCheckbox
          label="Acepto los términos y condiciones"
          checked={termsAccepted}
          onChange={setTermsAccepted}
          required
        />

        <Button
          variant="primary"
          type="submit"
          loading={loading}
        >
          Registrarse
        </Button>
      </form>

      <Divider text="Ó" />

      <SocialLoginButton
        provider="google"
        onClick={handleGoogleRegister}
      />

      <p className="text-center text-sm mt-6">
        ¿Ya tienes una cuenta?{' '}
        <Link
          href="/auth/login"
          className="text-[#E89B4C]"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
