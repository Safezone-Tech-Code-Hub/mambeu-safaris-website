/** Comfort page editor. Paths match src/content/comfortDefaults.js. */
import { image, LINK_HINT, long, text } from './fields.js';

export default [
  {
    label: 'Page head',
    fields: [
      text('head.label', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (accent colour, optional)'),
      long('head.text', 'Intro'),
      image('head.photo', 'Header photo (optional)'),
      text('head.photoAlt', 'Header photo description'),
    ],
  },
  {
    label: 'Comfort tabs',
    panel: 'comfort-levels',
    hint: 'Each tab’s photo, title, text, bullets and button: Library → Comfort levels.',
    fields: [
      text('comfortSection.eyebrow', 'Eyebrow'),
      text('comfortSection.titleLine1', 'Heading line 1'),
      text('comfortSection.titleLine2', 'Heading line 2'),
      text('comfortSection.introLine1', 'Intro line 1 (right column)'),
      text('comfortSection.introLine2', 'Intro line 2'),
      text('comfortSection.panelEyebrowSuffix', 'Word after the level name', {
        hint: 'Shown as “02 / COMFORT SAFARIS”.',
      }),
      text('comfortSection.defaultTab', 'Tab open on arrival', { hint: 'Midrange, Comfort or Luxury.' }),
    ],
  },
  {
    label: 'Thoughtful balance',
    fields: [
      text('balanceSection.eyebrow', 'Eyebrow'),
      text('balanceSection.titleLine1', 'Heading line 1'),
      text('balanceSection.titleLine2', 'Heading line 2'),
      long('balanceSection.lead', 'Lead paragraph'),
      long('balanceSection.body', 'Second paragraph'),
      text('balanceSection.linkText', 'Link text'),
      text('balanceSection.linkPath', 'Link', { hint: `e.g. safaris?style=camping. ${LINK_HINT}` }),
    ],
  },
];
