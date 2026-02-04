'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Testimonial } from '@/lib/types'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const container = document.getElementById('testimonials-scroll')
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

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
  }, [testimonials])

  useEffect(() => {
    // Fetch testimonials
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials')
        if (response.ok) {
          const data = await response.json()
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    const container = document.getElementById('testimonials-scroll')
    if (container) {
      container.addEventListener('scroll', checkScroll)
      checkScroll() // Initial check
      window.addEventListener('resize', checkScroll)
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [testimonials])

  return (
    <div className="min-h-screen bg-white">
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
              Specializing in cinematic videos, pre-shoots, traditional events, music videos, travel highlights, wedding highlights, and promotion videos that capture your story.
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
                <div className="aspect-video bg-grey-100 mb-4 overflow-hidden rounded-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="editorial-spacing bg-white">
          <div className="container-editorial">
            <h2 className="mb-16 text-center text-black opacity-100 scroll-animate">What Our Clients Say</h2>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Arrows */}
              {testimonials.length > 3 && (
                <>
                  {canScrollLeft && (
                    <button
                      onClick={() => {
                        const container = document.getElementById('testimonials-scroll')
                        if (container) {
                          container.scrollBy({ left: -400, behavior: 'smooth' })
                        }
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-black text-white flex opacity-50 md:opacity-100 items-center justify-center hover:bg-grey-800 transition-colors cursor-pointer border-2 border-black z-10"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  {canScrollRight && (
                    <button
                      onClick={() => {
                        const container = document.getElementById('testimonials-scroll')
                        if (container) {
                          container.scrollBy({ left: 400, behavior: 'smooth' })
                        }
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-black text-white flex opacity-50 md:opacity-100 items-center justify-center hover:bg-grey-800 transition-colors cursor-pointer border-2 border-black z-10"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}
                </>
              )}

              {/* Scrollable Testimonials */}
              <div
                id="testimonials-scroll"
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 w-[350px] border-2 border-grey-200 rounded-lg p-6 bg-white shadow-sm opacity-100 scroll-animate"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col items-center text-center h-full">
                      {testimonial.image_url && (
                        <div className="w-20 h-20 rounded-full overflow-hidden border border-grey-200 mb-4 bg-grey-100 shadow-sm">
                          <img
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      )}
                      <p className="text-grey-600 mb-4 leading-relaxed text-sm flex-grow">
                        "{testimonial.message}"
                      </p>
                      <div>
                        <p className="font-semibold text-black">{testimonial.name}</p>
                        {testimonial.role && (
                          <p className="text-xs text-grey-500 mt-1">{testimonial.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hide scrollbar */}
              <style jsx>{`
                #testimonials-scroll::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

const services = [
  {
    title: "Pre-shoot",
    description: "Romantic cinematic stories that showcase your love and connection in stunning locations before the big day.",
    image: "/Categories/Pre shoot.jpg",
  },
  {
    title: "Music Video",
    description: "Creative visual storytelling that brings your music to life with professional direction, editing, and color grading.",
    image: "/Categories/Music Video.jpg",
  },
  {
    title: "Birthday",
    description: "Celebrate life's milestones with vibrant, joyful videos that capture the energy and emotion of your special day.",
    image: "/Categories/Birthday.jpg",
  },
  {
    title: "Traditional",
    description: "Honor heritage and culture with elegant films that respectfully preserve your family's most sacred traditions.",
    image: "/Categories/Traditional.jpg",
  },
  {
    title: "Wedding Highlights",
    description: "Relive the magic of your wedding day with a cinematic highlight reel capturing the vows, emotions, and celebration.",
    image: "/Categories/Wedding Highlights.jpg",
  },
  {
    title: "Travel Highlights",
    description: "Capture the essence of your journey with breathtaking travel films that document the landscapes, culture, and adventure.",
    image: "/Categories/Travel Highlights.jpg",
  },
  {
    title: "Promotion Videos",
    description: "High-impact commercial videos designed to elevate your brand, showcase products, and engage your audience.",
    image: "/Categories/Promotion Video.jpg",
  },
  {
    title: "Events",
    description: "From intimate corporate gatherings to grand galas, we capture every significant moment with professional coverage.",
    image: "/Categories/events.jpg",
  },
]
