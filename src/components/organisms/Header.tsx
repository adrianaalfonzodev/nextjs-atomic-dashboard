'use client'

import Button from '@/components/atoms/Button'
import { List } from '@phosphor-icons/react'

type HeaderProps = {
  pageLabel: string
  isPostsPage: boolean
  isEditing: boolean
  userName: string
  onLogout: () => void
  onToggleSidebar: () => void
}

export default function Header({
  pageLabel,
  isPostsPage,
  isEditing,
  userName,
  onLogout,
  onToggleSidebar
}: HeaderProps) {
  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-[#e7e7e7] w-full">
      <div className="md:hidden">
        <button onClick={onToggleSidebar}>
          <List className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-6 ml-4">
        {pageLabel && (
          <div className="text-gray-700 font-medium hidden md:block">
            <span className="font-semibold">{pageLabel}</span>
            {isPostsPage && (
              <span className="text-sm text-gray-500 ml-2">
                {isEditing ? 'Editar post' : 'Crear post'}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium hidden md:block">
          Hola, {userName} 👨‍🚀
        </span>
        <Button variant="danger" onClick={onLogout}>
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
