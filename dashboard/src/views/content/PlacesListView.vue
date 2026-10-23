<template>
  <div class="page-header">
    <div>
      <h1>Places</h1>
      <p class="hint">Destinations on the public destinations page. Publish a place to show it on the site.</p>
    </div>
    <Button label="Add place" icon="pi pi-plus" :loading="creating" @click="createPlace" />
  </div>
  <DataTable :value="rows" :loading="loading" rowHover @row-click="({ data }) => $router.push({ name: 'place-edit', params: { id: data.id } })">
    <Column field="name" header="Name" />
    <Column field="slug" header="Slug" />
    <Column header="Status"><template #body="{ data }"><Tag :value="data.status" /></template></Column>
  </DataTable>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, pb } from '@/lib/pb';

const router = useRouter();
const toast = useToast();
const loading = ref(true);
const creating = ref(false);
const rows = ref([]);
onMounted(async () => {
  const res = await pb.collection(COLLECTIONS.places).getList(1, 50, { sort: 'sortOrder' });
  rows.value = res.items;
  loading.value = false;
});

async function createPlace() {
  creating.value = true;
  const slug = `new-place-${Date.now().toString(36)}`;
  try {
    const row = await pb.collection(COLLECTIONS.places).create({
      slug,
      name: 'New place',
      status: 'draft',
      sortOrder: rows.value.length,
      payload: {
        slug,
        name: 'New place',
        tag: '',
        photo: 'hero.webp',
        text: '',
        q: '',
        facts: [],
      },
    });
    router.push({ name: 'place-edit', params: { id: row.id } });
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Could not create place', detail: describePbError(e), life: 5000 });
  } finally {
    creating.value = false;
  }
}
</script>
