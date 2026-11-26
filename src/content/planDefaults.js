/**
 * Plan / contact page content (schema 2). Defaults match what the redesigned page shows;
 * the dashboard editor (dashboard/src/lib/pageEditor/plan.js) edits these exact paths.
 *
 * Dropdown choices: only the visible labels are content. The values sent with an enquiry and
 * matched by links such as /plan/?style=Luxury stay fixed in Plan.jsx (PLAN_OPTION_VALUES),
 * paired with these labels by position.
 */
import { carry, mergePage } from './schema.js';

export const planPageDefaults = {
  head: {
    label: 'START THE CONVERSATION',
    titleLine1: 'Let’s plan',
    titleLine2: 'your safari.',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
  form: {
    title: 'Tell us about your trip',
    requiredNote: 'Fields marked * are required. Everything else is optional.',
    chipsTitle: 'You’re asking about',
    groupYou: 'About you',
    groupTrip: 'Your trip',
    groupInterests: 'What you have in mind',
    labels: {
      name: 'Your name',
      email: 'Email address',
      phone: 'Phone / WhatsApp',
      country: 'Country of residence',
      date: 'Preferred arrival date',
      guests: 'Number of travellers',
      days: 'Trip length',
      style: 'Safari style',
      interest: 'Main interest',
      journey: 'A journey you like (optional)',
      message: 'Tell us a little more',
    },
    placeholders: {
      name: 'Your full name',
      email: 'you@example.com',
      phone: '+255 …  (include your country code)',
      country: 'e.g. United Kingdom',
      journey: 'A journey name, or a park you have in mind',
      message:
        'Parks you would like to see, children’s ages, special occasions, anything we should know',
    },
    hints: {
      phone: 'We can reply on WhatsApp if you add your number.',
      date: 'An approximate date is fine. Leave it blank if you are still deciding.',
    },
    daysOptions: ['Not sure yet', '2 to 4 days', '5 to 6 days', '7 to 9 days', '10+ days'],
    styleOptions: ['Comfort', 'Midrange', 'Luxury', 'Camping', 'Please advise me'],
    interestOptions: [
      'Wildlife safari',
      'Safari and beach',
      'Kilimanjaro',
      'Zanzibar',
      'Family',
      'Romantic',
      'Balloon',
      'Cultural experiences',
    ],
    whatsappButton: 'Prepare WhatsApp enquiry',
    emailButton: 'Prepare email enquiry',
    submitNote:
      'Review your enquiry below, then send it through WhatsApp or your email app. Nothing is sent until you do.',
    replyTime: '',
    messageIntro: 'Hello Mambeu Safaris, I would like to plan a journey.',
  },
  preview: {
    title: 'Your enquiry is ready.',
    text: 'Review the details, then choose how to send your message to Mambeu.',
    inboxSaving: 'Saving a copy for our team…',
    inboxSaved: 'Saved to our inbox — our team can see your details in the dashboard.',
    inboxError:
      'We could not save to our inbox right now. You can still send your enquiry by WhatsApp or email below.',
    whatsappOpen: 'Open WhatsApp',
    emailOpen: 'Open email',
    copyLabel: 'Copy enquiry',
    copied: 'Enquiry copied.',
    copyFallback: 'Message selected. Copy it using your device’s copy command.',
  },
  aside: {
    title: 'No perfect plan needed.',
    text: 'Share what you know. We’ll help with the rest.',
    talkLabel: 'Prefer to talk?',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    officeLabel: 'Office',
    hoursSuffix: 'EAT',
  },
};

/** The old editor's eyebrow and intro text were already shown on the page; keep them. */
function migrateV1(old) {
  return carry(old, ['head.label', 'head.text']);
}

export function mergePlanContent(cmsPlan) {
  return mergePage(planPageDefaults, cmsPlan, migrateV1);
}
