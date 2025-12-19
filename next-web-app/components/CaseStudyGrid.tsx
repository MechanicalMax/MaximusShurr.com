'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { CaseStudy } from '@/lib/types';
import CaseStudyCard from './CaseStudyCard';

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
        {filteredCaseStudies.map((caseStudy, index) => (
          <CaseStudyCard
            key={caseStudy.slug}
            slug={caseStudy.slug}
            projectTitle={caseStudy.frontmatter.project_title}
            oneLiner={caseStudy.frontmatter.one_liner}
            projectType={caseStudy.frontmatter.project_type}
            status={caseStudy.frontmatter.status}
            techStack={caseStudy.frontmatter.tech_stack}
            startDate={caseStudy.frontmatter.start_date}
            endDate={caseStudy.frontmatter.end_date}
            variant="grid"
            animationDelay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}