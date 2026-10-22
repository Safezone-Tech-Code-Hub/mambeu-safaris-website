/**
 * Build-time content helpers. Source files under src/data/ are synced from PocketBase
 * by scripts/sync-content-from-pb.mjs before `npm run build`.
 */
import tours from '../data/tours.json';
import { places } from '../data/places.js';
import { experiences } from '../data/experiences.js';
import { levels } from '../data/levels.js';
import { faqItems } from '../data/faq.js';

export function loadTours() {
  return tours;
}

export function loadPlaces() {
  return places;
}

export function loadExperiences() {
  return experiences;
}

export function loadComfortLevels() {
  return levels;
}

export function loadFaqItems() {
  return faqItems();
}

export { tours, places, experiences, levels, faqItems };
