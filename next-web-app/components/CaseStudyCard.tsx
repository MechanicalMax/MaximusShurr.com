import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyCardProps {
  slug: string;
  projectTitle: string;
  oneLiner: string;
  projectType: string;
  status: string;
  techStack: string[];
  startDate: string;
  endDate: string | null;
  showFeaturedBadge?: boolean;
  className?: string;
  variant?: 'default' | 'hero' | 'grid';
  animationDelay?: number;
}

export default function CaseStudyCard({
  slug,
  projectTitle,
  oneLiner,
  projectType,
  status,
  techStack,
  startDate,
  endDate,
  showFeaturedBadge = false,
  className = "",
  variant = 'default',
  animationDelay = 0
}: CaseStudyCardProps) {
  const thumbnailPath = `/case-study/${slug}/thumbnail.webp`;
  
  // Variant-specific styling
  const isHero = variant === 'hero';
  const isGrid = variant === 'grid';
  
  const thumbnailHeight = isHero ? 'h-64 md:h-80' : isGrid ? 'h-48' : 'h-64';
  const contentPadding = isHero ? 'p-6 md:p-8' : isGrid ? 'p-6' : 'p-8';
  const titleSize = isHero ? 'text-2xl md:text-3xl' : isGrid ? 'text-xl' : 'text-2xl';
  const descriptionSize = isHero ? 'text-lg leading-relaxed' : isGrid ? 'text-base line-clamp-2' : 'text-lg leading-relaxed';
  const techStackLimit = isHero ? 6 : isGrid ? 4 : 5;
  const borderRadius = isGrid ? 'rounded-xl' : 'rounded-2xl';
  const shadowStyle = isGrid ? 'shadow-sm hover:shadow-lg' : 'shadow-lg hover:shadow-xl';
  
  // Status badge color mapping
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'complete':
        return 'bg-green-100 text-green-700';
      case 'ongoing':
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Link 
      href={`/case-study/${slug}`}
      className={`block group ${className}`}
    >
      <div 
        className={`h-full bg-white ${borderRadius} overflow-hidden ${shadowStyle} transition-all duration-300 border border-gray-200 hover:border-[#FFBA4A] ${isGrid ? 'case-study-grid-item entering' : ''}`}
        style={isGrid ? { animationDelay: `${animationDelay}ms` } : undefined}
      >
        {/* Thumbnail */}
        <div className={`relative overflow-hidden bg-gray-100 ${thumbnailHeight}`}>
          <Image
            src={thumbnailPath}
            alt={projectTitle}
            width={isHero ? 800 : 500}
            height={isHero ? 400 : 300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Featured Badge */}
          {showFeaturedBadge && (
            <div className="absolute top-4 left-4">
              <span className="bg-[#FFBA4A] text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                FEATURED
              </span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className={contentPadding}>
          <h3 className={`font-bold mb-3 text-gray-900 group-hover:text-[#FFBA4A] transition-colors ${titleSize}`}>
            {projectTitle}
          </h3>
          
          <p className={`text-gray-600 mb-4 ${descriptionSize}`}>
            {oneLiner}
          </p>
          
          {/* Project Metadata */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
              {projectType}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadgeColor(status)}`}>
              {status}
            </span>
          </div>
          
          {/* Tech Stack */}
          <div className={`flex flex-wrap gap-${isGrid ? '1' : '2'} mb-4`}>
            {techStack.slice(0, techStackLimit).map((tech) => (
              <span 
                key={tech} 
                className="text-xs bg-[#FFBA4A] text-gray-900 px-2 py-1 rounded font-medium"
              >
                {tech}
              </span>
            ))}
            {techStack.length > techStackLimit && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{techStack.length - techStackLimit} more
              </span>
            )}
          </div>
          
          {/* Date Range */}
          <div className={`text-sm text-gray-500 ${isGrid ? 'mt-4' : 'mb-4'}`}>
            {startDate} - {endDate || 'Present'}
          </div>
          
          {/* Call to Action - Only show for non-grid variants */}
          {!isGrid && (
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
          )}
        </div>
      </div>
    </Link>
  );
}
