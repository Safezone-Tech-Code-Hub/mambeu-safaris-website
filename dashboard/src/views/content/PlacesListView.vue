<template>
  <div class="page-header"><h1>Places</h1></div>
  <DataTable :value="rows" :loading="loading" rowHover @row-click="({ data }) => $router.push({ name: 'place-edit', params: { id: data.id } })">
    <Column field="name" header="Name" />
    <Column field="slug" header="Slug" />
    <Column header="Status"><template #body="{ data }"><Tag :value="data.status" /></template></Column>
  </DataTable>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import { COLLECTIONS, pb } from '@/lib/pb';

const loading = ref(true);
const rows = ref([]);
onMounted(async () => {
  const res = await pb.collection(COLLECTIONS.places).getList(1, 50, { sort: 'sortOrder' });
  rows.value = res.items;
  loading.value = false;
});
</script>
