import { mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

export const planPageDefaults = {
  head: {
    label: 'START THE CONVERSATION',
    titleLine1: 'Let’s plan your safari.',
    titleLine2: '',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
  aside: {
    eyebrow: 'TALK TO YOUR LOCAL TEAM',
    titleLine1: 'No perfect plan',
    titleLine2: 'needed.',
    intro: 'Share what you know. We’ll help with the rest.',
    step1Title: 'Share your ideas',
    step1Detail: 'Your dates, interests and comfort.',
    step2Title: 'Shape the journey',
    step2Detail: 'A personal route and quotation.',
    step3Title: 'Make it happen',
    step3Detail: 'Confirm the details with our team.',
  },
  form: {
    eyebrow: 'YOUR JOURNEY STARTS HERE',
    whatsappButton: 'Prepare WhatsApp enquiry',
    emailButton: 'Prepare email enquiry',
    fineprint:
      'Review your enquiry below, then send it through WhatsApp or your email app. Nothing is sent until you do.',
    previewTitle: 'Your enquiry is ready.',
    previewIntro: 'Review the details, then choose how to send your message to Mambeu.',
    whatsappOpen: 'Open WhatsApp',
    emailOpen: 'Open email',
    copyLabel: 'Copy enquiry',
  },
};

export function normalizeLegacyPlan(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyHeadTitle(next.head.title) };
  }
  return next;
}

export function mergePlanContent(cmsPlan) {
  const src = normalizeLegacyPlan(cmsPlan);
  const out = {};
  for (const [key, defaults] of Object.entries(planPageDefaults)) {
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) out.head = stripLegacyHeadTitle(out.head);
  return out;
}
