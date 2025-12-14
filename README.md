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

This repository contains the complete source code for my personal portfolio.

This site is my digital home base, designed to showcase my journey as a full-stack developer and mechanical engineer. It's built to be a high-velocity conversion engine that reflects my "Cofounder" brand: I don't just write code; I ship complete, value-driven products.

### ⚡️ Current Status: Milestone 2 Complete - Dynamic Case Study System

This project is under active development.

**Milestone 2 is now complete!** The site now features a fully dynamic case study system with:

- Dynamic `/work/[slug]` pages for all 12 case studies
- MDX-based content management with YAML frontmatter
- Automatic homepage tile generation from case study files
- **Flexible Media Carousel System** - Automatically generates interactive carousels from asset folders
- **Inline Media References** - Reference any carousel asset within markdown content
- SEO optimization with Open Graph and Twitter Card metadata
- Responsive design across mobile, tablet, and desktop
- Property-based testing for data integrity

All project tiles now link to their respective case study pages, showcasing detailed project narratives with rich metadata, tech stacks, timelines, and testimonials.

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

- ➡️ **Milestone 3: Content Enhancement & Polish**

  - **Video Production:** Create and embed professional case study videos for all projects.

  - **Media Assets:** Upload high-quality images, diagrams, and screenshots for each case study.

  - **Homepage UX:** Polish the homepage experience with improved animations, transitions, and visual hierarchy.

  - **Content Refinement:** Expand and refine case study narratives with deeper technical details and business outcomes.

  - **Performance Optimization:** Implement advanced image optimization and lazy loading.

- 📅 **Milestone 4: Advanced Features**

  - Add filtering and search functionality for case studies.

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
    │   ├── work/[slug]/          # Dynamic case study pages
    │   ├── book/                 # Booking/contact page
    │   ├── resume/               # Resume page
    │   └── not-found.tsx         # Custom 404 page
    ├── components/               # Reusable React components
    │   ├── CaseStudyHeader.tsx   # Project metadata display
    │   ├── CaseStudyVideo.tsx    # YouTube video embed
    │   ├── CaseStudyTestimonial.tsx # Client testimonials
    │   ├── CaseStudyContent.tsx  # MDX content renderer
    │   ├── MediaCarousel.tsx     # Automatic media carousel
    │   └── InlineImage.tsx       # Inline media references
    ├── lib/                      # Core business logic
    │   ├── case-studies.ts       # Case study data fetching & validation
    │   ├── types.ts              # TypeScript interfaces
    │   └── *.test.ts             # Property-based tests
    ├── case_studies/             # MDX content files
    │   ├── corteva-automation-engineer.mdx
    │   ├── clairity-daily.mdx
    │   └── ... (12 total)
    └── public/                   # Static assets
        └── work/                 # Case study media assets
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
- Frontmatter validation
- Slug-to-route mapping
- Media carousel generation and filtering
- Caption generation consistency
- Social proof detection accuracy
- Invalid input handling

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

1. **Automatic Discovery**: The system scans `public/work/[slug]/` folders for media files
2. **Smart Filtering**: Includes all `.webp` and `.webm` files while excluding `icon.webp` from carousels
3. **Intelligent Ordering**: Applies hierarchy - YouTube → Thumbnail → Videos (A-Z) → Images (A-Z)
4. **Caption Generation**: Converts filenames to human-readable captions (hyphens become spaces)
5. **Social Proof Detection**: Automatically detects icons and YouTube videos for UI badges
6. **Homepage Integration**: Thumbnails and social proof icons are automatically sourced from media folders

### Media Asset Structure

```
public/work/[slug]/
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
- The filename (without `.mdx`) becomes the URL slug: `/work/project-name`

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

**Note:** The `cover_image` field has been removed from frontmatter. Thumbnails are now automatically discovered from `thumbnail.webp` files in the corresponding `/work/[slug]/` media folder. Social proof logos are also automatically discovered from `icon.webp` files in the same folders.

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
- Generates the case study page at `/work/[slug]`
- Creates a homepage tile with cover image and metadata
- Sorts projects by end date (most recent first)
- Handles SEO metadata and social media previews

## License

- **Source Code:** Licensed under the [MIT License](LICENSE)
- **Content:** All personal content, including case study text, images, and videos, is All Rights Reserved.