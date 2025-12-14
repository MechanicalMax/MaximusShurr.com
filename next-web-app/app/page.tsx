import Image from "next/image";
import Link from "next/link";
import BookingCTA from "@/components/BookingCTA";
import { getCaseStudiesForHomepage, getSocialProofLogos } from "@/lib/case-studies";

// Narrative arc chapters
const narrativeChapters : {title: string, story: string, text: string}[] = [
  {
    title: "The Spark",
    story: "It wasn't just a puzzle. It was a realization.",
    text: "At 10 years old, I taught myself to solve a Rubik's Cube. But the thrill wasn't in the plastic or the stickers—it was in the feeling of empowerment. it was proof that I could figure anything out if I tried hard enough. I wanted everyone to feel that sense of agency. I started \"Mechanical Max\" not to show off, but to lift others up and show them that they were capable of more than they thought."
  },
  {
    title: 'The "Right" Path',
    story: 'I know what it\'s like to chase the wrong metrics.',
    text: "For years, I was stuck in the \"performance trap.\" I chased grades, status, and leadership titles because I thought external validation was the only path to success. I was running a race I didn't want to enter, burning myself out to impress admissions officers at universities I knew nothing about. I understand the pain of living for a résumé instead of a purpose."
  },
  {
    title: "The Pivot",
    story: "Turning Pain into Growth",
    text: "In high school, I lost a humiliating election. At the time, it felt like my future had shattered. In reality, it was the moment I became free. I stopped looking for permission and started looking for service. I pivoted to the real world, finding a local orthodontist with a broken workflow. I didn't just save him $10k in ARR and build him a 3D printing lab; I gave him back his time. That was my wake-up call: true fulfillment comes from how deeply you serve, not a shiny award."
  },
  {
    title: "The Mission",
    story: "Building What Matters",
    text: "At Purdue, I refined my technical toolkit, balancing rigorous mechanical engineering coursework with practical software development. Whether I'm designing physical products or deploying full-stack web apps, my goal is unchanged: to build tools that help people live happier, healthier, more fulfilling lives. I am not looking for a \"gig.\" I am looking for partners who want to use technology to amplify wisdom and create genuine human transformation. Most apps distract us; I build apps that center us."
  }
];

export default async function Home() {
  // Fetch case studies with auto-discovered thumbnails and icons
  const allCaseStudies = await getCaseStudiesForHomepage();
  
  // Fetch social proof logos from case study folders
  const socialProofLogos = await getSocialProofLogos();
  
  // Sort case studies by end date (most recent first)
  // Parse dates in format "MMM YYYY" (e.g., "Jul 2025")
  const caseStudies = allCaseStudies.sort((a, b) => {
    const parseDate = (dateStr: string | null): Date => {
      if (!dateStr) {
        // Treat null/ongoing projects as current date (they appear first)
        return new Date();
      }
      // Parse "MMM YYYY" format
      return new Date(dateStr);
    };
    
    const dateA = parseDate(a.frontmatter.end_date);
    const dateB = parseDate(b.frontmatter.end_date);
    
    // Sort descending (most recent first)
    return dateB.getTime() - dateA.getTime();
  });
  
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-[#FFBA4A]">You Change Lives<br /></span>
            I build the technology that scales your impact
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            I am Maximus Shurr. I don&apos;t just write code; I translate vision into reality. As an engineer who moved from hardware to software, I bring a rare combination of velocity and purpose to every project. You have the methodology and the message. I have the technical blueprint to get it into the hands of the people who need it most. Let&apos;s build a platform worthy of your mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              Book Your Free Strategy Session
            </Link>
            <Link 
              href="#work"
              className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-8 border border-gray-200 rounded-full transition duration-200"
            >
              View My Work
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

      {/* Case Study Cards */}
      <section id="work" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Selected Portfolio</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            I&apos;ve helped build and ship products across various industries, from agtech to edtech and beyond.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link 
                href={`/work/${caseStudy.slug}`}
                key={caseStudy.slug}
                className="block group"
              >
                <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#FFBA4A] hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {caseStudy.thumbnailPath ? (
                      <Image
                        src={caseStudy.thumbnailPath}
                        alt={caseStudy.frontmatter.project_title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm">No thumbnail available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#FFBA4A] transition-colors">
                      {caseStudy.frontmatter.project_title}
                    </h3>
                    <p className="text-gray-600 mb-4">{caseStudy.frontmatter.one_liner}</p>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.frontmatter.tech_stack.map((tech) => (
                        <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <BookingCTA />
    </div>
  );
}
