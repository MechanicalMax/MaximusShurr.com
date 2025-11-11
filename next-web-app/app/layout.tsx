import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maximus Shurr",
  description: "Maximus Shurr turns ideas into production-ready applications that help people live happier, healthier, and more fulfilling lives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <nav className="bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-white font-bold text-2xl mr-4">Maximus Shurr</div>
            <div className="flex flex-wrap gap-4 justify-end">
              <Link href="/" className="text-white hover:text-gray-300">Home</Link>
              <Link href="/book" className="text-white hover:text-gray-300">Book</Link>
              <Link href="/resume" className="text-white hover:text-gray-300">Resume</Link>
              <Link target="_blank" href="https://www.linkedin.com/m/in/maxshurr/" className="text-white hover:text-gray-300">LinkedIn</Link>
              <Link target="_blank" href="https://github.com/MechanicalMax" className="text-white hover:text-gray-300">GitHub</Link>
              <Link target="_blank" href="https://youtube.com/c/mechanicalmax" className="text-white hover:text-gray-300">YouTube</Link>
            </div>
          </div>
        </div>
      </nav>
    </html>
  );
}
