import { Metadata } from 'next';
import Link from 'next/link';
import BookingInlineEmbed from '@/components/bookingInlineEmbed';

export const metadata: Metadata = {
  title: 'Book a Free Consultation | Maximus Shurr',
  description: 'Schedule a 30-minute free consultation to discuss your project and how we can work together to bring your ideas to life.',
};

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/" 
            className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Let&apos;s Build Something Amazing</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule a free 30-minute consultation to discuss your project and how we can work together to bring your ideas to life.
          </p>
        </div>
      </header>

      <main className="py-12 sm:px-12">
        <BookingInlineEmbed />
      </main>
    </div>
  );
}
