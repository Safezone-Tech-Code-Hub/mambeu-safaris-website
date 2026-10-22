<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else-if="row">
    <div class="page-header">
      <div>
        <h1>{{ row.name || 'Enquiry' }}</h1>
        <p class="hint">Request {{ row.requestId }}</p>
      </div>
      <Button label="Save" :loading="saving" @click="save" />
    </div>
    <div class="field-grid two">
      <Card>
        <template #title>Guest</template>
        <template #content>
          <p><strong>Email:</strong> {{ row.email }}</p>
          <p><strong>Phone:</strong> {{ row.phone }}</p>
          <p><strong>Country:</strong> {{ row.country }}</p>
          <p><strong>Travel date:</strong> {{ row.travelDate }}</p>
          <p><strong>Adults / children:</strong> {{ row.adults }} / {{ row.children }}</p>
        </template>
      </Card>
      <Card>
        <template #title>Trip interest</template>
        <template #content>
          <p><strong>Style:</strong> {{ row.style }}</p>
          <p><strong>Journey:</strong> {{ row.journey }}</p>
          <p><strong>Interest:</strong> {{ row.interest }}</p>
          <p class="message">{{ row.message }}</p>
        </template>
      </Card>
    </div>
    <div class="page-card field-grid two mt-3">
      <div>
        <label>Status</label>
        <Select v-model="row.status" :options="statusOptions" class="w-full" />
      </div>
      <div>
        <label>Assigned to</label>
        <InputText v-model="row.assignedTo" class="w-full" />
      </div>
      <div class="col-span-2">
        <label>Internal notes</label>
        <Textarea v-model="row.notes" rows="5" class="w-full" autoResize />
      </div>
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Card from 'primevue/card';
import Select from 'primevue/select';
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
const row = ref(null);

const statusOptions = ['new', 'contacted', 'quoted', 'booked', 'closed'];

onMounted(async () => {
  row.value = await pb.collection(COLLECTIONS.enquiries).getOne(route.params.id);
  loading.value = false;
});

async function save() {
  saving.value = true;
  await pb.collection(COLLECTIONS.enquiries).update(row.value.id, {
    status: row.value.status,
    assignedTo: row.value.assignedTo,
    notes: row.value.notes,
  });
  saving.value = false;
  toast.add({ severity: 'success', summary: 'Enquiry updated', life: 2000 });
}
</script>

<style scoped>
.w-full { width: 100%; }
label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
.col-span-2 { grid-column: 1 / -1; }
.message { white-space: pre-wrap; }
.mt-3 { margin-top: 1rem; }
</style>
