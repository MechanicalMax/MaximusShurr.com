import { describe, test, expect } from 'vitest';
import { getCaseStudyBySlug, getCaseStudyWithMediaBySlug } from './case-studies';

/**
 * Tests for booking CTA functionality in case studies
 */

describe('Booking CTA Functionality', () => {
  
  test('should parse bookingCTA from frontmatter when present', async () => {
    // Test with Hughes Orthodontics case study which should have custom booking CTA
    const caseStudy = await getCaseStudyBySlug('hughes-orthodontics-automation');
    
    expect(caseStudy).not.toBeNull();
    expect(caseStudy?.frontmatter.bookingCTA).toBeDefined();
    
    if (caseStudy?.frontmatter.bookingCTA) {
      const bookingCTA = caseStudy.frontmatter.bookingCTA;
      
      // Verify the structure matches BookingCTA interface
      expect(typeof bookingCTA.title).toBe('string');
      expect(typeof bookingCTA.description).toBe('string');
      expect(typeof bookingCTA.buttonText).toBe('string');
      expect(typeof bookingCTA.link).toBe('string');
      
      // Verify the specific values we set
      expect(bookingCTA.title).toBe("Curious if you could realize the $25,000 per year cost reductions too?");
      expect(bookingCTA.description).toBe("Use our dental automation ROI calculator to see if you would benefit from our Zero-Admin Lab Protocol system");
      expect(bookingCTA.buttonText).toBe("Check My Savings");
      expect(bookingCTA.link).toBe("/dental-automation");
    }
  });

  test('should handle case studies without bookingCTA gracefully', async () => {
    // Get all case studies and find one without bookingCTA
    const caseStudy = await getCaseStudyBySlug('botimus'); // This one likely doesn't have custom CTA
    
    if (caseStudy) {
      // bookingCTA should be undefined or null for case studies without it
      expect(caseStudy.frontmatter.bookingCTA).toBeUndefined();
    }
  });

  test('should include bookingCTA in getCaseStudyWithMediaBySlug', async () => {
    const caseStudyWithMedia = await getCaseStudyWithMediaBySlug('hughes-orthodontics-automation');
    
    expect(caseStudyWithMedia).not.toBeNull();
    expect(caseStudyWithMedia?.frontmatter.bookingCTA).toBeDefined();
    
    if (caseStudyWithMedia?.frontmatter.bookingCTA) {
      const bookingCTA = caseStudyWithMedia.frontmatter.bookingCTA;
      
      expect(bookingCTA.title).toBe("Curious if you could realize the $25,000 per year cost reductions too?");
      expect(bookingCTA.description).toBe("Use our dental automation ROI calculator to see if you would benefit from our Zero-Admin Lab Protocol system");
      expect(bookingCTA.buttonText).toBe("Check My Savings");
      expect(bookingCTA.link).toBe("/dental-automation");
    }
  });

  test('should validate bookingCTA structure when present', async () => {
    const caseStudy = await getCaseStudyBySlug('hughes-orthodontics-automation');
    
    if (caseStudy?.frontmatter.bookingCTA) {
      const bookingCTA = caseStudy.frontmatter.bookingCTA;
      
      // All fields should be non-empty strings
      expect(bookingCTA.title.trim().length).toBeGreaterThan(0);
      expect(bookingCTA.description.trim().length).toBeGreaterThan(0);
      expect(bookingCTA.buttonText.trim().length).toBeGreaterThan(0);
      expect(bookingCTA.link.trim().length).toBeGreaterThan(0);
      
      // Should not contain only whitespace
      expect(bookingCTA.title.trim()).toBe(bookingCTA.title);
      expect(bookingCTA.description.trim()).toBe(bookingCTA.description);
      expect(bookingCTA.buttonText.trim()).toBe(bookingCTA.buttonText);
      expect(bookingCTA.link.trim()).toBe(bookingCTA.link);
      
      // Link should start with /
      expect(bookingCTA.link.startsWith('/')).toBe(true);
    }
  });

  test('should maintain backward compatibility with existing case studies', async () => {
    // Test that existing case studies without bookingCTA still work
    const allCaseStudies = await Promise.all([
      getCaseStudyBySlug('botimus'),
      getCaseStudyBySlug('clairity-daily'),
      getCaseStudyBySlug('mechanical-max')
    ]);

    for (const caseStudy of allCaseStudies) {
      if (caseStudy) {
        // Should have all required fields
        expect(caseStudy.frontmatter.project_title).toBeDefined();
        expect(caseStudy.frontmatter.one_liner).toBeDefined();
        expect(caseStudy.content).toBeDefined();
        expect(caseStudy.slug).toBeDefined();
        
        // bookingCTA is optional, so it can be undefined
        if (caseStudy.frontmatter.bookingCTA) {
          expect(typeof caseStudy.frontmatter.bookingCTA).toBe('object');
          expect(typeof caseStudy.frontmatter.bookingCTA.title).toBe('string');
          expect(typeof caseStudy.frontmatter.bookingCTA.description).toBe('string');
          expect(typeof caseStudy.frontmatter.bookingCTA.buttonText).toBe('string');
          expect(typeof caseStudy.frontmatter.bookingCTA.link).toBe('string');
        }
      }
    }
  });
});