# Professional Resume Generator

A resume toolchain that converts Markdown to styled HTML and PDF.

## Live Resume

View the live resume at: **<https://blog.bweave.dev/resume/>**

## Usage

```bash
# Install dependencies
npm install

# View resume locally with auto-reload
npm run dev

# Build both HTML and PDF (creates resume.html and index.html)
npm run build

# Build just HTML
npm run build:html

# Build just PDF
npm run build:pdf
```

## Local Development

Run `npm run dev` to:

1. Build HTML and PDF from your `resume.md`
2. Start a local server at <http://localhost:8888/resume.html>
3. Watch for changes and auto-rebuild
4. Automatically open in your browser

The dev server watches `resume.md` and `styles/resume.css` and rebuilds both HTML and PDF when changes are detected.

## GitHub Actions & Deployment

The workflow (`.github/workflows/build-resume.yml`) automatically:

- Triggers on pushes to main branch when resume or style files change
- Builds both HTML and PDF versions (including `index.html` for GitHub Pages)
- Uploads artifacts with 30-day retention
- Deploys to GitHub Pages at `https://blog.bweave.dev/resume/`
- Works on pull requests for testing

