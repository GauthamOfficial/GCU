import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Cinezham',
    description: 'Privacy Policy for Cinezham website.',
};

export default function PrivacyPolicy() {
    return (
        <section className="container-editorial editorial-spacing">
            <h1 className="mb-12">Privacy Policy</h1>

            <div className="space-y-12 max-w-3xl">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Last updated: February 5, 2026</p>
                    <p className="text-muted-foreground">
                        We respect your privacy and are committed to protecting your personal information.
                        This Privacy Policy explains how information is collected and used when you interact with our website.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Information We Collect</h2>
                    <p className="text-muted-foreground">We may collect limited personal information when you:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Submit a booking or contact form</li>
                        <li>Communicate with us via WhatsApp or email</li>
                    </ul>
                    <p className="text-muted-foreground">This may include:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Your name</li>
                        <li>Contact number</li>
                        <li>Location details</li>
                        <li>Any information you choose to share in messages</li>
                    </ul>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
                    <p className="text-muted-foreground">We use your information only to:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Respond to enquiries</li>
                        <li>Communicate about bookings</li>
                        <li>Provide our services</li>
                    </ul>
                    <p className="text-muted-foreground">
                        We do not sell, rent, or share your personal information with third parties.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Media & External Links</h2>
                    <p className="text-muted-foreground">Our website may display:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Embedded YouTube videos</li>
                        <li>Images hosted on external platforms (e.g., Google Drive)</li>
                    </ul>
                    <p className="text-muted-foreground">
                        These services may collect data according to their own privacy policies.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Data Security</h2>
                    <p className="text-muted-foreground">
                        We take reasonable measures to protect your information.
                        However, no method of online transmission is completely secure.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Your Rights</h2>
                    <p className="text-muted-foreground">You may request:</p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Access to your personal data</li>
                        <li>Correction or deletion of your information</li>
                    </ul>
                    <p className="text-muted-foreground">Please contact us to make such requests.</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have questions about this Privacy Policy, please contact us directly.
                    </p>
                </div>
            </div>
        </section>
    );
}
