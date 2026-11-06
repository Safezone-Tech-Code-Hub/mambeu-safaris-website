<template>
  <div class="places-panel">
    <div class="places-panel-header">
      <p class="hint">
        Park cards (photo, name, subtitle) for the destinations hub and homepage slider. Order follows <strong>sort order</strong>.
      </p>
      <Button label="Add destination" icon="pi pi-plus" :loading="creating" @click="createPlace" />
    </div>
    <DataTable :value="rows" :loading="loading" rowHover @row-click="({ data }) => goEdit(data.id)">
      <Column field="sortOrder" header="#" style="width: 3rem" />
      <Column field="name" header="Name" />
      <Column field="slug" header="Slug" />
      <Column header="Status">
        <template #body="{ data }">
          <Tag :value="data.status" :severity="data.status === 'published' ? 'success' : 'secondary'" />
        </template>
      </Column>
      <Column header="" style="width: 8rem">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text rounded @click.stop="goEdit(data.id)" />
          <Button icon="pi pi-trash" text rounded severity="danger" @click.stop="confirmDelete(data)" />
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
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, getListWithSort, pb } from '@/lib/pb';

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const rows = ref([]);
const loading = ref(true);
const creating = ref(false);

async function refresh() {
  loading.value = true;
  try {
    const res = await getListWithSort(COLLECTIONS.places, 1, 50, { sort: 'sortOrder' });
    rows.value = res.items;
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  } finally {
    loading.value = false;
  }
}

onMounted(refresh);

function goEdit(id) {
  router.push({ name: 'place-edit', params: { id } });
}

async function createPlace() {
  creating.value = true;
  const slug = `new-place-${Date.now().toString(36)}`;
  try {
    const row = await pb.collection(COLLECTIONS.places).create({
      slug,
      name: 'New destination',
      status: 'draft',
      sortOrder: rows.value.length,
      payload: { slug, name: 'New destination', tag: '', photo: 'hero.webp', text: '', facts: [] },
    });
    toast.add({ severity: 'success', summary: 'Destination created', life: 2000 });
    await refresh();
    goEdit(row.id);
  } catch (e) {
    toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
  } finally {
    creating.value = false;
  }
}

function confirmDelete(row) {
  confirm.require({
    message: `Delete “${row.name}” from the site? This cannot be undone.`,
    header: 'Delete destination',
    icon: 'pi pi-trash',
    acceptClass: 'p-button-danger',
    accept: async () => {
      try {
        await pb.collection(COLLECTIONS.places).delete(row.id);
        toast.add({ severity: 'success', summary: 'Deleted', life: 2000 });
        await refresh();
      } catch (e) {
        toast.add({ severity: 'error', summary: describePbError(e), life: 4000 });
      }
    },
  });
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
</style>
