'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Testimonial, PortfolioItem } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { convertMediaUrl } from '@/lib/utils'

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [featuredWorks, setFeaturedWorks] = useState<PortfolioItem[]>([])
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
  }, [testimonials, featuredWorks])

  useEffect(() => {
    // Fetch featured works
    async function fetchFeaturedWorks() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('display_order', { ascending: true })
          .limit(3)

        if (!error && data) {
          setFeaturedWorks(data)
        }
      } catch (error) {
        console.error('Error fetching featured works:', error)
      }
    }
    fetchFeaturedWorks()
  }, [])

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        {/* White Texture Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0),
              radial-gradient(circle at 3px 3px, rgba(255,255,255,0.3) 1px, transparent 0),
              linear-gradient(0deg, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 40px 40px, 30px 30px, 30px 30px',
            backgroundPosition: '0 0, 10px 10px, 0 0, 0 0'
          }}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Glass Morphism Content Container */}
        <div className="relative z-10 w-[calc(100%-2rem)] max-w-6xl mx-auto text-center backdrop-blur-sm sm:backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-8 px-6 sm:py-12 sm:px-8 md:px-16 md:py-16 lg:px-24 shadow-2xl glass-morphism-animate">
          <h1 className="mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Creative Studio For 
            <br />Visual & Digital Experiences
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-grey-300 mb-12 mx-auto opacity-0 animate-fade-in-up uppercase tracking-wider px-4" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Cinematic Video Production | Professional Video Editing
            <br />
            Web Development | Graphic Design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Button asChild size="lg" className="text-base px-8 py-6 h-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300">
              <Link href="/book">
                Start a Project
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Link href="/portfolio">
                View Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="editorial-spacing">
        <div className="container-editorial">
          <h2 className="mb-20 text-center scroll-animate">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black group-hover:text-black transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base lg:text-lg text-grey-600 mb-6 leading-relaxed min-h-[3rem]">
                    {service.description}
                  </p>
                  <div className="pt-6 border-t border-grey-100">
                    <ul className="flex flex-wrap gap-x-3 gap-y-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="text-xs lg:text-sm text-black uppercase tracking-widest font-medium">
                          {item}
                          {idx < service.items.length - 1 && <span className="mx-3 text-grey-400">•</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            {featuredWorks.length > 0 ? (
              featuredWorks.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/portfolio?id=${item.id}`}
                  className="group cursor-pointer scroll-animate block"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-grey-200 mb-3 overflow-hidden rounded-md border border-grey-200 hover:border-grey-300 transition-colors">
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-black mb-1">{item.title}</h3>
                      <p className="text-sm uppercase tracking-wider text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                <p>Loading featured work...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative editorial-spacing bg-black text-white overflow-hidden">
        {/* White Texture Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0),
              radial-gradient(circle at 3px 3px, rgba(255,255,255,0.3) 1px, transparent 0),
              linear-gradient(0deg, rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px, 40px 40px, 30px 30px, 30px 30px',
            backgroundPosition: '0 0, 10px 10px, 0 0, 0 0'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="container-editorial text-center relative z-10">
          <h2 className="mb-6 scroll-animate">Ready to Start Your Project?</h2>
          <p className="text-xl text-grey-300 mb-10 max-w-2xl mx-auto scroll-animate" style={{ animationDelay: '0.2s' }}>
            Let's bring your vision to life. From video production to web development and design, we're here to help.
          </p>
          <div className="scroll-animate" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Link href="/book">
                Start a Project
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section >

      {/* Testimonials Section */}
      {
        testimonials.length > 0 && (
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
        )
      }
    </div >
  )
}

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
