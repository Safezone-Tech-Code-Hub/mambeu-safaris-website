import { ref, unref, watch } from 'vue';
import { mergePageCatalog } from '@site/content/pageCatalogMerge.js';
import { COLLECTIONS, describePbError, pb } from '@/lib/pb';

export function usePageContent(pageKey) {
  const loading = ref(true);
  const saving = ref(false);
  const recordId = ref('');
  const content = ref({});
  const status = ref('published');
  const error = ref('');

  function currentKey() {
    return unref(pageKey);
  }

  async function load() {
    const key = currentKey();
    loading.value = true;
    error.value = '';
    content.value = {};
    recordId.value = '';
    try {
      const row = await pb.collection(COLLECTIONS.pageContent).getFirstListItem(`pageKey="${key}"`);
      if (currentKey() !== key) return;
      recordId.value = row.id;
      const raw = row.content || {};
      const merged = mergePageCatalog({ [key]: raw });
      content.value = merged[key] !== undefined ? structuredClone(merged[key]) : raw;
      status.value = row.status || 'published';
    } catch (e) {
      if (currentKey() !== key) return;
      error.value = describePbError(e, 'Could not load this page.');
    } finally {
      if (currentKey() === key) loading.value = false;
    }
  }

  async function save() {
    const key = currentKey();
    saving.value = true;
    error.value = '';
    try {
      const data = { content: content.value, status: status.value };
      if (recordId.value) {
        await pb.collection(COLLECTIONS.pageContent).update(recordId.value, data);
      } else {
        const row = await pb.collection(COLLECTIONS.pageContent).create({
          pageKey: key,
          label: key,
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

  watch(() => currentKey(), () => {
    load();
  }, { immediate: true });

  return { loading, saving, content, status, error, load, save };
}
