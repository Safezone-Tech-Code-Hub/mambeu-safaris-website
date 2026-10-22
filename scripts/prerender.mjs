import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const serverOut = path.join(dist, 'server');

const tours = JSON.parse(fs.readFileSync(path.join(root, 'src/data/tours.json'), 'utf8'));
const routes = [
  '',
  'safaris',
  'about',
  'comfort',
  'destinations',
  'kilimanjaro',
  'zanzibar',
  'experiences',
  'travel-guide',
  'plan',
  ...['serengeti', 'ngorongoro', 'tarangire', 'lake-manyara', 'ndutu', 'lake-natron'].map(
    (s) => 'destinations/' + s,
  ),
  ...tours.map((t) => t.path),
];

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

await build({
  root,
  configFile: path.join(root, 'vite.config.js'),
  build: {
    ssr: path.join(root, 'src/entry-server.jsx'),
    outDir: serverOut,
    emptyOutDir: true,
    manifest: false,
  },
});

const { render } = await import(pathToFileURL(path.join(serverOut, 'entry-server.js')).href);
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const writePage = (route, urlForRender) => {
  const { html, title, description } = render(urlForRender);
  const page = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escape(description)}"`,
    )
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const dir = path.join(dist, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page);
};

for (const route of routes) {
  const url = route ? `/${route}/` : '/';
  writePage(route, url);
}

writePage('not-found-tmp', '/not-found/');
fs.renameSync(path.join(dist, 'not-found-tmp', 'index.html'), path.join(dist, '404.html'));
fs.rmSync(path.join(dist, 'not-found-tmp'), { recursive: true, force: true });

// Root index already written for ''; remove Vite's default only-file conflict handled.
// Drop SSR bundle from public deploy output.
fs.rmSync(serverOut, { recursive: true, force: true });

console.log(`Pre-rendered ${routes.length} pages and 404.html.`);
