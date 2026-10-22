<template>
  <div class="page-header">
    <div>
      <h1>Enquiry inbox</h1>
      <p class="hint">Messages from the plan-your-trip form on the website.</p>
    </div>
  </div>
  <div class="filters flex gap-2 mb-3">
    <Select v-model="statusFilter" :options="statusOptions" optionLabel="label" optionValue="value" placeholder="All statuses" showClear />
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText v-model="search" placeholder="Search name, email, journey" />
    </span>
  </div>
  <DataTable :value="filtered" :loading="loading" paginator :rows="20" rowHover @row-click="open">
    <Column field="name" header="Guest" sortable />
    <Column field="email" header="Email" />
    <Column field="journey" header="Journey" />
    <Column header="Status">
      <template #body="{ data }">
        <Tag :value="data.status || 'new'" :severity="statusSeverity(data.status)" />
      </template>
    </Column>
    <Column header="Received">
      <template #body="{ data }">{{ formatDate(data.created) }}</template>
    </Column>
  </DataTable>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { COLLECTIONS, pb } from '@/lib/pb';

const router = useRouter();
const rows = ref([]);
const loading = ref(true);
const search = ref('');
const statusFilter = ref(null);

const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Quoted', value: 'quoted' },
  { label: 'Booked', value: 'booked' },
  { label: 'Closed', value: 'closed' },
];

const filtered = computed(() => {
  let list = rows.value;
  if (statusFilter.value) list = list.filter((r) => (r.status || 'new') === statusFilter.value);
  const q = search.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((r) =>
    [r.name, r.email, r.journey, r.message].join(' ').toLowerCase().includes(q),
  );
});

onMounted(async () => {
  const res = await pb.collection(COLLECTIONS.enquiries).getList(1, 200, { sort: '-created' });
  rows.value = res.items;
  loading.value = false;
});

function open({ data }) {
  router.push({ name: 'lead-detail', params: { id: data.id } });
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString();
}

function statusSeverity(status) {
  const map = { new: 'info', contacted: 'secondary', quoted: 'warn', booked: 'success', closed: 'contrast' };
  return map[status] || 'info';
}
</script>

<style scoped>
:deep(.p-datatable-tbody > tr) {
  cursor: pointer;
}
</style>
