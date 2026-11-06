<template>
  <div class="places-panel">
    <div class="places-panel-header">
      <p class="hint">
        Each row on the Experiences page (photo, headline, body, enquiry tag) comes from <strong>Content → Experiences</strong>.
      </p>
      <Button label="Add or edit experiences" icon="pi pi-external-link" @click="router.push({ name: 'experiences' })" />
    </div>
    <DataTable :value="rows" :loading="loading" rowHover @row-click="() => router.push({ name: 'experiences' })">
      <Column field="sortOrder" header="#" style="width: 3rem" />
      <Column field="title" header="Title" />
      <Column field="slug" header="Slug" />
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'published' ? 'success' : 'secondary'" />
        </template>
      </Column>
      <Column header="" style="width: 5rem">
        <template #body>
          <Button icon="pi pi-pencil" text rounded @click.stop="router.push({ name: 'experiences' })" />
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
    const res = await getListWithSort(COLLECTIONS.experiences, 1, 50, { sort: 'sortOrder' });
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
