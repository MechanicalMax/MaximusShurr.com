/**
 * TypeScript interfaces for case study data structures
 */

export interface BookingCTA {
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

export interface CaseStudyFrontmatter {
  project_title: string;
  one_liner: string;
  project_type: string;
  status: string;
  live_url: string | null;
  repo_url: string | null;
  cover_video_url: string | null;
  tech_stack: string[];
  start_date: string;
  end_date: string | null;
  testimonial: {
    text: string;
    author: string;
    role: string;
  } | null;
  isFeatured?: boolean;
  bookingCTA?: BookingCTA;
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
 * Extended case study interface for homepage display
 * Includes auto-discovered thumbnail and icon paths
 */
export interface CaseStudyForHomepage extends CaseStudy {
  thumbnailPath: string | null;  // Auto-discovered from /case-study/[slug]/thumbnail.webp
  iconPath: string | null;       // Auto-discovered from /case-study/[slug]/icon.webp
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
