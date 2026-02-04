import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET - Fetch all testimonials (admin)
export async function GET(request: NextRequest) {
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching testimonials:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(testimonials)
}

// POST - Create testimonial (admin)
export async function POST(request: NextRequest) {
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()
    const body = await request.json()

    const { name, role, message, image_url, is_active } = body

    if (!name || !message || !image_url) {
        return NextResponse.json(
            { error: 'Name, message, and image URL are required' },
            { status: 400 }
        )
    }

    const { data: testimonial, error } = await supabase
        .from('testimonials')
        .insert({
            name,
            role: role || null,
            message,
            image_url,
            is_active: is_active ?? true
        })
        .select()
        .single()

    if (error) {
        console.error('Error creating testimonial:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(testimonial)
}

// PATCH - Update testimonial (admin)
export async function PATCH(request: NextRequest) {
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()
    const body = await request.json()

    const { id, name, role, message, image_url, is_active } = body

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { data: testimonial, error } = await supabase
        .from('testimonials')
        .update({
            name,
            role: role || null,
            message,
            image_url,
            is_active
        })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating testimonial:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(testimonial)
}

// DELETE - Delete testimonial (admin)
export async function DELETE(request: NextRequest) {
    const adminPassword = request.headers.get('x-admin-password')
    if (adminPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting testimonial:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
