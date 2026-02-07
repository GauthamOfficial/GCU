import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container-editorial py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-end gap-2 mb-4">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/Diffindo Logo.png"
                                    alt="Diffindo Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold font-poppins translate-y-1">Diffindo.</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Cinematic storytelling for your most memorable moments.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider font-semibold mb-4">Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
                                Portfolio
                            </Link>
                            <Link href="/packages" className="text-muted-foreground hover:text-foreground transition-colors">
                                Packages
                            </Link>
                            <Link href="/book" className="text-muted-foreground hover:text-foreground transition-colors">
                                Book a Shoot
                            </Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm uppercase tracking-wider font-semibold mb-4">Get in Touch</h4>
                        <div className="flex flex-col gap-3 text-muted-foreground">
                            <a
                                href="https://wa.me/94704462999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Phone size={18} />
                                <span>+94 70 446 2999</span>
                            </a>
                            <a
                                href="mailto:hello.diffindo@gmail.com"
                                className="hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Mail size={18} />
                                <span>hello.diffindo@gmail.com</span>
                            </a>
                            <a
                                href="https://www.facebook.com/share/1875QM56TV/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Facebook size={18} />
                                <span>Diffindo</span>
                            </a>
                            <a
                                href="https://www.instagram.com/diffindo.lk?igsh=NmdlcDcxYms1enZ2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors flex items-center gap-2"
                            >
                                <Instagram size={18} />
                                <span>Diffindo.lk</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
                    <p>&copy; {new Date().getFullYear()} Diffindo. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service" className="hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
