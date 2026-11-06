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

/** PocketBase 0.20.x only reliably supports `sort=-id` (not `-created`). */
const RECORD_SORT_FALLBACKS = ['-id', '-@created', '-created', '-updated'];

export async function getListWithSort(collection, page = 1, perPage = 30, options = {}) {
  const { sort, ...rest } = options;
  const candidates = [...new Set([...(sort ? [sort] : []), ...RECORD_SORT_FALLBACKS, ''])];
  let lastError;
  for (const candidate of candidates) {
    try {
      const query = candidate === '' ? rest : { ...rest, sort: candidate };
      return await pb.collection(collection).getList(page, perPage, query);
    } catch (e) {
      lastError = e;
      const status = e?.status ?? e?.response?.status ?? e?.response?.code;
      const msg = `${e?.message || ''} ${e?.response?.message || ''} ${e?.response?.data?.details || ''}`;
      const retrySort =
        candidate !== '' && (status === 400 || /invalid sort field/i.test(msg));
      if (!retrySort) throw e;
    }
  }
  throw lastError || new Error('Could not list records.');
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
