'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

// Mock data
const mockSamples = [
  {
    id: '1',
    sampleId: 'SAMP-001234',
    patient: 'Jane Doe',
    sampleType: 'embryo',
    quantity: 3,
    location: 'A-5-2',
    freezeDate: '2024-11-20',
    status: 'stored'
  },
  {
    id: '2',
    sampleId: 'SAMP-001235',
    patient: 'Mary Lee',
    sampleType: 'egg',
    quantity: 8,
    location: 'A-6-1',
    freezeDate: '2024-11-19',
    status: 'stored'
  },
  {
    id: '3',
    sampleId: 'SAMP-001236',
    patient: 'Tom Wang',
    sampleType: 'sperm',
    quantity: 1,
    location: 'B-3-4',
    freezeDate: '2024-11-18',
    status: 'stored'
  },
]

export default function SamplesPage() {
  const [samples] = useState(mockSamples)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stored':
        return 'success'
      case 'retrieved':
        return 'warning'
      case 'used':
        return 'info'
      case 'discarded':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getSampleTypeIcon = (type: string) => {
    switch (type) {
      case 'embryo':
        return '🧬'
      case 'egg':
        return '🥚'
      case 'sperm':
        return '🔬'
      default:
        return '📦'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sample Management</h1>
            <p className="text-gray-600 mt-1">Manage all cryopreserved samples</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Import</Button>
            <Button variant="outline">Export</Button>
            <Link href="/samples/new">
              <Button>+ New Sample</Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search samples..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Types</option>
              <option>Embryo</option>
              <option>Egg</option>
              <option>Sperm</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Status</option>
              <option>Stored</option>
              <option>Retrieved</option>
              <option>Used</option>
              <option>Discarded</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Tanks</option>
              <option>Tank A</option>
              <option>Tank B</option>
              <option>Tank C</option>
            </select>
          </div>
        </Card>

        {/* Samples Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Sample ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Freeze Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((sample) => (
                  <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-sm">{sample.sampleId}</td>
                    <td className="py-3 px-4">{sample.patient}</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-2">
                        {getSampleTypeIcon(sample.sampleType)}
                        <span className="capitalize">{sample.sampleType}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">{sample.quantity}</td>
                    <td className="py-3 px-4 font-mono">{sample.location}</td>
                    <td className="py-3 px-4">{sample.freezeDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(sample.status)}>
                        {sample.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-primary hover:underline text-sm">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>Showing 1-3 of 756</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary text-white rounded">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
