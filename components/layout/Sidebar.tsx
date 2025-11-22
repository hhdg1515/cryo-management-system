'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface NavItem {
  key: keyof typeof import('@/lib/i18n/translations').translations.en.common
  href: string
  icon: string
}

const navItems: NavItem[] = [
  { key: 'dashboard', href: '/dashboard', icon: '🏠' },
  { key: 'samples', href: '/samples', icon: '📦' },
  { key: 'search', href: '/search', icon: '🔍' },
  { key: 'tanks', href: '/tanks', icon: '🗄️' },
  { key: 'temperature', href: '/temperature', icon: '🌡️' },
  { key: 'patients', href: '/patients', icon: '👥' },
  { key: 'operationsGuide', href: '/operations-guide', icon: '📖' },
  { key: 'reports', href: '/reports', icon: '📊' },
  { key: 'settings', href: '/settings', icon: '⚙️' },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const { t } = useLanguage()

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
              <span className="font-medium">{t.common[item.key]}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
