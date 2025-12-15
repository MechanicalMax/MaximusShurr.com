import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/types';

interface Props {
  caseStudies: CaseStudy[];
}

export default function FeaturedCaseStudies({ caseStudies }: Props) {
  if (caseStudies.length === 0) {
    return null;
  }

  // Sort featured case studies by duration (longest projects first)
  const sortedCaseStudies = [...caseStudies].sort((a, b) => {
    const parseDate = (dateStr: string | null): Date => {
      if (!dateStr) {
        // Treat null/ongoing projects as current date
        return new Date();
      }
      // Parse "MMM YYYY" format
      return new Date(dateStr);
    };
    
    const calculateDuration = (startDate: string, endDate: string | null): number => {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      
      // Return duration in milliseconds
      return end.getTime() - start.getTime();
    };
    
    const durationA = calculateDuration(a.frontmatter.start_date, a.frontmatter.end_date);
    const durationB = calculateDuration(b.frontmatter.start_date, b.frontmatter.end_date);
    
    // Sort descending (longest duration first)
    return durationB - durationA;
  });

  // Generate thumbnail path for case study
  const getThumbnailPath = (slug: string): string => {
    return `/case-study/${slug}/thumbnail.webp`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Highlighting some of my most impactful projects that showcase innovation, 
            technical excellence, and real-world problem solving.
          </p>
        </div>

        {/* Featured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedCaseStudies.map((caseStudy, index) => {
            // First featured item gets special treatment on larger screens
            const isHero = index === 0 && caseStudies.length > 1;
            
            return (
              <Link 
                href={`/case-study/${caseStudy.slug}`}
                key={caseStudy.slug}
                className={`
                  block group relative
                  ${isHero ? 'lg:col-span-2 xl:col-span-2' : ''}
                `}
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#FFBA4A]">
                  {/* Thumbnail */}
                  <div className={`
                    relative overflow-hidden bg-gray-100
                    ${isHero ? 'h-64 md:h-80' : 'h-48 md:h-56'}
                  `}>
                    <Image
                      src={getThumbnailPath(caseStudy.slug)}
                      alt={caseStudy.frontmatter.project_title}
                      width={800}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#FFBA4A] text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        FEATURED
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`p-6 ${isHero ? 'md:p-8' : ''}`}>
                    <h3 className={`
                      font-bold mb-3 text-gray-900 group-hover:text-[#FFBA4A] transition-colors
                      ${isHero ? 'text-2xl md:text-3xl' : 'text-xl'}
                    `}>
                      {caseStudy.frontmatter.project_title}
                    </h3>
                    
                    <p className={`
                      text-gray-600 mb-4
                      ${isHero ? 'text-lg leading-relaxed' : 'text-base'}
                    `}>
                      {caseStudy.frontmatter.one_liner}
                    </p>
                    
                    {/* Project Metadata */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                        {caseStudy.frontmatter.project_type}
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        {caseStudy.frontmatter.status}
                      </span>
                    </div>
                    
                    {/* Tech Stack - Show more for hero item */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.frontmatter.tech_stack
                        .slice(0, isHero ? 6 : 4)
                        .map((tech) => (
                          <span 
                            key={tech} 
                            className="text-xs bg-[#FFBA4A] text-gray-900 px-2 py-1 rounded font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      {caseStudy.frontmatter.tech_stack.length > (isHero ? 6 : 4) && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{caseStudy.frontmatter.tech_stack.length - (isHero ? 6 : 4)} more
                        </span>
                      )}
                    </div>
                    
                    {/* Date Range */}
                    <div className="text-sm text-gray-500 mb-4">
                      {caseStudy.frontmatter.start_date} - {caseStudy.frontmatter.end_date || 'Present'}
                    </div>
                    
                    {/* Call to Action */}
                    <div className="flex items-center text-[#FFBA4A] font-semibold group-hover:text-[#FFA726] transition-colors">
                      <span className="mr-2">View Case Study</span>
                      <svg 
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}