import { places } from '../data/places.js';
import toursStatic from '../data/tours.json';
import { destinations } from './destinations.js';
import { experiences } from './experiences.js';
import { urlKey } from './plan-link.js';

/** @typedef {{ kind: 'experience' | 'destination' | 'journey'; slug: string; title: string }} Interest */

const KIND_LABEL = {
  experience: 'Experience',
  destination: 'Destination',
  journey: 'Journey',
};

const EXPERIENCE_ALIASES = {
  family: 'family-safaris',
  romantic: 'romantic-bush-dinner',
  balloon: 'hot-air-balloon',
  culture: 'cultural-connections',
  'short-day-tours': 'cultural-connections',
  'zanzibar-beach': 'zanzibar-beach-excursions',
  'zanzibar-beach-excursions': 'zanzibar-beach-excursions',
};

const DESTINATION_ALIASES = {
  zanzibar: 'zanzibar',
  kilimanjaro: 'kilimanjaro',
};

function readAll(sp, key) {
  if (!sp) return [];
  if (typeof sp.getAll === 'function') return sp.getAll(key).filter(Boolean);
  const v = sp[key];
  if (Array.isArray(v)) return v.filter(Boolean);
  return typeof v === 'string' && v ? [v] : [];
}

function splitSlugs(raw) {
  return String(raw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function findTour(tours, slug) {
  return (tours || []).find(
    (t) =>
      t.slug === slug ||
      t.path === slug ||
      t.path === `journey-${slug}` ||
      t.title === slug,
  );
}

// destinations.js and places.js overlap on serengeti, ngorongoro, tarangire and
// lake-manyara; destinations.js wins.
function findDestination(slug) {
  const fromDest = destinations.find((x) => x.slug === slug);
  if (fromDest) return { slug: fromDest.slug, title: fromDest.name };
  const fromPlace = places.find((x) => x.slug === slug);
  if (fromPlace) return { slug: fromPlace.slug, title: fromPlace.name };
  return null;
}

function rawMatchesInterest(raw, item, tours) {
  if (!raw) return false;
  if (raw === item.slug) return true;
  if (EXPERIENCE_ALIASES[raw] === item.slug) return true;
  if (DESTINATION_ALIASES[raw] === item.slug) return true;
  if (item.kind === 'journey') {
    const t = findTour(tours, raw);
    if (t && (urlKey(t) === item.slug || t.slug === item.slug || t.path === item.slug)) return true;
  }
  return false;
}

/**
 * Drop one resolved interest from the current plan URL, keeping every other param.
 * @param {URLSearchParams | Record<string, string | string[] | undefined>} sp
 * @param {Interest} item
 * @param {{ tours?: { slug?: string; path?: string; title?: string }[] }} [opts]
 */
export function searchParamsWithoutInterest(sp, item, opts = {}) {
  const tours = opts.tours?.length ? opts.tours : toursStatic;
  const next = new URLSearchParams(sp instanceof URLSearchParams ? sp : undefined);
  if (!(sp instanceof URLSearchParams) && sp) {
    Object.entries(sp).forEach(([k, v]) => {
      (Array.isArray(v) ? v : [v]).filter(Boolean).forEach((x) => next.append(k, x));
    });
  }

  ['experience', 'destination', 'journey'].forEach((key) => {
    const all = next.getAll(key);
    next.delete(key);
    all.filter((v) => !rawMatchesInterest(v, item, tours)).forEach((v) => next.append(key, v));
  });

  ['add', 'experiences'].forEach((key) => {
    const all = next.getAll(key);
    next.delete(key);
    all.forEach((val) => {
      const kept = splitSlugs(val).filter((v) => !rawMatchesInterest(v, item, tours));
      if (kept.length) next.append(key, kept.join(','));
    });
  });

  return next;
}

/**
 * Resolve plan URL slugs to labelled interests. Unknown slugs are dropped. Max 6.
 * @param {Record<string, string | string[] | undefined> | URLSearchParams} sp
 * @param {{ tours?: { slug?: string; path?: string; title?: string }[] }} [opts]
 * @returns {Interest[]}
 */
export function resolveInterests(sp, opts = {}) {
  const tours = opts.tours?.length ? opts.tours : toursStatic;
  /** @type {Interest[]} */
  const items = [];
  const seen = new Set();

  const add = (kind, slug, title) => {
    const key = `${kind}:${slug}`;
    if (!slug || !title || seen.has(key) || items.length >= 6) return;
    seen.add(key);
    items.push({ kind, slug, title });
  };

  readAll(sp, 'experience').forEach((raw) => {
    const slug = EXPERIENCE_ALIASES[raw] || raw;
    const e = experiences.find((x) => x.slug === slug);
    if (e) add('experience', e.slug, e.title);
  });

  readAll(sp, 'destination').forEach((raw) => {
    const slug = DESTINATION_ALIASES[raw] || raw;
    const d = findDestination(slug);
    if (d) add('destination', d.slug, d.title);
  });

  readAll(sp, 'journey').forEach((raw) => {
    const t = findTour(tours, raw);
    if (t) add('journey', urlKey(t), t.title);
  });

  const legacy = [...readAll(sp, 'add'), ...readAll(sp, 'experiences')].flatMap(splitSlugs);
  legacy.forEach((raw) => {
    if (DESTINATION_ALIASES[raw]) {
      const d = findDestination(DESTINATION_ALIASES[raw]);
      if (d) add('destination', d.slug, d.title);
      return;
    }
    const slug = EXPERIENCE_ALIASES[raw] || raw;
    const e = experiences.find((x) => x.slug === slug);
    if (e) add('experience', e.slug, e.title);
  });

  return items;
}

/** @param {Interest[]} items */
export function formatInterests(items) {
  return items.map((i) => `${KIND_LABEL[i.kind]}: ${i.title}`).join('; ');
}

/** @param {Interest[]} items */
export function prefillMessage(items) {
  if (!items.length) return '';
  const titles = items.map((i) => String(i.title).replace(/\.+$/, ''));
  return "I'd like to ask about: " + titles.join(', ') + '.';
}

export { KIND_LABEL };
