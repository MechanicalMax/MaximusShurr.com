import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { CaseStudy, CaseStudyFrontmatter, CompiledCaseStudy } from './types';

const CASE_STUDIES_DIR = path.join(process.cwd(), 'case_studies');

/**
 * Extracts slug from filename (removes .mdx extension)
 */
function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

/**
 * Validates frontmatter has all required fields
 */
function validateFrontmatter(data: any, filename: string): void {
  const required = ['project_title', 'one_liner', 'project_type', 
                    'status', 'tech_stack', 'start_date'];
  
  for (const field of required) {
    if (!data[field]) {
      throw new Error(
        `Missing required field "${field}" in ${filename}\n` +
        `Please add this field to the frontmatter.`
      );
    }
  }
  
  if (!Array.isArray(data.tech_stack)) {
    throw new Error(
      `Field "tech_stack" must be an array in ${filename}\n` +
      `Current value: ${typeof data.tech_stack}`
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
 * Reads a single case study by slug and compiles MDX
 * @param slug - The filename (without .mdx extension) identifier for the case study
 * @returns The compiled case study if found, null otherwise
 */
export async function getCaseStudyBySlug(slug: string): Promise<CompiledCaseStudy | null> {
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

    // Compile MDX content using next-mdx-remote
    const mdxSource = await serialize(caseStudy.content, {
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      },
    });

    return {
      frontmatter: caseStudy.frontmatter,
      mdxSource,
      slug: caseStudy.slug,
    };
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
