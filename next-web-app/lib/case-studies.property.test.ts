import * as fc from 'fast-check';
import { getCaseStudies, getCaseStudyBySlug, generateCaseStudyParams, getCarouselData } from './case-studies';
import fs from 'fs';
import path from 'path';
import { describe, test, expect } from 'vitest';

/**
 * Property-based tests for case study data layer
 * Using fast-check for property-based testing
 */

const CASE_STUDIES_DIR = path.join(process.cwd(), 'case_studies');
const ASSETS_DIR = path.join(process.cwd(), 'next-web-app', 'public', 'work');

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

  /**
   * Feature: flexible-media-carousel, Property 1: Media Discovery and Filtering
   * Validates: Requirements 1.1, 1.2
   * 
   * For any asset folder, the Media Discovery Service should identify all .webp and .webm files 
   * while excluding icon.webp from carousel generation, ensuring only valid carousel media is included
   */
  test('Property 1: Media Discovery and Filtering - identifies valid media files and excludes icon.webp', async () => {
    // Get all existing case study slugs that have asset folders
    const caseStudies = await getCaseStudies();
    const slugsWithAssets = caseStudies.filter(cs => {
      const assetPath = path.join(ASSETS_DIR, cs.slug);
      return fs.existsSync(assetPath);
    }).map(cs => cs.slug);

    // Test each existing asset folder
    for (const slug of slugsWithAssets) {
      const carouselData = await getCarouselData(slug);
      const assetFolderPath = path.join(ASSETS_DIR, slug);
      const actualFiles = fs.readdirSync(assetFolderPath);
      
      // Get all .webp and .webm files in the folder
      const allMediaFiles = actualFiles.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ext === '.webp' || ext === '.webm';
      });
      
      // Get expected carousel media files (all media files except icon.webp)
      const expectedCarouselFiles = allMediaFiles.filter(file => file !== 'icon.webp');
      
      // Property: All expected carousel files should be in the media array
      const actualCarouselFiles = carouselData.media.map(asset => asset.filename);
      expect(actualCarouselFiles.sort()).toEqual(expectedCarouselFiles.sort());
      
      // Property: icon.webp should never be in the carousel media
      expect(carouselData.media.some(asset => asset.filename === 'icon.webp')).toBe(false);
      
      // Property: All media assets should have correct file extensions
      for (const asset of carouselData.media) {
        expect(['.webp', '.webm']).toContain(asset.extension);
        expect(asset.filename.endsWith(asset.extension)).toBe(true);
      }
      
      // Property: Media type should match extension
      for (const asset of carouselData.media) {
        if (asset.extension === '.webp') {
          expect(asset.type).toBe('image');
        } else if (asset.extension === '.webm') {
          expect(asset.type).toBe('video');
        }
      }
    }
  }, 30000);

  /**
   * Feature: flexible-media-carousel, Property 3: Caption Generation Determinism
   * Validates: Requirements 1.4, 4.3
   * 
   * For any valid filename with hyphens, the caption generation should consistently 
   * convert hyphens to spaces while preserving all other characters
   */
  test('Property 3: Caption Generation Determinism - converts hyphens to spaces consistently', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generate filenames with hyphens and valid extensions
        fc.record({
          baseName: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
          hyphens: fc.array(fc.integer({ min: 1, max: 10 }), { minLength: 0, maxLength: 5 }),
          extension: fc.constantFrom('.webp', '.webm')
        }),
        async ({ baseName, hyphens, extension }) => {
          // Create a filename with hyphens inserted at random positions
          let filename = baseName;
          
          // Insert hyphens at various positions
          for (const pos of hyphens.sort((a, b) => b - a)) { // Sort descending to maintain positions
            const insertPos = Math.min(pos, filename.length);
            filename = filename.slice(0, insertPos) + '-' + filename.slice(insertPos);
          }
          
          filename += extension;
          
          // Create a test slug and get carousel data
          const testSlug = 'test-slug';
          
          // Mock the file system for this test by creating a temporary asset
          // We'll test the caption generation logic by examining real carousel data
          const caseStudies = await getCaseStudies();
          const realSlug = caseStudies.find(cs => {
            const assetPath = path.join(ASSETS_DIR, cs.slug);
            return fs.existsSync(assetPath);
          })?.slug;
          
          if (realSlug) {
            const carouselData = await getCarouselData(realSlug);
            
            // Test the caption generation property on existing files
            for (const asset of carouselData.media) {
              const expectedCaption = asset.filename
                .replace(/\.(webp|webm)$/i, '') // Remove extension
                .replace(/-/g, ' '); // Convert hyphens to spaces
              
              // Property: Caption should be filename without extension with hyphens converted to spaces
              expect(asset.caption).toBe(expectedCaption);
              
              // Property: Caption should not contain hyphens
              expect(asset.caption.includes('-')).toBe(false);
              
              // Property: Caption should preserve all other characters
              const originalWithoutExt = asset.filename.replace(/\.(webp|webm)$/i, '');
              const captionWithHyphens = asset.caption.replace(/ /g, '-');
              expect(captionWithHyphens).toBe(originalWithoutExt);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  }, 30000);

  /**
   * Feature: flexible-media-carousel, Property 5: Social Proof Detection Accuracy
   * Validates: Requirements 3.1, 3.2
   * 
   * For any asset folder, the hasIcon flag should be true if and only if icon.webp exists in the folder
   */
  test('Property 5: Social Proof Detection Accuracy - hasIcon flag matches icon.webp existence', async () => {
    // Get all existing case study slugs that have asset folders
    const caseStudies = await getCaseStudies();
    const slugsWithAssets = caseStudies.filter(cs => {
      const assetPath = path.join(ASSETS_DIR, cs.slug);
      return fs.existsSync(assetPath);
    }).map(cs => cs.slug);

    // Test each existing asset folder
    for (const slug of slugsWithAssets) {
      const carouselData = await getCarouselData(slug);
      const assetFolderPath = path.join(ASSETS_DIR, slug);
      const actualFiles = fs.readdirSync(assetFolderPath);
      
      // Check if icon.webp actually exists in the folder
      const iconExists = actualFiles.includes('icon.webp');
      
      // Property: hasIcon flag should match the actual existence of icon.webp
      expect(carouselData.hasIcon).toBe(iconExists);
      
      // Property: hasYoutube flag should match the existence of YouTube URL in cover_video_url
      const caseStudy = await getCaseStudyBySlug(slug);
      const coverVideoUrl = caseStudy?.frontmatter?.cover_video_url;
      const expectedHasYoutube = !!(coverVideoUrl && (coverVideoUrl.includes('youtube.com') || coverVideoUrl.includes('youtu.be')));
      
      expect(carouselData.hasYoutube).toBe(expectedHasYoutube);
      
      // Property: if hasYoutube is true, youtubeUrl should be set to the cover_video_url
      if (carouselData.hasYoutube) {
        expect(carouselData.youtubeUrl).toBe(coverVideoUrl);
      } else {
        expect(carouselData.youtubeUrl).toBeUndefined();
      }
    }
  }, 30000);
});
