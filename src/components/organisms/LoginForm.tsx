'use client'

import { authStart, authSuccess, authFailure } from '@/features/auth/authSlice'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginUser } from '@/features/auth/auth'
import { RootState } from '@/store/store'
import AppInput from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import SocialLoginButton from '@/components/molecules/SocialLoginButton'
import Link from 'next/link'

export default function LoginForm() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.loading)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(authStart())

    try {
      const user = await loginUser(email, password)
      dispatch(authSuccess(user))
      router.push('/dashboard/home')
      toast.success('Inicio de sesión exitoso')
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message)
        dispatch(authFailure(err.message))
      } else {
        toast.error('Error desconocido')
        dispatch(authFailure('Error desconocido'))
      }
    }
  }

  const handleGoogleLogin = () => {
    toast.info(
      'Funcionalidad de inicio de sesión con Google aún no implementada'
    )
  }

  return (
    <div className="flex flex-col gap-4 md:p-4 relative lg:w-[540px] w-full">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 relative w-full"
      >
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
          showPasswordToggle
        />

        <a
          href="#"
          className="text-xs mb-6 text-[#E89B4C]"
        >
          ¿Olvidaste la contraseña?
        </a>

        <Button
          variant="primary"
          type="submit"
          loading={loading}
        >
          Iniciar sesión
        </Button>
      </form>

      <Divider text="Ó" />

      <SocialLoginButton
        provider="google"
        onClick={handleGoogleLogin}
      />

      <p className="text-center text-sm mt-6">
        ¿No tienes cuenta?{' '}
        <Link
          href="/auth/register"
          className="text-[#E89B4C]"
        >
          Crear una cuenta
        </Link>
      </p>
    </div>
  )
}
