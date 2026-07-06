import fs from 'fs';
import path from 'path';

const srcDir = './src';
const destDir = './dist';

// Helper to delete directory recursively (alternative to rmSync)
function cleanDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Cleaned ${dir}`);
  }
}

try {
  cleanDirectory(destDir);

  // Copy src to dist recursively
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log(`Successfully built: Copied ${srcDir} to ${destDir}`);
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
