import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export async function GET() {
    const supabase = createClient()

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching testimonials:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(testimonials)
}
