import { mergeSection } from './mergeUtils.js';

export const journeyDetailDefaults = {
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
  },
  stays: {
    eyebrow: 'YOUR HOME ALONG THE WAY',
    title: 'Where you’ll rest.',
    fallback: 'Our team will suggest accommodation for your dates and preferred comfort level.',
    fineprint:
      'Stays are subject to availability. Your final quotation confirms accommodation and any requested changes.',
    askLink: 'Ask about different accommodation',
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

export function mergeJourneyDetailContent(cms) {
  const src = cms && typeof cms === 'object' ? cms : {};
  const out = {};
  for (const [key, defaults] of Object.entries(journeyDetailDefaults)) {
    out[key] = mergeSection(defaults, src[key]);
  }
  return out;
}
