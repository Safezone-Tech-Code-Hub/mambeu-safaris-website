/** Experiences page editor. Paths match src/content/experiencesDefaults.js. */
import { image, lines, LINK_HINT, list, long, text } from './fields.js';

export default [
  {
    label: 'Page head',
    fields: [
      text('head.eyebrow', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (lighter)'),
      long('head.text', 'Intro'),
      image('head.image', 'Header photo'),
    ],
  },
  {
    label: 'How experiences work',
    hint: 'The short intro and the three facts under the header.',
    fields: [
      text('intro.eyebrow', 'Eyebrow'),
      text('intro.title', 'Heading'),
      long('intro.text', 'Text'),
      list('facts', 'Facts', [text('title', 'Title'), text('text', 'Text')], {
        itemLabel: 'fact',
        itemTitleKey: 'title',
      }),
    ],
  },
  {
    label: 'Experiences',
    hint: 'Cards appear in this order. The category becomes a filter button. The card marked as featured is shown large at the top.',
    fields: [
      list(
        'items',
        'Experiences',
        [
          text('title', 'Title'),
          text('status', 'Status', { hint: 'published or draft. Drafts are hidden on the site.' }),
          text('featured', 'Featured', { hint: 'Type yes to show this one large at the top. Use it on one card only.' }),
          text('slug', 'Slug', {
            hint: 'Short web name, e.g. hot-air-balloon. Plan-form links and other pages point to it, so change it only if you have to.',
          }),
          text('category', 'Category', { hint: 'e.g. Family, Couples, Adventure, Culture, Coast, Day tours.' }),
          long('summary', 'Summary'),
          image('image', 'Photo'),
          text('imageAlt', 'Photo description'),
          text('focal', 'Photo focus (optional)', { hint: 'Which part of the photo to keep in view, e.g. 50% 25% (left/top).' }),
          text('location', 'Where'),
          text('bestTime', 'Best time / When'),
          text('duration', 'Duration'),
          text('bestFor', 'Best for'),
          lines('highlights', 'Highlights', { hint: 'One per line. Cards show the first three.' }),
          lines('included', 'Usually included'),
          lines('goodToKnow', 'Good to know'),
        ],
        { itemLabel: 'experience', itemTitleKey: 'title' },
      ),
    ],
  },
  {
    label: 'Labels',
    hint: 'Filter, card button and detail panel wording.',
    fields: [
      text('filter.allLabel', 'Filter: “all” button'),
      text('filter.countSingular', 'Count word (one)'),
      text('filter.countPlural', 'Count word (many)'),
      text('card.detailsButton', 'Card: details button'),
      text('card.planButton', 'Card and panel: plan button'),
      text('panel.whereLabel', 'Panel: “Where” label'),
      text('panel.whenLabel', 'Panel: “When” label'),
      text('panel.durationLabel', 'Panel: “Duration” label'),
      text('panel.expectHeading', 'Panel: “What to expect” heading'),
      text('panel.bestTimeLabel', 'Panel: “Best time” label'),
      text('panel.bestForLabel', 'Panel: “Best for” label'),
      text('panel.includedHeading', 'Panel: “Usually included” heading'),
      text('panel.goodToKnowHeading', 'Panel: “Good to know” heading'),
      text('panel.highlightsHeading', 'Panel: “Highlights” heading'),
    ],
  },
  {
    label: 'Closing invite',
    hint: 'The WhatsApp button uses the number in Header & footer.',
    fields: [
      text('closing.titleLine1', 'Heading line 1'),
      text('closing.titleLine2', 'Heading line 2 (lighter)'),
      long('closing.text', 'Text'),
      text('closing.planButton', 'Plan button text'),
      text('closing.planLink', 'Plan button link', { hint: LINK_HINT }),
      text('closing.whatsappButton', 'WhatsApp button text'),
    ],
  },
];
