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

export function describePbError(error, fallback = 'Something went wrong.') {
  if (!error) return fallback;
  const data = error?.data?.data;
  if (data && typeof data === 'object') {
    const parts = Object.entries(data).flatMap(([field, msg]) => {
      if (typeof msg === 'object' && msg?.message) return [`${field}: ${msg.message}`];
      if (typeof msg === 'string') return [`${field}: ${msg}`];
      return [];
    });
    if (parts.length) return parts.join(' ');
  }
  return error?.message || fallback;
}
