import Link from 'next/link';

interface BookingCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  link?: string;
  className?: string;
}

export default function BookingCTA({
  title = "Don't Let Technical Hurdles Bottleneck Your Impact.",
  description = "You understand your industry. I understand the engineering required to scale it. Whether you need to automate a physical workflow or deploy a digital platform, I provide the blueprint.\nLet's spend 30 minutes mapping out how we can turn your vision into a deployed reality.",
  buttonText = "Book Your Free Strategy Session",
  link = "/contact",
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
          href={link}
          className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
