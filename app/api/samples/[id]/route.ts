import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// GET /api/samples/:id - Get sample by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('samples')
      .select(`
        *,
        patient:patients(*),
        tank:tanks(*),
        created_by_user:users(*)
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json({ sample: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT /api/samples/:id - Update sample
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('samples')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // TODO: Create audit log

    return NextResponse.json({ sample: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE /api/samples/:id - Delete sample
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Note: In production, we should mark as discarded instead of deleting
    const { data, error } = await supabase
      .from('samples')
      .update({ status: 'discarded' })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // TODO: Create audit log

    return NextResponse.json({ sample: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
