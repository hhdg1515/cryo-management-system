import { NextRequest, NextResponse } from 'next/server'
import { renderToStream } from '@react-pdf/renderer'
import { PatientReport } from '@/lib/pdf/PatientReport'

// Mock data - in production, this would fetch from Supabase
const mockPatientData = {
  'patient-1': {
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: '1988-05-15',
    patientId: 'JD-20250515',
    samples: [
      {
        sampleType: 'embryo',
        quantity: 3,
        quality: '4AA, 4AB, 3BB',
        freezeDate: '2024-11-20',
        freezeMethod: 'vitrification',
        location: 'Tank A > Can 5 > Gob 2',
        status: 'stored',
      },
    ],
  },
  'patient-2': {
    firstName: 'Mary',
    lastName: 'Lee',
    dateOfBirth: '1990-03-22',
    patientId: 'ML-20250322',
    samples: [
      {
        sampleType: 'egg',
        quantity: 8,
        quality: 'Grade A',
        freezeDate: '2024-11-19',
        freezeMethod: 'vitrification',
        location: 'Tank A > Can 6 > Gob 1',
        status: 'stored',
      },
    ],
  },
  'patient-3': {
    firstName: 'Tom',
    lastName: 'Wang',
    dateOfBirth: '1985-08-10',
    patientId: 'TW-20250810',
    samples: [
      {
        sampleType: 'sperm',
        quantity: 1,
        quality: 'Normal morphology 85%',
        freezeDate: '2024-11-18',
        freezeMethod: 'slow_freeze',
        location: 'Tank B > Can 3 > Gob 4',
        status: 'stored',
      },
    ],
  },
}

const mockClinicData = {
  name: 'ABC Fertility Center',
  address: '123 Medical Plaza, Suite 500, San Francisco, CA 94102',
  phone: '(415) 555-0123',
  email: 'info@abcfertility.com',
}

export async function GET(
  request: NextRequest,
  { params }: { params: { patientId: string } }
) {
  try {
    const { patientId } = params

    // In production, fetch real data from Supabase
    // const { data: patient, error } = await supabase
    //   .from('patients')
    //   .select('*, samples(*)')
    //   .eq('id', patientId)
    //   .single()

    const patientData = mockPatientData[patientId as keyof typeof mockPatientData]

    if (!patientData) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      )
    }

    const reportDate = new Date().toISOString()

    // Generate PDF using JSX syntax
    const pdfStream = await renderToStream(
      <PatientReport
        patient={patientData}
        clinic={mockClinicData}
        reportDate={reportDate}
      />
    )

    // Convert stream to buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of pdfStream as any) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    // Return PDF
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Patient_Report_${patientData.patientId}_${new Date().toISOString().split('T')[0]}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF report' },
      { status: 500 }
    )
  }
}
