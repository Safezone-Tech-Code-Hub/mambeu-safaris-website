const KEYS = ['experience', 'destination', 'journey'];

// Slugs that are not URL-safe (spaces, commas, ampersands) fall back to `path`.
export function urlKey(item) {
  if (!item) return '';
  const slug = item.slug || '';
  return /^[a-z0-9-]+$/.test(slug) ? slug : item.path || slug;
}

// t.experience / t.destination / t.journey can each be a string or an array.
export function planHref(t = {}) {
  const q = new URLSearchParams();
  KEYS.forEach((k) => {
    const v = t[k];
    (Array.isArray(v) ? v : [v]).filter(Boolean).forEach((x) => q.append(k, x));
  });
  if (t.style) q.set('style', t.style);
  const s = q.toString();
  return s ? `/plan/?${s}` : '/plan/';
}
