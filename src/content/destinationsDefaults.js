/** Default Destinations hub CMS payload — plain text only. */

import { mergeScalar, mergeSection } from './mergeUtils.js';

export const destinationsPageDefaults = {
  head: {
    label: 'WHERE WE TAKE YOU',
    titleLine1: 'Discover Tanzania’s wild places.',
    titleLine2: '',
    text: 'Legendary wildlife parks, mountain landscapes and an Indian Ocean coast. Connect your favourite places into one personal journey.',
  },
  grid: {
    placeEyebrowLabel: 'EXPLORE',
  },
  extraTiles: [
    {
      path: 'kilimanjaro',
      title: 'Kilimanjaro',
      photo: 'mountain.webp',
      tag: 'A higher perspective.',
      eyebrow: 'KEEP EXPLORING',
    },
    {
      path: 'zanzibar',
      title: 'Zanzibar',
      photo: 'zanzibar.webp',
      tag: 'Slow down by the sea.',
      eyebrow: 'KEEP EXPLORING',
    },
  ],
};

function parseLegacyTitle(raw) {
  if (!raw || typeof raw !== 'string') return {};
  if (!raw.includes('<')) {
    return { titleLine1: raw.trim(), titleLine2: '' };
  }
  const brSplit = raw.split(/<br\s*\/?>/i);
  if (brSplit.length >= 2) {
    const line1 = brSplit[0].replace(/<[^>]+>/g, '').trim();
    const line2 = brSplit.slice(1).join(' ').replace(/<[^>]+>/g, '').trim();
    return { titleLine1: line1, titleLine2: line2 };
  }
  return { titleLine1: raw.replace(/<[^>]+>/g, '').trim(), titleLine2: '' };
}

function normalizeExtraTile(item, index, defaults) {
  const def = defaults[index] || { path: '', title: '', photo: '', tag: '', eyebrow: 'KEEP EXPLORING' };
  if (Array.isArray(item)) {
    return {
      path: item[0] || def.path,
      title: item[1] || def.title,
      photo: item[2] || def.photo,
      tag: item[3] || def.tag,
      eyebrow: def.eyebrow,
    };
  }
  if (item && typeof item === 'object') return mergeSection(def, item);
  return { ...def };
}

function mergeExtraTiles(defaults, override) {
  const base = defaults.map((d) => ({ ...d }));
  if (!Array.isArray(override) || !override.length) return base;
  return base.map((def, i) => normalizeExtraTile(override[i], i, defaults));
}

export function normalizeLegacyDestinations(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyTitle(next.head.title) };
  }
  return next;
}

export function mergeDestinationsContent(cmsDestinations) {
  const src = normalizeLegacyDestinations(cmsDestinations);
  const out = {};
  for (const [key, defaults] of Object.entries(destinationsPageDefaults)) {
    if (key === 'extraTiles') {
      out.extraTiles = mergeExtraTiles(destinationsPageDefaults.extraTiles, src.extraTiles);
      continue;
    }
    if (typeof defaults !== 'object' || defaults === null) {
      out[key] = mergeScalar(defaults, src[key]);
      continue;
    }
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) {
    const { title: _t, ...headRest } = out.head;
    out.head = headRest;
  }
  return out;
}
