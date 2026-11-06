/** Default Experiences page CMS payload — plain text only. */

import { mergeScalar, mergeSection } from './mergeUtils.js';

export const experiencesPageDefaults = {
  head: {
    label: 'BEYOND THE GAME DRIVE',
    titleLine1: 'A safari is only',
    titleLine2: 'the beginning.',
    text: 'Add experiences that mean something to you, from cultural connections to a different view of the plains.',
  },
  list: {
    buttonText: 'Include this in my journey',
  },
};

function parseLegacyTitle(raw) {
  if (!raw || typeof raw !== 'string') return {};
  if (!raw.includes('<')) {
    return { titleLine1: raw.trim(), titleLine2: '' };
  }
  const brSplit = raw.split(/<br\s*\/?>/i);
  if (brSplit.length >= 2) {
    const line1 = brSplit[0].replace(/<[^>]+>/g, '').trim();
    const line2 = brSplit.slice(1).join(' ').replace(/<[^>]+>/g, '').trim();
    return { titleLine1: line1, titleLine2: line2 };
  }
  return { titleLine1: raw.replace(/<[^>]+>/g, '').trim(), titleLine2: '' };
}

export function normalizeLegacyExperiences(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyTitle(next.head.title) };
  }
  return next;
}

export function mergeExperiencesContent(cmsExperiences) {
  const src = normalizeLegacyExperiences(cmsExperiences);
  const out = {};
  for (const [key, defaults] of Object.entries(experiencesPageDefaults)) {
    if (typeof defaults !== 'object' || defaults === null) {
      out[key] = mergeScalar(defaults, src[key]);
      continue;
    }
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) {
    const { title: _t, ...headRest } = out.head;
    out.head = headRest;
  }
  return out;
}
