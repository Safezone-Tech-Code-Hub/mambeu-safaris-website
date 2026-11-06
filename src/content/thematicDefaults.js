import { mergeBlockTuples, mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

const kilimanjaroDefaults = {
  label: 'MOUNTAIN ADVENTURES',
  titleLine1: 'Take the',
  titleLine2: 'higher road.',
  text: 'A Kilimanjaro adventure with personal preparation, local guiding and support along the way.',
  photo: 'mountain.webp',
  blocks: [
    ['Prepare well', 'Share your hiking experience, fitness and questions with our team.'],
    ['Choose your route', 'Discuss route options, duration, equipment and preparation before confirming your climb.'],
    ['Keep exploring', 'Add a wildlife safari or a Zanzibar stay to round off your adventure.'],
  ],
  splitSection: {
    eyebrow: 'THE JOURNEY IS THE STORY',
    titleLine1: 'More than',
    titleLine2: 'a summit.',
    lead: 'Mambeu’s mountain experiences bring expert guiding, equipment and preparation together with a personal approach.',
    body: 'Tell us about your hiking background, preferred dates and available time. We’ll discuss suitable routes, support and preparation before providing your quotation.',
    buttonText: 'Plan my mountain adventure',
    buttonInterest: 'Kilimanjaro',
  },
};

const zanzibarDefaults = {
  label: 'SAFARI & ISLAND ESCAPES',
  titleLine1: 'From wild plains',
  titleLine2: 'to white sands.',
  text: 'Pair your wildlife adventure with Zanzibar’s beaches, historic Stone Town and the Indian Ocean.',
  photo: 'zanzibar.webp',
  blocks: [
    ['Time by the sea', 'Unhurried days, warm waters and accommodation matched to your comfort level.'],
    ['Culture & history', 'Explore Stone Town, local flavours and the island’s spice heritage.'],
    ['Ocean experiences', 'Ask about snorkelling, diving and excursions for your travel dates.'],
  ],
  splitSection: {
    eyebrow: 'MAKE TIME TO SLOW DOWN',
    titleLine1: 'Your island.',
    titleLine2: 'Your pace.',
    lead: 'Build a Zanzibar stay around your interests, from beach relaxation to cultural exploration and time on the water.',
    body: 'Accommodation, flights, airport transfers and excursions can be discussed together so your safari and island stay connect smoothly.',
    buttonText: 'Plan my island escape',
    buttonInterest: 'Zanzibar',
  },
  relatedSection: {
    title: 'Safari from Zanzibar.',
    linkText: 'Explore these journeys',
    linkPath: 'safaris?q=Zanzibar',
  },
};

export const thematicPageDefaults = {
  kilimanjaro: kilimanjaroDefaults,
  zanzibar: zanzibarDefaults,
};

export function parseLegacyThematicTitle(raw) {
  if (!raw || typeof raw !== 'string') return {};
  return parseLegacyHeadTitle(raw);
}

function normalizeBlocks(blocks, defBlocks) {
  return mergeBlockTuples(defBlocks, blocks);
}

function normalizeThematicBlock(pageKey, raw) {
  const def = thematicPageDefaults[pageKey];
  if (!raw || typeof raw !== 'object') return { ...def };
  const next = { ...mergeSection(def, raw) };
  if (next.title && !next.titleLine1) {
    Object.assign(next, parseLegacyThematicTitle(next.title));
  }
  next.blocks = normalizeBlocks(next.blocks, def.blocks);
  if (next.splitSection) {
    next.splitSection = mergeSection(def.splitSection, raw.splitSection || {});
    if (next.splitSection.title && !next.splitSection.titleLine1) {
      Object.assign(next.splitSection, parseLegacyHeadTitle(next.splitSection.title));
    }
    if (next.splitSection.titleLine1) {
      const { title: _t, ...ss } = next.splitSection;
      next.splitSection = ss;
    }
  }
  if (next.relatedSection) {
    next.relatedSection = mergeSection(def.relatedSection || {}, raw.relatedSection || {});
  }
  if (next.titleLine1) {
    const { title: _t, ...rest } = next;
    return rest;
  }
  return next;
}

export function mergeThematicContent(pageKey, cms) {
  const def = thematicPageDefaults[pageKey];
  if (!def) return cms || {};
  return normalizeThematicBlock(pageKey, cms);
}
