/** About / Our story editor. Paths match src/content/aboutDefaults.js. */
import { image, lines, list, long, text } from './fields.js';

export default [
  {
    label: 'Page header',
    hint: 'The green band with a photo at the top of the page.',
    fields: [
      text('head.label', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (lighter)'),
      long('head.text', 'Intro'),
      image('head.image', 'Background photo'),
    ],
  },
  {
    label: 'Who we are',
    hint: 'Story text, the three small pillars and the photo beside them.',
    fields: [
      text('intro.eyebrow', 'Eyebrow'),
      text('intro.titleLine1', 'Heading start'),
      text('intro.titleLine2', 'Heading end (accent colour)'),
      long('intro.lead', 'Lead paragraph'),
      lines('intro.paragraphs', 'More paragraphs', { hint: 'One paragraph per line.' }),
      list(
        'intro.pillars',
        'Pillars',
        [
          text('title', 'Title'),
          long('text', 'Text'),
          text('icon', 'Icon', { hint: 'One of: book, tree, people.' }),
        ],
        { itemLabel: 'pillar', itemTitleKey: 'title' },
      ),
      image('intro.photo', 'Photo'),
      text('intro.photoAlt', 'Photo description (for accessibility)'),
      text('intro.caption', 'Caption under photo'),
    ],
  },
  {
    label: 'Reviews link',
    hint: 'The SafariBookings strip under the story.',
    fields: [
      image('proof.logo', 'Logo'),
      text('proof.logoAlt', 'Logo description'),
      text('proof.label', 'Heading'),
      text('proof.text', 'Text'),
      text('proof.buttonText', 'Button text'),
      text('proof.href', 'Button link', { hint: 'Full https:// address of your profile page.' }),
    ],
  },
  {
    label: 'How we work',
    fields: [
      text('principles.eyebrow', 'Eyebrow'),
      text('principles.titleLine1', 'Heading start'),
      text('principles.titleLine2', 'Heading end'),
      list(
        'principles.items',
        'Cards',
        [
          text('title', 'Title'),
          long('text', 'Text'),
          text('tag', 'Small tag (optional)'),
          text('icon', 'Icon', { hint: 'One of: pin, chat, sprout.' }),
        ],
        { itemLabel: 'card', itemTitleKey: 'title' },
      ),
    ],
  },
  {
    label: 'Mission & vision',
    fields: [
      text('mission.label', 'Mission label'),
      long('mission.text', 'Mission text'),
      text('vision.label', 'Vision label'),
      long('vision.text', 'Vision text'),
    ],
  },
  {
    label: 'Why book with us',
    hint: 'The green “Your next chapter” band below this section is edited in Header & footer.',
    fields: [
      text('why.eyebrow', 'Eyebrow'),
      text('why.title', 'Heading'),
      long('why.text', 'Intro'),
      list(
        'why.items',
        'Reasons',
        [
          text('title', 'Title'),
          long('text', 'Text'),
          text('icon', 'Icon', { hint: 'One of: landscape, person, leaf, people.' }),
        ],
        { itemLabel: 'reason', itemTitleKey: 'title' },
      ),
    ],
  },
];
