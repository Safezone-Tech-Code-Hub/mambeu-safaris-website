<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else>
    <div class="page-header">
      <h1>{{ place.name }}</h1>
      <Button label="Save" :loading="saving" @click="save" />
    </div>
    <div class="page-card field-grid two">
      <div><label>Name</label><InputText v-model="place.name" class="w-full" /></div>
      <div><label>Tagline</label><InputText v-model="payload.tag" class="w-full" /></div>
      <div><label>Photo</label><InputText v-model="payload.photo" class="w-full" /></div>
      <div class="col-span-2"><label>Description</label><Textarea v-model="payload.text" rows="4" class="w-full" autoResize /></div>
      <div class="col-span-2"><label>Facts (one per line)</label><Textarea v-model="factsText" rows="4" class="w-full" autoResize /></div>
    </div>
  </template>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, pb } from '@/lib/pb';

const route = useRoute();
const toast = useToast();
const loading = ref(true);
const saving = ref(false);
const place = ref({});
const payload = reactive({});
const factsText = ref('');

onMounted(async () => {
  const row = await pb.collection(COLLECTIONS.places).getOne(route.params.id);
  place.value = row;
  Object.assign(payload, row.payload || {});
  factsText.value = (payload.facts || []).join('\n');
  loading.value = false;
});

async function save() {
  saving.value = true;
  payload.facts = factsText.value.split('\n').map((s) => s.trim()).filter(Boolean);
  await pb.collection(COLLECTIONS.places).update(place.value.id, {
    name: place.value.name,
    payload: { ...payload, name: place.value.name },
  });
  saving.value = false;
  toast.add({ severity: 'success', summary: 'Saved', life: 2000 });
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
.col-span-2 { grid-column: 1 / -1; }
</style>
