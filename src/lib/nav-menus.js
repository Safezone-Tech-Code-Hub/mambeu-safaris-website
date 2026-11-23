import { href } from './utils.js';

/** Plain text links in the Destinations dropdown / mobile accordion. */
export const destNavLinks = [
  { title: 'All destinations', to: href('destinations') },
  { title: 'Northern circuit', to: `${href('destinations')}#northern-circuit` },
  { title: 'Southern circuit', to: `${href('destinations')}#southern-circuit` },
  { title: 'Western circuit', to: `${href('destinations')}#western-circuit` },
  { title: 'Kilimanjaro', to: href('kilimanjaro') },
  { title: 'Zanzibar', to: href('zanzibar') },
];

/** Plain text links in the Safaris dropdown / mobile accordion. */
export const safariNavLinks = [
  { title: 'All safari journeys', to: href('safaris') },
  { title: 'Comfort safaris', to: href('safaris?style=comfort') },
  { title: 'Luxury safaris', to: href('safaris?style=luxury') },
  { title: 'Camping adventures', to: href('safaris?style=camping') },
  { title: 'Compare comfort levels', to: href('comfort') },
];
