/** Shared CMS merge helpers (plain text, legacy HTML stripping). */

function isPlainObject(x) {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/** PocketBase / JSON sometimes stores a string as { "0":"h","1":"i",... } (spread-string bug). */
function isCharIndexedStringObject(o) {
  if (!isPlainObject(o)) return false;
  const keys = Object.keys(o);
  if (keys.length === 0) return false;
  const nums = keys.map((k) => Number(k)).sort((a, b) => a - b);
  if (nums[0] !== 0 || nums[nums.length - 1] !== nums.length - 1) return false;
  if (!keys.every((k) => String(Number(k)) === k)) return false;
  return keys.every((k) => typeof o[k] === 'string');
}

function unwrapCharIndexedString(o) {
  return Object.keys(o)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => o[k])
    .join('');
}

/**
 * Deep-merge plain CMS objects. If the schema expects a nested object but PocketBase sent a
 * string/array (legacy or bad shape), keep defaults so we never end up with character-index
 * “objects” that React tries to render.
 */
export function mergeScalar(defaultVal, override) {
  if (override === undefined || override === null) return defaultVal;
  if (typeof override === 'string' && override.trim() === '' && String(defaultVal ?? '').trim() !== '') {
    return defaultVal;
  }
  if (typeof defaultVal === 'string') {
    if (isPlainObject(override) && isCharIndexedStringObject(override)) {
      return unwrapCharIndexedString(override);
    }
    if (isPlainObject(override) || Array.isArray(override)) {
      return defaultVal;
    }
  }
  return override;
}

/**
 * Deep-merge plain CMS objects. Leaf scalars use mergeScalar so corrupted string shapes are healed.
 * If `defaults` is not an object (e.g. a string field in a page schema), merge like a scalar — never
 * spread a string, which would produce numeric keys and break React.
 */
export function mergeSection(defaults, override) {
  if (!isPlainObject(defaults)) {
    return mergeScalar(defaults, override);
  }
  const out = { ...defaults };
  if (!isPlainObject(override)) return out;
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined || v === null) continue;
    if (typeof v === 'string' && v.trim() === '' && String(defaults[k] ?? '').trim() !== '') continue;
    const defVal = defaults[k];
    if (isPlainObject(defVal) && isPlainObject(v)) {
      out[k] = mergeSection(defVal, v);
    } else if (!isPlainObject(defVal)) {
      out[k] = mergeScalar(defVal, v);
    }
  }
  return out;
}

export function parseLegacyHeadTitle(raw) {
  if (!raw || typeof raw !== 'string') return {};
  if (!raw.includes('<')) {
    return { titleLine1: raw.trim(), titleLine2: '' };
  }
  const brSplit = raw.split(/<br\s*\/?>/i);
  if (brSplit.length >= 2) {
    const line1 = brSplit[0].replace(/<[^>]+>/g, '').trim();
    const rest = brSplit.slice(1).join(' ');
    const accentMatch = rest.match(/<span[^>]*class=["']accent["'][^>]*>([\s\S]*?)<\/span>/i);
    const line2 = accentMatch
      ? accentMatch[1].replace(/<[^>]+>/g, '').trim()
      : rest.replace(/<[^>]+>/g, '').trim();
    return { titleLine1: line1, titleLine2: line2 };
  }
  return { titleLine1: raw.replace(/<[^>]+>/g, '').trim(), titleLine2: '' };
}

/** Strip legacy `title` from head after migration to titleLine*. */
export function stripLegacyHeadTitle(head) {
  if (!head?.titleLine1 || !head.title) return head;
  const { title: _t, ...rest } = head;
  return rest;
}

export function mergeBlockTuples(defaults, override) {
  const base = defaults.map((row) => [...row]);
  if (!Array.isArray(override) || !override.length) return base;
  return base.map((def, i) => {
    const o = override[i];
    if (Array.isArray(o) && o.length >= 2) return [o[0] || def[0], o[1] || def[1]];
    if (o && typeof o === 'object' && (o.title != null || o.text != null)) {
      return [o.title ?? def[0], o.text ?? def[1]];
    }
    return [...def];
  });
}
