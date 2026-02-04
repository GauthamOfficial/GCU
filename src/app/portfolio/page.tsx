'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PortfolioItem } from '@/lib/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const categories = ['All', 'Birthday', 'Pre-shoot', 'Traditional', 'Event', 'Music Video', 'Travel Highlights', 'Wedding Highlights', 'Promotion Videos'] as const

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [loading, setLoading] = useState(true)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        fetchPortfolioItems()
    }, [])

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
    }, [portfolioItems, selectedCategory])

    async function fetchPortfolioItems() {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) {
            console.error('Error fetching portfolio:', error)
        } else {
            setPortfolioItems(data || [])
        }
        setLoading(false)
    }

    const filteredItems = selectedCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

    return (
        <div className="min-h-screen py-24">
            <div className="container-editorial">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>Portfolio</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        Explore our collection of cinematic videos and short films, crafted with passion and precision.
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mb-12 scroll-animate">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Portfolio Grid */}
                {loading ? (
                    <div className="text-center py-20 text-muted-foreground">Loading portfolio...</div>
                ) : filteredItems.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No portfolio items found. Check back soon!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className="group cursor-pointer border border-grey-200 rounded-lg overflow-hidden hover:border-grey-300 transition-all duration-300 shadow-sm hover:shadow-lg scroll-animate"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="aspect-video bg-grey-200 overflow-hidden">
                                    {item.thumbnail_url ? (
                                        <img
                                            src={convertMediaUrl(item.thumbnail_url)}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-grey-300 to-grey-400 group-hover:scale-105 transition-transform duration-500" />
                                    )}
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="text-lg font-semibold mb-1 text-black">{item.title}</h3>
                                    <p className="text-sm uppercase tracking-wider text-grey-600">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Modal */}
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{selectedItem?.title}</DialogTitle>
                    </DialogHeader>
                    {selectedItem && (
                        <div className="space-y-4">
                            <div className="aspect-video bg-black">
                                <iframe
                                    src={convertMediaUrl(selectedItem.video_url)}
                                    className="w-full h-full"
                                    allow="autoplay"
                                    allowFullScreen
                                />
                            </div>
                            {selectedItem.description && (
                                <p className="text-muted-foreground">{selectedItem.description}</p>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

// Convert Google Drive sharing URL to embeddable format
// Convert media URL to embeddable format
function convertMediaUrl(url: string): string {
    if (!url) return ''

    // Handle YouTube URLs
    const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    if (youtubeMatch && youtubeMatch[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`
    }

    // Handle Google Drive URLs
    const fileIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/)
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`
    }

    return url
}
