'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/packages', label: 'Packages' },
        { href: '/book', label: 'Book a Shoot' },
    ]

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container-editorial">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-end gap-2 hover:opacity-70 transition-opacity">
                        <div className="relative w-10 h-10">
                            <Image
                                src="/Diffindo Logo.png"
                                alt="Diffindo Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold tracking-tight font-poppins translate-y-1">Diffindo.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm uppercase tracking-wider hover:opacity-70 transition-opacity ${isActive(link.href) ? 'font-bold' : ''
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 hover:opacity-70 transition-opacity"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-6 border-t border-border">
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg uppercase tracking-wider hover:opacity-70 transition-opacity ${isActive(link.href) ? 'font-bold' : ''
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
