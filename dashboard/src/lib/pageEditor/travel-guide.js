/** Travel guide editor. Paths match src/content/travelGuideDefaults.js. */
import { LINK_HINT, long, text } from './fields.js';

export default [
  {
    label: 'Page head',
    fields: [
      text('head.label', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (accent colour)'),
      long('head.text', 'Intro'),
    ],
  },
  {
    label: 'Sidebar',
    hint: 'The box beside the questions.',
    fields: [
      text('aside.eyebrow', 'Eyebrow'),
      text('aside.title', 'Heading'),
      long('aside.intro', 'Text'),
      text('aside.buttonText', 'Button text'),
      text('aside.buttonPath', 'Button link', { hint: LINK_HINT }),
    ],
  },
  {
    label: 'Questions',
    hint: 'The questions and answers on this page.',
    panel: 'home-faq',
    fields: [],
  },
];
