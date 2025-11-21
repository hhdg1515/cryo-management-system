import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET /api/samples - List all samples
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q')
    const patientId = searchParams.get('patientId')
    const sampleType = searchParams.get('sampleType')
    const status = searchParams.get('status')
    const tankId = searchParams.get('tankId')

    let query = supabase
      .from('samples')
      .select(`
        *,
        patient:patients(*),
        tank:tanks(*),
        created_by_user:users(*)
      `)

    // Apply filters
    if (q) {
      query = query.or(`sample_id.ilike.%${q}%,patients.first_name.ilike.%${q}%,patients.last_name.ilike.%${q}%`)
    }
    if (patientId) {
      query = query.eq('patient_id', patientId)
    }
    if (sampleType) {
      query = query.eq('sample_type', sampleType)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (tankId) {
      query = query.eq('tank_id', tankId)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ samples: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/samples - Create new sample
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      patientId,
      sampleType,
      quantity,
      quality,
      freezeDate,
      freezeMethod,
      location,
    } = body

    // Validate required fields
    if (!patientId || !sampleType || !quantity || !freezeDate || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate unique sample ID
    const sampleId = `SAMP-${Date.now()}`

    // Insert sample
    const { data, error } = await supabase
      .from('samples')
      .insert({
        sample_id: sampleId,
        patient_id: patientId,
        sample_type: sampleType,
        quantity,
        quality,
        freeze_date: freezeDate,
        freeze_method: freezeMethod,
        tank_id: location.tankId,
        canister_number: location.canisterNumber,
        goblet_number: location.gobletNumber,
        straw_position: location.strawPosition,
        status: 'stored',
        // created_by: user.id, // TODO: Get from auth session
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // TODO: Create audit log

    return NextResponse.json({ sample: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
