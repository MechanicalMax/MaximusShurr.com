# MaximusShurr.com

<div align="center">
  <h3>I'm Maximus Shurr, it's nice to meet you 🚀</h3>
  <p>
    <a href="https://maximusshurr.com" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/View-Live_Site-4CAF50?style=for-the-badge" alt="Live Site">
    </a>
  </p>
</div>

## Overview

This repository contains the complete source code for my personal portfolio and professional platform.

This site serves as my digital headquarters, showcasing my unique position as both a Mechanical Engineer and Full-Stack Developer. It's designed as a high-conversion platform that reflects my core value proposition: **I engineer realities by connecting the digital and physical worlds**. I don't just write code—I translate physical operations into scalable digital solutions.

### ⚡️ Current Status: Milestone 3 Complete - Enhanced Case Study Platform

This project is under active development with major recent updates.

**Latest Updates (December 2024):**

**Case Study Platform Enhancement:**

- **Complete Case Study Refactor**: Migrated from "work/portfolio" to "case study" terminology across all components
- **Enhanced Homepage Experience**: New FeaturedCaseStudies component with duration-based sorting and seamless background integration
- **Interactive Filtering System**: Advanced case study filtering by skills, technologies, and project status with URL state management
- **Animated Grid System**: Smooth CSS animations with staggered card transitions and proper key-based re-rendering
- **By the Numbers Section**: Dynamic metrics display with count-up animations showcasing portfolio statistics
- **Improved Navigation**: Added case studies link to footer navigation and enhanced user flow
- **Individual Case Study CTAs**: Contextual call-to-action sections on each case study page
- **Cover Image Migration**: Removed deprecated `cover_image` frontmatter field with comprehensive test validation
- **Brand Positioning Update**: Refined messaging to emphasize digital-physical world connection and engineering expertise

**Core Platform Features:**
- **Dynamic Case Study System**: 12 detailed project showcases with `/case-study/[slug]` routing
- **Advanced Filtering & Search**: Multi-dimensional filtering by skills, technologies, and project status
- **Interactive Media Carousels**: Auto-generated from asset folders with smart ordering and captions
- **Animated User Experience**: Count-up animations, staggered grid transitions, and smooth interactions
- **Featured Content System**: Homepage highlights with duration-based sorting and visual hierarchy
- **Comprehensive Analytics**: "By the Numbers" section with real-time portfolio metrics
- **Conversion Optimization**: Strategic CTAs and booking funnels throughout the user journey
- **MDX Content Management**: YAML frontmatter with inline media references and rich formatting
- **SEO & Social Optimization**: Open Graph, Twitter Cards, and structured metadata
- **Property-Based Testing**: Comprehensive test coverage ensuring data integrity and system reliability

**Brand Positioning:**
*"I engineer realities by connecting the digital and physical worlds"* - Emphasizing the unique combination of mechanical engineering expertise and full-stack development capabilities to solve complex, real-world problems.

## Project Roadmap

- ✅ **Milestone 1: The "24-Hour MVP"**

  - Launch a static, professional landing page.

  - Implement a high-conversion `/book` page funnel.

  - (Target: 16Tech Ignition Pitch)

- ✅ **Milestone 2: Dynamic Case Study System**

  - Build the dynamic `[slug]` page template for case studies.

  - Implement MDX-based content management with frontmatter parsing.

  - Create reusable UI components (Header, Video, Testimonial, Content).

  - Update homepage to dynamically generate tiles from case study files.

  - Add comprehensive property-based testing for data integrity.

  - Launch the `/resume` utility page.

  - Implement responsive design and SEO optimization.

- ✅ **Milestone 3: Enhanced Case Study Platform**

  - ✅ **Case Study Refactor:** Complete terminology migration and route restructuring

  - ✅ **Advanced Filtering System:** Multi-dimensional case study filtering with URL state management

  - ✅ **Interactive Animations:** Count-up animations, staggered grid transitions, and smooth UX

  - ✅ **Featured Content System:** Homepage highlights with duration-based sorting

  - ✅ **Navigation Enhancement:** Footer links and improved user flow

  - ✅ **Conversion Optimization:** Strategic CTAs and booking funnels

  - ✅ **Brand Positioning Update:** Refined messaging emphasizing digital-physical world connection

  - ✅ **Code Quality:** Comprehensive testing and deprecated field removal

