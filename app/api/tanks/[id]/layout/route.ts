import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET /api/tanks/:id/layout - Get tank layout with samples
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get tank info
    const { data: tank, error: tankError } = await supabase
      .from('tanks')
      .select('*')
      .eq('id', params.id)
      .single()

    if (tankError) {
      return NextResponse.json({ error: tankError.message }, { status: 404 })
    }

    // Get all samples in this tank
    const { data: samples, error: samplesError } = await supabase
      .from('samples')
      .select(`
        *,
        patient:patients(*)
      `)
      .eq('tank_id', params.id)
      .eq('status', 'stored')

    if (samplesError) {
      return NextResponse.json({ error: samplesError.message }, { status: 400 })
    }

    // Build layout structure
    const canisters: any[] = []
    const canisterMap = new Map()

    samples?.forEach((sample: any) => {
      const canisterNum = sample.canister_number
      const gobletNum = sample.goblet_number

      if (!canisterMap.has(canisterNum)) {
        canisterMap.set(canisterNum, {
          number: canisterNum,
          goblets: [],
        })
      }

      const canister = canisterMap.get(canisterNum)
      canister.goblets.push({
        number: gobletNum,
        isEmpty: false,
        patient: `${sample.patient.first_name} ${sample.patient.last_name}`,
        samples: sample.quantity,
        sampleId: sample.sample_id,
      })
    })

    // Convert map to array and sort
    const canistersArray = Array.from(canisterMap.values()).sort(
      (a, b) => a.number - b.number
    )

    const layout = {
      tankName: tank.tank_name,
      capacity: tank.capacity,
      occupied: samples?.length || 0,
      canisters: canistersArray,
    }

    return NextResponse.json(layout)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
