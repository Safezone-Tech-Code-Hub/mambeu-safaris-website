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

/** Plain text links in the Safaris dropdown / mobile accordion. */
export const safariNavLinks = [
  { title: 'All safari journeys', to: href('safaris') },
  { title: 'Comfort safaris', to: href('safaris?style=comfort') },
  { title: 'Luxury safaris', to: href('safaris?style=luxury') },
  { title: 'Camping adventures', to: href('safaris?style=camping') },
  { title: 'Compare comfort levels', to: href('comfort') },
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