- 📅 **Milestone 4: Content & Performance Optimization**

  - **Video Production:** Create and embed professional case study videos for all projects

  - **Media Asset Enhancement:** Upload high-quality images, diagrams, and technical screenshots

  - **Content Refinement:** Expand case study narratives with deeper technical details and business outcomes

  - **Performance Optimization:** Advanced image optimization, lazy loading, and Core Web Vitals improvements

  - **Analytics Integration:** User behavior tracking and conversion funnel optimization

## Tech Stack

This portfolio is intentionally built as a portfolio piece itself, demonstrating a modern, professional, and scalable web stack.

| Category       | Technology                    |
|----------------|-------------------------------|
| Framework      | Next.js 16 (App Router)       |
| Language       | TypeScript                    |
| Styling        | Tailwind CSS v4               |
| Content        | MDX with next-mdx-remote      |
| Parsing        | gray-matter (YAML frontmatter)|
| Testing        | Vitest + fast-check (PBT)     |
| Deployment     | Vercel                        |

> **Note:** Content is managed locally as code—no external CMS is needed. All case studies are authored as MDX files with YAML frontmatter for maximum developer control and version history.

## Project Structure

```
MaximusShurr.com/
└── next-web-app/                 # Main Next.js application
    ├── app/                      # App Router pages
    │   ├── page.tsx              # Homepage with dynamic case study tiles
    │   ├── case-study/[slug]/    # Dynamic case study pages
    │   ├── book/                 # Booking/contact page
    │   ├── resume/               # Resume page
    │   └── not-found.tsx         # Custom 404 page
    ├── components/               # Reusable React components
    │   ├── CaseStudyHeader.tsx   # Project metadata display
    │   ├── CaseStudyFilters.tsx  # Advanced filtering system
    │   ├── CaseStudyGrid.tsx     # Animated case study grid
    │   ├── FeaturedCaseStudies.tsx # Homepage featured section
    │   ├── ByTheNumbers.tsx      # Portfolio metrics with animations
    │   ├── CaseStudyTestimonial.tsx # Client testimonials
    │   ├── CaseStudyContent.tsx  # MDX content renderer
    │   ├── MediaCarousel.tsx     # Automatic media carousel
    │   ├── InlineImage.tsx       # Inline media references
    │   └── BookingCTA.tsx        # Conversion-optimized call-to-action
    ├── lib/                      # Core business logic
    │   ├── case-studies.ts       # Case study data fetching & validation
    │   ├── types.ts              # TypeScript interfaces
    │   └── *.test.ts             # Property-based tests
    ├── case_studies/             # MDX content files
    │   ├── corteva-automation-engineer.mdx
    │   ├── clairity-daily.mdx
    │   └── ... (12 total)
    └── public/                   # Static assets
        └── case-study/           # Case study media assets
            └── [slug]/           # Auto-discovered media & social proof
```

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/MechanicalMax/MaximusShurr.com.git
   ```

2. **Navigate to the Next.js app directory**
   ```bash
   cd MaximusShurr.com/next-web-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the site locally.

### Running Tests

```bash
cd next-web-app
npm test
# or
yarn test
```

The test suite includes property-based tests using fast-check to verify:
- Case study discovery and parsing
- Frontmatter validation and deprecated field removal
- Slug-to-route mapping
- Media carousel generation and filtering
- Caption generation consistency
- Social proof detection accuracy
- Homepage thumbnail and icon auto-discovery
- Invalid input handling and security validation

### Building for Production

```bash
cd next-web-app
npm run build
# or
yarn build
```

This generates static HTML for all pages, including all 12 case study routes.

## Flexible Media Carousel System

The site features an automatic media carousel system that generates interactive carousels from asset folders without manual configuration. This follows a "what you see is what you get" principle where folder contents directly determine carousel behavior.

### How It Works

1. **Automatic Discovery**: The system scans `public/case-study/[slug]/` folders for media files
2. **Smart Filtering**: Includes all `.webp` and `.webm` files while excluding `icon.webp` from carousels
3. **Intelligent Ordering**: Applies hierarchy - YouTube → Thumbnail → Videos (A-Z) → Images (A-Z)
4. **Caption Generation**: Converts filenames to human-readable captions (hyphens become spaces)
5. **Social Proof Detection**: Automatically detects icons and YouTube videos for UI badges
6. **Homepage Integration**: Thumbnails and social proof icons are automatically sourced from media folders

### Media Asset Structure

