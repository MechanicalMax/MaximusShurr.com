'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/types';

interface Props {
  caseStudies: CaseStudy[];
}

export default function CaseStudyGrid({ caseStudies }: Props) {
  const searchParams = useSearchParams();
  const [animationKey, setAnimationKey] = useState(0);

  // Get filter parameters from URL
  const selectedSkills = useMemo(() => {
    const skillsParam = searchParams.get('skills');
    return skillsParam ? skillsParam.split(',').filter(Boolean) : [];
  }, [searchParams]);

  const selectedStatuses = useMemo(() => {
    const statusesParam = searchParams.get('statuses');
    return statusesParam ? statusesParam.split(',').filter(Boolean) : [];
  }, [searchParams]);

  // Filter and sort case studies based on selected filters
  const filteredCaseStudies = useMemo(() => {
    const filtered = caseStudies.filter(caseStudy => {
      const matchesSkills = selectedSkills.length === 0 || 
        selectedSkills.some(skill => caseStudy.frontmatter.tech_stack.includes(skill));
      const matchesStatus = selectedStatuses.length === 0 || 
        selectedStatuses.includes(caseStudy.frontmatter.status);
      return matchesSkills && matchesStatus;
    });

    // Sort by end date (most recent first)
    return filtered.sort((a, b) => {
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
  }, [caseStudies, selectedSkills, selectedStatuses]);

  // Trigger re-animation when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAnimationKey(prev => prev + 1);
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [selectedSkills, selectedStatuses]);

  // Generate thumbnail path for case study
  const getThumbnailPath = (slug: string): string => {
    return `/case-study/${slug}/thumbnail.webp`;
  };

  if (filteredCaseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No case studies found</h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your filters to see more results.
        </p>
        <button
          onClick={() => window.location.href = '/case-study'}
          className="text-[#FFBA4A] hover:text-[#FFA726] font-medium underline"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="case-study-grid-container" key={animationKey}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.map((caseStudy, index) => {
          return (
            <Link 
              href={`/case-study/${caseStudy.slug}`}
              key={caseStudy.slug}
              className="block group"
            >
              <div 
                className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 
                  hover:border-[#FFBA4A] hover:shadow-lg transition-all duration-300
                  case-study-grid-item entering"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
              {/* Thumbnail */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <Image
                  src={getThumbnailPath(caseStudy.slug)}
                  alt={caseStudy.frontmatter.project_title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-[#FFBA4A] transition-colors">
                  {caseStudy.frontmatter.project_title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {caseStudy.frontmatter.one_liner}
                </p>
                
                {/* Project Type and Status */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {caseStudy.frontmatter.project_type}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {caseStudy.frontmatter.status}
                  </span>
                </div>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {caseStudy.frontmatter.tech_stack.slice(0, 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-[#FFBA4A] text-gray-900 px-2 py-1 rounded font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {caseStudy.frontmatter.tech_stack.length > 4 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{caseStudy.frontmatter.tech_stack.length - 4} more
                    </span>
                  )}
                </div>
                
                {/* Date Range */}
                <div className="mt-4 text-sm text-gray-500">
                  {caseStudy.frontmatter.start_date} - {caseStudy.frontmatter.end_date || 'Present'}
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </div>
  );
}