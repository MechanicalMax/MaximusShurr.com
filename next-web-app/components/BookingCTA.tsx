import Link from 'next/link';

interface BookingCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
}

export default function BookingCTA({
  title = "Ready to build?",
  description = "Stop burning runway. Let's spend 30 minutes defining your MVP's core features, tech stack, and roadmap. You'll walk away with an actionable plan, for free.",
  buttonText = "Book Your Free Strategy Session",
  className = "",
}: BookingCTAProps) {
  return (
    <section className={`py-20 bg-[#FFBA4A] text-gray-900 ${className}`}>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
          {description}
        </p>
        <Link 
          href="/book"
          className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
