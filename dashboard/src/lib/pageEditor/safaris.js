/** Safari collection editor. Paths match src/content/safarisDefaults.js. */
import { image, LINK_HINT, long, text } from './fields.js';

export default [
  {
    label: 'Page head',
    fields: [
      text('head.label', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (lighter)'),
      long('head.text', 'Intro', { hint: '{count} is replaced with the number of published journeys.' }),
      image('head.photo', 'Header photo'),
    ],
  },
  {
    label: 'Filters & results',
    hint: 'Interest and length choices are shared with the homepage finder. Park choices are fixed because they drive the search.',
    fields: [
      text('browser.allTab', 'First style tab'),
      text('browser.filtersLabel', 'Filters button (phones)'),
      text('browser.parkLabel', 'Park label'),
      text('browser.anyPark', 'Park: “any” option'),
      text('browser.interestLabel', 'Interest label'),
      text('browser.lengthLabel', 'Length label'),
      text('browser.sortLabel', 'Sort label'),
      text('browser.sortRecommended', 'Sort option: recommended'),
      text('browser.sortShortest', 'Sort option: shortest'),
      text('browser.sortLongest', 'Sort option: longest'),
      text('browser.countText', 'Result count', { hint: '{shown} and {total} are replaced with numbers.' }),
      text('browser.clearAll', 'Clear filters button'),
      text('browser.showMore', 'Show more button'),
      text('browser.emptyTitle', 'No results: heading'),
      long('browser.emptyText', 'No results: text'),
    ],
  },
  {
    label: 'Bottom box',
    fields: [
      text('browser.closeTitle', 'Heading'),
      long('browser.closeText', 'Text'),
      text('browser.planButton', 'Button text (also used in the no-results box)'),
      text('browser.planLink', 'Button link', { hint: LINK_HINT }),
    ],
  },
  {
    label: 'Journey cards',
    hint: 'Labels on every journey card across the site. Titles, photos and text: Library → Safari tours.',
    fields: [
      text('cards.durationLabel', 'Duration label'),
      text('cards.dayUnit', 'Unit for 1 day'),
      text('cards.daysUnit', 'Unit for several days'),
      text('cards.pricingLabel', 'Pricing label'),
      text('cards.pricingByGroup', 'Pricing: priced journeys'),
      text('cards.pricingTailored', 'Pricing: tailored journeys'),
      text('cards.viewMore', 'Link text'),
    ],
  },
  {
    label: 'Safari journeys',
    panel: 'tours-list',
    fields: [],
  },
];
