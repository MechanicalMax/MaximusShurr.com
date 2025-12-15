'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CaseStudy } from '@/lib/types';

interface SkillTag {
  name: string;
  count: number;
  size: 'small' | 'medium' | 'large';
}

interface StatusFilter {
  name: string;
  count: number;
  color: string;
}

interface Props {
  caseStudies: CaseStudy[];
}

// Status color mapping
const STATUS_COLORS: Record<string, string> = {
  'Completed': 'bg-green-100 text-green-800 border-green-200',
  'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'Ongoing': 'bg-blue-100 text-blue-800 border-blue-200',
  'Launched': 'bg-green-100 text-green-800 border-green-200',
  'Prototype': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Concept': 'bg-gray-100 text-gray-800 border-gray-200',
  'Paused': 'bg-red-100 text-red-800 border-red-200',
  'Archived': 'bg-gray-100 text-gray-800 border-gray-200',
};

const DEFAULT_STATUS_COLOR = 'bg-gray-100 text-gray-800 border-gray-200';

export default function CaseStudyFilters({ caseStudies }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInitialized = useRef(false);
  
  // Initialize state from URL parameters
  const skillsParam = searchParams.get('skills');
  const statusesParam = searchParams.get('statuses');
  const initialSkills = skillsParam ? skillsParam.split(',').filter(Boolean) : [];
  const initialStatuses = statusesParam ? statusesParam.split(',').filter(Boolean) : [];
  
  const [selectedSkills, setSelectedSkills] = useState<string[]>(initialSkills);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialStatuses);
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Sync with URL parameters when they change (only after initial render)
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    
    // Only update if the values are actually different to prevent loops
    const skillsChanged = JSON.stringify(selectedSkills.slice().sort()) !== JSON.stringify(initialSkills.slice().sort());
    const statusesChanged = JSON.stringify(selectedStatuses.slice().sort()) !== JSON.stringify(initialStatuses.slice().sort());
    
    if (skillsChanged || statusesChanged) {
      // Use a timeout to avoid synchronous setState in effect
      const timeoutId = setTimeout(() => {
        if (skillsChanged) {
          setSelectedSkills(initialSkills);
        }
        if (statusesChanged) {
          setSelectedStatuses(initialStatuses);
        }
      }, 0);
      
      return () => clearTimeout(timeoutId);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update URL when filters change
  useEffect(() => {
    // Don't update URL on initial render to prevent infinite loop
    if (!isInitialized.current) {
      return;
    }
    
    const params = new URLSearchParams();
    
    if (selectedSkills.length > 0) {
      params.set('skills', selectedSkills.join(','));
    }
    if (selectedStatuses.length > 0) {
      params.set('statuses', selectedStatuses.join(','));
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/case-study?${queryString}` : '/case-study';
    
    // Only update URL if it's actually different from current URL
    const currentUrl = window.location.pathname + (window.location.search || '');
    if (currentUrl !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [selectedSkills, selectedStatuses, router]);

  // Analyze skills from all case studies
  const skillAnalysis = caseStudies.reduce((acc, caseStudy) => {
    caseStudy.frontmatter.tech_stack.forEach(skill => {
      if (!acc[skill]) {
        acc[skill] = { count: 0, caseStudies: [] };
      }
      acc[skill].count++;
      acc[skill].caseStudies.push(caseStudy.slug);
    });
    return acc;
  }, {} as Record<string, { count: number; caseStudies: string[] }>);

  // Convert to SkillTag array with frequency-based sizing
  const skillTags: SkillTag[] = Object.entries(skillAnalysis)
    .map(([name, data]) => {
      let size: 'small' | 'medium' | 'large' = 'small';
      if (data.count >= 5) size = 'large';
      else if (data.count >= 3) size = 'medium';
      
      return {
        name,
        count: data.count,
        size
      };
    })
    .sort((a, b) => b.count - a.count); // Sort by frequency

  // Analyze statuses from all case studies
  const statusAnalysis = caseStudies.reduce((acc, caseStudy) => {
    const status = caseStudy.frontmatter.status;
    if (!acc[status]) {
      acc[status] = { count: 0, caseStudies: [] };
    }
    acc[status].count++;
    acc[status].caseStudies.push(caseStudy.slug);
    return acc;
  }, {} as Record<string, { count: number; caseStudies: string[] }>);

  // Convert to StatusFilter array with color coding
  const statusFilters: StatusFilter[] = Object.entries(statusAnalysis)
    .map(([name, data]) => ({
      name,
      count: data.count,
      color: STATUS_COLORS[name] || DEFAULT_STATUS_COLOR
    }))
    .sort((a, b) => b.count - a.count); // Sort by frequency

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedStatuses([]);
  };

  const clearSkillFilters = () => {
    setSelectedSkills([]);
  };

  const clearStatusFilters = () => {
    setSelectedStatuses([]);
  };

  const hasActiveFilters = selectedSkills.length > 0 || selectedStatuses.length > 0;

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Skills Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-700">Skills & Technologies</h4>
            <button
              onClick={clearSkillFilters}
              disabled={selectedSkills.length === 0}
              className={`flex items-center gap-1 text-sm rounded-full p-1.5 transition-all duration-200 ${
                selectedSkills.length > 0
                  ? 'text-gray-600 hover:text-red-600 hover:bg-red-50 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title={selectedSkills.length > 0 ? "Clear skill filters" : "No skill filters to clear"}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
          {skillTags.length > 6 && (
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showAllSkills ? (
                <>
                  Show Less
                  <ChevronUpIcon className="w-3 h-3" />
                </>
              ) : (
                <>
                  Show All ({skillTags.length})
                  <ChevronDownIcon className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 transition-all duration-300">
          {(showAllSkills ? skillTags : skillTags.slice(0, 6)).map(skill => {
            const isSelected = selectedSkills.includes(skill.name);
            const sizeClasses = {
              small: 'text-xs px-2 py-1',
              medium: 'text-sm px-3 py-1.5',
              large: 'text-base px-4 py-2'
            };
            
            return (
              <button
                key={skill.name}
                onClick={() => handleSkillToggle(skill.name)}
                className={`
                  ${sizeClasses[skill.size]}
                  rounded-full border transition-all duration-200 font-medium
                  ${isSelected 
                    ? 'bg-[#FFBA4A] text-gray-900 border-[#FFBA4A]' 
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                {skill.name} ({skill.count})
              </button>
            );
          })}
        </div>
        
        {/* Show selected skills that aren't in the visible set */}
        {!showAllSkills && selectedSkills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSkills
              .filter(skillName => !skillTags.slice(0, 6).some(skill => skill.name === skillName))
              .map(skillName => {
                const skill = skillTags.find(s => s.name === skillName);
                if (!skill) return null;
                
                const sizeClasses = {
                  small: 'text-xs px-2 py-1',
                  medium: 'text-sm px-3 py-1.5',
                  large: 'text-base px-4 py-2'
                };
                
                return (
                  <button
                    key={skillName}
                    onClick={() => handleSkillToggle(skillName)}
                    className={`
                      ${sizeClasses[skill.size]}
                      rounded-full border transition-all duration-200 font-medium
                      bg-[#FFBA4A] text-gray-900 border-[#FFBA4A]
                    `}
                  >
                    {skill.name} ({skill.count})
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {/* Status Filter */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-sm font-medium text-gray-700">Project Status</h4>
          <button
            onClick={clearStatusFilters}
            disabled={selectedStatuses.length === 0}
            className={`flex items-center gap-1 text-sm rounded-full p-1.5 transition-all duration-200 ${
              selectedStatuses.length > 0
                ? 'text-gray-600 hover:text-red-600 hover:bg-red-50 cursor-pointer'
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title={selectedStatuses.length > 0 ? "Clear status filters" : "No status filters to clear"}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(status => {
            const isSelected = selectedStatuses.includes(status.name);
            
            return (
              <button
                key={status.name}
                onClick={() => handleStatusToggle(status.name)}
                className={`
                  text-sm px-3 py-1.5 rounded-full border transition-all duration-200 font-medium
                  ${isSelected 
                    ? 'bg-[#FFBA4A] text-gray-900 border-[#FFBA4A]' 
                    : `${status.color} hover:opacity-80`
                  }
                `}
              >
                {status.name} ({status.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="text-sm text-gray-600">
          Showing {caseStudies.filter(caseStudy => {
            const matchesSkills = selectedSkills.length === 0 || 
              selectedSkills.some(skill => caseStudy.frontmatter.tech_stack.includes(skill));
            const matchesStatus = selectedStatuses.length === 0 || 
              selectedStatuses.includes(caseStudy.frontmatter.status);
            return matchesSkills && matchesStatus;
          }).length} of {caseStudies.length} case studies
        </div>
      )}
    </div>
  );
}