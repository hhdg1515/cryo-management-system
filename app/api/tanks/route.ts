import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET /api/tanks - List all tanks
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('tanks')
      .select('*')
      .eq('is_active', true)
      .order('tank_name', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ tanks: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST /api/tanks - Create new tank
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tankName, capacity, location } = body

    const { data, error } = await supabase
      .from('tanks')
      .insert({
        tank_name: tankName,
        capacity,
        location,
        is_active: true,
        // clinic_id: user.clinic_id, // TODO: Get from auth session
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ tank: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
