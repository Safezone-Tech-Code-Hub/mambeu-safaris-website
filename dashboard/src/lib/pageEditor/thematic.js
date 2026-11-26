/** Shared editor layout for the Kilimanjaro and Zanzibar pages (src/content/thematicDefaults.js). */
import { image, LINK_HINT, list, long, text } from './fields.js';

export function thematicTabs({ relatedHint }) {
  return [
    {
      label: 'Hero',
      fields: [
        text('label', 'Eyebrow'),
        text('titleLine1', 'Title line 1'),
        text('titleLine2', 'Title line 2'),
        long('text', 'Intro'),
        image('photo', 'Photo'),
        text('photoAlt', 'Photo description'),
      ],
    },
    {
      label: 'Story & button',
      fields: [
        text('splitSection.eyebrow', 'Eyebrow'),
        text('splitSection.titleLine1', 'Heading line 1'),
        text('splitSection.titleLine2', 'Heading line 2'),
        long('splitSection.lead', 'Lead'),
        long('splitSection.body', 'Body'),
        text('splitSection.buttonText', 'Button text'),
        text('splitSection.planDestination', 'Plan form: destination', {
          hint: 'Pre-fills the plan form, e.g. kilimanjaro or zanzibar.',
        }),
      ],
    },
    {
      label: 'Steps',
      fields: [
        list('blocks', 'Steps', [text('title', 'Title'), long('text', 'Text')], {
          itemLabel: 'step',
          itemTitleKey: 'title',
          hint: 'Numbered 01, 02, 03… in this order.',
        }),
      ],
    },
    {
      label: 'Related safaris',
      hint: relatedHint,
      panel: 'tours-list',
      fields: [
        text('relatedSection.title', 'Section heading'),
        text('relatedSection.linkText', 'Link text'),
        text('relatedSection.linkPath', 'Link', { hint: LINK_HINT }),
      ],
    },
  ];
}
