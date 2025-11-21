'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function NewSamplePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    patientId: '',
    sampleType: 'embryo',
    quantity: '',
    quality: '',
    freezeDate: '',
    freezeMethod: 'vitrification',
    tankId: '',
    canisterNumber: '',
    gobletNumber: '',
    strawPosition: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call to create sample
    console.log('Form data:', formData)
    router.push('/samples')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">New Sample</h1>
          <p className="text-gray-600 mt-1">Add a new cryopreserved sample</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card title="Patient Information" className="mb-6">
            <Input
              label="Patient ID"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder="JD-20250515"
              required
            />
            <p className="text-sm text-gray-500 -mt-2">
              Enter the patient ID or{' '}
              <a href="/patients/new" className="text-primary hover:underline">
                create new patient
              </a>
            </p>
          </Card>

          <Card title="Sample Information" className="mb-6">
            <Select
              label="Sample Type"
              name="sampleType"
              value={formData.sampleType}
              onChange={handleChange}
              options={[
                { value: 'embryo', label: 'Embryo' },
                { value: 'egg', label: 'Egg' },
                { value: 'sperm', label: 'Sperm' },
              ]}
            />

            <Input
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="3"
              required
            />

            <Input
              label="Quality (optional)"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              placeholder="4AA, 4AB, 3BB"
            />

            <Input
              label="Freeze Date"
              name="freezeDate"
              type="date"
              value={formData.freezeDate}
              onChange={handleChange}
              required
            />

            <Select
              label="Freeze Method"
              name="freezeMethod"
              value={formData.freezeMethod}
              onChange={handleChange}
              options={[
                { value: 'vitrification', label: 'Vitrification' },
                { value: 'slow_freeze', label: 'Slow Freeze' },
              ]}
            />
          </Card>

          <Card title="Storage Location" className="mb-6">
            <Select
              label="Tank"
              name="tankId"
              value={formData.tankId}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select Tank' },
                { value: 'tank-a', label: 'Tank A' },
                { value: 'tank-b', label: 'Tank B' },
                { value: 'tank-c', label: 'Tank C' },
              ]}
              required
            />

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Canister"
                name="canisterNumber"
                type="number"
                value={formData.canisterNumber}
                onChange={handleChange}
                placeholder="5"
                required
              />

              <Input
                label="Goblet"
                name="gobletNumber"
                type="number"
                value={formData.gobletNumber}
                onChange={handleChange}
                placeholder="2"
                required
              />

              <Input
                label="Straw Position"
                name="strawPosition"
                value={formData.strawPosition}
                onChange={handleChange}
                placeholder="1-3"
                required
              />
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Tip: Use the &quot;Find Empty&quot; button to automatically find available storage locations
              </p>
            </div>
          </Card>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="button" variant="outline">
              Generate Barcode
            </Button>
            <Button type="submit">Save Sample</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
