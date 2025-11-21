'use client'

import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

// Mock data
const tanks = [
  {
    id: '1',
    name: 'Tank A',
    temperature: -196,
    nitrogenLevel: 85,
    status: 'normal',
    lastRefill: '3 days ago',
  },
  {
    id: '2',
    name: 'Tank B',
    temperature: -185,
    nitrogenLevel: 45,
    status: 'warning',
    lastRefill: '7 days ago',
  },
  {
    id: '3',
    name: 'Tank C',
    temperature: -196,
    nitrogenLevel: 92,
    status: 'normal',
    lastRefill: '1 day ago',
  },
]

export default function TemperaturePage() {
  const getStatusBadge = (status: string) => {
    if (status === 'normal') return <Badge variant="success">✅ Normal</Badge>
    if (status === 'warning') return <Badge variant="warning">⚠️ Warning</Badge>
    return <Badge variant="danger">🚨 Critical</Badge>
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Temperature Monitoring</h1>
            <p className="text-gray-600 mt-1">Real-time tank monitoring and alerts</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: 2 minutes ago
          </div>
        </div>

        {/* Tank Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tanks.map((tank) => (
            <Card key={tank.id}>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{tank.name}</h3>
                  {getStatusBadge(tank.status)}
                </div>

                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-3xl font-bold">{tank.temperature}°C</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Nitrogen Level</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        tank.nitrogenLevel > 60 ? 'bg-success' : 'bg-warning'
                      }`}
                      style={{ width: `${tank.nitrogenLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{tank.nitrogenLevel}%</p>
                </div>

                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">Last Refill: {tank.lastRefill}</p>
                </div>

                {tank.status === 'warning' && (
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Temperature Trend */}
        <Card title="24-Hour Temperature Trend">
          <div className="h-64 flex items-end justify-between gap-2">
            {/* Simple bar chart visualization */}
            {[...Array(24)].map((_, i) => {
              const height = 85 + Math.random() * 10
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-primary rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  {i % 3 === 0 && (
                    <p className="text-xs text-gray-500 mt-2">{i}h</p>
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>0h</span>
            <span>12h</span>
            <span>24h</span>
          </div>
        </Card>

        {/* Alert Rules */}
        <Card title="Alert Rules">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div>
                <p className="font-medium">⚠️ Warning Level</p>
                <p className="text-sm text-gray-600">
                  Temperature &gt; -190°C or Nitrogen Level &lt; 60%
                </p>
              </div>
              <Badge variant="warning">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="font-medium">🚨 Critical Level</p>
                <p className="text-sm text-gray-600">
                  Temperature &gt; -180°C or Nitrogen Level &lt; 30%
                </p>
              </div>
              <Badge variant="danger">Active</Badge>
            </div>
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card title="Recent Alerts">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-medium">Tank B - Temperature Warning</p>
                  <p className="text-sm text-gray-600">Temperature: -185°C</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Mark Resolved
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-medium">Tank A - Nitrogen Refill Completed</p>
                  <p className="text-sm text-gray-600">Level: 85%</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
              <Badge variant="success">Resolved</Badge>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
