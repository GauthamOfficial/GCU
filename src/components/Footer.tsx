import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="container-editorial py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Diffindo</h3>
                        <p className="text-muted-foreground">
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
                                href="https://wa.me/94XXXXXXXXX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                WhatsApp: +94 75 981 9250
                            </a>
                            <a
                                href="mailto:hello@studiogcu.lk"
                                className="hover:text-foreground transition-colors"
                            >
                                hello@studiogcu.lk
                            </a>
                            <p>Colombo, Sri Lanka</p>
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
