'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// Package data optimized for Sri Lanka reel-based deliverables
const packages = [
    {
        id: '1',
        name: 'Starter Video',
        description: 'Perfect for quick celebrations and intimate moments',
        starting_price: 35000,
        is_popular: false,
        deliverables: [
            '1 cinematic video (60-90 seconds)',
            '2-3 hours shoot duration',
            '1 location, 1 outfit',
            '16:9 cinematic format',
            'Professional color grading',
            'Background music',
            'Delivered in 5-7 days',
            '1 revision included'
        ]
    },
    {
        id: '2',
        name: 'Premium Video',
        description: 'Our most popular choice for memorable occasions',
        starting_price: 65000,
        is_popular: true,
        deliverables: [
            '1 cinematic video (90-120 seconds)',
            '4-5 hours shoot duration',
            '2 locations, 2 outfits',
            '16:9 cinematic format',
            'Advanced color grading',
            'Custom music selection',
            'Raw footage included',
            'Delivered in 7-10 days',
            '2 revisions included'
        ]
    },
    {
        id: '3',
        name: 'Mini Pre-shoot',
        description: 'Romantic storytelling for couples',
        starting_price: 85000,
        is_popular: false,
        deliverables: [
            '2 cinematic videos (90 seconds each)',
            'Full day shoot (6-8 hours)',
            '3 locations, 3 outfits',
            '16:9 cinematic format',
            'Cinematic color grading',
            'Custom soundtrack',
            'Full raw footage included',
            'Delivered in 10-14 days',
            '3 revisions included'
        ]
    }
]

export default function PackagesPage() {
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

    return (
        <div className="min-h-screen py-24">
            <div className="container-editorial">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>Packages</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        Clear pricing for cinematic videos. All packages include professional color grading and digital delivery.
                    </p>
                </div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {packages.map((pkg, index) => (
                        <Card
                            key={pkg.id}
                            className={`relative flex flex-col scroll-animate ${pkg.is_popular ? 'border-2 border-foreground shadow-lg' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {pkg.is_popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background">
                                    Most Popular
                                </Badge>
                            )}
                            <CardHeader>
                                <CardTitle className="text-3xl">{pkg.name}</CardTitle>
                                <CardDescription className="text-base">{pkg.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-6">
                                    <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Starting from</p>
                                    <p className="text-4xl font-bold">
                                        LKR {pkg.starting_price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="space-y-2.5">
                                    {pkg.deliverables.map((deliverable, index) => (
                                        <div key={index} className="flex items-start gap-2.5">
                                            <span className="text-foreground mt-1 flex-shrink-0">•</span>
                                            <span className="text-sm leading-relaxed">{deliverable}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full" variant={pkg.is_popular ? 'default' : 'outline'}>
                                    <Link href="/book">
                                        Book This
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <p className="text-muted-foreground">
                        Need something custom? <Link href="/book" className="underline hover:no-underline">Get in touch</Link> and we'll create a package tailored to your vision.
                    </p>
                </div>
            </div>
        </div>
    )
}
