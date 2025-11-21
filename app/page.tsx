import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
          CryoTrack
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Smart Cryopreservation Management System
        </p>
        <p className="text-gray-500 mb-8 max-w-2xl">
          Intelligent cryogenic sample management for IVF clinics.
          Eliminate human errors, improve efficiency, and ensure sample safety.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-gray-50 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
