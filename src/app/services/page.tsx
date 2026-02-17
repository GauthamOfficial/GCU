'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const services = [
    {
        title: "Cinematic Video Production",
        description: "Professional video production services that bring your stories to life with cinematic quality and creative direction.",
        items: ["Shoots", "Events", "Music videos", "Weddings", "Commercials"],
        thumbnail: null as string | null,
    },
    {
        title: "Professional Video Editing",
        description: "Expert editing services that transform raw footage into polished, engaging content ready for any platform.",
        items: ["Reels", "YouTube", "Promotions", "Highlight edits"],
        thumbnail: null as string | null,
    },
    {
        title: "Web Development",
        description: "Modern, responsive websites built with clean code and intuitive design to elevate your digital presence.",
        items: ["Business websites", "Portfolio sites", "Landing pages", "Modern responsive builds"],
        thumbnail: null as string | null,
    },
    {
        title: "Graphic Design",
        description: "Visual design solutions that communicate your brand effectively across print and digital mediums.",
        items: ["Flyers", "Posters", "Social media creatives", "Branding materials"],
        thumbnail: null as string | null,
    },
]

export default function ServicesPage() {
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
                <div className="mb-20">
                    <h1 className="mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                        Our Services
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                        A full-service creative studio offering video production, editing, web development, and graphic design.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="group scroll-animate bg-white border border-grey-200 rounded-lg overflow-hidden hover:border-black hover:shadow-lg transition-all duration-500 ease-out"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Thumbnail placeholder */}
                            <div className="aspect-video w-full bg-grey-100 border-b border-grey-200 overflow-hidden">
                                {service.thumbnail ? (
                                    <img
                                        src={service.thumbnail}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-grey-400 text-sm uppercase tracking-wider">
                                        Thumbnail
                                    </div>
                                )}
                            </div>
                            <div className="p-8 lg:p-10">
                                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-black group-hover:text-black transition-colors">
                                    {service.title}
                                </h2>
                                <p className="text-base lg:text-lg text-grey-600 mb-6 leading-relaxed min-h-[3rem]">
                                    {service.description}
                                </p>
                                <div className="pt-6 border-t border-grey-100">
                                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2 list-disc list-inside text-grey-600 text-sm">
                                        {service.items.map((item, idx) => (
                                            <li key={idx} className="capitalize">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center scroll-animate" style={{ animationDelay: '0.6s' }}>
                    <Button asChild size="lg" className="text-base px-8 py-6 h-auto">
                        <Link href="/book">
                            Start a Project
                            <ArrowRight className="ml-2" size={20} />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
