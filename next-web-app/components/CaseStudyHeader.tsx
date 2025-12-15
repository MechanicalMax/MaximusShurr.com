import Link from 'next/link';
import { CaseStudyFrontmatter, CarouselData } from '@/lib/types';
import MediaCarousel from './MediaCarousel';

interface Props {
  frontmatter: CaseStudyFrontmatter;
  carouselData: CarouselData;
}

export default function CaseStudyHeader({ frontmatter, carouselData }: Props) {
  return (
    <header className="bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/case-study" className="text-gray-600 hover:text-gray-900 inline-block mb-6 min-h-[44px] min-w-[44px] flex items-center">
          ← Back to Case Studies
        </Link>

        <MediaCarousel carouselData={carouselData} />
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6">{frontmatter.project_title}</h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-4">{frontmatter.one_liner}</p>
        
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
            {frontmatter.project_type}
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
            {frontmatter.status}
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
            {frontmatter.start_date} - {frontmatter.end_date || 'Present'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {frontmatter.tech_stack.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 bg-[#FFBA4A] text-gray-900 rounded-md text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {(frontmatter.live_url || frontmatter.repo_url) && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
            {frontmatter.live_url && (
              <a 
                href={frontmatter.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-[#FFBA4A] text-gray-900 rounded-lg font-semibold hover:bg-[#FFD580] transition-colors text-center"
              >
                View Live
              </a>
            )}
            {frontmatter.repo_url && (
              <a 
                href={frontmatter.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors text-center"
              >
                View Code
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
