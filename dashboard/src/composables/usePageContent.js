import { ref } from 'vue';
import { mergeAboutContent } from '@site/content/aboutDefaults.js';
import { mergeHomeContent } from '@site/content/homeDefaults.js';
import { COLLECTIONS, describePbError, pb } from '@/lib/pb';

export function usePageContent(pageKey) {
  const loading = ref(true);
  const saving = ref(false);
  const recordId = ref('');
  const content = ref({});
  const status = ref('published');
  const error = ref('');

  async function load() {
    loading.value = true;
    error.value = '';
    try {
      const row = await pb.collection(COLLECTIONS.pageContent).getFirstListItem(`pageKey="${pageKey}"`);
      recordId.value = row.id;
      const raw = row.content || {};
      content.value =
        pageKey === 'home' ? mergeHomeContent(raw) : pageKey === 'about' ? mergeAboutContent(raw) : raw;
      status.value = row.status || 'published';
    } catch (e) {
      error.value = describePbError(e, 'Could not load this page.');
    } finally {
      loading.value = false;
    }
  }

  async function save() {
    saving.value = true;
    error.value = '';
    try {
      const data = { content: content.value, status: status.value };
      if (recordId.value) {
        await pb.collection(COLLECTIONS.pageContent).update(recordId.value, data);
      } else {
        const row = await pb.collection(COLLECTIONS.pageContent).create({
          pageKey,
          label: pageKey,
          ...data,
        });
        recordId.value = row.id;
      }
      return true;
    } catch (e) {
      error.value = describePbError(e, 'Could not save.');
      return false;
    } finally {
      saving.value = false;
    }
  }

  return { loading, saving, content, status, error, load, save };
}
