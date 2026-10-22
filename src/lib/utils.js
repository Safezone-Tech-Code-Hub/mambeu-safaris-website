import { createElement } from 'react';

export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]),
  );

export const money = (v) => '$' + Number(v).toLocaleString('en-US');

export const href = (r) => {
  const [path, query] = r.split('?');
  return '/' + (path ? path + '/' : '') + (query ? '?' + query : '');
};

export function itineraryRoute(t) {
  let list = t.itinerary
    .map((d) =>
      d.title
        .replace(/\s*[–—-]\s*.*$/, '')
        .replace(/National Park|NP/g, '')
        .trim(),
    )
    .filter(Boolean);
  return (
    [...new Set(list)].slice(0, 3).join(' / ') ||
    t.highlights.slice(0, 3).join(' / ') ||
    'Northern Tanzania'
  );
}

export function Img({ src, alt, className = '', priority = false }) {
  return createElement('img', {
    className: className || undefined,
    src: `/assets/${src}`,
    alt,
    ...(priority ? { fetchPriority: 'high' } : { loading: 'lazy' }),
    decoding: 'async',
  });
}
