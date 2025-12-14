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
  cover_image: string;  // Path to cover image for tiles and social media (REQUIRED)
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
  mdxSource: unknown;  // MDXRemoteSerializeResult from next-mdx-remote
  slug: string;
}

/**
 * Media carousel system type definitions
 */

export interface MediaAsset {
  filename: string;
  path: string;
  type: 'image' | 'video';
  caption: string;
  extension: '.webp' | '.webm';
}

export interface CarouselData {
  hasIcon: boolean;
  hasYoutube: boolean;
  youtubeUrl?: string;
  media: MediaAsset[];
}

export interface CaseStudyWithMedia extends CaseStudy {
  carouselData: CarouselData;
}

/**
 * Validation and error handling types
 */

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: 'missing_file' | 'invalid_format' | 'security_violation' | 'corrupted_file';
  message: string;
  filename?: string;
  path?: string;
}

export interface ValidationWarning {
  type: 'missing_thumbnail' | 'large_file_size' | 'deprecated_format';
  message: string;
  filename?: string;
  path?: string;
}
