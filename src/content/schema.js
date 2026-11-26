/**
 * Page content versioning.
 *
 * The site redesign changed what every page shows, so content saved by the old dashboard
 * (schema 1) no longer matches the page. Schema 2 is the current shape: the dashboard saves
 * `_schema: 2` with every page, and the site only trusts saved content with that marker.
 * For older content, each page's `migrateV1` copies across just the fields the site was
 * already showing, so the live page does not change until someone saves in the dashboard.
 */
import { mergeScalar } from './mergeUtils.js';

export const CONTENT_SCHEMA = 2;

function isPlainObject(x) {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/** Saved content to merge over the defaults: current-schema content as is, older content migrated. */
export function cmsSource(cms, migrateV1) {
  if (!isPlainObject(cms)) return {};
  if (cms._schema === CONTENT_SCHEMA) return cms;
  return (migrateV1 && migrateV1(cms)) || {};
}

/** Read a dotted path ("hero.eyebrow"). */
export function getPath(obj, path) {
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function setPath(obj, path, value) {
  const keys = String(path).split('.');
  let cur = obj;
  keys.slice(0, -1).forEach((k) => {
    if (!isPlainObject(cur[k])) cur[k] = {};
    cur = cur[k];
  });
  cur[keys[keys.length - 1]] = value;
}

/** Copy only the listed dotted paths that hold a non-empty value. */
export function carry(src, paths) {
  const out = {};
  paths.forEach((p) => {
    const v = getPath(src, p);
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && !v.trim()) return;
    setPath(out, p, v);
  });
  return out;
}

/**
 * Deep merge for schema-2 content. Objects merge key by key (only keys the defaults know),
 * arrays from the CMS replace the default list, empty strings fall back to the default.
 */
export function mergeDeep(defaults, override) {
  if (Array.isArray(defaults)) {
    return Array.isArray(override) ? override : defaults;
  }
  if (!isPlainObject(defaults)) return mergeScalar(defaults, override);
  const out = { ...defaults };
  if (!isPlainObject(override)) return out;
  Object.keys(defaults).forEach((k) => {
    if (override[k] === undefined) return;
    out[k] = mergeDeep(defaults[k], override[k]);
  });
  return out;
}

/** Merge saved page content over the page defaults and stamp the schema version. */
export function mergePage(defaults, cms, migrateV1) {
  return { ...mergeDeep(defaults, cmsSource(cms, migrateV1)), _schema: CONTENT_SCHEMA };
}

/**
 * Link target for a CMS path field. "safaris" -> "/safaris/", "/plan/?x=1" stays,
 * "https://…" stays (external).
 */
export function cmsLink(value, fallback = '/') {
  const raw = String(value ?? '').trim();
  if (!raw) return fallback;
  if (/^(https?:|mailto:|tel:|#)/i.test(raw) || raw.startsWith('/')) return raw;
  const [path, query] = raw.split('?');
  const clean = path.replace(/^\/+|\/+$/g, '');
  return '/' + (clean ? clean + '/' : '') + (query ? '?' + query : '');
}

/** True when a CMS link should open as a normal anchor rather than a router Link. */
export function isExternalLink(value) {
  return /^(https?:|mailto:|tel:)/i.test(String(value ?? '').trim());
}

/** Text with "\n" line breaks -> array of lines (empty lines dropped). */
export function lines(text) {
  if (Array.isArray(text)) return text.filter((l) => String(l ?? '').trim());
  return String(text ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Visible facts/durations use "[X]" as a placeholder until a real value is confirmed. */
export function isPlaceholder(value) {
  return !String(value ?? '').trim() || String(value).includes('[X]');
}
