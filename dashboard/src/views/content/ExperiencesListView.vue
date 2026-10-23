<template>
  <div class="page-header">
    <h1>Experiences</h1>
    <Button label="Add experience" icon="pi pi-plus" @click="add" />
  </div>
  <DataTable :value="rows" :loading="loading" @row-click="open" rowHover>
    <Column field="title" header="Title" />
    <Column field="slug" header="Slug" />
  </DataTable>
  <Dialog v-model:visible="editOpen" header="Edit experience" modal style="width: min(560px, 95vw)">
    <div class="field-grid" v-if="current">
      <div><label>Title</label><InputText v-model="current.title" class="w-full" /></div>
      <div><label>Headline</label><InputText v-model="payload.headline" class="w-full" /></div>
      <div><label>Photo</label><InputText v-model="payload.photo" class="w-full" /></div>
      <div><label>Body</label><Textarea v-model="payload.body" rows="4" class="w-full" autoResize /></div>
      <Button label="Save" @click="saveCurrent" :loading="saving" />
    </div>
  </Dialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, pb } from '@/lib/pb';

const toast = useToast();
const rows = ref([]);
const loading = ref(true);
const editOpen = ref(false);
const current = ref(null);
const payload = reactive({});
const saving = ref(false);

onMounted(async () => {
  const res = await pb.collection(COLLECTIONS.experiences).getList(1, 50);
  rows.value = res.items;
  loading.value = false;
});

function open({ data }) {
  current.value = { ...data };
  Object.keys(payload).forEach((key) => delete payload[key]);
  Object.assign(payload, data.payload || {});
  editOpen.value = true;
}

function add() {
  current.value = { id: '', title: '', slug: '', status: 'published' };
  Object.keys(payload).forEach((key) => delete payload[key]);
  Object.assign(payload, { headline: '', photo: 'hero.webp', body: '', planInterest: '' });
  editOpen.value = true;
}

async function saveCurrent() {
  saving.value = true;
  try {
    const slug = (current.value.slug || current.value.title || 'experience')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const data = {
      title: current.value.title,
      slug,
      status: 'published',
      payload: { ...payload, title: current.value.title },
    };
    if (current.value.id) await pb.collection(COLLECTIONS.experiences).update(current.value.id, data);
    else await pb.collection(COLLECTIONS.experiences).create({ ...data, sortOrder: rows.value.length });
    editOpen.value = false;
    toast.add({ severity: 'success', summary: 'Saved', life: 2000 });
    const res = await pb.collection(COLLECTIONS.experiences).getList(1, 50);
    rows.value = res.items;
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Could not save experience', detail: e?.message || 'Save failed', life: 5000 });
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
:deep(.p-datatable-tbody > tr) { cursor: pointer; }
</style>
