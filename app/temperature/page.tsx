'use client'

import { useState } from 'react'
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
    lastReading: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  },
  {
    id: '2',
    name: 'Tank B',
    temperature: -185,
    nitrogenLevel: 45,
    status: 'warning',
    lastRefill: '7 days ago',
    lastReading: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Tank C',
    temperature: -196,
    nitrogenLevel: 92,
    status: 'normal',
    lastRefill: '1 day ago',
    lastReading: new Date(Date.now() - 10 * 60 * 1000),
  },
]

// Mock temperature history
const temperatureHistory = [
  { time: '08:00', tankA: -196, tankB: -195, tankC: -196, recordedBy: 'Sarah Chen' },
  { time: '10:00', tankA: -196, tankB: -194, tankC: -196, recordedBy: 'Sarah Chen' },
  { time: '12:00', tankA: -196, tankB: -190, tankC: -196, recordedBy: 'Mike Johnson' },
  { time: '14:00', tankA: -196, tankB: -187, tankC: -196, recordedBy: 'Mike Johnson' },
  { time: '16:00', tankA: -196, tankB: -185, tankC: -196, recordedBy: 'Sarah Chen' },
]

export default function TemperaturePage() {
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [selectedTank, setSelectedTank] = useState('')
  const [newTemperature, setNewTemperature] = useState('')
  const [newNitrogenLevel, setNewNitrogenLevel] = useState('')

  const getStatusBadge = (status: string) => {
    if (status === 'normal') return <Badge variant="success">✅ Normal</Badge>
    if (status === 'warning') return <Badge variant="warning">⚠️ Warning</Badge>
    return <Badge variant="danger">🚨 Critical</Badge>
  }

  const formatLastReading = (date: Date) => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hours ago`
    return `${Math.floor(diffMinutes / 1440)} days ago`
  }

  const handleRecordTemperature = () => {
    // In production, this would save to the database via API
    console.log('Recording temperature for', selectedTank, newTemperature, newNitrogenLevel)
    setShowRecordModal(false)
    setNewTemperature('')
    setNewNitrogenLevel('')
    setSelectedTank('')
    alert('Temperature recorded successfully!')
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Temperature Monitoring</h1>
            <p className="text-gray-600 mt-1">Tank temperature monitoring and manual recording</p>
          </div>
          <Button onClick={() => setShowRecordModal(true)}>
            📝 Record Temperature
          </Button>
        </div>

        {/* Monitoring Info Card */}
        <Card>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">ℹ️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Temperature Monitoring System</h3>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    <strong>Current Setup (MVP):</strong> Manual temperature recording
                  </p>
                  <p>
                    • Staff members record temperature readings <strong>twice daily</strong> (morning and evening)
                  </p>
                  <p>
                    • Last readings taken: {formatLastReading(tanks[0].lastReading)}
                  </p>
                  <p>
                    • All records are logged with timestamp and staff name for audit compliance
                  </p>
                  <p className="mt-3">
                    <strong>Future Upgrade:</strong> Automatic temperature sensors will record every 5 minutes with real-time alerts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

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
                  <p className="text-xs text-gray-500 mt-1">
                    Last reading: {formatLastReading(tank.lastReading)}
                  </p>
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

        {/* Temperature History Table */}
        <Card title="Today's Temperature Records">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tank A</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tank B</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tank C</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {temperatureHistory.map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{record.time}</td>
                    <td className="py-3 px-4">
                      <span className={record.tankA < -190 ? 'text-green-600' : 'text-yellow-600'}>
                        {record.tankA}°C
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={record.tankB < -190 ? 'text-green-600' : 'text-yellow-600'}>
                        {record.tankB}°C
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={record.tankC < -190 ? 'text-green-600' : 'text-yellow-600'}>
                        {record.tankC}°C
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{record.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
            <p>
              💡 <strong>Audit Trail:</strong> Temperature records are kept for 1 year for compliance.
              All changes are logged with timestamp, staff name, and IP address.
            </p>
          </div>
        </Card>

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

      {/* Record Temperature Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Record Temperature Reading</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Tank
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedTank}
                  onChange={(e) => setSelectedTank(e.target.value)}
                >
                  <option value="">Choose tank...</option>
                  <option value="Tank A">Tank A</option>
                  <option value="Tank B">Tank B</option>
                  <option value="Tank C">Tank C</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="-196"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newTemperature}
                  onChange={(e) => setNewTemperature(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nitrogen Level (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="85"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={newNitrogenLevel}
                  onChange={(e) => setNewNitrogenLevel(e.target.value)}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                <p>
                  ℹ️ This reading will be recorded with your username and timestamp for audit purposes.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowRecordModal(false)
                  setSelectedTank('')
                  setNewTemperature('')
                  setNewNitrogenLevel('')
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleRecordTemperature}
                disabled={!selectedTank || !newTemperature || !newNitrogenLevel}
              >
                Save Reading
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
