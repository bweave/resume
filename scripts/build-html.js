const fs = require('fs');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

function buildHTML() {
  try {
    // Read the markdown file
    const markdownContent = fs.readFileSync('resume.md', 'utf8');

    // Read the CSS file
    const cssContent = fs.readFileSync('styles/resume.css', 'utf8');

    // Parse frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = markdownContent.match(frontmatterRegex);
    let title = 'Resume';
    let content = markdownContent;

    if (match) {
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      if (titleMatch) {
        title = titleMatch[1].trim();
      }
      content = markdownContent.replace(frontmatterRegex, '');
    }

    // Convert markdown to HTML
    let htmlContent = md.render(content);

    // Transform h4 elements to add date splitting
    htmlContent = htmlContent.replace(
      /<h4>(.*?),\s*([^<]*)<\/h4>/g,
      '<h4 class="role-header"><span class="role">$1</span><span class="date">$2</span></h4>'
    );

    // Only wrap role sections (h4 + following ul) in containers
    htmlContent = htmlContent.replace(
      /(<h4 class="role-header">.*?<\/h4>)\s*(<ul>.*?<\/ul>)/gs,
      '<div class="role-section">$1$2</div>'
    );

    // Create the full HTML document
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Resume</title>
    <style>
        ${cssContent}
    </style>
</head>
<body>
    <div class="resume-container">
        ${htmlContent}
    </div>
</body>
</html>`;

    // Write to dist folder
    fs.writeFileSync('dist/resume.html', fullHTML);
    fs.writeFileSync('dist/index.html', fullHTML);
    console.log('✅ HTML resume generated at dist/resume.html and dist/index.html');

  } catch (error) {
    console.error('❌ Error building HTML:', error.message);
    process.exit(1);
  }
}

buildHTML();
