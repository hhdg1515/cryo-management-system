'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { useRouter } from 'next/navigation'

export default function TanksPage() {
  const router = useRouter()
  const [selectedTank, setSelectedTank] = useState('A')
  const [selectedCanister, setSelectedCanister] = useState<number | null>(null)

  // Generate mock tanks (showing we have many tanks available)
  const allTanks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  // Mock data - canister layout for each tank
  const getTankData = (tankId: string) => {
    const canisters = Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      occupied: Math.random() > 0.3,
      capacity: Math.floor(Math.random() * 60) + 20,
      maxCapacity: 60,
    }))
    return {
      id: tankId,
      canisters,
      totalCapacity: canisters.reduce((sum, c) => sum + c.capacity, 0),
      maxCapacity: 600,
    }
  }

  // Generate mock goblets for selected canister
  const getGobletsForCanister = (tankId: string, canisterNumber: number) => {
    const numGoblets = 6
    return Array.from({ length: numGoblets }, (_, i) => {
      const isEmpty = Math.random() > 0.6
      return {
        id: `${tankId}-${canisterNumber}-${i + 1}`,
        number: i + 1,
        isEmpty,
        patient: isEmpty ? null : ['Jane Doe', 'Mary Lee', 'Tom Wang', 'Sarah Kim', 'Anna Liu', 'Bob Chen'][Math.floor(Math.random() * 6)],
        patientId: isEmpty ? null : `P${Math.floor(Math.random() * 9000) + 1000}`,
        samples: isEmpty ? 0 : Math.floor(Math.random() * 5) + 1,
      }
    })
  }

  const handleViewDetails = (patientId: string | null) => {
    if (patientId) {
      // Navigate to patient detail page
      router.push(`/patients?search=${patientId}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Storage Layout</h1>
          <p className="text-gray-600 mt-1">Visualize and manage tank storage</p>
        </div>

        {/* Tank Selector with scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {allTanks.map((tank) => (
            <button
              key={tank}
              onClick={() => {
                setSelectedTank(tank)
                setSelectedCanister(null)
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                selectedTank === tank
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Tank {tank}
            </button>
          ))}
          <div className="flex items-center text-gray-400 px-2">...</div>
        </div>

        {/* Compact Tank Overview - 3 tanks per row */}
        <div className="grid grid-cols-3 gap-4">
          {allTanks.slice(0, 6).map((tankId) => {
            const tankData = getTankData(tankId)
            const percentage = Math.round((tankData.totalCapacity / tankData.maxCapacity) * 100)
            return (
              <Card key={tankId}>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Tank {tankId}</h3>
                  <div className="text-sm text-gray-600">
                    {tankData.totalCapacity}/{tankData.maxCapacity} samples
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${percentage > 80 ? 'bg-error' : percentage > 60 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedTank(tankId)
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                    }}
                    className="text-primary text-sm hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selected Tank - Canister Grid */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Tank {selectedTank} - Canister Layout</h3>
          <p className="text-sm text-gray-600 mb-4">Click on a canister to view patient and sample details</p>

          <div className="grid grid-cols-5 gap-3 mb-4">
            {getTankData(selectedTank).canisters.map((canister) => (
              <div
                key={canister.number}
                onClick={() => setSelectedCanister(canister.number)}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 cursor-pointer transition ${
                  selectedCanister === canister.number
                    ? 'bg-success text-white border-success ring-2 ring-success ring-offset-2'
                    : canister.occupied
                    ? 'bg-primary text-white border-primary hover:opacity-80'
                    : 'bg-gray-50 text-gray-400 border-gray-300 hover:bg-gray-100'
                }`}
              >
                <p className="text-xs">Can</p>
                <p className="text-2xl font-bold">{canister.number}</p>
                <p className="text-xs">{canister.occupied ? '✓' : '○'}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded"></div>
              <span>Empty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded ring-2 ring-success"></div>
              <span>Selected</span>
            </div>
          </div>
        </Card>

        {/* Canister Detail - Patient & Sample Focus */}
        {selectedCanister && (
          <Card>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">
                  Tank {selectedTank} → Canister {selectedCanister} → Patient & Sample Details
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Each canister contains 6 goblets. Click "View Details" to see patient information.
              </p>
            </div>

            <div className="space-y-3">
              {getGobletsForCanister(selectedTank, selectedCanister).map((goblet) => (
                <div
                  key={goblet.id}
                  className={`p-4 rounded-lg border-2 transition ${
                    goblet.isEmpty
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          goblet.isEmpty ? 'bg-gray-200 text-gray-600' : 'bg-primary text-white'
                        }`}
                      >
                        {goblet.number}
                      </div>
                      <div>
                        {goblet.isEmpty ? (
                          <p className="text-gray-600 font-medium">Empty Goblet</p>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold text-lg">{goblet.patient}</p>
                              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                                {goblet.patientId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              📦 {goblet.samples} sample{goblet.samples > 1 ? 's' : ''} stored
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Location: Tank {selectedTank} / Canister {selectedCanister} / Goblet {goblet.number}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    {!goblet.isEmpty && (
                      <button
                        onClick={() => handleViewDetails(goblet.patientId)}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition font-medium text-sm"
                      >
                        View Details →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Goblet Capacity:</p>
                  <p className="text-xl font-bold">
                    {getGobletsForCanister(selectedTank, selectedCanister).filter(g => !g.isEmpty).length}/6 occupied
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Total Samples:</p>
                  <p className="text-xl font-bold text-primary">
                    {getGobletsForCanister(selectedTank, selectedCanister).reduce((sum, g) => sum + g.samples, 0)} samples
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

      </div>
    </DashboardLayout>
  )
}
