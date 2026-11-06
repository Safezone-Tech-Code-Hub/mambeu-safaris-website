/** @typedef {{
 *   slug: string;
 *   name: string;
 *   tagline: string;
 *   description: string;
 *   image: string;
 *   alt: string;
 *   position?: string;
 *   query: string;
 *   bestTime: string;
 *   kind: string;
 *   highlights: string[];
 *   group: 'parks' | 'beyond';
 *   href?: string;
 * }} Destination */

/** @type {Destination[]} */
export const destinations = [
  {
    slug: 'serengeti',
    name: 'Serengeti',
    tagline: 'The plains go on. The moments stay.',
    description:
      'Endless open plains, big cats and the great migration. The classic northern Tanzania safari.',
    image: '/images/destinations/serengeti.jpg',
    alt: 'Wildebeest and zebra grazing on the Serengeti plains',
    position: 'center 60%',
    query: 'Serengeti',
    bestTime: '[X]',
    kind: 'National park',
    highlights: ['Great Migration', 'Big cats', 'Endless plains'],
    group: 'parks',
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro',
    tagline: 'A whole world inside a crater.',
    description: 'A volcanic crater packed with wildlife, with views from the rim.',
    image: '/images/destinations/ngorongoro.jpg',
    alt: 'View over the Ngorongoro Crater from a lodge terrace',
    query: 'Ngorongoro',
    bestTime: '[X]',
    kind: 'Conservation area',
    highlights: ['Crater floor', 'Dense wildlife', 'Rim views'],
    group: 'parks',
  },
  {
    slug: 'tarangire',
    name: 'Tarangire',
    tagline: 'Elephants. Baobabs. Room to roam.',
    description: 'Big elephant herds beneath ancient baobab trees.',
    image: '/images/destinations/tarangire.jpg',
    alt: 'Elephants gathered beside a baobab tree in Tarangire',
    query: 'Tarangire',
    bestTime: '[X]',
    kind: 'National park',
    highlights: ['Elephant herds', 'Baobab trees', 'Dry-season wildlife'],
    group: 'parks',
  },
  {
    slug: 'lake-manyara',
    name: 'Lake Manyara',
    tagline: 'Forest meets the Rift Valley.',
    description: 'Groundwater forest, flamingos and the Rift Valley escarpment.',
    image: '/images/destinations/lake-manyara.jpg',
    alt: 'Flamingos on the shore of Lake Manyara',
    query: 'Manyara',
    bestTime: '[X]',
    kind: 'National park',
    highlights: ['Flamingos', 'Groundwater forest', 'Rift Valley views'],
    group: 'parks',
  },
  {
    slug: 'ndutu',
    name: 'Ndutu',
    tagline: 'Life begins on the southern plains.',
    description:
      'Calving-season plains on the southern Serengeti ecosystem, with mobile camps timed around wildlife movements.',
    image: '/images/destinations/ndutu.jpg',
    alt: 'Wildebeest on the Ndutu plains during calving season',
    position: 'center 40%',
    query: 'Ndutu',
    bestTime: '[X]',
    kind: 'Seasonal plains',
    highlights: ['Calving season', 'Mobile camps', 'Southern Serengeti'],
    group: 'parks',
  },
  {
    slug: 'lake-natron',
    name: 'Lake Natron',
    tagline: 'A quieter, wilder Tanzania.',
    description:
      'Salt flats, flamingo habitat and Maasai country beneath Ol Doinyo Lengai. A quieter addition to a northern journey.',
    image: '/images/destinations/lake-natron.jpg',
    alt: 'Flamingos and salt flats at Lake Natron',
    query: 'Natron',
    bestTime: '[X]',
    kind: 'Rift Valley lake',
    highlights: ['Flamingos', 'Rift Valley', 'Ol Doinyo Lengai'],
    group: 'parks',
  },
  {
    slug: 'kilimanjaro',
    name: 'Kilimanjaro',
    tagline: 'A higher perspective.',
    description: "Africa's highest peak, for climbers and for anyone who wants the view.",
    image: '/images/destinations/kilimanjaro.jpg',
    alt: 'Climbers and a tent beneath the snow-capped summit of Kilimanjaro',
    query: 'Kilimanjaro',
    bestTime: '[X]',
    kind: 'Mountain',
    highlights: ["Africa's highest peak", 'Climb or view', 'Snow-capped summit'],
    group: 'beyond',
    href: '/kilimanjaro/',
  },
  {
    slug: 'zanzibar',
    name: 'Zanzibar',
    tagline: 'Slow down by the sea.',
    description: 'White sand, turquoise water and Stone Town, after the game drives.',
    image: '/images/destinations/zanzibar.jpg',
    alt: 'Thatched beach lodge on stilts over turquoise water in Zanzibar',
    query: 'Zanzibar',
    bestTime: '[X]',
    kind: 'Island',
    highlights: ['White-sand beaches', 'Stone Town', 'Slow days by the sea'],
    group: 'beyond',
    href: '/zanzibar/',
  },
];

/** @param {Destination} d @param {{ title?: string; route?: string[] }[]} journeys */
export function countJourneysFor(d, journeys) {
  const needle = d.query.toLowerCase();
  return (journeys || []).filter((j) =>
    [j.title, ...(j.route || [])].join(' ').toLowerCase().includes(needle),
  ).length;
}
