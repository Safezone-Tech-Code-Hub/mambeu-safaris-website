<template>
  <div class="page-header">
    <div>
      <h1>Media library</h1>
      <p class="hint">Upload images for pages, tours, and destinations. Use “Copy URL” when assigning files in editors.</p>
    </div>
    <div class="flex gap-2">
      <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden @change="onFilesChosen" />
      <Button label="Upload" icon="pi pi-upload" :loading="uploading" @click="fileInput?.click()" />
    </div>
  </div>

  <Message v-if="error" severity="error" :closable="false">
    <span>{{ error }}</span>
    <p v-if="showCollectionHint" class="hint mt-2">
      From the project root on the server, with <code>pocketbase/.env</code> set:
      <code>npm run ensure:pb-collections</code>
    </p>
  </Message>

  <div v-if="loading && !rows.length" class="editor-loading"><ProgressSpinner /></div>

  <div v-else class="media-library">
    <div v-if="!rows.length" class="empty-state page-card">
      <p>No uploads yet. Click Upload to add images from your computer.</p>
    </div>
    <div v-else class="media-grid">
      <article v-for="row in rows" :key="row.id" class="media-card page-card">
        <a v-if="row.file" :href="fullUrl(row)" target="_blank" rel="noopener" class="media-thumb-link">
          <img :src="thumbUrlForRecord(row)" :alt="row.alt || row.file" loading="lazy" />
        </a>
        <div class="media-card-body">
          <strong class="media-name" :title="row.file">{{ row.file || '—' }}</strong>
          <InputText
            v-model="altDraft[row.id]"
            class="w-full"
            placeholder="Alt text (optional)"
            @blur="saveAlt(row)"
          />
          <div class="media-actions">
            <Button label="Copy URL" icon="pi pi-copy" size="small" text @click="copyUrl(row)" />
            <Button icon="pi pi-trash" size="small" severity="danger" text @click="confirmDelete(row)" />
          </div>
        </div>
      </article>
    </div>

    <Paginator
      v-if="totalRecords > perPage"
      :rows="perPage"
      :totalRecords="totalRecords"
      :first="(page - 1) * perPage"
      @page="onPage"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import Paginator from 'primevue/paginator';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import {
  deleteMediaRecord,
  listMediaRecords,
  mediaFileUrl,
  storedValueFromMediaRecord,
  thumbUrlForRecord,
  updateMediaAlt,
  uploadMediaFile,
} from '@/lib/media';
import { describePbError } from '@/lib/pb';

const toast = useToast();
const confirm = useConfirm();

const loading = ref(true);
const uploading = ref(false);
const error = ref('');
const rows = ref([]);
const page = ref(1);
const perPage = 24;
const totalRecords = ref(0);
const fileInput = ref(null);
const altDraft = reactive({});

const showCollectionHint = computed(() =>
  /collection|ensure:pb-collections|404/i.test(error.value || ''),
);

function fullUrl(row) {
  return row?.file ? mediaFileUrl(row, row.file) : '#';
}

async function loadList() {
  loading.value = true;
  error.value = '';
  try {
    const res = await listMediaRecords(page.value, perPage);
    rows.value = res.items;
    totalRecords.value = res.totalItems;
    for (const row of res.items) {
      if (altDraft[row.id] === undefined) altDraft[row.id] = row.alt || '';
    }
  } catch (e) {
    error.value = describePbError(e, 'Could not load media.');
  } finally {
    loading.value = false;
  }
}

onMounted(loadList);

function onPage(event) {
  page.value = event.page + 1;
  loadList();
}

async function onFilesChosen(event) {
  const files = [...(event.target.files || [])];
  event.target.value = '';
  if (!files.length) return;
  uploading.value = true;
  error.value = '';
  try {
    for (const file of files) {
      await uploadMediaFile(file);
    }
    toast.add({ severity: 'success', summary: `Uploaded ${files.length} file(s)`, life: 2500 });
    page.value = 1;
    await loadList();
  } catch (e) {
    error.value = describePbError(e, 'Upload failed.');
  } finally {
    uploading.value = false;
  }
}

async function saveAlt(row) {
  const next = String(altDraft[row.id] ?? '').trim();
  if (next === (row.alt || '')) return;
  try {
    await updateMediaAlt(row.id, next);
    row.alt = next;
    toast.add({ severity: 'success', summary: 'Alt text saved', life: 2000 });
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  }
}

async function copyUrl(row) {
  const url = storedValueFromMediaRecord(row);
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    toast.add({ severity: 'info', summary: 'URL copied', life: 2000 });
  } catch {
    toast.add({ severity: 'warn', summary: 'Copy failed', detail: url, life: 5000 });
  }
}

function confirmDelete(row) {
  confirm.require({
    message: `Delete ${row.file || 'this file'}? Content that uses this URL will need a new image.`,
    header: 'Delete media',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await deleteMediaRecord(row.id);
        delete altDraft[row.id];
        toast.add({ severity: 'success', summary: 'Deleted', life: 2000 });
        await loadList();
      } catch (e) {
        toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
      }
    },
  });
}
</script>

<style scoped>
.w-full {
  width: 100%;
}
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.media-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.media-thumb-link {
  display: block;
  aspect-ratio: 4/3;
  background: var(--p-surface-100);
}
.media-thumb-link img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media-card-body {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.media-name {
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.media-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.empty-state {
  padding: 2rem;
  text-align: center;
  color: var(--p-text-muted-color);
}
</style>
