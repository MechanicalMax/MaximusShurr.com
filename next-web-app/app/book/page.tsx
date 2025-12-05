import { Metadata } from 'next';
import Link from 'next/link';
import BookingInlineEmbed from '@/components/BookingInlineEmbed';

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Message Deserves a Modern Platform</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don&apos;t let technical hurdles bottleneck your impact. You provide the vision; I&apos;ll provide the velocity.
            Let&apos;s spend 30 minutes mapping out how we can turn your curriculum into a scalable digital product.
          </p>
        </div>
      </header>

      <main className="py-12 sm:px-12">
        <BookingInlineEmbed />
      </main>
    </div>
  );
}
