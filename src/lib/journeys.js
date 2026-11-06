import { itineraryRouteParts, tourCardDescription } from './utils.js';

/** @typedef {'Comfort' | 'Luxury' | 'Camping'} Tier */
/** @typedef {'wildlife' | 'big-cats' | 'migration' | 'beaches'} Interest */

/**
 * @typedef {{
 *   id: number;
 *   slug: string;
 *   path: string;
 *   title: string;
 *   tier: Tier;
 *   days: number;
 *   route: string[];
 *   description: string;
 *   image: string;
 *   tags: Interest[];
 *   pricing: 'published' | 'tailored';
 * }} Journey
 */

export const tiers = /** @type {Tier[]} */ (['Comfort', 'Luxury', 'Camping']);

function journeyImage(t) {
  const raw = String(t?.image || 'hero.webp');
  if (raw.startsWith('http') || raw.startsWith('/')) return raw;
  return `/assets/${raw.split('/').pop()}`;
}

/** @param {Record<string, unknown>} t */
function inferTags(t) {
  if (Array.isArray(t?.tags) && t.tags.length) return t.tags;
  const blob = JSON.stringify([
    t?.title,
    t?.description,
    t?.fullDescription,
    t?.highlights,
    t?.itinerary,
    t?.path,
  ]).toLowerCase();
  /** @type {Interest[]} */
  const tags = ['wildlife'];
  if (/zanzibar|beach|island/.test(blob)) tags.push('beaches');
  if (/lion|leopard|cheetah|big[\s-]?cat/.test(blob)) tags.push('big-cats');
  if (/wildebeest|migration/.test(blob)) tags.push('migration');
  return tags;
}

/** @param {Record<string, unknown> & { id: number; title: string; path: string; days: number }} t */
export function toJourney(t) {
  return {
    id: t.id,
    slug: t.slug || t.path,
    path: t.path,
    title: t.title,
    tier: /** @type {Tier} */ (t.style || 'Comfort'),
    days: Number(t.days) || 0,
    route: itineraryRouteParts(t),
    description: tourCardDescription(t),
    image: journeyImage(t),
    tags: inferTags(t),
    pricing: Array.isArray(t.pricingTiers) && t.pricingTiers.length ? 'published' : 'tailored',
  };
}

export function toJourneys(tours) {
  const list = (tours || []).map(toJourney);
  if (list.length >= 2 && list[0].image === list[1].image) {
    list[1] = { ...list[1], image: '/assets/camping.webp' };
  }
  return list;
}
