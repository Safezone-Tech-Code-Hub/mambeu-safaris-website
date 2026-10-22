<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else>
    <div class="page-header">
      <div>
        <h1>Header &amp; footer</h1>
        <p class="hint">Contact details and footer invitation text shown across the site.</p>
      </div>
      <Button label="Save" icon="pi pi-save" :loading="saving" @click="onSave" />
    </div>
    <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
    <div class="page-card field-grid two">
      <div>
        <label>Email</label>
        <InputText v-model="content.email" class="w-full" />
      </div>
      <div>
        <label>Phone display</label>
        <InputText v-model="content.phone" class="w-full" />
      </div>
      <div>
        <label>WhatsApp number (digits only)</label>
        <InputText v-model="content.whatsapp" class="w-full" />
      </div>
      <div>
        <label>Office location</label>
        <InputText v-model="content.officeLocation" class="w-full" />
      </div>
      <div class="col-span-2">
        <label>Final invite title</label>
        <Textarea v-model="content.finalInviteTitle" rows="2" class="w-full" autoResize />
      </div>
      <div class="col-span-2">
        <label>Final invite text</label>
        <Textarea v-model="content.finalInviteText" rows="3" class="w-full" autoResize />
      </div>
    </div>
  </template>
</template>

<script setup>
import { onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { usePageContent } from '@/composables/usePageContent';

const toast = useToast();
const { loading, saving, content, error, load, save } = usePageContent('site_chrome');

onMounted(load);

async function onSave() {
  const ok = await save();
  if (ok) toast.add({ severity: 'success', summary: 'Saved', life: 2500 });
}
</script>

<style scoped>
.w-full {
  width: 100%;
}
label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}
.col-span-2 {
  grid-column: 1 / -1;
}
</style>
