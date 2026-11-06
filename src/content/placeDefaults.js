import { mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

/** Copy for destination place template (/destinations/:slug/) — not per-place; places use Content → Places. */
export const placeDetailDefaults = {
  head: {
    label: 'MEET TANZANIA',
  },
  story: {
    eyebrow: 'A PLACE TO REMEMBER',
    titleLine1: 'A different view.',
    titleLine2: 'A deeper connection.',
  },
  searchButton: 'Explore journeys here',
  related: {
    heading: 'Start with a journey.',
    planLinkText: 'Plan a personal route',
  },
  empty: {
    heading: 'A journey made for you.',
    text: 'Ask our local team to include this destination in a personal itinerary.',
    button: 'Plan a journey here',
  },
};

export function mergePlaceDetailContent(cms) {
  const src = cms && typeof cms === 'object' ? { ...cms } : {};
  if (src.head?.title && !src.head.titleLine1) {
    src.head = { ...src.head, ...parseLegacyHeadTitle(src.head.title) };
  }
  const out = {};
  for (const [key, defaults] of Object.entries(placeDetailDefaults)) {
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) out.head = stripLegacyHeadTitle(out.head);
  return out;
}
