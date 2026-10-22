<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else>
    <div class="page-header">
      <div>
        <h1>{{ title }}</h1>
        <p class="hint">Changes here update the public page after you publish the website.</p>
      </div>
      <div class="flex gap-2">
        <Select v-model="status" :options="statusOptions" optionLabel="label" optionValue="value" />
        <Button label="Save" icon="pi pi-save" :loading="saving" @click="onSave" />
      </div>
    </div>
    <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
    <div class="page-card">
      <TabView v-if="tabs.length">
        <TabPanel v-for="tab in tabs" :key="tab.label" :header="tab.label">
          <div class="field-grid">
            <div v-for="field in tab.fields" :key="field.key">
              <label>{{ field.label }}</label>
              <p v-if="field.hint" class="hint">{{ field.hint }}</p>
              <Textarea
                v-if="field.long"
                :modelValue="getNested(content, field.path)"
                @update:modelValue="(v) => setNested(content, field.path, v)"
                rows="4"
                class="w-full"
                autoResize
              />
              <InputText
                v-else
                :modelValue="getNested(content, field.path)"
                @update:modelValue="(v) => setNested(content, field.path, v)"
                class="w-full"
              />
            </div>
          </div>
        </TabPanel>
      </TabView>
      <div v-else class="field-grid">
        <div>
          <label>Page content (JSON)</label>
          <p class="hint">Structured fields for this page can be added in a later pass. Edit raw content below.</p>
          <Textarea v-model="rawJson" rows="16" class="w-full" />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { usePageContent } from '@/composables/usePageContent';
import { getNested, pageEditorTabs, setNested } from '@/lib/pageEditorConfig';

const props = defineProps({
  pageKey: { type: String, required: true },
  title: { type: String, required: true },
});

const toast = useToast();
const { loading, saving, content, status, error, load, save } = usePageContent(props.pageKey);
const rawJson = ref('');

const tabs = computed(() => pageEditorTabs[props.pageKey] || []);
const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
];

watch(
  content,
  (val) => {
    if (!tabs.value.length) rawJson.value = JSON.stringify(val, null, 2);
  },
  { deep: true },
);

onMounted(load);

async function onSave() {
  if (!tabs.value.length) {
    try {
      content.value = JSON.parse(rawJson.value);
    } catch {
      error.value = 'Content must be valid JSON.';
      return;
    }
  }
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
</style>
