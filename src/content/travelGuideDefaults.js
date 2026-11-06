import { mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

export const travelGuidePageDefaults = {
  head: {
    label: 'PLAN WITH CONFIDENCE',
    titleLine1: 'Good questions.',
    titleLine2: 'Clear answers.',
    text: 'Practical starting points for your safari, mountain journey or Zanzibar escape.',
  },
  aside: {
    eyebrow: 'YOUR LOCAL TEAM',
    title: 'Still curious?',
    intro: 'Let’s talk through your plans.',
    buttonText: 'Ask a safari specialist',
    buttonPath: 'plan',
  },
};

export function normalizeLegacyTravelGuide(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyHeadTitle(next.head.title) };
  }
  return next;
}

export function mergeTravelGuideContent(cms) {
  const src = normalizeLegacyTravelGuide(cms);
  const out = {};
  for (const [key, defaults] of Object.entries(travelGuidePageDefaults)) {
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) out.head = stripLegacyHeadTitle(out.head);
  return out;
}
