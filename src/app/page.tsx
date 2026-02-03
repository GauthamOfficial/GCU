'use client'

import { useEffect, useRef } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            // Get animation delay from inline style if present
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

    // Observe all elements with scroll-animate class
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="editorial-spacing bg-black text-white">
        <div className="container-editorial">
          <div className="max-w-4xl">
            <h1 className="text-balance mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Cinematic Storytelling
              <br />
              For Your Most
              <br />
              Memorable Moments
            </h1>
            <p className="text-xl md:text-2xl text-grey-300 mb-12 max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Cinematic videos • Short Films • Pre-shoots • Traditional Events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <Button asChild size="lg" className="text-base px-8 py-6 h-auto">
                <Link href="/book">
                  Book a Shoot
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
                <Link href="/portfolio">
                  View Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="editorial-spacing">
        <div className="container-editorial">
          <h2 className="mb-16 text-center scroll-animate">What We Create</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/4] bg-grey-100 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-grey-200 to-grey-300 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="editorial-spacing bg-grey-100">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-12 scroll-animate">
            <h2>Featured Work</h2>
            <Button asChild variant="ghost" className="text-base">
              <Link href="/portfolio">
                View All
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, index) => (
              <div
                key={item}
                className="group cursor-pointer scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-grey-200 mb-3 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-grey-300 to-grey-400 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">Featured Project {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="editorial-spacing bg-black text-white">
        <div className="container-editorial text-center">
          <h2 className="mb-6 scroll-animate">Ready to Tell Your Story?</h2>
          <p className="text-xl text-grey-300 mb-10 max-w-2xl mx-auto scroll-animate" style={{ animationDelay: '0.2s' }}>
            Let's create something cinematic together. Book your shoot and bring your vision to life.
          </p>
          <div className="scroll-animate" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Link href="/book">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: "Birthday",
    description: "Celebrate life's milestones with vibrant, joyful videos that capture the energy and emotion of your special day.",
  },
  {
    title: "Pre-shoot",
    description: "Romantic cinematic stories that showcase your love and connection before the big day.",
  },
  {
    title: "Traditional",
    description: "Honor heritage and culture with elegant films that preserve your family's traditions.",
  },
  {
    title: "Events",
    description: "From intimate gatherings to grand celebrations, we capture every meaningful moment.",
  },
]
