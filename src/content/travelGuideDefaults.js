/**
 * Travel guide page content (schema 2). The FAQ list itself comes from Library → FAQ items.
 * Dashboard editor: dashboard/src/lib/pageEditor/travel-guide.js.
 */
import { carry, mergePage } from './schema.js';

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

/** The old editor's eyebrow and intro text were already shown on the page; keep them. */
function migrateV1(old) {
  return carry(old, ['head.label', 'head.text']);
}

export function mergeTravelGuideContent(cms) {
  return mergePage(travelGuidePageDefaults, cms, migrateV1);
}
