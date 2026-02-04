// Database Types for Studio GCU

export interface Package {
    id: string
    name: string
    description: string
    starting_price: number
    deliverables: string[]
    is_popular: boolean
    display_order: number
    created_at: string
    updated_at: string
}

export interface PortfolioItem {
    id: string
    title: string
    category: 'Birthday' | 'Pre-shoot' | 'Traditional' | 'Event'
    video_url: string // Google Drive shareable link
    thumbnail_url: string | null // Google Drive shareable link
    description: string | null
    display_order: number
    created_at: string
    updated_at: string
}

export interface Testimonial {
    id: string
    created_at: string
    name: string
    role: string | null
    message: string
    image_url: string
    is_active: boolean
}

export interface Booking {
    id: string
    name: string
    whatsapp_number: string
    occasion_type: string
    location: string
    notes: string | null
    status: 'New' | 'Contacted' | 'Confirmed' | 'Completed'
    created_at: string
    updated_at: string
}

export type BookingFormData = Omit<Booking, 'id' | 'status' | 'created_at' | 'updated_at'>

export type PackageFormData = Omit<Package, 'id' | 'created_at' | 'updated_at'>

export type PortfolioItemFormData = Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>

export type TestimonialFormData = Omit<Testimonial, 'id' | 'created_at'>
