import Link from 'next/link'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'

export default function Dashboard() {
  // Mock data for tanks
  const tanks = [
    { id: 'A', capacity: 80, temperature: -196, status: 'normal' },
    { id: 'B', capacity: 75, temperature: -185, status: 'warning' },
    { id: 'C', capacity: 55, temperature: -196, status: 'normal' },
    { id: 'D', capacity: 92, temperature: -195, status: 'normal' },
    { id: 'E', capacity: 68, temperature: -196, status: 'normal' },
    { id: 'F', capacity: 45, temperature: -196, status: 'normal' },
    { id: 'G', capacity: 88, temperature: -194, status: 'warning' },
    { id: 'H', capacity: 62, temperature: -196, status: 'normal' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">756</div>
              <div className="text-gray-600 mt-2">Total Samples</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">243</div>
              <div className="text-gray-600 mt-2">Patients</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">8</div>
              <div className="text-gray-600 mt-2">Tanks</div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">✓</span>
              <div className="flex-1">
                <p className="font-medium">New sample added (Jane Doe)</p>
                <p className="text-sm text-gray-500">10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <p className="font-medium">Tank B temperature warning</p>
                <p className="text-sm text-gray-500">09:15 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">✓</span>
              <div className="flex-1">
                <p className="font-medium">Sample retrieved (Mary Lee)</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Temperature Status */}
        <Card title="Temperature Status">
          <div className="mb-4 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
            📊 Temperature readings recorded manually twice daily (morning/evening) • Last updated: 10 minutes ago
          </div>
          <div className="space-y-3">
            {tanks.slice(0, 6).map((tank) => (
              <div
                key={tank.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  tank.status === 'warning' ? 'bg-yellow-50 border border-yellow-200' : ''
                }`}
              >
                <div>
                  <p className="font-medium">Tank {tank.id}</p>
                  <p className="text-sm text-gray-500">
                    {tank.temperature}°C {tank.status === 'warning' && '⚠️ Warning'}
                  </p>
                </div>
                <span className="text-2xl">{tank.status === 'warning' ? '⚠️' : '✅'}</span>
              </div>
            ))}
            <div className="text-center py-2 text-gray-400 text-sm">
              ... and {tanks.length - 6} more tanks
            </div>
            <Link href="/temperature" className="text-primary hover:underline font-medium text-sm block text-center mt-2">
              View All Temperatures →
            </Link>
          </div>
        </Card>

        {/* Capacity Status */}
        <Card title="Storage Capacity">
          <div className="space-y-3">
            {tanks.slice(0, 6).map((tank) => {
              const getCapacityColor = (capacity: number) => {
                if (capacity > 80) return 'bg-error'
                if (capacity > 60) return 'bg-warning'
                return 'bg-success'
              }
              return (
                <div key={tank.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Tank {tank.id}</span>
                    <span className="text-sm text-gray-600">{tank.capacity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getCapacityColor(tank.capacity)} h-2 rounded-full`}
                      style={{ width: `${tank.capacity}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
            <div className="text-center py-2 text-gray-400 text-sm border-t pt-3">
              ... and {tanks.length - 6} more tanks
            </div>
            <Link href="/tanks" className="text-primary hover:underline font-medium text-sm block text-center mt-2">
              View All Storage →
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
