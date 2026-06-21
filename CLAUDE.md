# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Palina Markovich, a UI/UX Designer. This is a static single-page website built with vanilla HTML/CSS and bundled using Vite. The site showcases design work, professional experience, skills, and contact information.

## Shorthand Commands

When the user issues one of these one-word/short commands, perform the described workflow:

- **update text** — Update the requested copy in `index.html` and proofread it (spelling, grammar, clarity). If the intended wording or meaning is unclear or something looks wrong, ask the user rather than guessing or silently "fixing" it.
- **show** — Run the local dev server (`npm run dev`) and send the user the local URL it prints.
- **publish** — Run `npm run build` and verify it completes with no errors. Then commit the changes and push to `master` (this triggers the GitHub Pages deploy workflow). If the build fails, stop and report the errors instead of committing. Once the push succeeds, if a local dev server (from **show**) is still running, ask the user whether they still need it; stop the server if they don't.

## Development Commands

### Development server
```bash
npm run dev
```
Starts Vite development server with hot reload

### Build for production
```bash
npm run build
```
Builds the site to Vite's default `dist/` directory (gitignored). Deployment is handled by CI, not by committing the build output.

### Preview production build
```bash
npm run preview
```
Previews the production build from `dist/` locally

## Project Structure

- **index.html** - Main HTML file containing all page content and structure
- **style.css** - All styles in a single CSS file using modern CSS features (container queries, CSS nesting, custom properties)
- **public/** - Static assets served directly (copied to build root verbatim):
  - `fonts/` - SF Pro Display and ZT Neue Ralewe font files (woff2)
  - `icons/` - SVG icons for apps, contacts, and country flags
  - `images/` - Portfolio work cover images
  - `certificates/` - PDF certificates linked from the page
- **.github/workflows/deploy.yml** - CI that builds and deploys to GitHub Pages
- **dist/** - Production build output (gitignored; produced by `npm run build`)

## Architecture Notes

### Single-file Architecture
The entire site is built as a single HTML file with inline CSS. There is no JavaScript - all interactivity comes from CSS hover/focus states.

### CSS Architecture
- Uses modern CSS features extensively: CSS nesting, container queries, custom properties, color-mix()
- Mobile-first responsive design using container queries rather than traditional media queries
- Two-column grid layout on desktop (1:1.62 golden ratio), collapses to a single column on mobile
- Container queries are used for component-level responsive behavior

### Design System
CSS custom properties in `:root`:
- Color scheme: `--color--background`, `--color--text`, `--color--accent`
- Spacing: `--body--inline-padding`, `--body--block-padding`
- Layout: `--body--max-inline-size` (75rem max width)

### Font Loading
Uses @font-face with `font-display: swap` for:
- SF Pro Display (Regular 400, Medium 500, Bold 700)
- ZT Neue Ralewe (Italic 400) - used for accent headings

### Deployment
- GitHub Actions (`.github/workflows/deploy.yml`) builds with Vite and deploys the `dist/` artifact to GitHub Pages on every push to `master`. This requires the repo's Pages source to be set to "GitHub Actions" (not "Deploy from a branch"). Build output is not committed.
- All asset paths use root-relative paths (`/fonts/`, `/icons/`, `/images/`); the repo is served at the domain root since it's a `*.github.io` user/org site (Vite `base` is the default `/`).

## Key Implementation Details

### Section Grid Pattern
Each section uses a consistent 2-column subgrid pattern:
```
heading | decoration (border-top)
heading | content
```
This creates the distinctive layout where headings appear in the left column and content in the right.

### Responsive Works Gallery
The works section uses different layouts based on container width:
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Horizontal scroll with snap points

### Dynamic Grid Lists
Skills, languages, software, and contacts use `list--grid` modifier with CSS grid auto-flow to create multi-column layouts that adapt based on item count and container width.