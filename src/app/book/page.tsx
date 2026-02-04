'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BookingFormData } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Check } from 'lucide-react'

const occasionTypes = [
    'Birthday',
    'Pre-shoot',
    'Traditional',
    'Event',
    'Music Video',
    'Travel Highlights',
    'Wedding Highlights',
    'Promotion Videos',
    'Other',
]

export default function BookPage() {
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        whatsapp_number: '',
        occasion_type: '',
        location: '',
        notes: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        // Create Intersection Observer for scroll animations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const element = entry.target as HTMLElement
                        const delay = element.style.animationDelay || '0s'
                        element.style.setProperty('--animation-delay', delay)
                        element.classList.add('animate-in')
                    }
                })
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        const elements = document.querySelectorAll('.scroll-animate')
        elements.forEach((el) => observerRef.current?.observe(el))

        return () => {
            observerRef.current?.disconnect()
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const supabase = createClient()
        const { error: submitError } = await supabase
            .from('bookings')
            .insert([formData])

        if (submitError) {
            console.error('Error submitting booking:', submitError)
            setError('Failed to submit booking. Please try again.')
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen py-24">
                <div className="container-editorial">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-6">
                            <Check size={40} />
                        </div>
                        <h1 className="mb-6">Booking Received!</h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Thank you for your interest, <strong>{formData.name}</strong>. We've received your booking request and will contact you on WhatsApp within 24 hours to discuss your vision.
                        </p>
                        <Button asChild variant="outline">
                            <a href="/">Return Home</a>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-24">
            <div className="container-editorial">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>Book a Shoot</h1>
                        <p className="text-xl text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                            Tell us about your vision and we'll bring it to life. Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    {/* Form */}
                    <Card className="scroll-animate" style={{ animationDelay: '0.2s' }}>
                        <CardHeader>
                            <CardTitle>Booking Details</CardTitle>
                            <CardDescription>
                                All fields are required unless marked optional
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold">
                                        Full Name
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your full name"
                                    />
                                </div>

                                {/* WhatsApp Number */}
                                <div className="space-y-2">
                                    <label htmlFor="whatsapp" className="text-sm font-semibold">
                                        WhatsApp Number
                                    </label>
                                    <Input
                                        id="whatsapp"
                                        type="tel"
                                        required
                                        value={formData.whatsapp_number}
                                        onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                                        placeholder="+94 XX XXX XXXX"
                                    />
                                </div>

                                {/* Occasion Type */}
                                <div className="space-y-2">
                                    <label htmlFor="occasion" className="text-sm font-semibold">
                                        Occasion Type
                                    </label>
                                    <Select
                                        required
                                        value={formData.occasion_type}
                                        onValueChange={(value) => setFormData({ ...formData, occasion_type: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select occasion type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {occasionTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-semibold">
                                        Location / Area
                                    </label>
                                    <Input
                                        id="location"
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g., Colombo, Kandy, Galle"
                                    />
                                </div>

                                {/* Notes */}
                                <div className="space-y-2">
                                    <label htmlFor="notes" className="text-sm font-semibold">
                                        Additional Notes <span className="text-muted-foreground font-normal">(Optional)</span>
                                    </label>
                                    <Textarea
                                        id="notes"
                                        rows={5}
                                        value={formData.notes || ''}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Tell us about your vision, preferred vibe, outfit ideas, reference videos, or any special requests..."
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button type="submit" className="w-full cursor-pointer" size="lg" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
