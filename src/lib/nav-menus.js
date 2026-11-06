import { href } from './utils.js';

/** Regions and places in the Destinations mega menu / mobile accordion. */
export const destNavPlaces = [
  {
    title: 'Northern circuit',
    text: 'Serengeti, Ngorongoro and Manyara.',
    to: `${href('destinations')}#northern-circuit`,
  },
  {
    title: 'Southern circuit',
    text: 'Quieter parks, further south.',
    to: `${href('destinations')}#southern-circuit`,
  },
  {
    title: 'Western circuit',
    text: 'Remote west Tanzania.',
    to: `${href('destinations')}#western-circuit`,
  },
  {
    title: 'Kilimanjaro',
    text: 'Climb, or just the view.',
    to: href('kilimanjaro'),
  },
  {
    title: 'Zanzibar',
    text: 'Stone Town and the coast.',
    to: href('zanzibar'),
  },
];

export const safariNavPlaces = [
  {
    title: 'Comfort',
    text: 'Lodges and a softer pace.',
    to: href('safaris?style=comfort'),
  },
  {
    title: 'Luxury',
    text: 'Finer camps and more space.',
    to: href('safaris?style=luxury'),
  },
  {
    title: 'Camping',
    text: 'Closer to the bush.',
    to: href('safaris?style=camping'),
  },
];

/** Right-hand photos in the Destinations mega — places, with matching images. */
export const destNavFeatured = [
  {
    title: 'Serengeti',
    to: href('destinations/serengeti'),
    image: '/images/destinations/serengeti.jpg',
  },
  {
    title: 'Kilimanjaro',
    to: href('kilimanjaro'),
    image: '/images/destinations/kilimanjaro.jpg',
  },
  {
    title: 'Zanzibar',
    to: href('zanzibar'),
    image: '/images/destinations/zanzibar.jpg',
  },
];

/** Right-hand photos in the Safaris mega — experience names. */
export const experienceNavFeatured = [
  {
    title: 'Family vacations',
    to: `${href('experiences')}#family-safaris`,
    image: '/images/experiences/family.jpg',
  },
  {
    title: 'Romantic holidays',
    to: `${href('experiences')}#romantic-bush-dinner`,
    image: '/images/experiences/romantic.jpg',
  },
  {
    title: 'Balloon safaris',
    to: `${href('experiences')}#hot-air-balloon`,
    image: '/images/experiences/balloon.jpg',
  },
];
