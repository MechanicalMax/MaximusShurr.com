import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CaseStudy, CaseStudyFrontmatter } from './types';

const CASE_STUDIES_DIR = path.join(process.cwd(), 'case_studies');

/**
 * Reads all case study MDX files and returns parsed data
 * @returns Array of all case studies with frontmatter and content
 * @throws Error if case_studies directory doesn't exist
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(CASE_STUDIES_DIR)) {
      throw new Error(`Case studies directory not found at: ${CASE_STUDIES_DIR}`);
    }

    const files = fs.readdirSync(CASE_STUDIES_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    if (mdxFiles.length === 0) {
      console.warn('No case study files found in case_studies directory');
      return [];
    }

    const caseStudies = mdxFiles.map(filename => {
      const filePath = path.join(CASE_STUDIES_DIR, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      // Validate required fields
      if (!data.project_slug) {
        throw new Error(`Missing required field 'project_slug' in ${filename}`);
      }

      return {
        frontmatter: data as CaseStudyFrontmatter,
        content,
        slug: data.project_slug
      };
    });

    return caseStudies;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to read case studies: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Reads a single case study by slug
 * @param slug - The project_slug identifier for the case study
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
