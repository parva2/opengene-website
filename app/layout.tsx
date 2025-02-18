import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'OpenGene - Fully Built',
  description: 'A Next.js 13 site with a landing page, blog, and Supabase integration',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-blue-700 shadow">
          <Link href="/" className="text-2xl font-bold text-white">
            OpenGene
          </Link>
          <nav className="space-x-6">
            <Link href="/about" className="text-white hover:underline">
              About
            </Link>
            <Link href="/blog" className="text-white hover:underline">
              Blog
            </Link>
            <a
              href="/whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              White Paper
            </a>
          </nav>
          <a
            href="mailto:genieprotocol7@gmail.com"
            className="bg-white text-blue-900 px-4 py-2 rounded hover:bg-gray-100"
          >
            Contact us
            </a>
        </header>

        {/* Main content (pages) */}
        <main>{children}</main>

        {/* Footer (optional) */}
        <footer className="p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} OpenGene. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
