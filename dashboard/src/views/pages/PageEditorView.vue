<template>
  <div v-if="loading"><ProgressSpinner /></div>
  <template v-else>
    <div class="page-header">
      <div>
        <h1>{{ title }}</h1>
        <p class="hint">Changes here update the public page after you publish the website.</p>
        <p v-if="pageKey === 'home'" class="hint">
          Tour cards, place cards, comfort panels, and FAQ rows come from <strong>Content</strong> in the sidebar.
          Site header, footer, and green invite band: <strong>Header &amp; footer</strong>.
        </p>
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
          <div v-if="tab.fields?.length" class="field-grid">
            <div v-for="field in tab.fields" :key="field.key">
              <label>{{ field.label }}</label>
              <p v-if="field.hint && field.type !== 'image' && field.type !== 'images'" class="hint">{{ field.hint }}</p>
              <MediaFilePicker
                v-if="field.type === 'image' || field.type === 'images'"
                :multiple="field.type === 'images'"
                :hint="field.hint"
                :modelValue="getNested(content, field.path)"
                @update:modelValue="(v) => setNested(content, field.path, v)"
              />
              <Textarea
                v-else-if="field.long"
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
          <HomePlacesPanel v-if="tab.panel === 'home-places'" class="tab-panel-extra" />
          <HomeFaqPanel v-else-if="tab.panel === 'home-faq'" class="tab-panel-extra" />
          <ComfortLevelsPanel v-else-if="tab.panel === 'comfort-levels'" class="tab-panel-extra" />
          <ExperiencesPanel v-else-if="tab.panel === 'experiences-list'" class="tab-panel-extra" />
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
import MediaFilePicker from '@/components/MediaFilePicker.vue';
import HomePlacesPanel from '@/components/HomePlacesPanel.vue';
import HomeFaqPanel from '@/components/HomeFaqPanel.vue';
import ComfortLevelsPanel from '@/components/ComfortLevelsPanel.vue';
import ExperiencesPanel from '@/components/ExperiencesPanel.vue';
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
.tab-panel-extra {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--p-content-border-color, #e5e7eb);
}
</style>
