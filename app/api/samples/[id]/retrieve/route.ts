import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// POST /api/samples/:id/retrieve - Mark sample as retrieved
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { reason, notes } = body

    const { data, error } = await supabase
      .from('samples')
      .update({
        status: 'retrieved',
        retrieval_date: new Date().toISOString(),
        retrieval_reason: reason,
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // TODO: Create audit log
    // await createAuditLog({
    //   action_type: 'retrieve',
    //   entity_type: 'sample',
    //   entity_id: params.id,
    //   notes: notes,
    // })

    return NextResponse.json({ sample: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
