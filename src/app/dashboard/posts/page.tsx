'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Post } from '@/lib/jsonplaceholder'
import {
  createPost,
  getPost,
  patchPost,
  updatePost
} from '@/lib/jsonplaceholder'

import PostForm from '@/components/organisms/PostForm'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [userId, setUserId] = useState(1)

  const selected = useMemo(
    () => posts.find((p) => p.id === selectedId) ?? null,
    [posts, selectedId]
  )

  function getErrorMessage(err: unknown, fallback: string) {
    if (err instanceof Error) return err.message || fallback
    if (typeof err === 'string') return err
    return fallback
  }

  const searchParams = useSearchParams()
  useEffect(() => {
    const edit = searchParams.get('edit')
    if (!edit) return
    const id = Number(edit)
    if (!id) return

    const found = posts.find((p) => p.id === id)
    if (found) {
      setSelectedId(id)
      fillFormFromSelected(found)
      return
    }

    ;(async () => {
      try {
        const p = await getPost(id)
        if (p) {
          setPosts((s) => [p, ...s])
          setSelectedId(id)
          fillFormFromSelected(p)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [posts, searchParams])

  function fillFormFromSelected(p: Post) {
    setUserId(p.userId ?? 1)
    setTitle(p.title ?? '')
    setBody(p.body ?? '')
  }

  function resetForm() {
    setUserId(1)
    setTitle('')
    setBody('')
    setSelectedId(null)
  }

  useEffect(() => {
    const edit = searchParams.get('edit')
    if (!edit) {
      resetForm()
    }
  }, [searchParams])

  async function onCreate() {
    setLoading(true)
    setError(null)
    try {
      const created = await createPost({ userId, title, body })
      setPosts((prev) => [
        { ...created, id: created.id ?? Date.now() },
        ...prev
      ])
      resetForm()
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Error creando post'))
    } finally {
      setLoading(false)
    }
  }

  async function onPutUpdate() {
    if (!selected?.id) return
    setLoading(true)
    setError(null)
    try {
      const updated = await updatePost(selected.id, { userId, title, body })
      setPosts((prev) =>
        prev.map((p) => (p.id === selected.id ? { ...p, ...updated } : p))
      )
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Error actualizando (PUT)'))
    } finally {
      setLoading(false)
    }
  }

  async function onPatchTitle() {
    if (!selected?.id) return
    setLoading(true)
    setError(null)
    try {
      const patched = await patchPost(selected.id, { title })
      setPosts((prev) =>
        prev.map((p) => (p.id === selected.id ? { ...p, ...patched } : p))
      )
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Error actualizando (PATCH)'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 mx-auto">
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PostForm
          selected={selected}
          title={title}
          setTitle={setTitle}
          body={body}
          setBody={setBody}
          userId={userId}
          setUserId={setUserId}
          loading={loading}
          onCreate={onCreate}
          onPutUpdate={onPutUpdate}
          onPatchTitle={onPatchTitle}
          resetForm={resetForm}
        />
      </div>
    </div>
  )
}
