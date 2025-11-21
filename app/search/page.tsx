'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any>(null)

  const handleSearch = () => {
    // Mock search result
    setSearchResults({
      patient: {
        name: 'Jane Doe',
        dob: '1988-05-15',
        patientId: 'JD-20250515',
      },
      samples: [
        {
          type: 'Embryos',
          quantity: 3,
          quality: '4AA, 4AB, 3BB',
          freezeDate: '2024-11-20',
          freezeMethod: 'Vitrification',
          location: {
            tank: 'A',
            canister: 5,
            goblet: 2,
            straw: '1-3',
          },
        },
      ],
    })
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Quick Search</h1>
          <p className="text-gray-600">Find samples instantly by patient name, ID, or barcode</p>
        </div>

        {/* Search Box */}
        <Card className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="🔍 Enter patient name, ID, or scan barcode..."
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button size="lg" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Press Enter to search or use a barcode scanner
          </p>
        </Card>

        {/* Search Results */}
        {searchResults && (
          <Card>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex items-center gap-2 text-success mb-2">
                <span className="text-2xl">✓</span>
                <span className="font-semibold">Found 1 result</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Patient Info */}
              <div>
                <h3 className="text-2xl font-bold mb-2">{searchResults.patient.name}</h3>
                <div className="text-gray-600 space-y-1">
                  <p>DOB: {searchResults.patient.dob}</p>
                  <p>ID: {searchResults.patient.patientId}</p>
                </div>
              </div>

              {/* Sample Details */}
              {searchResults.samples.map((sample: any, index: number) => (
                <div key={index} className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-3">Sample Details:</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Type & Quantity</p>
                      <p className="font-medium">
                        {sample.quantity} {sample.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quality</p>
                      <p className="font-medium">{sample.quality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Freeze Date</p>
                      <p className="font-medium">{sample.freezeDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Freeze Method</p>
                      <p className="font-medium">{sample.freezeMethod}</p>
                    </div>
                  </div>

                  {/* Location (Prominent) */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-4">
                    <h5 className="font-bold text-xl mb-4 text-blue-900">📍 Storage Location</h5>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tank</p>
                        <p className="text-3xl font-bold text-blue-900">{sample.location.tank}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Canister</p>
                        <p className="text-3xl font-bold text-blue-900">{sample.location.canister}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Goblet</p>
                        <p className="text-3xl font-bold text-blue-900">{sample.location.goblet}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Straw</p>
                        <p className="text-3xl font-bold text-blue-900">{sample.location.straw}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button variant="outline">📄 Print Location Card</Button>
                    <Button variant="outline">🗑️ Mark as Retrieved</Button>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!searchResults && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">🔍</div>
            <p>Enter a search query to find samples</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
