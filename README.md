# Professional Resume Generator

A professional resume toolchain that converts Markdown to styled HTML and PDF formats, optimized for executive engineering positions.

## Features

- **Professional styling** - Clean, executive-level design with sans-serif fonts
- **Smart layouts** - Role titles and dates automatically split across lines
- **Live development** - Auto-rebuilds HTML and PDF when files change
- **PDF generation** - High-quality PDFs via Puppeteer with proper page breaks
- **GitHub Actions** - Automated builds and GitHub Pages deployment
- **Responsive design** - Optimized for both screen and print

## Quick Start

```bash
# Install dependencies
npm install

# View resume locally with auto-reload
npm run dev

# Build both HTML and PDF
npm run build

# Build just HTML
npm run build:html

# Build just PDF  
npm run build:pdf
```

## Local Development

Run `npm run dev` to:
1. Build HTML and PDF from your `resume.md`
2. Start a local server at http://localhost:8888/resume.html
3. Watch for changes and auto-rebuild
4. Automatically open in your browser

The dev server watches `resume.md` and `styles/resume.css` and rebuilds both HTML and PDF when changes are detected.

## GitHub Actions

The workflow (`.github/workflows/build-resume.yml`) automatically:
- Triggers on pushes to main branch when resume or style files change
- Builds both HTML and PDF versions
- Uploads PDF as downloadable artifact (30-day retention)
- Deploys HTML to GitHub Pages for live viewing
- Works on pull requests for testing

## Resume Format

Your `resume.md` supports:
- **Frontmatter** with title metadata
- **Standard Markdown** with heading hierarchy
- **Role/date splitting** - Automatically formats "Title, Date" into split layout
- **Contact info** - Inline spans with `.contact-info` class
- **Professional sections** - Experience, skills, education, etc.

## File Structure

```
├── resume.md              # Your resume content (Markdown)
├── styles/resume.css      # Professional styling
├── scripts/
│   ├── build.js          # Build both formats
│   ├── build-html.js     # HTML generation
│   ├── build-pdf.js      # PDF generation via Puppeteer
│   └── serve.js          # Development server with watch
├── dist/
│   ├── resume.html       # Generated HTML
│   └── resume.pdf        # Generated PDF
├── .github/workflows/
│   └── build-resume.yml  # CI/CD automation
└── package.json          # Dependencies and scripts
```

## Customization

- **Styling**: Edit `styles/resume.css` for colors, fonts, and layout
- **Content**: Edit `resume.md` for your information
- **Build process**: Modify scripts in `scripts/` directory
- **CI/CD**: Adjust `.github/workflows/build-resume.yml` for deployment