import Link from 'next/link'
import { Facebook, Instagram, Mail } from 'lucide-react'
import Image from 'next/image'

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
                                <WhatsAppIcon size={18} />
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
                            className="inline-block px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-white text-black hover:opacity-90 hover:scale-105 hover:brightness-110 active:scale-100 transition-all duration-300 relative overflow-hidden rounded-md before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/40 before:via-white/15 before:to-transparent before:pointer-events-none before:rounded-md after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/10 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-md before:hover:from-white/60 before:hover:via-white/25 shadow-lg shadow-black/20"
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
