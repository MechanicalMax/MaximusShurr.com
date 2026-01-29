import Image from "next/image";
import Link from "next/link";
import BookingCTA from "@/components/CaseStudyCTA";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import { getFeaturedCaseStudies } from "@/lib/case-studies";

export default async function Home() {
  // Fetch featured case studies for the featured section
  const featuredCaseStudies = await getFeaturedCaseStudies();
  
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-20 md:py-28">
        {/* Text Content */}
        <div className="max-w-2xl md:max-w-3xl text-center md:text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-[#FFBA4A] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            Full-Stack Mechanical Engineer & Product Strategist.
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-gray-600 mb-10">
            I bridge the gap between complex mechanical design and business impact. 
            From 'Zero-to-One' prototyping to corporate R&D automation, I build systems that work.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/case-study"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              View Selected Works
            </Link>
            <Link 
              href="/contact"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 border border-gray-200 rounded-full transition duration-200"
            >
              Check Résumé
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-10 md:mb-0 md:ml-10">
          <Image 
            src="/icon.jpg" 
            alt="Maximus Shurr Headshot" 
            width={500} 
            height={500} 
            className="w-48 sm:w-64 md:w-80 lg:w-[500px] h-auto rounded-full object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Portfolio Navigation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            How to navigate this portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Technical Depth & Complex Assembly?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See <Link href="/case-study/botimus" className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline">BOTIMUS</Link>.
                A full design review of a complex robotic system, showcasing my ability to manage constraints, electronics, and mechanical integration.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Business-Aware R&D?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See <Link href="/case-study/corteva-automation-engineer" className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline">Corteva R&D</Link> and <Link href="/case-study/leafspec-llc" className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline">LeafSpec LLC</Link>.
                Examples of how I apply engineering principles to solve business problems—automating workflows, reducing costs, and navigating corporate structures.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Need Precision & Regulation Awareness?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                See <Link href="/case-study/hughes-orthodontics-automation" className="text-[#FFBA4A] hover:text-[#FFA726] font-semibold underline">Automating Hughes Orthodontics</Link>.
                High-stakes medical device manufacturing workflow automation where safety and throughput constraints were paramount.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <div id="case-studies" className="bg-gradient-to-br from-gray-50 to-gray-100">
        <FeaturedCaseStudies caseStudies={featuredCaseStudies} />
        
        {/* View Case Studies Button */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/case-study"
              className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 border border-gray-200 rounded-full transition duration-200 hover:shadow-lg"
            >
              <span className="mr-2">View All Case Studies</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <BookingCTA />
    </div>
  );
}
