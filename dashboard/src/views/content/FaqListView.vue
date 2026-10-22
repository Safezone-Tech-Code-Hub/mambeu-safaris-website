<template>
  <div class="page-header">
    <h1>FAQ items</h1>
    <Button label="Add question" icon="pi pi-plus" @click="add" />
  </div>
  <DataTable :value="rows" :loading="loading">
    <Column field="question" header="Question" />
    <Column header="Actions">
      <template #body="{ data }">
        <Button icon="pi pi-pencil" text @click="edit(data)" />
      </template>
    </Column>
  </DataTable>
  <Dialog v-model:visible="open" header="FAQ" modal style="width: min(560px, 95vw)">
    <div class="field-grid">
      <div><label>Question</label><InputText v-model="form.question" class="w-full" /></div>
      <div><label>Answer</label><Textarea v-model="form.answer" rows="5" class="w-full" autoResize /></div>
      <Button label="Save" @click="save" />
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
import { COLLECTIONS, pb } from '@/lib/pb';

const rows = ref([]);
const loading = ref(true);
const open = ref(false);
const form = reactive({ id: '', question: '', answer: '' });

async function reload() {
  const res = await pb.collection(COLLECTIONS.faqItems).getList(1, 100, { sort: 'sortOrder' });
  rows.value = res.items;
}

onMounted(async () => {
  await reload();
  loading.value = false;
});

function edit(row) {
  Object.assign(form, row);
  open.value = true;
}

function add() {
  Object.assign(form, { id: '', question: '', answer: '' });
  open.value = true;
}

async function save() {
  const data = { question: form.question, answer: form.answer, status: 'published', sortOrder: rows.value.length };
  if (form.id) await pb.collection(COLLECTIONS.faqItems).update(form.id, data);
  else await pb.collection(COLLECTIONS.faqItems).create(data);
  open.value = false;
  await reload();
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
</style>
