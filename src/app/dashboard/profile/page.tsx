'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { authSuccess, authFailure } from '@/features/auth/authSlice'
import ProfileForm from '@/components/organisms/ProfileForm'

export default function ProfilePage() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const initialName = user?.user_metadata?.name || ''
  const initialPhone = user?.user_metadata?.phone || ''
  const email = user?.email || ''

  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name,
          phone
        }
      })

      if (error) {
        dispatch(authFailure('Error al actualizar perfil'))
        toast.error('Error al guardar los cambios')
        return
      }

      dispatch(authSuccess(data.user))
      toast.success('Perfil actualizado correctamente')
    } catch {
      dispatch(authFailure('Error desconocido'))
      toast.error('Ocurrió un error inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProfileForm
      email={email}
      name={name}
      phone={phone}
      loading={loading}
      onNameChange={setName}
      onPhoneChange={setPhone}
      onSave={handleSave}
    />
  )
}
