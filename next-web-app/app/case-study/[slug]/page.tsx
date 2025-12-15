import { notFound } from 'next/navigation';
import { getCaseStudyWithMediaBySlug, generateCaseStudyParams } from '@/lib/case-studies';
import CaseStudyHeader from '@/components/CaseStudyHeader';
import CaseStudyTestimonial from '@/components/CaseStudyTestimonial';
import CaseStudyContent from '@/components/CaseStudyContent';

export async function generateStaticParams() {
  return await generateCaseStudyParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudyWithMedia = await getCaseStudyWithMediaBySlug(slug);
  if (!caseStudyWithMedia) return {};

  // Use thumbnail from media folder for social media images
  const thumbnailAsset = caseStudyWithMedia.carouselData.media.find(asset => asset.filename === 'thumbnail.webp');
  const ogImage = thumbnailAsset 
    ? `https://maximusshurr.com${thumbnailAsset.path}`
    : `https://maximusshurr.com/case-study/${slug}/thumbnail.webp`; // fallback

  return {
    title: `${caseStudyWithMedia.frontmatter.project_title} | Maximus Shurr`,
    description: caseStudyWithMedia.frontmatter.one_liner,
    openGraph: {
      title: caseStudyWithMedia.frontmatter.project_title,
      description: caseStudyWithMedia.frontmatter.one_liner,
      images: [{ url: ogImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudyWithMedia.frontmatter.project_title,
      description: caseStudyWithMedia.frontmatter.one_liner,
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
      />
      {caseStudyWithMedia.frontmatter.testimonial && (
        <CaseStudyTestimonial testimonial={caseStudyWithMedia.frontmatter.testimonial} />
      )}
      <CaseStudyContent content={caseStudyWithMedia.content} />
    </div>
  );
}
