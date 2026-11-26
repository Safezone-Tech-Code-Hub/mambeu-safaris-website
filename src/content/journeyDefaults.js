import { mergePage } from './schema.js';

/** Journey page template (schema 2). Tour-specific text and photos come from Library → Safari tours. */
export const journeyDetailDefaults = {
  hero: {
    breadcrumbPrefix: 'Safari collection',
    eyebrowSuffix: 'TAILOR-MADE JOURNEY',
  },
  anchors: {
    overview: 'Overview',
    itinerary: 'Day by day',
    stays: 'Accommodation',
    included: 'Inclusions',
    enquire: 'Your quotation',
  },
  overview: {
    eyebrow: 'THE JOURNEY AT A GLANCE',
    titleLine1: 'Make every',
    titleLine2: 'day count.',
    durationLabel: 'Duration',
    durationSuffix: 'days',
    styleLabel: 'Published style',
    planningLabel: 'Planning',
    planningValue: 'Personalised',
  },
  itinerary: {
    eyebrow: 'YOUR TIME IN TANZANIA',
    title: 'Day by day.',
    expandLabel: 'Expand all days',
    collapseLabel: 'Collapse all days',
    noItinerary:
      'Your safari specialist will provide a detailed itinerary with your personalised quotation.',
    dayPrefix: 'DAY',
    stayLabel: 'Stay',
    mealsLabel: 'Meals & drinks',
  },
  stays: {
    eyebrow: 'YOUR HOME ALONG THE WAY',
    title: 'Where you’ll rest.',
    fallback: 'Our team will suggest accommodation for your dates and preferred comfort level.',
    fineprint:
      'Stays are subject to availability. Your final quotation confirms accommodation and any requested changes.',
    askLink: 'Ask about different accommodation',
    dayPrefix: 'Day',
  },
  inclusions: {
    includedEyebrow: 'WHAT’S IN YOUR JOURNEY',
    includedTitle: 'Included',
    includedFallback: 'Inclusions are confirmed in your personalised quotation.',
    excludedEyebrow: 'PLAN FOR THESE SEPARATELY',
    excludedTitle: 'Excluded',
    excludedFallback: 'Exclusions and optional activities are set out in your quotation.',
    activitiesNote:
      'Activities and meals apply as specified in the itinerary. Optional experiences, upgrades and changes are quoted separately.',
  },
  quotation: {
    eyebrow: 'LET’S MAKE IT YOURS',
    titleLine1: 'Your journey.',
    titleLine2: 'Your details.',
    groupLabel: 'Number of travellers',
    priceUnit: 'per person · USD',
    priceFineprint:
      'Published group-size price. Your dates, availability and requested changes are confirmed in a personalised quotation.',
    noTiers: 'Request a quotation based on your dates, group size and preferred accommodation.',
    enquireButton: 'Enquire about this journey',
    whatsappPrefix: 'Hello Mambeu, I would like to discuss ',
    whatsappLink: 'Talk to us on WhatsApp',
    noteHeading: 'Love the route, want different stays?',
    noteText: 'Ask us to tailor the journey to midrange, comfort or luxury accommodation.',
  },
  related: {
    heading: 'Keep exploring.',
    linkText: 'All safari journeys',
    linkPath: 'safaris',
  },
};

/** The old template fields mean the same thing on the redesigned page, so saved values carry over. */
const migrateV1 = (old) => old;

export function mergeJourneyDetailContent(cms) {
  return mergePage(journeyDetailDefaults, cms, migrateV1);
}
