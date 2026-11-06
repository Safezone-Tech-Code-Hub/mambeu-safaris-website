import { mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

export const safarisPageDefaults = {
  head: {
    label: 'THE MAMBEU COLLECTION',
    titleLine1: 'Find your',
    titleLine2: 'kind of wild.',
    text: '22 starting points. Endless ways to make them yours. Explore our existing journeys, then tailor your route, dates and stays.',
  },
  catalogue: {
    asideHeading: 'Shape your safari',
    searchLabel: 'Search journeys',
    searchPlaceholder: 'Park, wildlife or experience',
    styleLabel: 'Comfort level',
    durationLabel: 'Days to explore',
    sortLabel: 'Arrange journeys',
    clearFilters: 'Clear filters',
    helpHeading: 'Something more personal?',
    helpText: 'Let’s create a journey around your ideas.',
    helpButton: 'Design my safari',
    resultSuffixSingular: 'journey to explore',
    resultSuffixPlural: 'journeys to explore',
    tailorLine: 'Tailor-made around you',
    midrangeNotice:
      'These routes can be adapted with midrange accommodation. The published prices apply to the original itineraries; request a tailored quotation for a different comfort level.',
    emptyHeading: 'A different starting point?',
    emptyText: 'No journeys match these choices. Clear the filters or ask us for a personal itinerary.',
  },
};

export function normalizeLegacySafaris(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyHeadTitle(next.head.title) };
  }
  return next;
}

export function mergeSafarisContent(cms) {
  const src = normalizeLegacySafaris(cms);
  const out = {};
  for (const [key, defaults] of Object.entries(safarisPageDefaults)) {
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) out.head = stripLegacyHeadTitle(out.head);
  return out;
}
