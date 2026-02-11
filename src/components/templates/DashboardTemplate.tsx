'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/features/auth/auth'
import { toast } from 'sonner'
import { authFailure, logout } from '@/features/auth/authSlice'
import { useState } from 'react'
import Spinner from '@/components/atoms/Spinner'
import Sidebar from '@/components/organisms/Sidebar'
import Header from '@/components/organisms/Header'

type NavItem = { label: string; href: string }

export default function DashboardTemplate({
  navItems,
  children
}: {
  navItems: NavItem[]
  children: React.ReactNode
}) {
  const { checkingAuth, user } = useAuthCheck({ redirectIfAuthenticated: true })
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = user?.user_metadata?.name || 'Explorador'

  const segments = (pathname || '').split('/').filter(Boolean)
  const pageSegment = segments[1] || ''
  const pageLabel = pageSegment
    ? pageSegment[0].toUpperCase() + pageSegment.slice(1)
    : ''
  const isPostsPage = pageSegment === 'posts'
  const isEditing = isPostsPage && Boolean(searchParams?.get('edit'))

  const handleLogout = async () => {
    try {
      await logoutUser()
      dispatch(logout())
      toast.success('Sesión cerrada')
      router.push('/auth/login')
    } catch {
      dispatch(authFailure('Error al cerrar sesión'))
      toast.error('No se pudo cerrar sesión')
    }
  }

  if (checkingAuth) return <Spinner />

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          navItems={navItems}
          pathname={pathname}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={(href) => router.push(href)}
        />

        <div className="flex-1 flex flex-col">
          <Header
            pageLabel={pageLabel}
            isPostsPage={isPostsPage}
            isEditing={isEditing}
            userName={userName}
            onLogout={handleLogout}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
