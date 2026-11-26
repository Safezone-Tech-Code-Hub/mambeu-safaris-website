/**
 * Park page template content (schema 2) for /destinations/<slug>/. These are the words around
 * each park; the park itself (name, photo, text, facts) comes from Library → Places.
 * Use {name} anywhere to insert the park's name.
 */
import { mergePage } from './schema.js';

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
    planLinkText: 'Plan a trip to {name}',
  },
  empty: {
    heading: 'A journey made for you.',
    text: 'Ask our local team to include this destination in a personal itinerary.',
    button: 'Plan a trip to {name}',
  },
};

/**
 * The old dashboard saved this template, but the page never read it, so nothing carries
 * over. (Its plan-link texts also differed from what the page showed.)
 */
function migrateV1() {
  return {};
}

export function mergePlaceDetailContent(cms) {
  return mergePage(placeDetailDefaults, cms, migrateV1);
}

/** Replace {name} with the park name. */
export function withPlaceName(text, name) {
  return String(text ?? '').replace(/\{name\}/g, name ?? '');
}
