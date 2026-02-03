import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Fetch all bookings (admin only)
export async function GET() {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch all bookings
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create new booking (public)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, whatsapp_number, occasion_type, location, notes } = body

        // Validate required fields
        if (!name || !whatsapp_number || !occasion_type || !location) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const supabase = await createClient()

        // Insert booking
        const { data, error } = await supabase
            .from('bookings')
            .insert([
                {
                    name,
                    whatsapp_number,
                    occasion_type,
                    location,
                    notes: notes || null,
                    status: 'New',
                },
            ])
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
