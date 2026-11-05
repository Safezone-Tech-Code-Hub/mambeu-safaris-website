import PocketBase from 'pocketbase';

export const COLLECTIONS = {
  tours: 'tours',
  places: 'places',
  experiences: 'experiences',
  comfortLevels: 'comfort_levels',
  faqItems: 'faq_items',
  pageContent: 'page_content',
  enquiries: 'enquiries',
  siteSettings: 'site_settings',
  media: 'media',
  staff: 'staff',
};

export const getPbUrl = () =>
  (import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:9112').replace(/\/$/, '');

export const getPublicSiteUrl = () =>
  (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://new-mambeu.schoolhub.space').replace(/\/$/, '');

export const pb = new PocketBase(getPbUrl());
pb.autoCancellation(false);

/** PocketBase 0.20.x rejects `sort=-created`; newer versions accept it. */
/** v0.20.x often only allows `-id`; try system date fields first on newer PB. */
const RECORD_SORT_FALLBACKS = ['-@created', '-created', '-updated', '-id', ''];

export async function getListWithSort(collection, page = 1, perPage = 30, options = {}) {
  const { sort, ...rest } = options;
  const candidates = [...new Set([sort, ...RECORD_SORT_FALLBACKS].filter(Boolean))];
  for (const candidate of candidates) {
    try {
      const query = candidate ? { ...rest, sort: candidate } : { ...rest };
      return await pb.collection(collection).getList(page, perPage, query);
    } catch (e) {
      const msg = `${e?.message || ''} ${e?.response?.message || ''} ${e?.response?.data?.details || ''}`;
      if (!/invalid sort field/i.test(msg)) throw e;
    }
  }
  return pb.collection(collection).getList(page, perPage, rest);
}

const COLLECTION_HINT =
  'The PocketBase "media" collection may be missing. On the VPS (repo root): npm run ensure:pb-collections';

export function describePbError(error, fallback = 'Something went wrong.') {
  if (!error) return fallback;

  const status = error?.status ?? error?.response?.code;
  const details = error?.response?.data?.details || error?.data?.details || '';
  const responseMsg = error?.response?.message || error?.data?.message || '';
  const message = String(error?.message || responseMsg || '');
  if (details && message) return `${message} (${details})`;
  if (details) return String(details);

  if (
    status === 404 ||
    /collection context|collection.*not found|wasn't found/i.test(message) ||
    /collection context|collection.*not found/i.test(String(responseMsg))
  ) {
    return responseMsg || COLLECTION_HINT;
  }

  if (status === 0 && /failed to fetch|network|load failed/i.test(message)) {
    return 'Could not reach PocketBase. Check VITE_POCKETBASE_URL and CORS on the PocketBase admin (Settings → Application).';
  }

  const data = error?.data?.data;
  if (data && typeof data === 'object') {
    const parts = Object.entries(data).flatMap(([field, msg]) => {
      if (typeof msg === 'object' && msg?.message) return [`${field}: ${msg.message}`];
      if (typeof msg === 'string') return [`${field}: ${msg}`];
      return [];
    });
    if (parts.length) return parts.join(' ');
  }
  return message || fallback;
}
