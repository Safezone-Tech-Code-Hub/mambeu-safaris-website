<template>
  <div class="page-header">
    <div>
      <h1>Safari tours</h1>
      <p class="hint">All journeys shown on the public safari collection and detail pages.</p>
    </div>
    <div class="flex gap-2">
      <span class="p-input-icon-left search">
        <i class="pi pi-search" />
        <InputText v-model="search" placeholder="Search title or path" />
      </span>
      <Button label="Add safari" icon="pi pi-plus" :loading="creating" @click="createTour" />
    </div>
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
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, pb } from '@/lib/pb';

const router = useRouter();
const toast = useToast();
const loading = ref(true);
const creating = ref(false);
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

async function createTour() {
  creating.value = true;
  const stamp = Date.now().toString(36);
  const path = `new-safari-${stamp}`;
  try {
    const row = await pb.collection(COLLECTIONS.tours).create({
      path,
      slug: path,
      title: 'New safari',
      style: 'Comfort',
      duration: '5 days',
      days: 5,
      image: 'hero.webp',
      description: '',
      status: 'draft',
      featured: false,
      sortOrder: rows.value.length,
      payload: {
        title: 'New safari',
        style: 'Comfort',
        duration: '5 days',
        days: 5,
        image: 'hero.webp',
        description: '',
        fullDescription: '',
        pricingTiers: [],
        itinerary: [],
        highlights: [],
        included: [],
        excluded: [],
        gallery: [],
      },
    });
    toast.add({
      severity: 'success',
      summary: 'Draft safari created',
      detail: 'Set the status to Published and save when it is ready to appear on the site.',
      life: 4000,
    });
    router.push({ name: 'tour-edit', params: { id: row.id } });
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Could not create safari', detail: describePbError(e), life: 5000 });
  } finally {
    creating.value = false;
  }
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
