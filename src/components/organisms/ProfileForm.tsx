'use client'

import FormField from '@/components/molecules/FormField'
import Button from '@/components/atoms/Button'
import { FloppyDiskIcon } from '@phosphor-icons/react'

type ProfileFormProps = {
  email: string
  name: string
  phone: string
  loading: boolean
  onNameChange: (v: string) => void
  onPhoneChange: (v: string) => void
  onSave: (e: React.FormEvent) => void
}

export default function ProfileForm({
  email,
  name,
  phone,
  loading,
  onNameChange,
  onPhoneChange,
  onSave
}: ProfileFormProps) {
  return (
    <div className="max-w-xl p-6 bg-white rounded-lg">
      <h1 className="text-4xl font-bold mb-6">Detalles del usuario</h1>

      <form onSubmit={onSave} className="space-y-4">
        <FormField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={() => {}}
          disabled
        />

        <FormField
          label="Nombre"
          type="text"
          value={name}
          onChange={onNameChange}
          required
        />

        <div className="mb-8">
          <FormField
            label="Teléfono"
            type="tel"
            value={phone}
            onChange={onPhoneChange}
          />
        </div>

        <Button
          variant="primary"
          type="submit"
          loading={loading}
          className="button transition-opacity duration-200 flex gap-2"
        >
          <FloppyDiskIcon className="w-5 h-5" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </form>
    </div>
  )
}
