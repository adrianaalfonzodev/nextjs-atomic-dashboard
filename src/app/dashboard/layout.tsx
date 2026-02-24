'use server'

import path from 'path'
import fs from 'fs'
import React from 'react'
import DashboardTemplate from '@/components/templates/DashboardTemplate'

type NavItem = {
  label: string
  href: string
}

async function detectDashboardPages(): Promise<NavItem[]> {
  try {
    const base = path.join(process.cwd(), 'src', 'app', 'dashboard')
    const entries = await fs.promises.readdir(base, { withFileTypes: true })
    const items: NavItem[] = []

    for (const e of entries) {
      if (e.isDirectory()) {
        const pageFile = path.join(base, e.name, 'page.tsx')
        const pageFileTs = path.join(base, e.name, 'page.ts')
        const hasPage = await fs.promises
          .stat(pageFile)
          .then(() => true)
          .catch(() => false)
        const hasPageTs = await fs.promises
          .stat(pageFileTs)
          .then(() => true)
          .catch(() => false)

        if (hasPage || hasPageTs) {
          items.push({ label: e.name, href: `/dashboard/${e.name}` })
        }
      }
    }

    items.sort((a, b) =>
      a.label === 'home' ? -1 : a.label.localeCompare(b.label)
    )
    return items
  } catch {
    return []
  }
}

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const navItems = await detectDashboardPages()
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <DashboardTemplate navItems={navItems}>{children}</DashboardTemplate>
    </React.Suspense>
  )
}
