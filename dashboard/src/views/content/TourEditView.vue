<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else-if="tour">
    <div class="page-header">
      <div>
        <h1>{{ tour.title }}</h1>
        <p class="hint">Path: /{{ tour.path }}/</p>
      </div>
      <div class="flex gap-2">
        <Select v-model="tour.status" :options="statusOptions" optionLabel="label" optionValue="value" />
        <Button label="Save" icon="pi pi-save" :loading="saving" @click="save" />
      </div>
    </div>
    <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
    <TabView>
      <TabPanel header="Summary">
        <div class="field-grid two page-card">
          <div><label>Title</label><InputText v-model="tour.title" class="w-full" /></div>
          <div><label>Comfort style</label><InputText v-model="tour.style" class="w-full" /></div>
          <div><label>Duration label</label><InputText v-model="tour.duration" class="w-full" /></div>
          <div><label>Days</label><InputNumber v-model="tour.days" class="w-full" /></div>
          <div class="col-span-2"><label>Short description</label><Textarea v-model="tour.description" rows="3" class="w-full" autoResize /></div>
          <div class="col-span-2"><label>Full description</label><Textarea v-model="payload.fullDescription" rows="5" class="w-full" autoResize /></div>
          <div><label>Hero image path</label><InputText v-model="tour.image" class="w-full" /></div>
          <div><label>Featured on home</label><ToggleSwitch v-model="tour.featured" /></div>
        </div>
      </TabPanel>
      <TabPanel header="Pricing">
        <p class="hint">Add a row for each group size. Leave empty if this tour uses a tailored quotation.</p>
        <div v-for="(tier, i) in payload.pricingTiers" :key="i" class="tier-row">
          <InputText v-model="tier.people" placeholder="e.g. 2 people" />
          <InputNumber v-model="tier.price" placeholder="USD" />
          <Button icon="pi pi-trash" severity="danger" text @click="payload.pricingTiers.splice(i, 1)" />
        </div>
        <Button label="Add price row" icon="pi pi-plus" text @click="payload.pricingTiers.push({ people: '', price: 0 })" />
      </TabPanel>
      <TabPanel header="Itinerary">
        <div v-for="(day, i) in payload.itinerary" :key="i" class="day-card page-card">
          <div class="field-grid two">
            <div><label>Day</label><InputText v-model="day.day" class="w-full" /></div>
            <div><label>Title</label><InputText v-model="day.title" class="w-full" /></div>
            <div class="col-span-2"><label>Description</label><Textarea v-model="day.description" rows="3" class="w-full" autoResize /></div>
          </div>
          <Button label="Remove day" icon="pi pi-trash" severity="danger" text @click="payload.itinerary.splice(i, 1)" />
        </div>
        <Button label="Add day" icon="pi pi-plus" @click="payload.itinerary.push({ day: '', title: '', description: '', image: '', accommodation: '', meals: '' })" />
      </TabPanel>
    </TabView>
  </template>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import ToggleSwitch from 'primevue/toggleswitch';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { COLLECTIONS, describePbError, pb } from '@/lib/pb';

const route = useRoute();
const toast = useToast();
const loading = ref(true);
const saving = ref(false);
const error = ref('');
const tour = ref(null);
const payload = reactive({
  fullDescription: '',
  pricingTiers: [],
  itinerary: [],
  highlights: [],
  included: [],
  excluded: [],
  gallery: [],
});

const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
];

onMounted(async () => {
  try {
    const row = await pb.collection(COLLECTIONS.tours).getOne(route.params.id);
    tour.value = { ...row };
    Object.assign(payload, row.payload || {});
    if (!Array.isArray(payload.pricingTiers)) payload.pricingTiers = [];
    if (!Array.isArray(payload.itinerary)) payload.itinerary = [];
  } catch (e) {
    error.value = describePbError(e);
  } finally {
    loading.value = false;
  }
});

async function save() {
  saving.value = true;
  error.value = '';
  try {
    const merged = { ...tour.value.payload, ...payload, title: tour.value.title, style: tour.value.style, duration: tour.value.duration, days: tour.value.days, description: tour.value.description, image: tour.value.image, featured: tour.value.featured };
    await pb.collection(COLLECTIONS.tours).update(tour.value.id, {
      title: tour.value.title,
      style: tour.value.style,
      duration: tour.value.duration,
      days: tour.value.days,
      description: tour.value.description,
      image: tour.value.image,
      featured: tour.value.featured,
      status: tour.value.status,
      payload: merged,
    });
    toast.add({ severity: 'success', summary: 'Tour saved', life: 2500 });
  } catch (e) {
    error.value = describePbError(e);
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
.col-span-2 { grid-column: 1 / -1; }
.tier-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
.day-card { margin-bottom: 1rem; }
</style>
