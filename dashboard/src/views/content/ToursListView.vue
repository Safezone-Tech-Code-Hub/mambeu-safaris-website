<template>
  <div class="page-header">
    <div>
      <h1>Safari tours</h1>
      <p class="hint">All journeys shown on the public safari collection and detail pages.</p>
    </div>
    <span class="p-input-icon-left search">
      <i class="pi pi-search" />
      <InputText v-model="search" placeholder="Search title or path" />
    </span>
  </div>
  <DataTable :value="filtered" :loading="loading" paginator :rows="15" rowHover @row-click="onRow">
    <Column field="title" header="Title" sortable />
    <Column field="path" header="URL path" />
    <Column field="style" header="Comfort" />
    <Column field="duration" header="Duration" />
    <Column header="Status">
      <template #body="{ data }">
        <Tag :value="data.status" :severity="data.status === 'published' ? 'success' : 'warn'" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Tag from 'primevue/tag';
import { COLLECTIONS, pb } from '@/lib/pb';

const router = useRouter();
const loading = ref(true);
const rows = ref([]);
const search = ref('');

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return rows.value;
  return rows.value.filter(
    (r) => r.title?.toLowerCase().includes(q) || r.path?.toLowerCase().includes(q),
  );
});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await pb.collection(COLLECTIONS.tours).getList(1, 200, { sort: 'sortOrder' });
    rows.value = res.items;
  } finally {
    loading.value = false;
  }
});

function onRow({ data }) {
  router.push({ name: 'tour-edit', params: { id: data.id } });
}
</script>

<style scoped>
.search :deep(input) {
  min-width: 240px;
}
:deep(.p-datatable-tbody > tr) {
  cursor: pointer;
}
</style>
