'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

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
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md dark:bg-black/95 border-b border-border transition-colors duration-300">
                <div className="container-editorial">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-end gap-2 hover:opacity-70 transition-opacity z-50">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/Diffindo Logo.png"
                                    alt="Diffindo Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tight font-poppins translate-y-1 text-black dark:text-white">Diffindo.</span>
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
                            onClick={() => setIsOpen(true)}
                            className="md:hidden p-2 hover:opacity-70 transition-opacity z-50 text-black dark:text-white"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 ease-out"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Menu Panel */}
                    <div className="fixed inset-y-0 left-0 w-[80%] max-w-sm shadow-2xl flex flex-col border-r border-border animate-in slide-in-from-left duration-300 ease-out">
                        {/* Header (Logo) */}
                        <div className="p-6 bg-white dark:bg-neutral-900 border-b border-black/10 dark:border-white/10">
                            <div className="flex items-end gap-2">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="/Diffindo Logo.png"
                                        alt="Diffindo Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-xl font-bold tracking-tight font-poppins translate-y-0.5 text-black dark:text-white">Diffindo.</span>
                            </div>
                        </div>

                        {/* Body (Links) */}
                        <div className="flex-1 p-6 bg-zinc-50 dark:bg-black overflow-y-auto">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-lg uppercase tracking-wider hover:opacity-70 transition-opacity text-black dark:text-white ${isActive(link.href) ? 'font-bold' : ''
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
