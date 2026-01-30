import { Metadata } from 'next';
import Link from 'next/link';
import BookingInlineEmbed from '@/components/BookingInlineEmbed';

export const metadata: Metadata = {
  title: 'Contact | Maximus Shurr',
  description: 'The fastest way to reach Maximus Shurr',
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Let&apos;s get to Work</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I am currently finishing my Honors Mechanical Engineering degree at Purdue University and am available for full-time roles starting July 2026.
          </p>
        </div>
      </header>

      <main className="text-gray-700 py-12 sm:px-12">
        <h2 className="text-2xl font-bold mb-6">Resume Line Items</h2>
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Metric</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Education</td>
                <td className="border border-gray-300 px-4 py-3">B.S. Mechanical Engineering (Honors), Purdue University</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Graduation</td>
                <td className="border border-gray-300 px-4 py-3">May 14, 2026</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Availability</td>
                <td className="border border-gray-300 px-4 py-3">July 2026 (Relocation Ready)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Certification</td>
                <td className="border border-gray-300 px-4 py-3">F.E. Exam Scheduled (Mechanical) – Feb 2, 2026</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium">Location</td>
                <td className="border border-gray-300 px-4 py-3">Currently West Lafayette, IN (Ready to explore other U.S. States!)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium">Status</td>
                <td className="border border-gray-300 px-4 py-3">U.S. Citizen</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold mb-6">Contact Methods</h2>

        <div className="space-y-4 mb-8">
          <p>
            Connect with me on <Link target="_blank" href="https://www.linkedin.com/m/in/maxshurr/" className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline">
              LinkedIn
            </Link> or <Link 
              href="mailto:maxshurr@gmail.com?subject=Resume Request - [Company Name]&body=Hi Maximus, I'd like to review your full resume for a potential role at..."
              className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline"
            >
              Request a Resume
            </Link>
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">Schedule a Meeting</h2>
        <BookingInlineEmbed hideEventTypeDetails={false} />
      </main>
    </div>
  );
}
