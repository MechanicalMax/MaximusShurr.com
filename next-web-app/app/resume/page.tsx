import { Metadata } from 'next';
import Link from 'next/link';
import BookingCTA from '@/components/BookingCTA';

export const metadata: Metadata = {
    title: 'Resume | Maximus Shurr',
    description: 'View or download the resume of Maximus Shurr, a Technical Co-founder and Full-Stack Developer.',
};

export default function ResumePage() {
    const resumeUrl = '/resume/Maximus Shurr - Resume.pdf';
    const downloadFileName = 'Maximus-Shurr-Resume.pdf';

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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Maximus&apos;s Resume</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-[calc(100vh-250px)]">
                        <iframe
                            src={`${resumeUrl}#view=fitH`}
                            className="w-full h-full border-0"
                            title="Maximus Shurr's Resume"
                        >
                            <p>Your browser does not support iframes. Please download the resume instead.</p>
                        </iframe>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <a href={resumeUrl} download={downloadFileName} className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105">Download Resume</a>
                </div>
                {/* Mobile Notice */}
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md md:hidden">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                For the best experience viewing your resume on mobile, please download the PDF file.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer CTA */}
            <BookingCTA
                title="Wouldn&apos;t you rather reach out directly?"
                description="Get to know me the best with a call or by checking out my socials."
                buttonText="Book your call"
            />
        </div>
    );
}
