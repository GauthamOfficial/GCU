import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="border-t border-grey-800 bg-black">
            <div className="container-editorial py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-end gap-2 mb-4">
                            <div className="relative w-10 h-10 invert">
                                <Image
                                    src="/Diffindo Logo.png"
                                    alt="Diffindo Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold font-poppins translate-y-1 text-white">Diffindo.</h3>
                        </div>
                        <p className="text-white/60 mb-6">
                            A creative studio focused on shaping ideas into visual and digital experiences through film, design, and development.
                        </p>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider font-semibold mb-4 text-white/80">Services</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/services" className="text-white/60 hover:text-white transition-colors">
                                Video Production
                            </Link>
                            <Link href="/services" className="text-white/60 hover:text-white transition-colors">
                                Video Editing
                            </Link>
                            <Link href="/services" className="text-white/60 hover:text-white transition-colors">
                                Web Development
                            </Link>
                            <Link href="/services" className="text-white/60 hover:text-white transition-colors">
                                Graphic Design
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider font-semibold mb-4 text-white/80">Get in Touch</h4>
                        <div className="flex flex-col gap-3 text-white/60 mb-6">
                            <a
                                href="https://wa.me/94704462999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Phone size={18} className="shrink-0" />
                                <span>+94 70 446 2999</span>
                            </a>
                            <a
                                href="mailto:hello.diffindo@gmail.com"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Mail size={18} className="shrink-0" />
                                <span>hello.diffindo@gmail.com</span>
                            </a>
                            <a
                                href="https://www.facebook.com/share/1875QM56TV/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Facebook size={18} className="shrink-0" />
                                <span>Diffindo</span>
                            </a>
                            <a
                                href="https://www.instagram.com/diffindo.lk?igsh=NmdlcDcxYms1enZ2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <Instagram size={18} className="shrink-0" />
                                <span>Diffindo.lk</span>
                            </a>
                        </div>
                        <Link
                            href="/book"
                            className="inline-block px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-white text-black hover:opacity-90 transition-opacity"
                        >
                            Start a Project
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-grey-800 flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4">
                    <p>&copy; {new Date().getFullYear()} Diffindo. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="text-white/50 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="text-white/50 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
