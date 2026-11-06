<template>
  <div class="places-panel">
    <div class="places-panel-header">
      <p class="hint">Safari journeys (cards, day-by-day copy, pricing): <strong>Content → Safari tours</strong>.</p>
      <Button label="Open safari tours" icon="pi pi-external-link" @click="router.push({ name: 'tours' })" />
    </div>
    <DataTable :value="rows" :loading="loading" rowHover @row-click="() => router.push({ name: 'tours' })">
      <Column field="title" header="Title" />
      <Column field="path" header="Path" />
      <Column field="style" header="Style" />
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'published' ? 'success' : 'secondary'" />
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
import Tag from 'primevue/tag';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, getListWithSort, pb } from '@/lib/pb';

const router = useRouter();
const toast = useToast();
const rows = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getListWithSort(COLLECTIONS.tours, 1, 200, { sort: 'sortOrder' });
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
