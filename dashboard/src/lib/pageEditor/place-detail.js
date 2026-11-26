/** Park page template editor (/destinations/<slug>/). Paths match src/content/placeDefaults.js. */
import { long, text } from './fields.js';

const NAME_HINT = 'Write {name} to insert the park’s name.';

export default [
  {
    label: 'Story section',
    hint: 'Words shared by every park page. Each park’s name, photo, text and facts: Library → Places.',
    fields: [
      text('head.label', 'Eyebrow above the park name', { hint: NAME_HINT }),
      text('story.eyebrow', 'Story eyebrow'),
      text('story.titleLine1', 'Story heading line 1'),
      text('story.titleLine2', 'Story heading line 2'),
      text('searchButton', 'Search journeys button'),
    ],
  },
  {
    label: 'Related journeys',
    fields: [
      text('related.heading', 'Section heading'),
      text('related.planLinkText', 'Plan link text', { hint: NAME_HINT }),
    ],
  },
  {
    label: 'No journeys yet',
    hint: 'Shown instead of journey cards when no safari mentions the park.',
    fields: [
      text('empty.heading', 'Heading'),
      long('empty.text', 'Text', { hint: NAME_HINT }),
      text('empty.button', 'Button text', { hint: NAME_HINT }),
    ],
  },
  {
    label: 'Place records',
    panel: 'home-places',
    fields: [],
  },
];
