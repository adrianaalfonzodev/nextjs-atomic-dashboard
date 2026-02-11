import type { Post } from '@/lib/jsonplaceholder'
import IconButton from '@/components/atoms/IconButton'
import { Trash, PencilSimple } from '@phosphor-icons/react'

type PostCardProps = {
  post: Post
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
  loading: boolean
}

export default function PostCard({
  post,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  loading
}: PostCardProps) {
  return (
    <div
      className={[
        'rounded border p-3 cursor-pointer',
        isSelected
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-200 hover:bg-gray-50'
      ].join(' ')}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold line-clamp-1">
            {post.title}
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {post.body}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            icon={<PencilSimple className="w-4 h-4" />}
            title="Editar"
          />

          {typeof post.id === 'number' && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              icon={<Trash className="w-4 h-4" />}
              title="Borrar"
              variant="danger"
              disabled={loading}
            />
          )}
        </div>
      </div>
    </div>
  )
}
