# Matthieu Felker Portfolio - Replit Setup

## Overview
This is a professional portfolio website built with Astro 2.5.7, showcasing work at Uresco Construction Materials. The portfolio highlights expertise in web/software development, carpentry, warehouse management, 3D visualization, and geolocation applications.

## Project Architecture
- **Framework**: Astro 2.5.7 (static site generator with React components)
- **Styling**: Tailwind CSS with custom typography
- **Content**: MDX for blog posts and project pages
- **Build Output**: Static files generated to `dist/` directory

## Recent Changes (November 27, 2025)
- Configured Astro dev server to run on `0.0.0.0:5000` for Replit environment
- Updated site tagline to "Web & Software Developer | System Ops | Builder"
- Added "System Operations" expertise to all pages
- Updated intro to emphasize bridging software and construction
- Focused content on warehouse, inventory, and logistics tools at Uresco
- Mentioned Web3/Hedera projects as outside-of-work focus
- Completely rewrote About page with skills in web development, system ops, warehouse/inventory management, Web3, 3D visualization, and building expertise
- Updated portfolio page with System Ops as primary secondary expertise
- Set up workflow "Astro Dev Server" to run `npm run dev`
- Configured deployment as static site with build command

## Development Setup
### Server Configuration
- **Host**: 0.0.0.0 (required for Replit proxy)
- **Port**: 5000 (required for Replit webview)
- **Dev Server**: `npm run dev` starts Astro dev server

### Dependencies
All dependencies installed via npm. Key packages:
- Astro core and integrations (MDX, React, Tailwind, Sitemap)
- React and Framer Motion for interactive components
- Image optimization with Sharp
- TypeScript and ESLint for code quality

## Deployment
- **Type**: Static site
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- The site builds to static HTML/CSS/JS files that can be published

## Project Structure
```
/
├── src/
│   ├── components/     # Astro and React components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages (file-based routing)
│   ├── styles/         # Global CSS
│   ├── data/           # Site metadata and content
│   └── assets/         # Images and static assets
├── public/             # Public static files
└── dist/              # Build output (generated)
```

## Notes
- The site is a static portfolio with no backend components
- All content is managed through MDX files and TypeScript data files
- Images are optimized during build using Sharp
- Site supports dark/light theme toggle
