#!/usr/bin/env node
/**
 * Pull published content from PocketBase into src/data before vite build.
 * Falls back silently if PocketBase is unreachable (uses committed JSON).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PocketBase from 'pocketbase';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const loadEnv = (file) => {
  const path = join(root, file);
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq <= 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
};

loadEnv('.env');
loadEnv('pocketbase/.env');

const url = (process.env.POCKETBASE_URL || 'http://127.0.0.1:9112').replace(/\/$/, '');

const pb = new PocketBase(url);
pb.autoCancellation(false);

async function listPublished(collection) {
  return pb.collection(collection).getFullList({ sort: 'sortOrder', filter: 'status = "published"' });
}

async function main() {
  try {
    const tours = await listPublished('tours');
    if (tours.length) {
      const payloads = tours.map((row) => {
        const base = row.payload && typeof row.payload === 'object' ? { ...row.payload } : {};
        return {
          ...base,
          path: row.path || base.path,
          slug: row.slug || base.slug,
          title: row.title || base.title,
          status: row.status,
        };
      });
      writeFileSync(join(root, 'src/data/tours.json'), JSON.stringify(payloads, null, 2));
      console.log('synced tours.json from PocketBase', tours.length);
    }

    const places = await listPublished('places');
    if (places.length) {
      const items = places.map((r) => r.payload || r);
      const body = `export const places = ${JSON.stringify(items, null, 2)};\n`;
      writeFileSync(join(root, 'src/data/places.js'), body);
      console.log('synced places.js', places.length);
    }

    const faq = await listPublished('faq_items');
    if (faq.length) {
      const pairs = faq.map((r) => [r.question, r.answer]);
      const body = `export function faqItems() {\n  return ${JSON.stringify(pairs, null, 2)};\n}\n`;
      writeFileSync(join(root, 'src/data/faq.js'), body);
      console.log('synced faq.js', faq.length);
    }

    const ex = await listPublished('experiences');
    if (ex.length) {
      const tuples = ex.map((r) => {
        const p = r.payload || {};
        return [p.title || r.title, p.headline || '', p.photo || '', p.body || '', p.planInterest || ''];
      });
      const body = `export const experiences = ${JSON.stringify(tuples, null, 2)};\n`;
      writeFileSync(join(root, 'src/data/experiences.js'), body);
      console.log('synced experiences.js', ex.length);
    }

    const levels = await listPublished('comfort_levels');
    if (levels.length) {
      const obj = {};
      for (const row of levels) obj[row.levelKey || row.title] = row.payload || {};
      const body = `export const levels = ${JSON.stringify(obj, null, 2)};\n`;
      writeFileSync(join(root, 'src/data/levels.js'), body);
      console.log('synced levels.js', levels.length);
    }

    writeFileSync(
      join(root, 'src/data/cms-meta.json'),
      JSON.stringify({ syncedAt: new Date().toISOString(), pocketbaseUrl: url }, null, 2),
    );
  } catch (e) {
    console.warn('PocketBase sync skipped (using committed files):', e.message || e);
  }
}

await main();
