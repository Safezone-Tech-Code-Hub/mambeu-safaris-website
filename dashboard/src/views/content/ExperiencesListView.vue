<template>
  <div class="page-header"><h1>Experiences</h1></div>
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
  Object.assign(payload, data.payload || {});
  editOpen.value = true;
}

async function saveCurrent() {
  saving.value = true;
  await pb.collection(COLLECTIONS.experiences).update(current.value.id, {
    title: current.value.title,
    payload: { ...payload, title: current.value.title },
  });
  saving.value = false;
  editOpen.value = false;
  toast.add({ severity: 'success', summary: 'Saved', life: 2000 });
  const res = await pb.collection(COLLECTIONS.experiences).getList(1, 50);
  rows.value = res.items;
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
:deep(.p-datatable-tbody > tr) { cursor: pointer; }
</style>
