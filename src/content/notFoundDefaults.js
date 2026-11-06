import { mergeScalar, mergeSection, parseLegacyHeadTitle, stripLegacyHeadTitle } from './mergeUtils.js';

export const notFoundPageDefaults = {
  head: {
    label: 'A DIFFERENT TRAIL',
    titleLine1: 'Let’s find your way.',
    titleLine2: '',
    text: 'This page isn’t here. Explore our safari collection or talk with the team.',
  },
  button: 'Explore our safaris',
  buttonPath: 'safaris',
};

export function mergeNotFoundContent(cms) {
  const src = cms && typeof cms === 'object' ? { ...cms } : {};
  if (src.head?.title && !src.head.titleLine1) {
    src.head = { ...src.head, ...parseLegacyHeadTitle(src.head.title) };
  }
  const out = { head: mergeSection(notFoundPageDefaults.head, src.head) };
  out.button = mergeScalar(notFoundPageDefaults.button, src.button);
  out.buttonPath = mergeScalar(notFoundPageDefaults.buttonPath, src.buttonPath);
  if (out.head?.titleLine1) out.head = stripLegacyHeadTitle(out.head);
  return out;
}
