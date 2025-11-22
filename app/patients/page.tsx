'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

// Mock data
const mockPatients = [
  {
    id: 'patient-1',
    patientId: 'JD-20250515',
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: '1988-05-15',
    email: 'jane.doe@email.com',
    phone: '555-0101',
    samplesCount: 3,
  },
  {
    id: 'patient-2',
    patientId: 'ML-20240812',
    firstName: 'Mary',
    lastName: 'Lee',
    dateOfBirth: '1990-08-12',
    email: 'mary.lee@email.com',
    phone: '555-0102',
    samplesCount: 5,
  },
  {
    id: 'patient-3',
    patientId: 'TW-20230623',
    firstName: 'Tom',
    lastName: 'Wang',
    dateOfBirth: '1985-06-23',
    email: 'tom.wang@email.com',
    phone: '555-0103',
    samplesCount: 1,
  },
]

export default function PatientsPage() {
  const [patients] = useState(mockPatients)
  const [generatingReport, setGeneratingReport] = useState<string | null>(null)

  const handleGenerateReport = async (patientId: string, patientName: string) => {
    setGeneratingReport(patientId)
    try {
      const response = await fetch(`/api/reports/patient/${patientId}`)
      if (!response.ok) throw new Error('Failed to generate report')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Patient_Report_${patientName.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setGeneratingReport(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="text-gray-600 mt-1">Manage patient information</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Export</Button>
            <Link href="/patients/new">
              <Button>+ New Patient</Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <Card>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search patients..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>Search</Button>
          </div>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <Card key={patient.id}>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {patient.firstName[0]}
                    {patient.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 font-mono">{patient.patientId}</p>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">DOB:</span> {patient.dateOfBirth}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {patient.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Phone:</span> {patient.phone}
                  </p>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm font-medium text-primary">
                    {patient.samplesCount} stored sample{patient.samplesCount !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleGenerateReport(patient.id, `${patient.firstName}_${patient.lastName}`)}
                    disabled={generatingReport === patient.id}
                  >
                    {generatingReport === patient.id ? 'Generating...' : '📄 Report'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
