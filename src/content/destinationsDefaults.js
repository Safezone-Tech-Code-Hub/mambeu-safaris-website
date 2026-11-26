/**
 * Destinations hub content (schema 2). Defaults match what /destinations/ shows; the
 * dashboard editor (dashboard/src/lib/pageEditor/destinations.js) edits these exact paths.
 *
 * The park cards here are the hub's own copy. The individual park pages
 * (/destinations/<slug>/) still come from Library → Places.
 */
import { destinations } from '../lib/destinations.js';
import { mergePage } from './schema.js';

/** Card fields the hub uses, taken from the static destination list. */
function card(d) {
  return {
    name: d.name,
    slug: d.slug,
    kind: d.kind,
    tagline: d.tagline,
    description: d.description,
    image: d.image,
    position: d.position || '',
    highlights: [...(d.highlights || [])],
    bestTime: d.bestTime,
    query: d.query,
    link: d.href ? d.href.replace(/^\/|\/$/g, '') : '',
  };
}

const parks = destinations.filter((d) => d.group === 'parks').map(card);
const beyond = destinations.filter((d) => d.group === 'beyond').map(card);

/** “Coming soon” cards in the southern and western sections (no park page yet). */
function soon(slug, name, tagline, description, image, highlights) {
  return {
    name,
    slug,
    kind: 'Coming soon',
    tagline,
    description,
    image,
    position: '',
    highlights,
    bestTime: '',
    query: '',
    link: '',
  };
}

export const destinationsPageDefaults = {
  header: {
    eyebrow: 'Where we take you',
    titleLine1: 'Discover Tanzania’s',
    titleLine2: 'wild places.',
    text: 'Legendary wildlife parks, mountain landscapes and an Indian Ocean coast. Connect your favourite places into one personal journey.',
    image: '/images/destinations-header.jpg',
  },
  labels: {
    planLinkPrefix: 'Plan a trip to',
    exploreLinkPrefix: 'Explore',
    comingSoon: 'Coming soon',
    journeySingular: 'journey',
    journeyPlural: 'journeys',
    tailorMade: 'Tailor-made',
  },
  northern: {
    title: 'The northern circuit',
    lede: 'Classic parks plus seasonal plains and the Rift Valley, easily combined in one journey.',
    places: parks,
  },
  southern: {
    title: 'The southern circuit',
    lede: 'Quieter parks and longer days in the bush, further from the classic north. Tell us if you want to go south and we will shape the route.',
    places: [
      soon(
        'ruaha',
        'Ruaha',
        'Baobabs, lions and a very big sky.',
        'Southern Tanzania at its quietest. We shape these as tailor-made journeys.',
        '/images/destinations/tarangire.jpg',
        ['Remote bush', 'Big cats', 'Baobab country'],
      ),
      soon(
        'nyerere',
        'Nyerere',
        'River, boats and open woodland.',
        'Boat days and walking country, far from the northern circuit. Ask us to build it in.',
        '/images/destinations/ndutu.jpg',
        ['Boat safari', 'Walking', 'Fewer vehicles'],
      ),
    ],
  },
  western: {
    title: 'The western circuit',
    lede: 'Remote west Tanzania, for travellers who want more space and fewer vehicles. We plan these as tailor-made additions.',
    places: [
      soon(
        'katavi',
        'Katavi',
        'Floodplains, hippo and almost no one else.',
        'West Tanzania’s open floodplains. We plan these as private, tailor-made additions.',
        '/images/destinations/lake-natron.jpg',
        ['Floodplains', 'Remote camps', 'Space to breathe'],
      ),
      soon(
        'mahale',
        'Mahale',
        'Forest, lake and a slower kind of wild.',
        'Lakeshore forest on Tanganyika. A quiet finish after the game drives.',
        '/images/destinations/lake-manyara.jpg',
        ['Lakeshore forest', 'Chimpanzees', 'Tanganyika'],
      ),
    ],
  },
  beyond: {
    title: 'Beyond the parks',
    lede: 'Add a mountain or a coast to any safari.',
    places: beyond,
  },
};

/**
 * Content saved by the old dashboard (head, grid label, Kilimanjaro/Zanzibar tiles) was never
 * shown on the redesigned hub, so none of it carries over.
 */
function migrateV1() {
  return {};
}

export function mergeDestinationsContent(cmsDestinations) {
  return mergePage(destinationsPageDefaults, cmsDestinations, migrateV1);
}
