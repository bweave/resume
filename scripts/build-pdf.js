const fs = require('fs');
const puppeteer = require('puppeteer');
const { execSync } = require('child_process');

async function buildPDF() {
  try {
    // First build the HTML
    console.log('📄 Building HTML...');
    execSync('node scripts/build-html.js', { stdio: 'inherit' });

    // Check if HTML file exists
    if (!fs.existsSync('dist/resume.html')) {
      throw new Error('HTML file not found. Please run build:html first.');
    }

    console.log('🚀 Generating PDF...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Read the HTML content
    const htmlContent = fs.readFileSync('dist/resume.html', 'utf8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Set viewport for consistent rendering
    await page.setViewport({ width: 800, height: 1200 });

    // Generate PDF with professional settings
    await page.pdf({
      path: 'dist/resume.pdf',
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      displayHeaderFooter: false,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      omitBackground: false
    });

    await browser.close();
    console.log('✅ PDF resume generated at dist/resume.pdf');

  } catch (error) {
    console.error('❌ Error building PDF:', error.message);
    process.exit(1);
  }
}

buildPDF();