```
public/case-study/[slug]/
├── thumbnail.webp      # Required - Homepage card thumbnail & carousel slide #2
├── icon.webp          # Optional - Homepage social proof badge (excluded from carousel)
├── Circuit-Design.webp # Media asset - becomes carousel slide
├── Demo-Day.webm      # Video asset - becomes carousel slide
└── Final-Product.webp # Media asset - becomes carousel slide
```

**Key Changes from Previous System:**
- ✅ **Thumbnails**: Now auto-discovered from `thumbnail.webp` in media folders (no more `cover_image` frontmatter)
- ✅ **Social Proof Icons**: Now auto-discovered from `icon.webp` in media folders (no more centralized `/logos/` directory)
- ✅ **Homepage Integration**: Homepage tiles automatically use discovered thumbnails and icons
- ✅ **Zero Configuration**: No manual path specification needed in frontmatter

### Slide Hierarchy

The carousel automatically orders slides according to this hierarchy:

1. **YouTube Embed** (if `cover_video_url` exists in frontmatter) - Slide #1
2. **Thumbnail** (`thumbnail.webp`) - Slide #2 (or #1 if no YouTube)
3. **Videos** (all `.webm` files) - Alphabetically sorted
4. **Images** (all `.webp` files except `thumbnail.webp` and `icon.webp`) - Alphabetically sorted

### Inline Media References

Within your MDX content, you can reference any carousel asset using the `InlineImage` component:

```jsx
<InlineImage filename="Circuit-Design.webp" alt="Circuit board layout" />
```

This automatically resolves to the current case study's asset folder and applies Next.js image optimization.

### Video Features

Videos in the carousel automatically include:
- Autoplay (muted for user experience)
- Loop playback
- Responsive sizing
- Fallback handling for loading failures

## Adding New Case Studies

Case studies are authored as MDX files in `next-web-app/case_studies/`. Each file includes YAML frontmatter for metadata and Markdown content for the narrative.

### File Naming Convention
- Use kebab-case: `project-name.mdx`
- The filename (without `.mdx`) becomes the URL slug: `/case-study/project-name`

### Frontmatter Structure

```yaml
---
project_title: "Your Project Title"
one_liner: "A compelling one-sentence description"
project_type: "Web App | Mobile App | Hardware | Hybrid"
status: "Complete | In Progress | Ongoing"
live_url: "https://example.com" # or null
repo_url: "https://github.com/..." # or null
cover_video_url: "https://youtube.com/..." # or null
tech_stack: ["React", "Node.js", "PostgreSQL"]
start_date: "Jan 2025"
end_date: "Jul 2025" # or null for ongoing
testimonial:
  text: "Quote from client or manager"
  author: "John Doe"
  role: "CEO, Company Name"
# or testimonial: null
---
```

**Note:** The `cover_image` field has been removed from frontmatter. Thumbnails are now automatically discovered from `thumbnail.webp` files in the corresponding `/case-study/[slug]/` media folder. Social proof logos are also automatically discovered from `icon.webp` files in the same folders.

### Content Sections

After the frontmatter, structure your case study with these recommended sections:

```markdown
### Product Strategy: The "Business Thinking"

Explain the strategic approach and business context...

### The Problem

Describe the challenge or opportunity...

### The Build

Detail the technical implementation...

### The Outcome

Share results, metrics, and impact...
```

### Media Asset Optimization (Required)
All media **must be optimized before committing.**

This project includes a dedicated npm script that automatically optimizes all case study media in-place, converting files to web-ready formats while preserving human-readable filenames.

#### Run the optimizer
```
npm run optimize-case-study-assets
```

#### What the script does
- Converts images → WebP
- Converts videos → WebM (VP9)
- Strips original file extensions from output names
  - Example: Melodi Piano Project.PNG → Melodi Piano Project.webp
- Enforces a maximum width (1920px)
- Removes audio tracks from videos
- Writes optimized files in the same directory as the originals
- Leaves raw source files untouched (but ignored by Git)

#### Git policy
- ✅ Optimized .webp / .webm files are committed
- ❌ Raw .png, .jpg, .mov, .mp4 files are ignored
- Raw assets may exist locally but are never checked into the repository

This ensures:
- Fast load times
- Small repository size
- Deterministic, repeatable media processing

The system automatically:
- Generates the case study page at `/case-study/[slug]`
- Creates a homepage tile with cover image and metadata
- Sorts projects by end date (most recent first)
- Handles SEO metadata and social media previews

## License

- **Source Code:** Licensed under the [MIT License](LICENSE)
- **Content:** All personal content, including case study text, images, and videos, is All Rights Reserved.