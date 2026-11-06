import { createElement } from 'react';

export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );

export const money = (v) => '$' + Number(v).toLocaleString('en-US');

export const href = (r) => {
  const [path, query] = r.split('?');
  return '/' + (path ? path + '/' : '') + (query ? '?' + query : '');
};

function itineraryDayTitle(day) {
  if (typeof day === 'string') return day;
  return day?.title ?? '';
}

/** Short place name for route lines (cards, hero). */
function itineraryStopLabel(rawTitle) {
  let title = String(rawTitle ?? '').trim();
  if (!title) return '';

  title = title.replace(/\s*[–—]\s*.*$/u, '').replace(/\s+-\s+.*$/, '').trim();

  if (/^arrival\b/i.test(title)) {
    title = title.replace(/^arrival\s*(?:\||I|\u007C)\s*/i, '').trim();
  }
  if (/^departure\b/i.test(title)) return '';

  if (/\s+to\s+/i.test(title)) {
    title = title.split(/\s+to\s+/i).pop()?.trim() ?? title;
  }

  title = title
    .replace(/^full-day safari in (?:the )?/i, '')
    .replace(/\bNational Park\b/gi, '')
    .replace(/\bNP\b/g, '')
    .replace(/\s+(?:Scenic|Majestic|Wildlife|Lakeside|Tree-Climbing|The Big Five).*$/i, '')
    .replace(/\bArea\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return title;
}

export function itineraryRouteParts(t) {
  const itinerary = t?.itinerary ?? [];
  let list = itinerary
    .map((d) => itineraryStopLabel(itineraryDayTitle(d)))
    .filter(Boolean);
  list = [...new Set(list)];
  if (list.length) return list.slice(0, 3);

  const highlights = t?.highlights ?? [];
  if (highlights.length) {
    const fromHighlights = highlights
      .slice(0, 3)
      .map((h) => itineraryStopLabel(h))
      .filter(Boolean);
    if (fromHighlights.length) return fromHighlights;
  }
  return ['Northern Tanzania'];
}

export function itineraryRoute(t) {
  return itineraryRouteParts(t).join(' / ');
}

/** Published tier for cards (matches journey detail default). */
export function tourCardPricingTier(t) {
  const tiers = t?.pricingTiers ?? [];
  if (!tiers.length) return null;
  return tiers.find((p) => p.people === '2 people') ?? tiers[0];
}

/** Catalog / card blurb: published short description, else first sentence of full text. */
export function tourCardDescription(t) {
  const short = String(t?.description ?? '').replace(/\s+/g, ' ').trim();
  const full = String(t?.fullDescription ?? '').replace(/\s+/g, ' ').trim();
  if (short.length >= 60) return short;
  if (full) {
    const sentence = full.match(/^[^.!?]+[.!?]/);
    return sentence ? sentence[0].trim() : full;
  }
  return short;
}

/** Static /assets/ name, or full http(s) URL (e.g. PocketBase file URL from CMS). */
export function resolveImageSrc(src) {
  const raw = String(src ?? '').trim();
  if (!raw) return '/assets/hero.webp';
  if (/^https?:\/\//i.test(raw)) return raw;
  const name = raw.split('/').pop() || 'hero.webp';
  return `/assets/${name}`;
}

export function Img({ src, alt, className = '', priority = false }) {
  return createElement('img', {
    className: className || undefined,
    src: resolveImageSrc(src),
    alt,
    ...(priority ? { fetchPriority: 'high' } : { loading: 'lazy' }),
    decoding: 'async',
  });
}
