import * as fc from 'fast-check';
import { getCaseStudies, getCaseStudyBySlug, generateCaseStudyParams } from './case-studies';
import fs from 'fs';
import path from 'path';
import { describe, test, expect } from 'vitest';

/**
 * Property-based tests for case study data layer
 * Using fast-check for property-based testing
 */

const CASE_STUDIES_DIR = path.join(process.cwd(), 'case_studies');

describe('Case Studies Data Layer - Property-Based Tests', () => {
  
  /**
   * Feature: dynamic-case-study-pages, Property 18: Case study discovery
   * Validates: Requirements 6.1
   * 
   * For any set of MDX files in the case_studies directory, 
   * the homepage should load and display tiles for all valid case study files.
   */
  test('Property 18: Case study discovery - all valid MDX files are discovered', async () => {
    // Get actual files in the directory
    const files = fs.readdirSync(CASE_STUDIES_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    // Get case studies from our function
    const caseStudies = await getCaseStudies();
    
    // Property: The number of case studies should equal the number of MDX files
    expect(caseStudies.length).toBe(mdxFiles.length);
    
    // Property: Every MDX file should have a corresponding case study with slug derived from filename
    for (const file of mdxFiles) {
      const expectedSlug = file.replace(/\.mdx$/, '');
      const found = caseStudies.find(cs => cs.slug === expectedSlug);
      expect(found).toBeDefined();
    }
    
    // Property: Every case study should have required fields
    for (const cs of caseStudies) {
      expect(cs.slug).toBeDefined();
      expect(cs.slug.length).toBeGreaterThan(0);
      expect(cs.frontmatter).toBeDefined();
      expect(cs.content).toBeDefined();
      // Slug should not contain .mdx extension
      expect(cs.slug).not.toContain('.mdx');
    }
  }, 10000);

  /**
   * Feature: dynamic-case-study-pages, Property 5: Frontmatter parsing completeness
   * Validates: Requirements 2.1
   * 
   * For any MDX file with valid YAML frontmatter, 
   * the parser should extract all frontmatter fields and make them available as structured data.
   */
  test('Property 5: Frontmatter parsing completeness - all frontmatter fields are extracted', async () => {
    const caseStudies = await getCaseStudies();
    
    for (const cs of caseStudies) {
      const fm = cs.frontmatter;
      
      // Required fields must be defined
      expect(fm.project_title).toBeDefined();
      expect(fm.one_liner).toBeDefined();
      expect(fm.project_type).toBeDefined();
      expect(fm.status).toBeDefined();
      expect(fm.start_date).toBeDefined();
      expect(fm.cover_image).toBeDefined();
      
      // tech_stack must be a non-empty array
      expect(Array.isArray(fm.tech_stack)).toBe(true);
      expect(fm.tech_stack.length).toBeGreaterThan(0);
      
      // cover_image must be a non-empty string
      expect(typeof fm.cover_image).toBe('string');
      expect(fm.cover_image.trim().length).toBeGreaterThan(0);
    }
  }, 10000);

  /**
   * Feature: dynamic-case-study-pages, Property 6: Slug to route mapping
   * Validates: Requirements 2.2
   * 
   * For any case study file, the generated route should be /work/[slug] 
   * where the slug is derived from the filename (without .mdx extension).
   */
  test('Property 6: Slug to route mapping - slug derived from filename', async () => {
    const caseStudies = await getCaseStudies();
    const files = fs.readdirSync(CASE_STUDIES_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    
    // Property: For every case study, slug should equal filename without .mdx
    for (const cs of caseStudies) {
      const expectedSlug = mdxFiles.find(file => file.replace(/\.mdx$/, '') === cs.slug);
      expect(expectedSlug).toBeDefined();
    }
    
    // Property: getCaseStudyBySlug should find the case study using the slug
    for (const cs of caseStudies) {
      const found = await getCaseStudyBySlug(cs.slug);
      expect(found).not.toBeNull();
      expect(found?.slug).toBe(cs.slug);
    }
    
    // Property: generateCaseStudyParams should return params with matching slugs
    const params = await generateCaseStudyParams();
    expect(params.length).toBe(caseStudies.length);
    
    for (const param of params) {
      const found = caseStudies.find(cs => cs.slug === param.slug);
      expect(found).toBeDefined();
    }
  }, 10000);

  /**
   * Additional property test: Invalid slug handling
   * Tests that invalid slugs are properly rejected
   */
  test('Property: Invalid slugs are rejected', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string().filter(s => s.includes('..') || s.includes('/') || s.includes('\\')),
        async (invalidSlug) => {
          const result = await getCaseStudyBySlug(invalidSlug);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  /**
   * Additional property test: Non-existent slugs return null
   */
  test('Property: Non-existent slugs return null', async () => {
    const caseStudies = await getCaseStudies();
    const validSlugs = new Set(caseStudies.map(cs => cs.slug));
    
    await fc.assert(
      fc.asyncProperty(
        fc.string().filter(s => !validSlugs.has(s) && !s.includes('..') && !s.includes('/') && !s.includes('\\')),
        async (nonExistentSlug) => {
          const result = await getCaseStudyBySlug(nonExistentSlug);
          expect(result).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);
});
