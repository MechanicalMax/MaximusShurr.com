import Image from "next/image";
import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import { getSocialProofLogos, getFeaturedCaseStudies } from "@/lib/case-studies";

// Narrative arc chapters
const narrativeChapters : {title: string, story: string, text: string}[] = [
  {
    title: "The Spark",
    story: "It wasn't just a puzzle. It was a realization.",
    text: "At 10 years old, I taught myself to solve a Rubik's Cube. But the thrill wasn't in the plastic or the stickers—it was in the feeling of empowerment. it was proof that I could figure anything out if I tried hard enough. I wanted everyone to feel that sense of agency. I started \"Mechanical Max\" not to show off, but to lift others up and show them that they were capable of more than they thought."
  },
  {
    title: 'The Lesson',
    story: 'I stopped chasing titles and started chasing impact.',
    text: "For years, I was stuck in the \"performance trap.\" I chased grades and elections, thinking external validation was the only path. But when I lost a major election, the system broke for me. It was a wake-up call. I realized that a résumé is not a legacy. True fulfillment comes from service. I stopped looking for permission to lead and started looking for problems to solve."
  },
  {
    title: "The Pivot",
    story: "Fluent in Hardware, Dangerous in Software",
    text: "Most developers fear hardware. Most mechanical engineers fear code. I live in the middle. My background isnt just theory; its getting my hands dirty in R&D labs and writing Python scripts to automate physical machines. Whether its IoT, 3D printing workflows, or Next.js web apps, I understand how to make the digital world talk to the physical one."
  },
  {
    title: "The Mission",
    story: "Velocity with Purpose",
    text: "I am not looking for a \"gig.\" I am looking for partners who want to use technology to create sustainable good. I balance the rigorous physics of engineering with the infinite scalability of software. My goal is simple: To build tools that help people live happier, healthier, more fulfilling lives. Most apps distract us; I build technology that allows us to be more."
  }
];

export default async function Home() {
  // Fetch featured case studies for the featured section
  const featuredCaseStudies = await getFeaturedCaseStudies();
  
  // Fetch social proof logos from case study folders
  const socialProofLogos = await getSocialProofLogos();

  
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-[#FFBA4A]">You Have the Vision<br /></span>
            I build the technology that connects the <em>digital</em> and <em>physical</em> worlds
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            I am Maximus Shurr. I don&apos;t just write code; I engineer realities. As a Mechanical Engineer and Full-Stack Developer, I possess the rare ability to translate physical operations into scalable digital software. You bring the mission. I bring the velocity. Let&apos;s build a platform that doesn&apos;t just work—it transforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              Book Your Free Strategy Session
            </Link>
            <Link 
              href="/case-study"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 border border-gray-200 rounded-full transition duration-200"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider mb-8">
            Trusted by teams at
          </p>

          {/* Outer container that holds scroll area + fixed fades */}
          <div className="relative">
            {/* Scrollable content */}
            <div className="overflow-x-auto scrollbar-hide group">
              <div className="flex animate-scroll-ltr group-hover:[animation-play-state:paused] w-max">
                {[...socialProofLogos, ...socialProofLogos].map((logo, i) => (
                  <div key={i} className="flex-shrink-0 mx-8">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={48}
                      className="h-12 w-auto select-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed gradient fades at edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* Narrative Arc (Responsive Sticky Scroll) */}
      <section className="relative bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center mb-6">Meet Maximus</h2>
          <svg className="w-24 h-24 m-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFBA4A" strokeWidth="2.088"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z" fill=""></path> </g></svg>

          <div className="relative">
            {narrativeChapters.map((section, index) => (
              <div
                key={index}
                className="relative h-[160vh] flex items-center justify-center"
              >
                <div
                  className="sticky top-[12vh] max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 transition-all duration-700 p-6 sm:p-8 flex flex-col text-center"
                  style={{
                    // make sure tall cards auto-expand on smaller screens
                    minHeight: "70vh",
                    maxHeight: "80vh",
                  }}
                >
                  <div className="flex-1 overflow-y-auto px-1 sm:px-2">
                    <h3 className="text-2xl font-bold mb-3">
                      <span className="text-[#FFBA4A] text-4xl font-extrabold mr-2">
                        {index + 1}.
                      </span>
                      {section.title}
                    </h3>
                    <h4 className="text-lg font-medium text-gray-600 mb-5">
                      {section.story}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed text-justify">
                      {section.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
