/** Normalise comfort level payloads (Midrange / Comfort / Luxury) for display and editing. */

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

const tabSubtitleFallback = {
  Midrange: 'Thoughtful value',
  Comfort: 'The perfect balance',
  Luxury: 'Elevated experiences',
};

const imageNoteFallback = {
  Comfort: 'A little space to take it all in',
  Luxury: 'Special experiences, by arrangement',
  Midrange: 'Time to unwind between game drives',
};

export function normalizeLevelPayload(payload, levelKey = '') {
  if (!payload || typeof payload !== 'object') return {};
  const next = { ...payload };
  if (next.title && !next.titleLine1) {
    Object.assign(next, parseLegacyTitle(next.title));
  }
  if (!next.tabSubtitle && levelKey) {
    next.tabSubtitle = tabSubtitleFallback[levelKey] || '';
  }
  if (!next.imageNote && levelKey) {
    next.imageNote = imageNoteFallback[levelKey] || '';
  }
  if (next.titleLine1) {
    delete next.title;
  }
  return next;
}

export function normalizeLevelsMap(levels) {
  if (!levels || typeof levels !== 'object') return {};
  return Object.fromEntries(
    Object.entries(levels).map(([key, payload]) => [key, normalizeLevelPayload(payload, key)]),
  );
}
