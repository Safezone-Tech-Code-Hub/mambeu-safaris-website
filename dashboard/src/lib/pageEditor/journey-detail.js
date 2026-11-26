/** Journey page template: wording shared by every safari journey page. Paths match src/content/journeyDefaults.js. */
import { LINK_HINT, long, text } from './fields.js';

export default [
  {
    label: 'Top of page',
    hint: 'Each journey’s title, photo, route and days come from Library → Safari tours.',
    fields: [
      text('hero.breadcrumbPrefix', 'Breadcrumb text (style is added after)'),
      text('hero.eyebrowSuffix', 'Label after the duration'),
      text('anchors.overview', 'Section menu: Overview'),
      text('anchors.itinerary', 'Section menu: Itinerary'),
      text('anchors.stays', 'Section menu: Stays'),
      text('anchors.included', 'Section menu: Inclusions'),
      text('anchors.enquire', 'Section menu: Quotation'),
    ],
  },
  {
    label: 'Overview',
    fields: [
      text('overview.eyebrow', 'Eyebrow'),
      text('overview.titleLine1', 'Heading line 1'),
      text('overview.titleLine2', 'Heading line 2'),
      text('overview.durationLabel', 'Duration label'),
      text('overview.durationSuffix', 'Word after the number of days'),
      text('overview.styleLabel', 'Style label'),
      text('overview.planningLabel', 'Planning label'),
      text('overview.planningValue', 'Planning value'),
    ],
  },
  {
    label: 'Day by day',
    fields: [
      text('itinerary.eyebrow', 'Eyebrow'),
      text('itinerary.title', 'Heading'),
      text('itinerary.expandLabel', 'Expand button'),
      text('itinerary.collapseLabel', 'Collapse button'),
      text('itinerary.dayPrefix', 'Word before the day number'),
      text('itinerary.stayLabel', 'Accommodation label'),
      text('itinerary.mealsLabel', 'Meals label'),
      long('itinerary.noItinerary', 'Text when a tour has no itinerary'),
    ],
  },
  {
    label: 'Stays',
    fields: [
      text('stays.eyebrow', 'Eyebrow'),
      text('stays.title', 'Heading'),
      text('stays.dayPrefix', 'Word before the day number'),
      long('stays.fallback', 'Text when no stays are listed'),
      long('stays.fineprint', 'Small print'),
      text('stays.askLink', 'Link text'),
    ],
  },
  {
    label: 'Inclusions',
    fields: [
      text('inclusions.includedEyebrow', 'Included: eyebrow'),
      text('inclusions.includedTitle', 'Included: heading'),
      long('inclusions.includedFallback', 'Included: text when the tour lists none'),
      text('inclusions.excludedEyebrow', 'Excluded: eyebrow'),
      text('inclusions.excludedTitle', 'Excluded: heading'),
      long('inclusions.excludedFallback', 'Excluded: text when the tour lists none'),
      long('inclusions.activitiesNote', 'Note below'),
    ],
  },
  {
    label: 'Quotation box',
    fields: [
      text('quotation.eyebrow', 'Eyebrow'),
      text('quotation.titleLine1', 'Heading line 1'),
      text('quotation.titleLine2', 'Heading line 2'),
      text('quotation.groupLabel', 'Group size label'),
      text('quotation.priceUnit', 'Text under the price'),
      long('quotation.priceFineprint', 'Price small print'),
      long('quotation.noTiers', 'Text when a tour has no prices'),
      text('quotation.enquireButton', 'Enquire button'),
      text('quotation.whatsappLink', 'WhatsApp link text'),
      text('quotation.whatsappPrefix', 'WhatsApp message start (tour title is added after)'),
      text('quotation.noteHeading', 'Note heading'),
      long('quotation.noteText', 'Note text'),
    ],
  },
  {
    label: 'Related journeys',
    fields: [
      text('related.heading', 'Heading'),
      text('related.linkText', 'Link text'),
      text('related.linkPath', 'Link', { hint: LINK_HINT }),
    ],
  },
  {
    label: 'Tour records',
    panel: 'tours-list',
    fields: [],
  },
];
