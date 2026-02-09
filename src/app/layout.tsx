import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diffindo",
  description: "Premium cinematic storytelling for birthdays, pre-shoots, traditional shoots, and personal events in Sri Lanka. Book your shoot today.",
  keywords: ["cinematic reels", "short films", "birthday videos", "pre-wedding shoots", "Sri Lanka videography", "Diffindo"],
  authors: [{ name: "Diffindo" }],
  openGraph: {
    title: "Diffindo",
    description: "Premium cinematic storytelling for your most memorable moments in Sri Lanka.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

