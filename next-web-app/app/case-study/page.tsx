import { Suspense } from 'react';
import { getCaseStudies, getFeaturedCaseStudies } from '@/lib/case-studies';
import { CaseStudy } from '@/lib/types';
import ByTheNumbers from '@/components/ByTheNumbers';
import FeaturedCaseStudies from '@/components/FeaturedCaseStudies';
import CaseStudyFilters from '@/components/CaseStudyFilters';
import CaseStudyGrid from '@/components/CaseStudyGrid';

// Client-side wrapper component for components that use useSearchParams
function CaseStudyClientSection({ allCaseStudies }: { allCaseStudies: CaseStudy[] }) {
  return (
    <Suspense fallback={
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    }>
      <div className="mb-8">
        <CaseStudyFilters caseStudies={allCaseStudies} />
      </div>
      <CaseStudyGrid caseStudies={allCaseStudies} />
    </Suspense>
  );
}

export default async function CaseStudyPage() {
  // Fetch all case studies and separate featured/non-featured
  const allCaseStudies = await getCaseStudies();
  const featuredCaseStudies = await getFeaturedCaseStudies();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Case Studies</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Explore my portfolio of projects spanning hardware design, software development, 
            and automation solutions across various industries.
          </p>
        </div>
      </section>

      {/* By the Numbers Section */}
      <ByTheNumbers caseStudies={allCaseStudies} />

      {/* Featured Case Studies Section */}
      {featuredCaseStudies.length > 0 && (
        <FeaturedCaseStudies caseStudies={featuredCaseStudies} />
      )}

      {/* Filters and Grid Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-center font-bold mb-6 text-gray-900">
            {featuredCaseStudies.length > 0 ? 'All Case Studies' : 'Browse Case Studies'}
          </h2>
          
          <CaseStudyClientSection allCaseStudies={allCaseStudies} />
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Case Studies | Maximus Shurr',
  description: 'Explore my portfolio of projects spanning hardware design, software development, and automation solutions across various industries.',
};