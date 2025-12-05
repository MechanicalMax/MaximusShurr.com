/**
 * TypeScript interfaces for case study data structures
 */

export interface CaseStudyFrontmatter {
  project_title: string;
  one_liner: string;
  project_type: string;
  status: string;
  live_url: string | null;
  repo_url: string | null;
  cover_video_url: string | null;
  cover_image: string | null;  // Path to cover image for tiles and social media
  tech_stack: string[];
  start_date: string;
  end_date: string | null;
  testimonial: {
    text: string;
    author: string;
    role: string;
  } | null;
}

export interface CaseStudy {
  frontmatter: CaseStudyFrontmatter;
  content: string;
  slug: string;
}

export interface CompiledCaseStudy {
  frontmatter: CaseStudyFrontmatter;
  mdxSource: any;  // MDXRemoteSerializeResult from next-mdx-remote
  slug: string;
}
