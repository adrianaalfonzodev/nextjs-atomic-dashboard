'use client'

import React from 'react'
import type { Post } from '@/lib/jsonplaceholder'
import PostCard from '@/components/molecules/PostCard'

type Props = {
  posts: Post[]
  selectedId: number | null
  loading: boolean
  onSelect: (p: Post) => void
  onDelete: (id: number) => void
  onEdit: (p: Post) => void
}

export default function PostList({
  posts,
  selectedId,
  loading,
  onSelect,
  onDelete,
  onEdit
}: Props) {
  return (
    <div className="rounded border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium">Posts</h2>
        {loading && <span className="text-xs text-gray-500">Cargando…</span>}
      </div>

      <div className="space-y-2">
        {posts.map((p) => (
          <PostCard
            key={p.id ?? Math.random()}
            post={p}
            isSelected={p.id === selectedId}
            onSelect={() => onSelect(p)}
            onEdit={() => onEdit(p)}
            onDelete={() => onDelete(p.id!)}
            loading={loading}
          />
        ))}

        {posts.length === 0 && !loading && (
          <div className="text-sm text-gray-500">No hay posts.</div>
        )}
      </div>
    </div>
  )
}
