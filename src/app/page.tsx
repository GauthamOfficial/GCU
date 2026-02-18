'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight, Facebook, Instagram, Mail } from "lucide-react"
import { Testimonial, PortfolioItem } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import { convertMediaUrl } from '@/lib/utils'

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
    >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
)

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
        <div className="relative z-10 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-6xl mx-auto text-center backdrop-blur-sm sm:backdrop-blur-md bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-10 px-6 sm:py-12 sm:px-8 md:px-16 md:py-16 lg:px-24 shadow-2xl glass-morphism-animate">
          {/* Logo and Brand Name */}
          <div className="flex items-end justify-center gap-2 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
              <Image
                src="/Diffindo Logo.png"
                alt="Diffindo Logo"
                fill
                className="object-contain invert"
              />
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight font-poppins translate-y-1 text-white">Diffindo.</span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Visual Storytelling & Digital Experiences
          </h1>
          <div className="text-sm md:text-base lg:text-lg text-grey-300 mb-8 mx-auto opacity-0 animate-fade-in-up uppercase tracking-wider px-4 space-y-2 md:space-y-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="block md:hidden">
              <div>Promotion Video</div>
              <div>Video Editing</div>
              <div>Web Development</div>
              <div>Graphic Design</div>
            </div>
            <div className="hidden md:block">
              Promotion Video | Video Editing |
              Web Development | Graphic Design
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <a
              href="https://wa.me/94704462999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href="mailto:hello.diffindo@gmail.com"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.facebook.com/share/1875QM56TV/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/diffindo.lk?igsh=NmdlcDcxYms1enZ2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <Button asChild size="lg" className="text-base px-8 py-6 h-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:scale-105 hover:brightness-110 active:scale-100 transition-all duration-300 before:hover:from-white/50 before:hover:via-white/20">
              <Link href="/book">
                Start a Project
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black hover:scale-105 active:scale-100 transition-all duration-300 before:hover:from-white/60 before:hover:via-white/25">
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
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 h-auto bg-transparent border-white text-white hover:bg-white hover:text-black hover:scale-105 active:scale-100 transition-all duration-300 before:hover:from-white/60 before:hover:via-white/25">
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
