import fs from 'fs';
import path from 'path';

const src = path.resolve('dist/client');
const dest = path.resolve('.next');

try {
  if (fs.existsSync(src)) {
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
    fs.writeFileSync(path.join(dest, 'BUILD_ID'), 'production');
    console.log('✓ Successfully copied dist/client to .next for Vercel deployment.');
  }
} catch (err) {
  console.error('Copy build warning:', err);
}
