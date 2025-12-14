import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getCaseStudyWithMediaBySlug, generateCaseStudyParams } from '@/lib/case-studies';
import CaseStudyHeader from '@/components/CaseStudyHeader';
import CaseStudyVideo from '@/components/CaseStudyVideo';
import CaseStudyTestimonial from '@/components/CaseStudyTestimonial';
import CaseStudyContent from '@/components/CaseStudyContent';

export async function generateStaticParams() {
  return await generateCaseStudyParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  const ogImage = `https://maximusshurr.com${caseStudy.frontmatter.cover_image}`;

  return {
    title: `${caseStudy.frontmatter.project_title} | Maximus Shurr`,
    description: caseStudy.frontmatter.one_liner,
    openGraph: {
      title: caseStudy.frontmatter.project_title,
      description: caseStudy.frontmatter.one_liner,
      images: [{ url: ogImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.frontmatter.project_title,
      description: caseStudy.frontmatter.one_liner,
      images: [ogImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudyWithMedia = await getCaseStudyWithMediaBySlug(slug);

  if (!caseStudyWithMedia) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <CaseStudyHeader 
        frontmatter={caseStudyWithMedia.frontmatter}
        carouselData={caseStudyWithMedia.carouselData}
        slug={slug}
        videoEmbed={caseStudyWithMedia.frontmatter.cover_video_url ? (
          <CaseStudyVideo url={caseStudyWithMedia.frontmatter.cover_video_url} />
        ) : undefined}
      />
      {caseStudyWithMedia.frontmatter.testimonial && (
        <CaseStudyTestimonial testimonial={caseStudyWithMedia.frontmatter.testimonial} />
      )}
      <CaseStudyContent content={caseStudyWithMedia.content} />
    </div>
  );
}
