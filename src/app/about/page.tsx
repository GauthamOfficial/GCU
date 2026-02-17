'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
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
                <div className="mb-12 scroll-animate">
                    <h1 className="text-4xl lg:text-5xl font-bold text-black">
                        About Us
                    </h1>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Column - Text Content */}
                    <div className="scroll-animate" style={{ animationDelay: '0.2s' }}>
                        <p className="text-lg lg:text-xl text-grey-600 leading-relaxed text-justify">
                            Diffindo is a creative studio built on precision, intention, and storytelling. What began with cinematic video production has evolved into a space where visuals, design, and digital experiences come together. We work across film, editing, graphic design, and web development, shaping ideas into meaningful visual communication. At Diffindo, we believe creativity is not about noise or trends. It is about clarity. Structure. Emotion. Purpose. Every project starts as something raw, an idea, a moment, a vision. Through discipline and refinement, we shape it into something complete. We don't just create content. We craft experiences that feel intentional and lasting.
                        </p>
                    </div>

                    {/* Right Column - Image Space */}
                    <div className="scroll-animate" style={{ animationDelay: '0.4s' }}>
                        <div className="w-full aspect-square bg-grey-100 border border-grey-200 rounded-lg">
                            {/* Image placeholder - replace with actual image */}
                        </div>
                    </div>
                </div>

                {/* Vision & Mission */}
                <div className="mt-20 grid md:grid-cols-2 gap-12 lg:gap-16 pt-12 border-t border-grey-200">
                    {/* Vision */}
                    <div className="scroll-animate" style={{ animationDelay: '0.6s' }}>
                        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">Vision</h2>
                        <p className="text-base text-grey-600 leading-relaxed text-justify">
                            To build Diffindo into a creative studio where ideas are transformed into meaningful visual and digital experiences through clarity, discipline, and purpose, creating work that feels intentional, timeless, and impactful.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="scroll-animate" style={{ animationDelay: '0.8s' }}>
                        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">Mission</h2>
                        <p className="text-base text-grey-600 leading-relaxed text-justify">
                            To approach every project with precision and integrity, shaping raw ideas into refined cinematic visuals, thoughtful designs, and purposeful digital solutions while maintaining consistency, creativity, and respect for each vision.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 scroll-animate" style={{ animationDelay: '1s' }}>
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
