import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CryoTrack - Cryopreservation Management System',
  description: 'Smart cryogenic sample management system for IVF clinics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
