import { COLLECTIONS, getPbUrl, pb } from '@/lib/pb';

/** Public URL for a file stored in PocketBase `media`. */
export function mediaFileUrl(record, filename) {
  if (!record?.id || !filename) return '';
  return pb.files.getURL(record, filename);
}

/** Preview URL for dashboard (PB URL or public site /assets/ filename). */
export function previewUrlForValue(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  const base = (import.meta.env.VITE_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const name = v.split('/').pop();
  if (base && name) return `${base}/assets/${name}`;
  if (name) return `${getPbUrl()}/api/files/media/placeholder/${name}`;
  return '';
}

export async function listMediaRecords(page = 1, perPage = 48) {
  return pb.collection(COLLECTIONS.media).getList(page, perPage, { sort: '-created' });
}

export async function uploadMediaFile(file, alt = '') {
  const form = new FormData();
  form.append('alt', alt || file.name);
  form.append('file', file);
  return pb.collection(COLLECTIONS.media).create(form);
}

/** Value saved on tours/pages: full PocketBase file URL (works on live site + static filenames). */
export function storedValueFromMediaRecord(record) {
  if (!record?.file) return '';
  return mediaFileUrl(record, record.file);
}

export function thumbUrlForRecord(record) {
  if (!record?.file) return '';
  try {
    return pb.files.getURL(record, record.file, { thumb: '400x0' });
  } catch {
    return mediaFileUrl(record, record.file);
  }
}

export async function deleteMediaRecord(id) {
  return pb.collection(COLLECTIONS.media).delete(id);
}

export async function updateMediaAlt(id, alt) {
  return pb.collection(COLLECTIONS.media).update(id, { alt });
}
