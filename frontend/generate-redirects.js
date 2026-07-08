import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const redirectsPath = path.join(distDir, '_redirects');

// Make sure output folder exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Default SPA fallback so page refreshes don't return 404s
let content = `/*    /index.html    200\n`;

// Read the backend URL from environment variables
const backendUrl = process.env.VITE_BACKEND_URL || process.env.BACKEND_URL;

if (backendUrl) {
  // Normalize the URL: remove trailing slash
  const normalizedUrl = backendUrl.replace(/\/$/, '');
  
  // Prepends the API proxy rule before the fallback rule
  content = `/api/*    ${normalizedUrl}/api/:splat    200\n` + content;
  console.log(`[Redirects Generator] Proxying /api/* to ${normalizedUrl}/api/*`);
} else {
  console.log('[Redirects Generator] VITE_BACKEND_URL not set. Only SPA routing fallback configured.');
}

fs.writeFileSync(redirectsPath, content);
console.log(`[Redirects Generator] successfully wrote _redirects to ${redirectsPath}`);
