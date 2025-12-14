import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseStudy, CaseStudyFrontmatter, CarouselData, MediaAsset, CaseStudyWithMedia } from './types';

const CASE_STUDIES_DIR = path.join(process.cwd(), 'case_studies');
const ASSETS_DIR = path.join(process.cwd(), 'public', 'work');

/**
 * Extracts slug from filename (removes .mdx extension)
 */
function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

/**
 * Validates frontmatter has all required fields
 */
function validateFrontmatter(data: unknown, filename: string): void {
  if (!data || typeof data !== 'object') {
    throw new Error(`Invalid frontmatter in ${filename}: must be an object`);
  }

  const dataObj = data as Record<string, unknown>;
  const required = ['project_title', 'one_liner', 'project_type', 
                    'status', 'tech_stack', 'start_date', 'cover_image'];
  
  for (const field of required) {
    if (!dataObj[field]) {
      throw new Error(
        `Missing required field "${field}" in ${filename}\n` +
        `Please add this field to the frontmatter.`
      );
    }
  }
  
  if (!Array.isArray(dataObj.tech_stack)) {
    throw new Error(
      `Field "tech_stack" must be an array in ${filename}\n` +
      `Current value: ${typeof dataObj.tech_stack}`
    );
  }
  
  if (typeof dataObj.cover_image !== 'string' || dataObj.cover_image.trim() === '') {
    throw new Error(
      `Field "cover_image" must be a non-empty string in ${filename}\n` +
      `Current value: ${dataObj.cover_image}`
    );
  }
}

/**
 * Reads all case study MDX files and returns parsed data
 * @returns Array of all case studies with frontmatter and content
 * @throws Error if case_studies directory doesn't exist or validation fails
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  // Check if directory exists
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    throw new Error(`Case studies directory not found at: ${CASE_STUDIES_DIR}`);
  }

  const files = fs.readdirSync(CASE_STUDIES_DIR);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  if (mdxFiles.length === 0) {
    console.warn('No case study files found in case_studies directory');
    return [];
  }

  const caseStudies = mdxFiles.map(filename => {
    const filePath = path.join(CASE_STUDIES_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate frontmatter
    validateFrontmatter(data, filename);

    // Extract slug from filename (single source of truth)
    const slug = getSlugFromFilename(filename);

    return {
      frontmatter: data as CaseStudyFrontmatter,
      content,
      slug
    };
  });

  return caseStudies;
}

/**
 * Reads a single case study by slug
 * @param slug - The filename (without .mdx extension) identifier for the case study
 * @returns The case study if found, null otherwise
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  // Validate slug to prevent path traversal attacks
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    console.warn(`Invalid slug provided: ${slug}`);
    return null;
  }

  try {
    const caseStudies = await getCaseStudies();
    const caseStudy = caseStudies.find(cs => cs.slug === slug);
    
    if (!caseStudy) {
      console.warn(`Case study not found for slug: ${slug}`);
      return null;
    }

    return caseStudy;
  } catch (error) {
    console.error(`Error fetching case study by slug '${slug}':`, error);
    return null;
  }
}

/**
 * Reads a single case study by slug with carousel data
 * @param slug - The filename (without .mdx extension) identifier for the case study
 * @returns The case study with carousel data if found, null otherwise
 */
export async function getCaseStudyWithMediaBySlug(slug: string): Promise<CaseStudyWithMedia | null> {
  // Validate slug to prevent path traversal attacks
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    console.warn(`Invalid slug provided: ${slug}`);
    return null;
  }

  try {
    const caseStudies = await getCaseStudies();
    const caseStudy = caseStudies.find(cs => cs.slug === slug);
    
    if (!caseStudy) {
      console.warn(`Case study not found for slug: ${slug}`);
      return null;
    }

    // Get carousel data for this case study
    const carouselData = await getCarouselData(slug);

    // Return extended case study with media data
    return {
      ...caseStudy,
      carouselData
    };
  } catch (error) {
    console.error(`Error fetching case study with media by slug '${slug}':`, error);
    return null;
  }
}

/**
 * Generates static params for all case study pages
 * Used by Next.js generateStaticParams() for static site generation
 * @returns Array of objects with slug parameter for each case study
 */
