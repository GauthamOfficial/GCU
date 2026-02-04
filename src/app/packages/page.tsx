'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Package } from '@/lib/types'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([])
    const [loading, setLoading] = useState(true)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        fetchPackages()
    }, [])

    async function fetchPackages() {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('packages')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) {
            console.error('Error fetching packages:', error)
        } else {
            setPackages(data || [])
        }
        setLoading(false)
    }

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
    }, [packages])

    return (
        <div className="min-h-screen py-24">
            <div className="container-editorial">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>Packages</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        Choose the perfect package for your special moment. All packages include our signature cinematic style and professional editing.
                    </p>
                </div>

                {/* Packages Grid */}
                {loading ? (
                    <div className="text-center py-20 text-muted-foreground">Loading packages...</div>
                ) : packages.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">No packages available.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <Card
                                key={pkg.id}
                                className={`relative flex flex-col border-2 border-black shadow-lg scroll-animate ${pkg.is_popular ? 'border-4 border-black' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {pkg.is_popular && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardHeader className="bg-white">
                                    <CardTitle className="text-3xl text-black">{pkg.name}</CardTitle>
                                    <CardDescription className="text-base text-grey-600">{pkg.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 bg-white">
                                    <div className="mb-6">
                                        <p className="text-sm uppercase tracking-wider text-grey-600 mb-1">Starting from</p>
                                        <p className="text-4xl font-bold text-black">
                                            LKR {pkg.starting_price.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="space-y-2.5">
                                        {pkg.deliverables.map((deliverable, idx) => (
                                            <div key={idx} className="flex items-start gap-2.5">
                                                <span className="text-black mt-1 flex-shrink-0">•</span>
                                                <span className="text-sm leading-relaxed text-black">{deliverable}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-white">
                                    <Button asChild className="w-full" variant={pkg.is_popular ? 'default' : 'outline'}>
                                        <Link href="/book">
                                            Book This
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

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
