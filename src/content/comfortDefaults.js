/**
 * Comfort page content (schema 2). Defaults match what /comfort/ shows; the dashboard editor
 * (dashboard/src/lib/pageEditor/comfort.js) edits these exact paths. The Midrange / Comfort /
 * Luxury tab panels come from the comfort_levels collection (Library → Comfort levels).
 */
import { carry, mergePage } from './schema.js';

export const comfortPageDefaults = {
  head: {
    label: 'HOW YOU STAY',
    titleLine1: 'Adventure outside.',
    titleLine2: 'Comfort within.',
    text: 'Midrange and comfort are at the heart of our approach. Luxury and camping remain part of the possibilities. Choose how you want your journey to feel.',
    photo: '',
    photoAlt: '',
  },
  comfortSection: {
    eyebrow: 'Your safari. Your kind of stay.',
    titleLine1: 'Comfort is personal.',
    titleLine2: 'Let’s find yours.',
    introLine1: 'Midrange and comfort at our heart.',
    introLine2: 'Luxury when you want a little more.',
    panelEyebrowSuffix: 'SAFARIS',
    defaultTab: 'Comfort',
  },
  balanceSection: {
    eyebrow: 'A THOUGHTFUL BALANCE',
    titleLine1: 'Spend on the things',
    titleLine2: 'you’ll remember.',
    lead: 'Your budget influences accommodation, length of stay and optional experiences. We’ll help you decide where extra comfort makes a difference.',
    body: 'The published journeys are starting points. When you enquire, we’ll suggest specific lodges and tented camps for your dates and confirm what is included before you book.',
    linkText: 'Explore our camping journeys',
    linkPath: 'safaris?style=camping',
  },
};

/** The old dashboard's page head eyebrow and intro were the only saved fields the page showed. */
function migrateV1(old) {
  return carry(old, ['head.label', 'head.text']);
}

export function mergeComfortContent(cmsComfort) {
  return mergePage(comfortPageDefaults, cmsComfort, migrateV1);
}
