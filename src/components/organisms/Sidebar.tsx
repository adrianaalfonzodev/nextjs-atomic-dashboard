'use client'

import NavItem from '@/components/molecules/NavItem'
import Image from 'next/image'
import { X, SquaresFour, User, Note } from '@phosphor-icons/react'

type NavItemType = { label: string; href: string }

type SidebarProps = {
  navItems: NavItemType[]
  pathname: string
  isOpen: boolean
  onClose: () => void
  onNavigate: (href: string) => void
}

function getNavIcon(label: string) {
  const iconClass = 'w-6 h-6 mr-2'
  switch (label) {
    case 'home':
      return <SquaresFour className={iconClass} />
    case 'profile':
      return <User className={iconClass} />
    default:
      return <Note className={iconClass} />
  }
}

export default function Sidebar({
  navItems,
  pathname,
  isOpen,
  onClose,
  onNavigate
}: SidebarProps) {
  return (
    <aside
      className={`bg-white border-r border-[#e7e7e7] p-6 flex-col gap-4 md:flex md:w-64 transition-all duration-300 ${
        isOpen ? 'flex absolute z-10 w-64 h-screen' : 'hidden'
      }`}
    >
      <div className="flex gap-4 items-center">
        <div className="md:hidden">
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <Image
          src="/images/logo.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>

      <nav className="flex flex-col space-y-4 flex-grow mt-6">
        {navItems.length === 0 ? (
          <div className="text-sm text-gray-500">
            No hay páginas detectadas
          </div>
        ) : (
          navItems.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={getNavIcon(item.label)}
              active={pathname === item.href}
              onClick={(href) => {
                onClose()
                onNavigate(href)
              }}
              displayLabel={
                item.href === '/dashboard/posts'
                  ? 'Crear post'
                  : undefined
              }
            />
          ))
        )}
      </nav>
    </aside>
  )
}
