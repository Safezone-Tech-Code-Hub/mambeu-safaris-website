#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PocketBase from 'pocketbase';
import { collectionDefs } from './pb-schema.mjs';
import { pageRegistry } from './default-page-content.mjs';

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
const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || process.env.PB_ADMIN_EMAIL;
const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || process.env.PB_ADMIN_PASSWORD;
const staffEmail = process.env.STAFF_BOOTSTRAP_EMAIL || adminEmail;
const staffPassword = process.env.STAFF_BOOTSTRAP_PASSWORD || adminPassword;

if (!adminEmail || !adminPassword) {
  console.error('Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD (pocketbase/.env or env).');
  process.exit(1);
}

const pb = new PocketBase(url);
pb.autoCancellation(false);

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function ensureCollections() {
  for (const def of collectionDefs) {
    try {
      const existing = await pb.collections.getFirstListItem(`name="${def.name}"`);
      await pb.collections.update(existing.id, def);
      console.log('updated collection', def.name);
    } catch {
      await pb.collections.create(def);
      console.log('created collection', def.name);
    }
  }
}

async function upsertByFilter(collection, filter, data) {
  try {
    const row = await pb.collection(collection).getFirstListItem(filter);
    await pb.collection(collection).update(row.id, data);
    return 'updated';
  } catch {
    await pb.collection(collection).create(data);
    return 'created';
  }
}

async function seedTours() {
  const tours = JSON.parse(readFileSync(join(root, 'src/data/tours.json'), 'utf8'));
  for (const [index, tour] of tours.entries()) {
    const action = await upsertByFilter('tours', `path="${tour.path}"`, {
      path: tour.path,
      slug: tour.slug,
      title: tour.title,
      style: tour.style || '',
      duration: tour.duration || '',
      days: tour.days || 0,
      image: tour.image || '',
      description: tour.description || '',
      status: 'published',
      publishedAt: new Date().toISOString().slice(0, 10),
      sortOrder: index,
      featured: Boolean(tour.featured),
      payload: tour,
    });
    console.log(action, 'tour', tour.path);
  }
}

async function seedPlaces() {
  const mod = await import(join(root, 'src/data/places.js'));
  const places = mod.places;
  for (const [index, place] of places.entries()) {
    const action = await upsertByFilter('places', `slug="${place.slug}"`, {
      slug: place.slug,
      name: place.name,
      status: 'published',
      sortOrder: index,
      payload: place,
    });
    console.log(action, 'place', place.slug);
  }
}

async function seedExperiences() {
  const mod = await import(join(root, 'src/data/experiences.js'));
  for (const [index, row] of mod.experiences.entries()) {
    const [title, headline, photo, body, planInterest] = row;
    const slug = slugify(title);
    const payload = { title, headline, photo, body, planInterest };
    const action = await upsertByFilter('experiences', `slug="${slug}"`, {
      slug,
      title,
      status: 'published',
      sortOrder: index,
      payload,
    });
    console.log(action, 'experience', slug);
  }
}

async function seedComfort() {
  const mod = await import(join(root, 'src/data/levels.js'));
  const entries = Object.entries(mod.levels);
  for (const [index, [levelKey, payload]] of entries.entries()) {
    const action = await upsertByFilter('comfort_levels', `levelKey="${levelKey}"`, {
      levelKey,
      title: levelKey,
      status: 'published',
      sortOrder: index,
      payload,
    });
    console.log(action, 'comfort', levelKey);
  }
}

async function seedFaq() {
  const mod = await import(join(root, 'src/data/faq.js'));
  const items = mod.faqItems();
  for (const [index, [question, answer]] of items.entries()) {
    const esc = question.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const action = await upsertByFilter('faq_items', `question="${esc}"`, {
      question,
      answer,
      status: 'published',
      sortOrder: index,
    });
    console.log(action, 'faq', index + 1);
  }
}

async function seedPages() {
  for (const page of pageRegistry) {
    const action = await upsertByFilter('page_content', `pageKey="${page.pageKey}"`, {
      pageKey: page.pageKey,
      label: page.label,
      status: 'published',
      content: page.content,
    });
    console.log(action, 'page', page.pageKey);
  }
}

async function seedSettings() {
  await upsertByFilter('site_settings', 'key="public"', {
    key: 'public',
    value: {
      siteUrl: 'https://new-mambeu.schoolhub.space',
      pocketbaseUrl: 'https://dashboard-mambeu.schoolhub.space',
    },
  });
}

async function seedStaff() {
  if (!staffEmail || !staffPassword) return;
  try {
    await pb.collection('staff').getFirstListItem(`email="${staffEmail.replace(/"/g, '\\"')}"`);
    console.log('staff user exists', staffEmail);
  } catch {
    await pb.collection('staff').create({
      email: staffEmail,
      password: staffPassword,
      passwordConfirm: staffPassword,
      name: 'Mambeu Admin',
      role: 'admin',
      permissions: ['all'],
    });
    console.log('created staff admin', staffEmail);
  }
}

await pb.admins.authWithPassword(adminEmail, adminPassword);
await ensureCollections();
await seedSettings();
await seedPages();
await seedTours();
await seedPlaces();
await seedExperiences();
await seedComfort();
await seedFaq();
await seedStaff();
console.log('Seed complete.');
