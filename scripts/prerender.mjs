// Puts the rendered HTML into dist/index.html so crawlers, link previews and no-JS visitors
// get real content instead of an empty <div id="root">. React hydrates it in the browser.
import fs from 'node:fs';
import path from 'node:path';
import { render } from '../dist-ssr/entry-server.js';

const dist = path.resolve('dist');
const indexPath = path.join(dist, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

if (!html.includes('<div id="root"></div>')) {
  console.error('prerender: could not find an empty #root in dist/index.html');
  process.exit(1);
}
html = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

// Preload the two fonts used by the first screen so the headline paints sooner.
const fonts = fs.readdirSync(path.join(dist, 'assets'))
  .filter(f => /^(dm-sans-latin-400|manrope-latin-500)-normal-.*\.woff2$/.test(f))
  .map(f => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}"/>`)
  .join('\n');
if (fonts) html = html.replace('</head>', `${fonts}\n</head>`);

fs.writeFileSync(indexPath, html);
const kb = (fs.statSync(indexPath).size / 1024).toFixed(1);
console.log(`prerendered dist/index.html (${kb} kB), preloaded ${fonts ? fonts.split('\n').length : 0} fonts`);
