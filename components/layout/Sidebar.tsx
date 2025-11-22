'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'Sample Management', href: '/samples', icon: '📦' },
  { name: 'Quick Search', href: '/search', icon: '🔍' },
  { name: 'Storage Layout', href: '/tanks', icon: '🗄️' },
  { name: 'Temperature Monitor', href: '/temperature', icon: '🌡️' },
  { name: 'Patients', href: '/patients', icon: '👥' },
  { name: 'Operations Guide', href: '/operations-guide', icon: '📖' },
  { name: 'Reports', href: '/reports', icon: '📊' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 glass-sidebar min-h-screen">
      <div className="p-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
          CryoTrack
        </h1>
        <p className="text-sm text-gray-500 mt-1">Cryo Management</p>
      </div>

      <nav className="px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-primary border border-blue-200/50 shadow-sm'
                  : 'text-gray-700 hover:bg-white/60'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
