/**
 * Field builders for the page editors. A field's `path` is a dotted string
 * ("hero.eyebrow"); numeric segments address array items ("values.0.title").
 *
 * Types: text (default), long (multi-line text), lines (one entry per line, saved as an
 * array), image (media picker), list (repeatable group of `itemFields`).
 */

function toPath(path) {
  return String(path)
    .split('.')
    .map((p) => (/^\d+$/.test(p) ? Number(p) : p));
}

function make(type, path, label, extra = {}) {
  return { key: String(path), path: toPath(path), label, ...(type ? { type } : {}), ...extra };
}

export const text = (path, label, extra) => make(null, path, label, extra);
export const long = (path, label, extra) => make('long', path, label, extra);
export const lines = (path, label, extra) =>
  make('lines', path, label, { hint: 'One per line.', ...extra });
export const image = (path, label, extra) => make('image', path, label, extra);

/**
 * Repeatable group. `itemFields` use paths relative to one item.
 * extra.itemLabel names one entry ("slide"); extra.itemTitleKey picks the field shown in the header.
 */
export const list = (path, label, itemFields, extra = {}) =>
  make('list', path, label, { itemFields, ...extra });

/** Shared help for link fields. */
export const LINK_HINT = 'A page path such as safaris or plan, a full /path/, or a full https:// link.';

export function getNested(obj, path) {
  const value = path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  return value === undefined ? '' : value;
}

export function setNested(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    const nextKey = path[i + 1];
    const needsArray = typeof nextKey === 'number';
    if (cur[key] == null || typeof cur[key] !== 'object') {
      cur[key] = needsArray ? [] : {};
    }
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}
