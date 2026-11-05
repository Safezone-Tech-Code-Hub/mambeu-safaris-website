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

const COLLECTION_HINT =
  'The PocketBase "media" collection may be missing. On the VPS (repo root): npm run ensure:pb-collections';

export function describePbError(error, fallback = 'Something went wrong.') {
  if (!error) return fallback;

  const status = error?.status ?? error?.response?.code;
  const responseMsg = error?.response?.message || error?.data?.message || '';
  const message = String(error?.message || responseMsg || '');

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
