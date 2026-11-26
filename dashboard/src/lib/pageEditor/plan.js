/** Plan your trip (enquiry form) editor. Paths match src/content/planDefaults.js. */
import { lines, long, text } from './fields.js';

const OPTION_HINT =
  'One choice per line, in this order. Only the wording changes: each line stays linked to the same choice in enquiries, so keep the number and order of lines.';

export default [
  {
    label: 'Page header',
    fields: [
      text('head.label', 'Eyebrow'),
      text('head.titleLine1', 'Title line 1'),
      text('head.titleLine2', 'Title line 2 (lighter)'),
      long('head.text', 'Intro'),
    ],
  },
  {
    label: 'Form',
    hint: 'Headings and field labels of the enquiry form.',
    fields: [
      text('form.title', 'Form heading'),
      text('form.requiredNote', 'Note under heading'),
      text('form.chipsTitle', 'Heading above pre-filled choices', {
        hint: 'Shown when a visitor arrives from a journey, place or experience.',
      }),
      text('form.groupYou', 'Group 1 heading'),
      text('form.labels.name', 'Name label'),
      text('form.placeholders.name', 'Name placeholder'),
      text('form.labels.email', 'Email label'),
      text('form.placeholders.email', 'Email placeholder'),
      text('form.labels.phone', 'Phone label'),
      text('form.placeholders.phone', 'Phone placeholder'),
      text('form.hints.phone', 'Phone help text'),
      text('form.labels.country', 'Country label'),
      text('form.placeholders.country', 'Country placeholder'),
      text('form.groupTrip', 'Group 2 heading'),
      text('form.labels.date', 'Arrival date label'),
      text('form.hints.date', 'Arrival date help text'),
      text('form.labels.guests', 'Travellers label'),
      text('form.labels.days', 'Trip length label'),
      lines('form.daysOptions', 'Trip length choices', { hint: OPTION_HINT }),
      text('form.labels.style', 'Safari style label'),
      lines('form.styleOptions', 'Safari style choices', { hint: OPTION_HINT }),
      text('form.groupInterests', 'Group 3 heading'),
      text('form.labels.interest', 'Main interest label'),
      lines('form.interestOptions', 'Main interest choices', { hint: OPTION_HINT }),
      text('form.labels.journey', 'Journey label'),
      text('form.placeholders.journey', 'Journey placeholder'),
      text('form.labels.message', 'Message label'),
      long('form.placeholders.message', 'Message placeholder'),
    ],
  },
  {
    label: 'Buttons & preview',
    hint: 'Send buttons and the preview that appears after a visitor prepares an enquiry.',
    fields: [
      text('form.whatsappButton', 'WhatsApp button'),
      text('form.emailButton', 'Email button'),
      long('form.submitNote', 'Text under buttons'),
      text('form.replyTime', 'Reply time (optional)', {
        hint: 'e.g. one working day. Adds “We usually reply within …” after the text above.',
      }),
      text('form.messageIntro', 'First line of the enquiry message'),
      text('preview.title', 'Preview heading'),
      long('preview.text', 'Preview text'),
      text('preview.inboxSaving', 'Status: saving'),
      text('preview.inboxSaved', 'Status: saved'),
      long('preview.inboxError', 'Status: could not save'),
      text('preview.whatsappOpen', 'Open WhatsApp button'),
      text('preview.emailOpen', 'Open email button'),
      text('preview.copyLabel', 'Copy button'),
      text('preview.copied', 'Message after copying'),
      text('preview.copyFallback', 'Message when copying is not possible'),
    ],
  },
  {
    label: 'Sidebar',
    hint: 'Contact details themselves (numbers, email, office) are edited in Header & footer.',
    fields: [
      text('aside.title', 'Heading'),
      long('aside.text', 'Text'),
      text('aside.talkLabel', 'Contact list heading'),
      text('aside.whatsappLabel', 'WhatsApp label'),
      text('aside.emailLabel', 'Email label'),
      text('aside.phoneLabel', 'Phone label'),
      text('aside.officeLabel', 'Office label'),
      text('aside.hoursSuffix', 'Text after office hours', { hint: 'e.g. EAT' }),
    ],
  },
];
