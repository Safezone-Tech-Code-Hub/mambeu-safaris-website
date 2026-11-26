/** Destinations hub editor. Paths match src/content/destinationsDefaults.js. */
import { image, LINK_HINT, lines, list, long, text } from './fields.js';

const PARKS_NOTE =
  'These cards are the hub’s own copy. Each park’s own page (/destinations/<slug>/) is edited in Library → Places.';

/** Card fields shared by every section. `soon` sections link to the plan form instead of a park page. */
function cards(path, { soon = false } = {}) {
  return list(
    path,
    'Cards',
    [
      text('name', 'Name'),
      text('kind', 'Small label above the name', soon ? { hint: 'e.g. Coming soon' } : { hint: 'e.g. National park' }),
      text('tagline', 'Tagline'),
      long('description', 'Description (shown on hover)'),
      image('image', 'Photo'),
      lines('highlights', 'Highlights', { hint: 'One per line. The first three are shown.' }),
      text('slug', 'Slug', {
        hint: soon
          ? 'e.g. ruaha. Pre-fills the plan form.'
          : 'e.g. serengeti. Opens /destinations/<slug>/ and pre-fills the plan form.',
      }),
      ...(soon
        ? []
        : [
            text('link', 'Custom link (optional)', { hint: `Overrides the park page link. ${LINK_HINT}` }),
            text('query', 'Journey search word', {
              hint: 'Counts journeys whose title or route contains this word (e.g. Manyara). Empty uses the name.',
            }),
            text('bestTime', 'Best time badge (optional)', { hint: 'Hidden while empty or [X].' }),
          ]),
    ],
    { itemLabel: 'card', itemTitleKey: 'name' },
  );
}

function section(key, label, hint, opts) {
  return {
    label,
    hint,
    fields: [text(`${key}.title`, 'Heading'), long(`${key}.lede`, 'Intro'), cards(`${key}.places`, opts)],
  };
}

export default [
  {
    label: 'Page header',
    fields: [
      text('header.eyebrow', 'Eyebrow'),
      text('header.titleLine1', 'Title line 1'),
      text('header.titleLine2', 'Title line 2 (lighter)'),
      long('header.text', 'Intro'),
      image('header.image', 'Background photo'),
    ],
  },
  section('northern', 'Northern circuit', `Linked from the menu as “Northern circuit”. ${PARKS_NOTE}`),
  section(
    'southern',
    'Southern circuit',
    'Cards here show “Coming soon” and open the plan form instead of a park page.',
    { soon: true },
  ),
  section(
    'western',
    'Western circuit',
    'Cards here show “Coming soon” and open the plan form instead of a park page.',
    { soon: true },
  ),
  section('beyond', 'Beyond the parks', 'Kilimanjaro and Zanzibar link to their own pages through “Custom link”.'),
  {
    label: 'Card labels',
    hint: 'Small words used on every card.',
    fields: [
      text('labels.planLinkPrefix', 'Plan link (the place name is added after)'),
      text('labels.exploreLinkPrefix', 'Screen-reader link text (the place name is added after)'),
      text('labels.comingSoon', 'Badge on southern and western cards'),
      text('labels.journeySingular', 'Badge word for 1 journey'),
      text('labels.journeyPlural', 'Badge word for several journeys'),
      text('labels.tailorMade', 'Badge when no journeys match'),
    ],
  },
];
