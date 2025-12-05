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
    
    // Property: Every MDX file should have a corresponding case study
    for (const file of mdxFiles) {
      const found = caseStudies.some(cs => {
        const filePath = path.join(CASE_STUDIES_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return fileContent.includes(cs.slug);
      });
      expect(found).toBe(true);
    }
    
    // Property: Every case study should have required fields
    for (const cs of caseStudies) {
      expect(cs.slug).toBeDefined();
      expect(cs.slug.length).toBeGreaterThan(0);
      expect(cs.frontmatter).toBeDefined();
      expect(cs.content).toBeDefined();
      expect(cs.frontmatter.project_slug).toBe(cs.slug);
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
    
    // Property: Every case study should have all required frontmatter fields
    const requiredFields = [
      'project_slug',
      'project_title',
      'one_liner',
      'project_type',
      'status',
      'tech_stack',
      'start_date'
    ];
    
    for (const cs of caseStudies) {
      for (const field of requiredFields) {
        expect(cs.frontmatter).toHaveProperty(field);
        expect(cs.frontmatter[field as keyof typeof cs.frontmatter]).toBeDefined();
      }
      
      // Property: tech_stack should be an array
      expect(Array.isArray(cs.frontmatter.tech_stack)).toBe(true);
      expect(cs.frontmatter.tech_stack.length).toBeGreaterThan(0);
      
      // Property: Optional fields should exist (even if null)
      expect(cs.frontmatter).toHaveProperty('live_url');
      expect(cs.frontmatter).toHaveProperty('repo_url');
      expect(cs.frontmatter).toHaveProperty('cover_video_url');
      expect(cs.frontmatter).toHaveProperty('end_date');
      expect(cs.frontmatter).toHaveProperty('testimonial');
    }
  }, 10000);

  /**
   * Feature: dynamic-case-study-pages, Property 6: Slug to route mapping
   * Validates: Requirements 2.2
   * 
   * For any case study with a project_slug value, 
   * the generated route should be /work/[project_slug] where the slug exactly matches the frontmatter value.
   */
  test('Property 6: Slug to route mapping - slug matches frontmatter project_slug', async () => {
    const caseStudies = await getCaseStudies();
    
    // Property: For every case study, slug should equal frontmatter.project_slug
    for (const cs of caseStudies) {
      expect(cs.slug).toBe(cs.frontmatter.project_slug);
    }
    
    // Property: getCaseStudyBySlug should find the case study using the slug
    for (const cs of caseStudies) {
      const found = await getCaseStudyBySlug(cs.slug);
      expect(found).not.toBeNull();
      expect(found?.slug).toBe(cs.slug);
      expect(found?.frontmatter.project_slug).toBe(cs.slug);
    }
    
    // Property: generateCaseStudyParams should return params with matching slugs
    const params = await generateCaseStudyParams();
    expect(params.length).toBe(caseStudies.length);
    
    for (const param of params) {
      const found = caseStudies.find(cs => cs.slug === param.slug);
      expect(found).toBeDefined();
      expect(found?.frontmatter.project_slug).toBe(param.slug);
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
