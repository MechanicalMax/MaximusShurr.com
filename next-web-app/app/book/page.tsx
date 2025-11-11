import { Metadata } from 'next';
import Link from 'next/link';
import BookingInlineEmbed from '@/components/bookingInlineEmbed';

export const metadata: Metadata = {
  title: 'Book Your Free Strategy Session | Maximus Shurr',
  description: 'Schedule a 30-minute free strategy session to plan meaningful steps toward bringing your ideas to life.',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ready to build?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop burning runway. Let&apos;s spend 30 minutes defining your MVP&apos;s core features, tech stack, and roadmap.
            You&apos;ll walk away with an actionable plan, for free.
          </p>
        </div>
      </header>

      <main className="py-12 sm:px-12">
        <BookingInlineEmbed />
      </main>
    </div>
  );
}
