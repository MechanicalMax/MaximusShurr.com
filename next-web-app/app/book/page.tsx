import { Metadata } from 'next';
import Link from 'next/link';
import BookingInlineEmbed from '@/components/BookingInlineEmbed';

export const metadata: Metadata = {
  title: 'Book Your Free Strategy Session | Maximus Shurr',
  description: 'You understand your industry. I understand the engineering required to scale it. Whether you need to automate a physical workflow or deploy a digital platform, I provide the blueprint.',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Don&apos;t Let Technical Hurdles Bottleneck Your Impact.</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            You understand your industry. I understand the engineering required to scale it. Whether you need to automate a physical workflow or deploy a digital platform, I provide the blueprint.
            Let&apos;s spend 30 minutes mapping out how we can turn your vision into a deployed reality.
          </p>
        </div>
      </header>

      <main className="py-12 sm:px-12">
        <BookingInlineEmbed />
      </main>
    </div>
  );
}
