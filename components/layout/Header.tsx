'use client'

import { useState } from 'react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Alerts */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-gray-400">▼</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <a
                  href="/auth/logout"
                  className="block px-4 py-2 text-sm text-danger hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
