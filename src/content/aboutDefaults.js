/** Default About page CMS payload — plain text only (no HTML in the dashboard). */

export const aboutPageDefaults = {
  head: {
    label: 'THE PEOPLE BEHIND YOUR JOURNEY',
    titleLine1: 'Rooted in Tanzania.',
    titleLine2: 'Made around you.',
    text: 'Mambeu Safaris is locally owned and based in Arusha, sharing the country we call home through personal wildlife, mountain, cultural and beach journeys.',
  },
  storyPhoto: 'team.webp',
  storyPhotoAlt: 'Mambeu guests and safari vehicle in Tanzania',
  storyPhotoCaption: 'LOCAL ROOTS. PERSONAL JOURNEYS.',
  story: {
    eyebrow: 'WHO WE ARE',
    titleLine1: 'Local knowledge.',
    titleLine2: 'Human connections.',
    paragraph1:
      'Founded by local Tanzanians, Mambeu brings a close connection to Tanzania’s landscapes, wildlife and communities. Our team plans bespoke journeys through the places we know and love.',
    paragraph2:
      'We welcome different budgets and travel styles. We help choose routes, stays and activities around your comfort, interests and time available.',
    paragraph3:
      'Responsible tourism is part of our approach: respecting wildlife, supporting local communities and making meaningful connections with the places you visit.',
  },
  valuesSection: {
    eyebrow: 'WHAT GUIDES US',
    titleLine1: 'A journey with care',
    titleLine2: 'at its heart.',
  },
  values: [
    {
      number: '01',
      title: 'Personal by design',
      text: 'Your dates, interests and comfort level shape the journey. We listen first, then help you connect the details.',
    },
    {
      number: '02',
      title: 'Rooted in Tanzania',
      text: 'Local knowledge helps us choose routes, stays and experiences that work together.',
    },
    {
      number: '03',
      title: 'Travel responsibly',
      text: 'Respect for nature and communities guides how we share Tanzania with our visitors.',
    },
  ],
  mission: {
    eyebrow: 'OUR MISSION',
    titleLine1: 'Help every traveller',
    titleLine2: 'find their Tanzania.',
    lead: 'We create personalised travel experiences that showcase Tanzania’s natural beauty and cultural richness, with comfort, safety and local insight.',
    body: 'Our vision is to grow through thoughtful service and responsible tourism, supporting local communities while sharing the country’s extraordinary places.',
    buttonText: 'Meet your safari specialist',
    buttonLink: 'plan',
  },
};

function mergeScalar(defaultVal, override) {
  if (override === undefined || override === null) return defaultVal;
  if (typeof override === 'string' && override.trim() === '' && String(defaultVal ?? '').trim() !== '') {
    return defaultVal;
  }
  return override;
}

function mergeSection(defaults, override) {
  const out = { ...defaults };
  if (!override || typeof override !== 'object') return out;
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '' && String(defaults[k] ?? '').trim() !== '') continue;
    out[k] = v;
  }
  return out;
}

function parseLegacyHeadTitle(html) {
  if (!html || typeof html !== 'string' || !html.includes('<')) return {};
  const brSplit = html.split(/<br\s*\/?>/i);
  if (brSplit.length >= 2) {
    const line1 = brSplit[0].replace(/<[^>]+>/g, '').trim();
    const line2 = brSplit.slice(1).join(' ').replace(/<[^>]+>/g, '').trim();
    return { titleLine1: line1, titleLine2: line2 };
  }
  return { titleLine1: html.replace(/<[^>]+>/g, '').trim(), titleLine2: '' };
}

function normalizeValueItem(item, index, defaults) {
  const def = defaults[index] || { number: String(index + 1).padStart(2, '0'), title: '', text: '' };
  if (Array.isArray(item)) {
    return {
      number: item[0] || def.number,
      title: item[1] || def.title,
      text: item[2] || def.text,
    };
  }
  if (item && typeof item === 'object') return mergeSection(def, item);
  return { ...def };
}

export function normalizeLegacyAbout(src) {
  const next = src && typeof src === 'object' ? { ...src } : {};
  if (next.head?.title && !next.head.titleLine1) {
    const parsed = parseLegacyHeadTitle(next.head.title);
    next.head = { ...next.head, ...parsed };
  }
  return next;
}

function mergeValues(defaults, override) {
  const base = defaults.map((d) => ({ ...d }));
  if (!Array.isArray(override) || !override.length) return base;
  return base.map((def, i) => normalizeValueItem(override[i], i, defaults));
}

export function mergeAboutContent(cmsAbout) {
  const src = normalizeLegacyAbout(cmsAbout);
  const out = {};
  for (const [key, defaults] of Object.entries(aboutPageDefaults)) {
    if (key === 'values') {
      out.values = mergeValues(aboutPageDefaults.values, src.values);
      continue;
    }
    if (typeof defaults !== 'object' || defaults === null) {
      out[key] = mergeScalar(defaults, src[key]);
      continue;
    }
    out[key] = mergeSection(defaults, src[key]);
  }
  if (out.head?.titleLine1) {
    const { title: _legacyTitle, ...headRest } = out.head;
    out.head = headRest;
  }
  return out;
}
