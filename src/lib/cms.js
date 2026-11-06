import toursStatic from '../data/tours.json';
import { experiences as experiencesStatic } from '../data/experiences.js';
import { faqItems } from '../data/faq.js';
import { levels as levelsStatic } from '../data/levels.js';
import { homePageDefaults } from '../data/home-page-defaults.js';
import { places as placesStatic } from '../data/places.js';

function withHomePageDefaults(pages) {
  const next = { ...pages };
  next.home = {
    ...homePageDefaults,
    ...(next.home || {}),
    hero: { ...homePageDefaults.hero, ...(next.home?.hero || {}) },
    finder: { ...homePageDefaults.finder, ...(next.home?.finder || {}) },
    intro: { ...homePageDefaults.intro, ...(next.home?.intro || {}) },
    beyond: { ...homePageDefaults.beyond, ...(next.home?.beyond || {}) },
    featuredComfortIds:
      next.home?.featuredComfortIds?.length >= homePageDefaults.featuredComfortIds.length
        ? next.home.featuredComfortIds
        : homePageDefaults.featuredComfortIds,
  };
  return next;
}

const pbUrl = () =>
  (import.meta.env.VITE_POCKETBASE_URL || 'https://dashboard-mambeu.schoolhub.space').replace(/\/$/, '');

export const staticCatalog = {
  tours: toursStatic,
  places: placesStatic,
  experiences: experiencesStatic,
  levels: levelsStatic,
  faq: faqItems(),
  pages: withHomePageDefaults({}),
};

async function listPublished(name, { sort = true } = {}) {
  const filter = encodeURIComponent('status="published"');
  const sortQuery = sort ? '&sort=sortOrder' : '';
  const res = await fetch(
    `${pbUrl()}/api/collections/${name}/records?perPage=200${sortQuery}&filter=${filter}`,
  );
  if (!res.ok) throw new Error(name);
  const data = await res.json();
  return data.items || [];
}

function tourFromRecord(row) {
  const base = row.payload && typeof row.payload === 'object' ? { ...row.payload } : {};
  return {
    ...base,
    path: row.path || base.path,
    slug: row.slug || base.slug,
    title: row.title || base.title,
    style: row.style || base.style,
    duration: row.duration || base.duration,
    days: row.days ?? base.days,
    image: row.image || base.image,
    description: row.description || base.description,
    featured: row.featured ?? base.featured,
  };
}

async function safeList(name, options) {
  try {
    return await listPublished(name, options);
  } catch {
    return null;
  }
}

/** Published content from PocketBase, with the built-in files used when a collection cannot be read. */
export async function fetchCatalog() {
  const [tours, places, experiences, levels, faq, pages] = await Promise.all([
    safeList('tours'),
    safeList('places'),
    safeList('experiences'),
    safeList('comfort_levels'),
    safeList('faq_items'),
    safeList('page_content', { sort: false }),
  ]);

  return {
    tours: tours ? tours.map(tourFromRecord) : staticCatalog.tours,
    places: places
      ? places.map((row) => ({
          ...(row.payload || {}),
          slug: row.slug,
          name: row.name || row.payload?.name,
        }))
      : staticCatalog.places,
    experiences: experiences
      ? experiences.map((row) => {
          const p = row.payload || {};
          return [p.title || row.title, p.headline || '', p.photo || '', p.body || '', p.planInterest || ''];
        })
      : staticCatalog.experiences,
    levels: levels
      ? Object.fromEntries(levels.map((row) => [row.levelKey || row.title, row.payload || {}]))
      : staticCatalog.levels,
    faq: faq ? faq.map((row) => [row.question, row.answer]) : staticCatalog.faq,
    pages: withHomePageDefaults(
      pages
        ? Object.fromEntries(pages.map((row) => [row.pageKey, row.content || {}]))
        : staticCatalog.pages,
    ),
  };
}

const chromeFallback = {
  email: 'info@mambeusafaris.com',
  phone: '+255 796 086 799',
  phoneE164: '255796086799',
  whatsapp: '255796086799',
  officeLocation: 'Arusha, Tanzania',
  officeHours: '08:00 to 18:00',
  footerTagline: 'Dream · Discover · Explore',
  finalInviteEyebrow: 'TELL US WHAT YOU’RE DREAMING OF',
  finalInviteTitle: 'Your next chapter\nstarts in Tanzania.',
  finalInviteText: 'A few ideas are all we need. Let’s shape a journey that feels like you.',
};

export function siteChrome(pages) {
  const chrome = pages?.site_chrome || {};
  return {
    ...chromeFallback,
    ...chrome,
    // Keep the published hours from code; dashboard has no editor for this field.
    officeHours: chromeFallback.officeHours,
  };
}
