import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Diffindo',
    description: 'Terms of Service for Diffindo website.',
};

export default function TermsOfService() {
    return (
        <section className="container-editorial editorial-spacing">
            <h1 className="mb-12">Terms of Service</h1>

            <div className="space-y-12 max-w-3xl">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Last updated: February 5, 2026</p>
                    <p className="text-muted-foreground">
                        By using this website, you agree to the following terms.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Use of Website</h2>
                    <p className="text-muted-foreground">
                        This website is provided for informational and booking purposes only.
                        You agree not to misuse or interfere with the website or its content.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Bookings & Communication</h2>
                    <p className="text-muted-foreground">
                        Submitting a booking request does not guarantee availability.
                        All bookings are confirmed only after direct communication and agreement.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Content Ownership</h2>
                    <p className="text-muted-foreground">
                        All videos, images, and creative content displayed on this website are the intellectual property of the studio unless stated otherwise.
                    </p>
                    <p className="text-muted-foreground">
                        You may not copy, reproduce, or distribute content without permission.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">External Platforms</h2>
                    <p className="text-muted-foreground">
                        Our work may be hosted or embedded using third-party platforms such as YouTube or Google Drive.
                        We are not responsible for the availability or policies of these platforms.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                        We are not liable for any indirect or consequential damages arising from the use of this website.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Changes to Terms</h2>
                    <p className="text-muted-foreground">
                        These terms may be updated from time to time.
                        Continued use of the website indicates acceptance of the updated terms.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have any questions regarding these terms, please contact us.
                    </p>
                </div>
            </div>
        </section>
    );
}
