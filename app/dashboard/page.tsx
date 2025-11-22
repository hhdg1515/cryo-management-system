import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'

export default function Dashboard() {
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
              <div className="text-4xl font-bold text-primary">3</div>
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tank A</p>
                <p className="text-sm text-gray-500">-196°C</p>
              </div>
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium">Tank B</p>
                <p className="text-sm text-gray-500">-185°C ⚠️ Warning</p>
              </div>
              <button className="text-primary font-medium">View Details</button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tank C</p>
                <p className="text-sm text-gray-500">-196°C</p>
              </div>
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </Card>

        {/* Capacity Status */}
        <Card title="Storage Capacity">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tank A</span>
                <span className="text-sm text-gray-600">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tank B</span>
                <span className="text-sm text-gray-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Tank C</span>
                <span className="text-sm text-gray-600">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
