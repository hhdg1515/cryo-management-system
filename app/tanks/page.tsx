'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'

export default function TanksPage() {
  const [selectedTank, setSelectedTank] = useState('A')

  // Mock data - canister layout
  const canisters = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    occupied: Math.random() > 0.3,
    patient: Math.random() > 0.3 ? 'Patient Name' : null,
  }))

  const goblets = [
    { number: 1, isEmpty: true },
    { number: 2, isEmpty: false, patient: 'Jane Doe', samples: 3 },
    { number: 3, isEmpty: false, patient: 'Mary Lee', samples: 5 },
    { number: 4, isEmpty: true },
    { number: 5, isEmpty: false, patient: 'Tom Wang', samples: 1 },
    { number: 6, isEmpty: false, patient: 'Sarah Kim', samples: 2 },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Storage Layout</h1>
          <p className="text-gray-600 mt-1">Visualize and manage tank storage</p>
        </div>

        {/* Tank Selector */}
        <div className="flex gap-4">
          {['A', 'B', 'C'].map((tank) => (
            <button
              key={tank}
              onClick={() => setSelectedTank(tank)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                selectedTank === tank
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tank {tank}
            </button>
          ))}
        </div>

        {/* Tank Overview */}
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Tank {selectedTank} - Current Status</h3>
            <div className="text-right">
              <p className="text-sm text-gray-600">Capacity</p>
              <p className="text-2xl font-bold">45/60 (75%)</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-warning h-4 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          {/* Canister Grid */}
          <h4 className="font-semibold mb-4">Canister Layout:</h4>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {canisters.map((canister) => (
              <div
                key={canister.number}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 cursor-pointer transition ${
                  canister.occupied
                    ? 'bg-primary text-white border-primary hover:opacity-80'
                    : 'bg-gray-50 text-gray-400 border-gray-300 hover:bg-gray-100'
                }`}
              >
                <p className="text-sm">Can</p>
                <p className="text-3xl font-bold">{canister.number}</p>
                <p className="text-xs">{canister.occupied ? '✓' : '○'}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
              <span>Empty</span>
            </div>
          </div>
        </Card>

        {/* Canister Detail (Example: Canister 5) */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Canister 5 - 6 Goblets</h3>
          <div className="space-y-3">
            {goblets.map((goblet) => (
              <div
                key={goblet.number}
                className={`p-4 rounded-lg border-2 ${
                  goblet.isEmpty
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        goblet.isEmpty ? 'bg-gray-200 text-gray-600' : 'bg-primary text-white'
                      }`}
                    >
                      {goblet.number}
                    </div>
                    <div>
                      {goblet.isEmpty ? (
                        <p className="text-gray-600 font-medium">Empty</p>
                      ) : (
                        <>
                          <p className="font-bold">{goblet.patient}</p>
                          <p className="text-sm text-gray-600">
                            {goblet.samples} sample{(goblet.samples || 0) > 1 ? 's' : ''}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  {!goblet.isEmpty && (
                    <button className="text-primary font-medium hover:underline text-sm">
                      View Details →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Capacity: <span className="font-semibold">4/6 (67%)</span>
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
