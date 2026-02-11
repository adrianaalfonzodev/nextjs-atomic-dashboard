'use client'

import React, { useState } from 'react'
import type { Post } from '@/lib/jsonplaceholder'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import TextareaField from '@/components/molecules/TextareaField'

type Props = {
  selected: Post | null
  title: string
  setTitle: (v: string) => void
  body: string
  setBody: (v: string) => void
  userId: number
  setUserId: (n: number) => void
  loading: boolean
  onCreate: () => Promise<void>
  onPutUpdate: () => Promise<void>
  onPatchTitle: () => Promise<void>
  resetForm: () => void
}

export default function PostForm({
  selected,
  title,
  setTitle,
  body,
  setBody,
  loading,
  onCreate,
  onPutUpdate,
  onPatchTitle
}: Props) {
  const titleChanged = Boolean(selected && title !== selected.title)
  const bodyChanged = Boolean(selected && body !== selected.body)

  const dirty = selected
    ? titleChanged || bodyChanged
    : Boolean(title.trim() || body.trim())

  const [notice, setNotice] = useState<string>('')

  const clearNotice = () => {
    setTimeout(() => setNotice(''), 3000)
  }

  const handleCreate = async () => {
    try {
      await onCreate()
      setNotice('Creado correctamente')
      clearNotice()
    } catch {
      setNotice('Error al crear')
      clearNotice()
    }
  }

  const handlePutUpdate = async () => {
    try {
      await onPutUpdate()
      setNotice('Actualizado correctamente')
      clearNotice()
    } catch {
      setNotice('Error al actualizar')
      clearNotice()
    }
  }

  const handlePatchTitle = async () => {
    try {
      await onPatchTitle()
      setNotice('Título actualizado')
      clearNotice()
    } catch {
      setNotice('Error al actualizar título')
      clearNotice()
    }
  }

  const handleReset = () => {
    if (dirty) {
      const ok = window.confirm(
        'Hay cambios sin guardar. ¿Deseas limpiar el formulario?'
      )
      if (!ok) return
    }
    setTitle('')
    setBody('')
    setNotice('')
  }

  const handleSave = async () => {
    if (!selected) return handleCreate()

    const onlyTitleChanged = titleChanged && !bodyChanged

    if (onlyTitleChanged) {
      return handlePatchTitle()
    }

    return handlePutUpdate()
  }

  return (
    <div className="rounded border border-gray-200 p-4">
      <div className="space-y-3">
        <FormField
          label="Título"
          value={title}
          onChange={setTitle}
          placeholder="Título"
          inputClassName="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />

        <TextareaField
          label="Descripción"
          value={body}
          onChange={setBody}
          placeholder="Escribe aquí..."
        />

        <div className="flex flex-wrap gap-2 pt-2">
          {!selected ? (
            <Button
              variant="info"
              onClick={handleCreate}
              disabled={loading || !title.trim() || !body.trim()}
            >
              Crear
            </Button>
          ) : (
            <>
              <Button
                variant="success"
                onClick={handleSave}
                disabled={loading || !dirty || (titleChanged && !title.trim())}
              >
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={loading}
              >
                Limpiar
              </Button>
            </>
          )}
        </div>

        {notice ? (
          <div className="text-sm text-green-600 pt-2">{notice}</div>
        ) : null}

        <div className="pt-2"></div>
      </div>
    </div>
  )
}
