/**
 * Kilimanjaro and Zanzibar page content (schema 2). Defaults match what each page shows;
 * the dashboard editors (dashboard/src/lib/pageEditor/kilimanjaro.js, zanzibar.js) edit
 * these exact paths. Which journeys appear under "related" is chosen in Thematic.jsx.
 */
import { carry, mergePage } from './schema.js';

const kilimanjaroDefaults = {
  label: 'MOUNTAIN ADVENTURES',
  titleLine1: 'Take the',
  titleLine2: 'higher road.',
  text: 'A Kilimanjaro adventure with personal preparation, local guiding and support along the way.',
  photo: 'mountain.webp',
  photoAlt: 'Tanzania safari scenery',
  splitSection: {
    eyebrow: 'THE JOURNEY IS THE STORY',
    titleLine1: 'More than',
    titleLine2: 'a summit.',
    lead: 'Mambeu’s mountain experiences bring expert guiding, equipment and preparation together with a personal approach.',
    body: 'Tell us about your hiking background, preferred dates and available time. We’ll discuss suitable routes, support and preparation before providing your quotation.',
    buttonText: 'Plan my mountain adventure',
    planDestination: 'kilimanjaro',
  },
  blocks: [
    { title: 'Prepare well', text: 'Share your hiking experience, fitness and questions with our team.' },
    {
      title: 'Choose your route',
      text: 'Discuss route options, duration, equipment and preparation before confirming your climb.',
    },
    { title: 'Keep exploring', text: 'Add a wildlife safari or a Zanzibar stay to round off your adventure.' },
  ],
  relatedSection: {
    title: 'Related journeys.',
    linkText: 'Explore these journeys',
    linkPath: 'safaris?q=Kilimanjaro',
  },
};

const zanzibarDefaults = {
  label: 'SAFARI & ISLAND ESCAPES',
  titleLine1: 'From wild plains',
  titleLine2: 'to white sands.',
  text: 'Pair your wildlife adventure with Zanzibar’s beaches, historic Stone Town and the Indian Ocean.',
  photo: 'zanzibar.webp',
  photoAlt: 'Tanzania safari scenery',
  splitSection: {
    eyebrow: 'MAKE TIME TO SLOW DOWN',
    titleLine1: 'Your island.',
    titleLine2: 'Your pace.',
    lead: 'Build a Zanzibar stay around your interests, from beach relaxation to cultural exploration and time on the water.',
    body: 'Accommodation, flights, airport transfers and excursions can be discussed together so your safari and island stay connect smoothly.',
    buttonText: 'Plan my island escape',
    planDestination: 'zanzibar',
  },
  blocks: [
    { title: 'Time by the sea', text: 'Unhurried days, warm waters and accommodation matched to your comfort level.' },
    { title: 'Culture & history', text: 'Explore Stone Town, local flavours and the island’s spice heritage.' },
    { title: 'Ocean experiences', text: 'Ask about snorkelling, diving and excursions for your travel dates.' },
  ],
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

/** Old blocks were [title, text] pairs; schema 2 uses { title, text }. */
function blocksFromV1(blocks) {
  if (!Array.isArray(blocks) || !blocks.length) return undefined;
  const out = blocks
    .map((b) => {
      if (Array.isArray(b)) return { title: String(b[0] ?? ''), text: String(b[1] ?? '') };
      if (b && typeof b === 'object') return { title: String(b.title ?? ''), text: String(b.text ?? '') };
      return null;
    })
    .filter((b) => b && (b.title.trim() || b.text.trim()));
  return out.length ? out : undefined;
}

/** The old dashboard's eyebrow, intro, photo and three steps were the saved fields the page showed. */
function migrateV1(old) {
  const out = carry(old, ['label', 'text', 'photo']);
  const blocks = blocksFromV1(old?.blocks);
  if (blocks) out.blocks = blocks;
  return out;
}

export function mergeThematicContent(pageKey, cms) {
  const def = thematicPageDefaults[pageKey];
  if (!def) return cms || {};
  return mergePage(def, cms, migrateV1);
}
