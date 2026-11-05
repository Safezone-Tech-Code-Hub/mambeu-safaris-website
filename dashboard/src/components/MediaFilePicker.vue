<template>
  <div class="media-picker">
    <div class="media-picker-row">
      <InputText
        :modelValue="singleDisplay"
        class="media-picker-input"
        :placeholder="multiple ? 'Selected files shown below' : 'Filename or media URL'"
        :readonly="!allowManualEdit"
        @update:modelValue="onManualInput"
      />
      <Button type="button" label="Choose file" icon="pi pi-images" @click="dialogOpen = true" />
      <Button
        v-if="hasValue"
        type="button"
        icon="pi pi-times"
        severity="secondary"
        text
        aria-label="Clear"
        @click="clearAll"
      />
    </div>
    <p v-if="hint" class="hint">{{ hint }}</p>

    <div v-if="!multiple && previewUrl" class="media-preview-wrap">
      <img :src="previewUrl" alt="" class="media-preview" loading="lazy" />
    </div>

    <ul v-if="multiple && selectedList.length" class="media-chip-list">
      <li v-for="(item, index) in selectedList" :key="item + index" class="media-chip">
        <img v-if="chipPreview(item)" :src="chipPreview(item)" alt="" />
        <span class="media-chip-label">{{ shortLabel(item) }}</span>
        <Button type="button" icon="pi pi-times" text rounded size="small" @click="removeAt(index)" />
      </li>
    </ul>

    <Dialog
      v-model:visible="dialogOpen"
      :header="multiple ? 'Choose images' : 'Choose image'"
      modal
      class="media-dialog"
      :style="{ width: 'min(720px, 96vw)' }"
      @show="onDialogShow"
    >
      <div class="media-upload-bar">
        <input ref="fileInput" type="file" :accept="accept" :multiple="multiple" hidden @change="onFilesChosen" />
        <Button type="button" label="Upload new" icon="pi pi-upload" :loading="uploading" @click="fileInput?.click()" />
        <span class="hint">JPEG, PNG, WebP or GIF · stored in PocketBase media library</span>
      </div>
      <Message v-if="dialogError" severity="error" :closable="false">{{ dialogError }}</Message>
      <ProgressSpinner v-if="libraryLoading" />
      <div v-else class="media-grid">
        <button
          v-for="row in library"
          :key="row.id"
          type="button"
          class="media-tile"
          :class="{ selected: isSelectedInDialog(row) }"
          @click="toggleLibraryRow(row)"
        >
          <img v-if="row.file" :src="thumbUrlForRecord(row)" alt="" loading="lazy" />
          <span>{{ row.file || row.alt || 'File' }}</span>
        </button>
      </div>
      <p v-if="!libraryLoading && !library.length" class="hint">No uploads yet. Use Upload new above.</p>
      <template #footer>
        <Button type="button" label="Cancel" severity="secondary" text @click="dialogOpen = false" />
        <Button v-if="multiple" type="button" label="Add selected" icon="pi pi-check" @click="applyMultiSelection" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import {
  listMediaRecords,
  previewUrlForValue,
  storedValueFromMediaRecord,
  thumbUrlForRecord,
  uploadMediaFile,
} from '@/lib/media';
import { describePbError } from '@/lib/pb';

const props = defineProps({
  multiple: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  accept: { type: String, default: 'image/jpeg,image/png,image/webp,image/gif' },
  allowManualEdit: { type: Boolean, default: true },
});

const model = defineModel({ type: [String, Array], default: '' });

const dialogOpen = ref(false);
const library = ref([]);
const libraryLoading = ref(false);
const uploading = ref(false);
const dialogError = ref('');
const fileInput = ref(null);
const dialogSelection = ref([]);

const selectedList = computed(() => {
  if (!props.multiple) return [];
  const v = model.value;
  if (Array.isArray(v)) return v.filter(Boolean);
  if (typeof v === 'string' && v.trim()) return v.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
});

const hasValue = computed(() =>
  props.multiple ? selectedList.value.length > 0 : Boolean(String(model.value || '').trim()),
);

const singleDisplay = computed(() => {
  if (props.multiple) return '';
  return String(model.value || '');
});

const previewUrl = computed(() => (props.multiple ? '' : previewUrlForValue(model.value)));

function shortLabel(value) {
  const s = String(value);
  if (s.length <= 48) return s.split('/').pop() || s;
  return s.split('/').pop();
}

function chipPreview(value) {
  return previewUrlForValue(value);
}

function onManualInput(v) {
  if (!props.multiple) model.value = v;
}

function clearAll() {
  model.value = props.multiple ? [] : '';
}

function removeAt(index) {
  const next = [...selectedList.value];
  next.splice(index, 1);
  model.value = next;
}

function isSelectedInDialog(row) {
  const val = storedValueFromMediaRecord(row);
  return dialogSelection.value.includes(val);
}

function toggleLibraryRow(row) {
  const val = storedValueFromMediaRecord(row);
  if (!val) return;
  if (props.multiple) {
    const i = dialogSelection.value.indexOf(val);
    if (i >= 0) dialogSelection.value.splice(i, 1);
    else dialogSelection.value.push(val);
  } else {
    model.value = val;
    dialogOpen.value = false;
  }
}

function applyMultiSelection() {
  const merged = [...new Set([...selectedList.value, ...dialogSelection.value])];
  model.value = merged;
  dialogSelection.value = [];
  dialogOpen.value = false;
}

async function onDialogShow() {
  dialogError.value = '';
  dialogSelection.value = [];
  libraryLoading.value = true;
  try {
    const res = await listMediaRecords();
    library.value = res.items;
  } catch (e) {
    dialogError.value = describePbError(e, 'Could not load media library.');
  } finally {
    libraryLoading.value = false;
  }
}

async function onFilesChosen(event) {
  const files = [...(event.target.files || [])];
  event.target.value = '';
  if (!files.length) return;
  uploading.value = true;
  dialogError.value = '';
  try {
    for (const file of files) {
      const row = await uploadMediaFile(file);
      library.value = [row, ...library.value];
      const val = storedValueFromMediaRecord(row);
      if (props.multiple) {
        if (!dialogSelection.value.includes(val)) dialogSelection.value.push(val);
      } else {
        model.value = val;
        dialogOpen.value = false;
        break;
      }
    }
    if (props.multiple && files.length) applyMultiSelection();
  } catch (e) {
    dialogError.value = describePbError(e, 'Upload failed.');
  } finally {
    uploading.value = false;
  }
}
</script>

<style scoped>
.media-picker-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.media-picker-input {
  flex: 1;
  min-width: 0;
}
.media-preview-wrap {
  margin-top: 0.75rem;
}
.media-preview {
  max-width: 280px;
  max-height: 160px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--p-content-border-color);
}
.media-upload-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.75rem;
  max-height: 360px;
  overflow-y: auto;
}
.media-tile {
  border: 2px solid var(--p-content-border-color);
  border-radius: 8px;
  padding: 0.35rem;
  background: var(--p-content-background);
  cursor: pointer;
  text-align: left;
  font: inherit;
}
.media-tile.selected {
  border-color: var(--brand-accent, #c45d2a);
}
.media-tile img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
.media-tile span {
  display: block;
  font-size: 0.7rem;
  margin-top: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.media-chip-list {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.media-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem;
  background: var(--p-surface-100);
  border-radius: 8px;
}
.media-chip img {
  width: 48px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
}
.media-chip-label {
  flex: 1;
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
