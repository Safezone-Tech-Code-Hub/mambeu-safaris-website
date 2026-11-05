<template>
  <div class="faq-panel">
    <div class="places-panel-header">
      <p class="hint">Questions shown on the homepage (and travel guide) come from here.</p>
      <Button label="Add FAQ" icon="pi pi-plus" @click="addRow" />
    </div>
    <DataTable :value="rows" :loading="loading" rowHover>
      <Column field="sortOrder" header="#" style="width: 3rem" />
      <Column field="question" header="Question" />
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" />
        </template>
      </Column>
      <Column header="" style="width: 6rem">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text rounded @click="openEdit(data)" />
          <Button icon="pi pi-trash" text rounded severity="danger" @click="remove(data)" />
        </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="editOpen" header="Edit FAQ" modal style="width: min(560px, 96vw)">
      <div v-if="current" class="field-grid">
        <div><label>Question</label><InputText v-model="current.question" class="w-full" /></div>
        <div><label>Answer</label><Textarea v-model="current.answer" rows="4" class="w-full" autoResize /></div>
        <Select v-model="current.status" :options="['published', 'draft']" class="w-full" />
        <Button label="Save" :loading="saving" @click="saveCurrent" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, getListWithSort, pb } from '@/lib/pb';

const toast = useToast();
const rows = ref([]);
const loading = ref(true);
const editOpen = ref(false);
const current = ref(null);
const saving = ref(false);

async function refresh() {
  loading.value = true;
  try {
    const res = await getListWithSort(COLLECTIONS.faqItems, 1, 100, { sort: 'sortOrder' });
    rows.value = res.items;
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  } finally {
    loading.value = false;
  }
}

onMounted(refresh);

function openEdit(row) {
  current.value = { ...row };
  editOpen.value = true;
}

async function addRow() {
  try {
    const row = await pb.collection(COLLECTIONS.faqItems).create({
      question: 'New question',
      answer: '',
      status: 'draft',
      sortOrder: rows.value.length,
    });
    openEdit(row);
    await refresh();
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  }
}

async function saveCurrent() {
  saving.value = true;
  try {
    await pb.collection(COLLECTIONS.faqItems).update(current.value.id, {
      question: current.value.question,
      answer: current.value.answer,
      status: current.value.status,
    });
    editOpen.value = false;
    toast.add({ severity: 'success', summary: 'Saved', life: 2000 });
    await refresh();
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  } finally {
    saving.value = false;
  }
}

async function remove(row) {
  try {
    await pb.collection(COLLECTIONS.faqItems).delete(row.id);
    toast.add({ severity: 'success', summary: 'Deleted', life: 2000 });
    await refresh();
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  }
}
</script>

<style scoped>
.places-panel-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.w-full {
  width: 100%;
}
label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}
</style>
