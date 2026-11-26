/**
 * Experiences page content (schema 2). Defaults match what the redesigned page shows; the
 * dashboard editor (dashboard/src/lib/pageEditor/experiences.js) edits these exact paths.
 *
 * The experience list lives here too, so the whole page is edited in one place. Items keep
 * text-only fields so the dashboard can edit them: `status` is "published" or "draft",
 * `featured` is "yes" or empty, and list fields (highlights, included, goodToKnow) are arrays
 * of lines. `normalizeExperience` turns an item back into the shape the components use.
 */
import { experiences as catalog } from '../lib/experiences.js';
import { lines, mergePage } from './schema.js';

function toItem(e) {
  return {
    slug: e.slug,
    status: e.published ? 'published' : 'draft',
    featured: e.featured ? 'yes' : '',
    category: e.category,
    title: e.title,
    summary: e.summary,
    image: e.image,
    imageAlt: e.imageAlt || '',
    focal: e.focal || '',
    location: e.location || '',
    bestTime: e.bestTime || '',
    duration: e.duration || '',
    bestFor: e.bestFor || '',
    highlights: [...(e.highlights || [])],
    included: [...(e.included || [])],
    goodToKnow: [...(e.goodToKnow || [])],
  };
}

export const experiencesPageDefaults = {
  head: {
    eyebrow: 'Beyond the game drive',
    titleLine1: 'Experiences to make',
    titleLine2: 'it yours.',
    text: 'Add experiences that mean something to you, from short day tours to a hot air balloon safari.',
    image: '/images/experiences-header.jpg',
  },
  intro: {
    eyebrow: 'How experiences work',
    title: 'Start with the safari, then add what matters to you.',
    text: 'Experiences are optional additions to any Mambeu safari, from family journeys to a hot-air balloon flight. Browse by type, open one to read the details, and choose it to start an enquiry.',
  },
  facts: [
    { title: 'Optional add-ons', text: 'Added to any safari.' },
    { title: 'Priced separately', text: 'Confirmed with your quote.' },
    { title: 'Locally guided', text: 'By our own team and partners.' },
  ],
  filter: {
    allLabel: 'All',
    countSingular: 'experience',
    countPlural: 'experiences',
  },
  card: {
    detailsButton: 'See details',
    planButton: 'Plan this experience',
  },
  panel: {
    whereLabel: 'Where',
    whenLabel: 'When',
    durationLabel: 'Duration',
    expectHeading: 'What to expect',
    bestTimeLabel: 'Best time',
    bestForLabel: 'Best for',
    includedHeading: 'Usually included',
    goodToKnowHeading: 'Good to know',
    highlightsHeading: 'Highlights',
  },
  items: catalog
    .slice()
    .sort((a, b) => Number(b.published) - Number(a.published) || a.sortOrder - b.sortOrder)
    .map(toItem),
  closing: {
    titleLine1: 'Not sure what fits?',
    titleLine2: 'Tell us and we’ll suggest.',
    text: 'Share who is travelling and what matters to you. We’ll shape the route around it.',
    planButton: 'Plan my safari',
    planLink: 'plan',
    whatsappButton: 'Talk to us on WhatsApp',
  },
};

/** One CMS list item -> the experience shape used by the cards and side panel. */
export function normalizeExperience(item, index = 0) {
  const it = item && typeof item === 'object' ? item : {};
  return {
    slug: String(it.slug ?? '').trim() || `experience-${index + 1}`,
    category: String(it.category ?? '').trim(),
    title: it.title || '',
    summary: it.summary || '',
    image: it.image || '',
    imageAlt: it.imageAlt || '',
    focal: String(it.focal ?? '').trim() || undefined,
    location: it.location || '',
    bestTime: it.bestTime || '',
    duration: it.duration || '',
    bestFor: it.bestFor || '',
    highlights: lines(it.highlights),
    included: lines(it.included),
    goodToKnow: lines(it.goodToKnow),
    featured: /^(yes|true|1)$/i.test(String(it.featured ?? '').trim()),
    published: String(it.status ?? 'published').trim().toLowerCase() !== 'draft',
    sortOrder: index,
  };
}

/** Published experiences in list order, ready for the page components. */
export function publishedExperienceList(content) {
  return (content?.items || [])
    .map(normalizeExperience)
    .filter((e) => e.published && e.title);
}

/** Saved content from the old dashboard: the redesigned page showed none of it. */
function migrateV1() {
  return {};
}

export function mergeExperiencesContent(cmsExperiences) {
  return mergePage(experiencesPageDefaults, cmsExperiences, migrateV1);
}
