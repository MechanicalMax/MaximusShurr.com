import { CaseStudy } from '@/lib/types';
import CaseStudyCard from './CaseStudyCard';

interface Props {
  caseStudies: CaseStudy[];
  className?: string;
}

export default function FeaturedCaseStudies({ caseStudies, className = "" }: Props) {
  if (caseStudies.length === 0) {
    return null;
  }

  // Sort featured case studies by start date (most recent first)
  const sortedCaseStudies = [...caseStudies].sort((a, b) => {
    const parseDate = (dateStr: string | null): Date => {
      if (!dateStr) return new Date(0);
      return new Date(dateStr);
    };

    return parseDate(b.frontmatter.start_date).getTime() - parseDate(a.frontmatter.start_date).getTime();
  });

  return (
    <section className={`py-16 ${className}`}>
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
          {sortedCaseStudies.map((caseStudy) => {
            return (
              <div
                key={caseStudy.slug}
              >
                <CaseStudyCard
                  slug={caseStudy.slug}
                  projectTitle={caseStudy.frontmatter.project_title}
                  oneLiner={caseStudy.frontmatter.one_liner}
                  projectType={caseStudy.frontmatter.project_type}
                  status={caseStudy.frontmatter.status}
                  techStack={caseStudy.frontmatter.tech_stack}
                  startDate={caseStudy.frontmatter.start_date}
                  endDate={caseStudy.frontmatter.end_date}
                  showFeaturedBadge={true}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}