export async function generateCaseStudyParams() {
  try {
    const caseStudies = await getCaseStudies();
    return caseStudies.map(cs => ({ slug: cs.slug }));
  } catch (error) {
    console.error('Error generating case study params:', error);
    return [];
  }
}

/**
 * Converts filename to human-readable caption by replacing hyphens with spaces
 * @param filename - The filename to convert (with or without extension)
 * @returns Caption text with hyphens converted to spaces
 */
function filenameToCaption(filename: string): string {
  // Remove extension if present
  const nameWithoutExt = filename.replace(/\.(webp|webm)$/i, '');
  // Convert hyphens to spaces
  return nameWithoutExt.replace(/-/g, ' ');
}

/**
 * Discovers and processes all media assets in a case study folder
 * @param slug - Case study identifier
 * @returns Structured carousel data with sorted media assets
 */
export async function getCarouselData(slug: string): Promise<CarouselData> {
  // Validate slug to prevent path traversal attacks
  if (!slug || slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    console.warn(`Invalid slug provided to getCarouselData: ${slug}`);
    return {
      hasIcon: false,
      hasYoutube: false,
      media: []
    };
  }

  const assetFolderPath = path.join(ASSETS_DIR, slug);

  // Check if asset folder exists
  if (!fs.existsSync(assetFolderPath)) {
    console.warn(`Asset folder not found for slug: ${slug}`);
    return {
      hasIcon: false,
      hasYoutube: false,
      media: []
    };
  }

  try {
    const files = fs.readdirSync(assetFolderPath);
    
    // Filter for valid media files (.webp and .webm)
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return (ext === '.webp' || ext === '.webm') && file !== 'icon.webp';
    });

    // Create MediaAsset objects
    const mediaAssets: MediaAsset[] = mediaFiles.map(filename => {
      const ext = path.extname(filename).toLowerCase() as '.webp' | '.webm';
      return {
        filename,
        path: `/work/${slug}/${filename}`,
        type: ext === '.webp' ? 'image' : 'video',
        caption: filenameToCaption(filename),
        extension: ext
      };
    });

    // Get case study to check for YouTube URL
    const caseStudy = await getCaseStudyBySlug(slug);
    const coverVideoUrl = caseStudy?.frontmatter?.cover_video_url;
    const hasYoutube = !!(coverVideoUrl && (coverVideoUrl.includes('youtube.com') || coverVideoUrl.includes('youtu.be')));
    const youtubeUrl = hasYoutube ? coverVideoUrl : undefined;

    // Sort media according to slide hierarchy:
    // 1. YouTube embed (if exists) - handled separately, not in media array
    // 2. thumbnail.webp (if exists)
    // 3. Images (alphabetically, excluding thumbnail.webp)
    // 4. Videos (alphabetically)
    const sortedMedia: MediaAsset[] = [];
    
    // First, add thumbnail.webp if it exists (this will be slide #1 if no YouTube, or slide #2 if YouTube exists)
    const thumbnailIndex = mediaAssets.findIndex(asset => asset.filename === 'thumbnail.webp');
    if (thumbnailIndex !== -1) {
      const thumbnailAsset = mediaAssets[thumbnailIndex];
      // Use case study title as caption for thumbnail instead of filename
      thumbnailAsset.caption = caseStudy?.frontmatter?.project_title || 'Project Overview';
      sortedMedia.push(thumbnailAsset);
      mediaAssets.splice(thumbnailIndex, 1);
    }

    // Then add videos alphabetically
    const videos = mediaAssets.filter(asset => asset.type === 'video').sort((a, b) => a.filename.localeCompare(b.filename));
    sortedMedia.push(...videos);

    // Finally add remaining images alphabetically (excluding thumbnail.webp which was already added)
    const images = mediaAssets.filter(asset => asset.type === 'image').sort((a, b) => a.filename.localeCompare(b.filename));
    sortedMedia.push(...images);

    // Check for social proof indicators
    const hasIcon = files.includes('icon.webp');

    return {
      hasIcon,
      hasYoutube,
      youtubeUrl,
      media: sortedMedia
    };

  } catch (error) {
    console.error(`Error processing carousel data for slug '${slug}':`, error);
    return {
      hasIcon: false,
      hasYoutube: false,
      media: []
    };
  }
}
