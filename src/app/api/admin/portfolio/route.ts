import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// GET - Fetch all portfolio items (public)
export async function GET() {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// POST - Create new portfolio item (admin only)
export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { title, category, video_url, thumbnail_url, description, display_order } = body

        // Validate required fields
        if (!title || !category || !video_url) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate category
        const validCategories = ['Birthday', 'Pre-shoot', 'Traditional', 'Event']
        if (!validCategories.includes(category)) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
        }

        const adminClient = createAdminClient()

        // Insert portfolio item
        const { data, error } = await adminClient
            .from('portfolio_items')
            .insert([
                {
                    title,
                    category,
                    video_url,
                    thumbnail_url: thumbnail_url || null,
                    description: description || null,
                    display_order: display_order || 0,
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

// PATCH - Update portfolio item (admin only)
export async function PATCH(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { id, ...updates } = body

        if (!id) {
            return NextResponse.json({ error: 'Portfolio item ID required' }, { status: 400 })
        }

        const adminClient = createAdminClient()

        const { data, error } = await adminClient
            .from('portfolio_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

// DELETE - Delete portfolio item (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Portfolio item ID required' }, { status: 400 })
        }

        const adminClient = createAdminClient()

        const { error } = await adminClient
            .from('portfolio_items')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
