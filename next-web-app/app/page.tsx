import Image from "next/image";
import Link from "next/link";

// Social proof logos (replace with your actual logo paths)
const socialProofLogos = [
  { name: 'Corteva', src: '/logos/corteva.svg' },
  { name: 'Purdue', src: '/logos/purdue.svg' },
  { name: '16Tech', src: '/logos/16tech.svg' },
  { name: 'Purdue Foundry', src: '/logos/purdue-foundry.svg' },
];

// Narrative arc sections
const narrativeSections = [
  {
    title: "Mechanical Engineer",
    description: "Started as a problem-solver in mechanical engineering, developing a strong foundation in analytical thinking and technical problem-solving."
  },
  {
    title: "Full-Stack Developer",
    description: "Transitioned into software development, mastering modern web technologies and full-stack architecture."
  },
  {
    title: "Technical Leader",
    description: "Led technical teams and projects, bridging the gap between business needs and technical implementation."
  },
  {
    title: "Technical Co-founder",
    description: "Now helping startups build and scale their MVPs with a focus on clean, maintainable, and scalable code."
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
            <span className="text-blue-600">I'll hand you a deployed solution.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            I'm Maximus Shurr, a Technical Co-founder who helps startups turn ideas into production-ready applications at startup speed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
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
              <div key={logo.name} className="h-12 w-auto grayscale opacity-70 hover:opacity-100 transition-opacity">
                <div className="h-full w-32 bg-gray-200 rounded"></div>
                {/* Replace with actual Image component when you have the logos */}
                {/* <Image src={logo.src} alt={logo.name} width={120} height={48} className="h-12 w-auto" /> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Arc */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">My Journey to Technical Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {narrativeSections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl font-bold text-blue-600 mb-3">0{index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
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
            I've helped build and ship products across various industries, from agtech to fintech and beyond.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link 
                href="/book" 
                key={index}
                className="block group"
              >
                <div className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-gray-300 text-4xl font-bold">Project {index + 1}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Ready to build something amazing?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Let's spend 30 minutes defining your MVP's roadmap, for free.
          </p>
          <Link 
            href="/book"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition duration-200 transform hover:scale-105"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
