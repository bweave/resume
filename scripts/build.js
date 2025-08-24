const { execSync } = require('child_process');

function build() {
  try {
    console.log('🏗️  Building resume...');

    // Build HTML
    console.log('📄 Generating HTML...');
    execSync('node scripts/build-html.js', { stdio: 'inherit' });

    // Build PDF
    console.log('📑 Generating PDF...');
    execSync('node scripts/build-pdf.js', { stdio: 'inherit' });

    console.log('✅ Build complete! Files generated:');
    console.log('   - dist/resume.html');
    console.log('   - dist/resume.pdf');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
