const { execSync, spawn } = require('child_process');
const fs = require('fs');

function buildResume() {
  try {
    execSync('node scripts/build-html.js', { stdio: 'pipe' });
    execSync('node scripts/build-pdf.js', { stdio: 'pipe' });
    console.log('🔄 Resume rebuilt (HTML + PDF)');
  } catch (error) {
    console.error('❌ Build error:', error.message);
  }
}

function serve() {
  try {
    // Build HTML and PDF first
    console.log('📄 Building resume...');
    execSync('node scripts/build.js', { stdio: 'inherit' });

    // Watch for file changes
    console.log('👀 Watching for changes...');
    fs.watchFile('resume.md', { interval: 1000 }, buildResume);
    fs.watchFile('styles/resume.css', { interval: 1000 }, buildResume);

    // Start the server
    console.log('🚀 Starting local server...');
    console.log('📁 Serving from: http://localhost:8888/resume.html');
    console.log('💡 Press Ctrl+C to stop the server');
    console.log('🔄 Auto-rebuilding HTML + PDF on file changes');

    const server = spawn('npx', ['http-server', 'dist', '-p', '8888', '-o', '/resume.html'], {
      stdio: 'inherit'
    });

    // Handle cleanup
    process.on('SIGINT', () => {
      console.log('\n👋 Stopping server...');
      fs.unwatchFile('resume.md');
      fs.unwatchFile('styles/resume.css');
      server.kill();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    process.exit(1);
  }
}

serve();
