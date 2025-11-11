import Image from "next/image";
import Link from "next/link";

// Social proof logos (replace with your actual logo paths)
const socialProofLogos = [
  { name: 'Corteva', src: '/logos/Corteva.png' },
  { name: 'Purdue', src: '/logos/Purdue.png' },
  { name: 'Hughes Orthodontics LLC', src: '/logos/HughesOrthodontics.png' },
  { name: 'LeafSpec LLC', src: '/logos/LeafSpecLLC.png' },
  { name: 'The Sibley Center Makerspace', src: '/logos/Sibley.png' },
  { name: 'Envision Center', src: '/logos/EnvisionCenter.png' },
  { name: "Henni's Hairshop", src: '/logos/HennisHairshop.png' },
];

// Narrative arc chapters
const narrativeChapters : {title: string, story: string, text: string}[] = [
  {
    title: "The Spark",
    story: "Recording Mechanical Max",
    text: "It started with an unsolved Rubik's Cube. At 10 years old, I taught myself how to solve it from YouTube. I wanted to share that feeling of empowerment, so I started Mechanical Max. However, the more focused I was on creating and sharing on my own path, the more I became isolated and different from the culture of hyper-competition, grades, and status at school."
  },
  {
    title: 'The "Right" Path',
    story: 'Chasing Grades and Status',
    text: "Through middle and high school, that peer pressure only grew stronger. For years, I had tried to follow the \"right\" path. I put my head down, chased the 100%, and ran for the student leadership, all because my community said that's what success was. I was trying to win a game I didn't even want to play, to get into an Ivy League school I knew nothing about. Growing up was a cycle of chasing grades, burning out, building a project, then feeling alone."
  },
  {
    title: "The Pivot",
    story: "Turning Pain into Growth",
    text: "But eventually, this system broke. In my junior year, I lost two major elections, not on merit, but on politics. My \"one chance at a happy life\" Ivy League worldview was shattered. And it was the best thing that ever happened to me. I felt a new fire and freedom behind my sails. The system locked me out, so I carved a new path. I pivoted to the real world, noticing my orthodontist workflow was broken. I taught myself Python and automation, and built an in-house 3D printing lab, saving his practice over $10,000 a year. It was my first taste of genuine one-on-one service with an impact that would last well beyond any high school ribbon."
  },
  {
    title: "The Mission",
    story: "Building What Matters",
    text: "I brought that lesson to Purdue, where I mastered both physical and software engineering. I still have the honors GPA, but I see it as a footnote. My real education came from all the projects I did outside of class. And through building my first full-stack web app, \"Clairity Daily,\" I learned the only metric that truly matters is how well you serve others. My mission is to build products that help people become more resilient and find their own path, just like I had to. I'm here to create experiences that show people how to live happier, healthier, and more fulfilling lives."
  }
];

// Project tiles
const projects = [
  {
    title: "AgriTech Platform",
    description: "A comprehensive farm management system for precision agriculture.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"]
  },
  {
    title: "Supply Chain Dashboard",
    description: "Real-time tracking and analytics for logistics operations.",
    tags: ["React", "D3.js", "Express", "MongoDB"]
  },
  {
    title: "IoT Device Management",
    description: "Centralized platform for managing IoT devices and data streams.",
    tags: ["AWS IoT", "Python", "GraphQL", "Docker"]
  },
  {
    title: "E-commerce Analytics",
    description: "Custom analytics dashboard for e-commerce performance metrics.",
    tags: ["Next.js", "Tailwind", "Stripe", "BigQuery"]
  },
  {
    title: "Mobile Health App",
    description: "Patient monitoring and health data visualization.",
    tags: ["React Native", "TypeScript", "Firebase"]
  },
  {
    title: "Financial Planning Tool",
    description: "Automated financial planning and investment tracking.",
    tags: ["React", "Node.js", "Plaid API", "PostgreSQL"]
  },
  {
    title: "EdTech Platform",
    description: "Interactive learning management system with real-time collaboration.",
    tags: ["Next.js", "WebSockets", "MongoDB", "Docker"]
  },
  {
    title: "AI Content Generator",
    description: "AI-powered content creation and optimization tool.",
    tags: ["Python", "OpenAI API", "FastAPI", "React"]
  },
  {
    title: "Real Estate Analytics",
    description: "Market analysis and property valuation platform.",
    tags: ["React", "Mapbox", "Node.js", "PostgreSQL"]
  },
  {
    title: "Fitness Tracker",
    description: "Custom workout and nutrition tracking application.",
    tags: ["React Native", "GraphQL", "MongoDB"]
  },
  {
    title: "Blockchain Explorer",
    description: "Visualization and analytics for blockchain transactions.",
    tags: ["Ethereum", "Web3.js", "Node.js", "React"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Give me a messy problem. <br />
            <span className="text-[#FFBA4A]">I&apos;ll hand you a deployed solution.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            I&apos;m Maximus Shurr, a Technical Co-founder who helps startups turn ideas into production-ready applications at startup speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book"
              className="bg-[#FFBA4A] hover:bg-[#FFA726] text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
            >
              Book a Free Consultation
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wider mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            {socialProofLogos.map((logo) => (
              <Image key={logo.name} src={logo.src} alt={logo.name} width={120} height={48} className="h-12 w-auto" />
            ))}
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

      {/* Work Portfolio */}
      <section id="work" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Selected Work</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            I&apos;ve helped build and ship products across various industries, from agtech to fintech and beyond.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link 
                href="/book" 
                key={index}
                className="block group"
              >
                <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#FFBA4A] hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-300 text-4xl font-bold">Project {index + 1}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-[#FFBA4A] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
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
      <section className="py-20 bg-[#FFBA4A] text-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to build something amazing?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Let&apos;s spend 30 minutes defining your MVP&apos;s roadmap, for free.
          </p>
          <Link 
            href="/book"
            className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
