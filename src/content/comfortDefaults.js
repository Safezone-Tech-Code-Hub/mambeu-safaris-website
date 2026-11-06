/** Default Comfort page CMS payload — plain text only. */

import { mergeScalar, mergeSection } from './mergeUtils.js';

export const comfortPageDefaults = {
  head: {
    label: 'HOW YOU STAY',
    titleLine1: 'Comfort that fits your journey.',
    titleLine2: '',
    text: 'Midrange and comfort are at the heart of our approach. Luxury and camping remain part of the possibilities. Choose how you want your journey to feel.',
  },
  comfortSection: {
    eyebrow: 'YOUR SAFARI. YOUR KIND OF STAY.',
    titleLine1: 'Comfort is personal.',
    titleLine2: 'Let’s find yours.',
    introLine1: 'Midrange and comfort at our heart.',
    introLine2: 'Luxury when you want a little more.',
  },
  balanceSection: {
    eyebrow: 'A THOUGHTFUL BALANCE',
    titleLine1: 'Spend on the things',
    titleLine2: 'you’ll remember.',
    lead: 'Your budget influences accommodation, length of stay and optional experiences. We’ll help you decide where extra comfort makes a difference.',
    body: 'The published journeys are starting points. When you enquire, we’ll suggest specific lodges and tented camps for your dates and confirm what is included before you book.',
    linkText: 'Explore our camping journeys',
    linkPath: 'safaris?style=Camping',
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

function splitLegacyLines(text, line1Key, line2Key) {
  if (!text || typeof text !== 'string') return {};
  if (text.includes('\n')) {
    const [a, b] = text.split('\n');
    return { [line1Key]: a.trim(), [line2Key]: (b || '').trim() };
  }
  return { [line1Key]: text.trim(), [line2Key]: '' };
}

export function normalizeLegacyComfort(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    next.head = { ...next.head, ...parseLegacyTitle(next.head.title) };
  }
  if (next.comfortSection?.title && !next.comfortSection.titleLine1) {
    next.comfortSection = {
      ...next.comfortSection,
      ...splitLegacyLines(next.comfortSection.title, 'titleLine1', 'titleLine2'),
    };
  }
  if (next.comfortSection?.intro && !next.comfortSection.introLine1) {
    next.comfortSection = {
      ...next.comfortSection,
      ...splitLegacyLines(next.comfortSection.intro, 'introLine1', 'introLine2'),
    };
  }
  return next;
}

export function mergeComfortContent(cmsComfort) {
  const src = normalizeLegacyComfort(cmsComfort);
  const out = {};
  for (const [key, defaults] of Object.entries(comfortPageDefaults)) {
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
  if (out.comfortSection?.titleLine1) {
    const { title: _t, intro: _i, ...rest } = out.comfortSection;
    out.comfortSection = rest;
  }
  return out;
}
