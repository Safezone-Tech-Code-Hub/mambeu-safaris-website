<template>
  <div class="page-header"><h1>Comfort levels</h1></div>
  <Card v-for="row in rows" :key="row.id" class="mb-3">
    <template #title>{{ row.title }}</template>
    <template #content>
      <div class="field-grid">
        <div><label>Subtitle</label><InputText v-model="payloads[row.id].sub" class="w-full" /></div>
        <div><label>Image</label><InputText v-model="payloads[row.id].image" class="w-full" /></div>
        <div><label>Body</label><Textarea v-model="payloads[row.id].body" rows="4" class="w-full" autoResize /></div>
        <Button label="Save" @click="save(row)" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, pb } from '@/lib/pb';

const toast = useToast();
const rows = ref([]);
const payloads = reactive({});

onMounted(async () => {
  const res = await pb.collection(COLLECTIONS.comfortLevels).getList(1, 10, { sort: 'sortOrder' });
  rows.value = res.items;
  for (const row of res.items) payloads[row.id] = { ...(row.payload || {}) };
});

async function save(row) {
  await pb.collection(COLLECTIONS.comfortLevels).update(row.id, { payload: payloads[row.id] });
  toast.add({ severity: 'success', summary: `${row.title} saved`, life: 2000 });
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
</style>
