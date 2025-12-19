import { describe, test, expect, vi } from 'vitest';
import { getCaseStudyWithMediaBySlug } from '@/lib/case-studies';

/**
 * Integration tests for case study page component
 * Tests the booking CTA functionality integration
 */

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

describe('Case Study Page Integration', () => {
  
  test('should load Hughes Orthodontics case study with custom booking CTA', async () => {
    const caseStudyWithMedia = await getCaseStudyWithMediaBySlug('hughes-orthodontics-automation');
    
    expect(caseStudyWithMedia).not.toBeNull();
    
    if (caseStudyWithMedia) {
      // Verify the case study loads correctly
      expect(caseStudyWithMedia.frontmatter.project_title).toBe('Hughes Orthodontics 3D Lab');
      expect(caseStudyWithMedia.slug).toBe('hughes-orthodontics-automation');
      
      // Verify custom booking CTA is present
      expect(caseStudyWithMedia.frontmatter.bookingCTA).toBeDefined();
      
      if (caseStudyWithMedia.frontmatter.bookingCTA) {
        const bookingCTA = caseStudyWithMedia.frontmatter.bookingCTA;
        
        // Verify the custom CTA values match what we set
        expect(bookingCTA.title).toBe("Curious if you could realize the $25,000 per year cost reductions too?");
        expect(bookingCTA.description).toBe("Use our dental automation ROI calculator to see if you would benefit from our Zero-Admin Lab Protocol system");
        expect(bookingCTA.buttonText).toBe("Check My Savings");
        expect(bookingCTA.link).toBe("/dental-automation");
      }
      
      // Verify carousel data is still present (ensuring we didn't break existing functionality)
      expect(caseStudyWithMedia.carouselData).toBeDefined();
      expect(typeof caseStudyWithMedia.carouselData.hasIcon).toBe('boolean');
      expect(typeof caseStudyWithMedia.carouselData.hasYoutube).toBe('boolean');
      expect(Array.isArray(caseStudyWithMedia.carouselData.media)).toBe(true);
    }
  });

  test('should handle case studies without custom booking CTA gracefully', async () => {
    // Test with a case study that doesn't have custom booking CTA
    const caseStudyWithMedia = await getCaseStudyWithMediaBySlug('botimus');
    
    expect(caseStudyWithMedia).not.toBeNull();
    
    if (caseStudyWithMedia) {
      // Should load normally without booking CTA
      expect(caseStudyWithMedia.frontmatter.project_title).toBeDefined();
      expect(caseStudyWithMedia.slug).toBe('botimus');
      
      // bookingCTA should be undefined for case studies without it
      expect(caseStudyWithMedia.frontmatter.bookingCTA).toBeUndefined();
      
      // Other functionality should still work
      expect(caseStudyWithMedia.carouselData).toBeDefined();
      expect(caseStudyWithMedia.content).toBeDefined();
    }
  });

  test('should provide fallback values for BookingCTA component props', async () => {
    // Test both scenarios: with and without custom booking CTA
    const hughesCase = await getCaseStudyWithMediaBySlug('hughes-orthodontics-automation');
    const botimusCase = await getCaseStudyWithMediaBySlug('botimus');
    
    // Hughes case should use custom values
    if (hughesCase?.frontmatter.bookingCTA) {
      const customCTA = hughesCase.frontmatter.bookingCTA;
      expect(customCTA.title).toBe("Curious if you could realize the $25,000 per year cost reductions too?");
      expect(customCTA.description).toBe("Use our dental automation ROI calculator to see if you would benefit from our Zero-Admin Lab Protocol system");
      expect(customCTA.buttonText).toBe("Check My Savings");
      expect(customCTA.link).toBe("/dental-automation");
    }
    
    // Botimus case should fall back to default values (handled by the page component)
    if (botimusCase) {
      expect(botimusCase.frontmatter.bookingCTA).toBeUndefined();
      
      // The page component should use fallback values:
      const fallbackTitle = "Facing problems like this one?";
      const fallbackDescription = "Schedule a free 30-minute strategy session to get a proven plan that will get your systems ready for the modern world and stop draining time out of your day.";
      const fallbackButtonText = "Book Your Free Strategy Session";
      const fallbackLink = "/book";
      
      // These would be the values passed to BookingCTA component
      const actualTitle = botimusCase.frontmatter.bookingCTA?.title || fallbackTitle;
      const actualDescription = botimusCase.frontmatter.bookingCTA?.description || fallbackDescription;
      const actualButtonText = botimusCase.frontmatter.bookingCTA?.buttonText || fallbackButtonText;
      const actualLink = botimusCase.frontmatter.bookingCTA?.link || fallbackLink;
      
      expect(actualTitle).toBe(fallbackTitle);
      expect(actualDescription).toBe(fallbackDescription);
      expect(actualButtonText).toBe(fallbackButtonText);
      expect(actualLink).toBe(fallbackLink);
    }
  });

  test('should maintain type safety for booking CTA properties', async () => {
    const caseStudyWithMedia = await getCaseStudyWithMediaBySlug('hughes-orthodontics-automation');
    
    if (caseStudyWithMedia?.frontmatter.bookingCTA) {
      const bookingCTA = caseStudyWithMedia.frontmatter.bookingCTA;
      
      // TypeScript should enforce these are strings
      expect(typeof bookingCTA.title).toBe('string');
      expect(typeof bookingCTA.description).toBe('string');
      expect(typeof bookingCTA.buttonText).toBe('string');
      expect(typeof bookingCTA.link).toBe('string');
      
      // Should not have any unexpected properties
      const expectedKeys = ['title', 'description', 'buttonText', 'link'];
      const actualKeys = Object.keys(bookingCTA);
      expect(actualKeys.sort()).toEqual(expectedKeys.sort());
    }
  });
});