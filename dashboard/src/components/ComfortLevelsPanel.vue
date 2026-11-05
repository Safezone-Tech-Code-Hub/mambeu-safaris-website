<template>
  <div class="places-panel">
    <div class="places-panel-header">
      <p class="hint">
        Midrange, Comfort, and Luxury tab panels (photo, bullets, button text) are edited below. Same data appears on the homepage comfort block.
      </p>
      <Button label="Open full editor" icon="pi pi-external-link" @click="router.push({ name: 'comfort-levels' })" />
    </div>
    <DataTable :value="rows" :loading="loading" rowHover>
      <Column field="title" header="Level" />
      <Column header="Panel title">
        <template #body="{ data }">
          {{ previewTitle(data) }}
        </template>
      </Column>
      <Column header="" style="width: 5rem">
        <template #body>
          <Button icon="pi pi-pencil" text rounded @click="router.push({ name: 'comfort-levels' })" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, getListWithSort, pb } from '@/lib/pb';

const router = useRouter();
const toast = useToast();
const rows = ref([]);
const loading = ref(true);

function previewTitle(row) {
  const p = row.payload || {};
  const a = p.titleLine1 || (p.title || '').replace(/<[^>]+>/g, ' ').trim();
  const b = p.titleLine2 || '';
  return b ? `${a} ${b}` : a;
}

onMounted(async () => {
  try {
    const res = await getListWithSort(COLLECTIONS.comfortLevels, 1, 10, { sort: 'sortOrder' });
    rows.value = res.items;
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  } finally {
    loading.value = false;
  }
});
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
</style>
