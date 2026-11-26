<template>
  <div v-if="loading" class="editor-loading"><ProgressSpinner /></div>
  <template v-else>
    <div class="page-editor-root">
      <div class="page-header">
        <div>
          <h1>Header &amp; footer</h1>
          <p class="hint">Contact details, the footer and the final invite band, shown across the site.</p>
        </div>
        <Button label="Save" icon="pi pi-save" :loading="saving" @click="onSave" />
      </div>
      <Message v-if="error" severity="error" :closable="false">{{ error }}</Message>
      <div class="page-card">
        <TabView>
          <TabPanel v-for="tab in tabs" :key="tab.label" :header="tab.label">
            <p v-if="tab.hint" class="hint tab-hint">{{ tab.hint }}</p>
            <div class="field-grid">
              <FieldInput
                v-for="field in tab.fields"
                :key="field.key"
                :field="field"
                :modelValue="getNested(content, field.path)"
                @update:modelValue="(v) => setNested(content, field.path, v)"
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </template>
</template>

<script setup>
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';
import { usePageContent } from '@/composables/usePageContent';
import FieldInput from '@/components/FieldInput.vue';
import { getNested, setNested } from '@/lib/pageEditor/fields';
import tabs from '@/lib/pageEditor/site-chrome';

const toast = useToast();
const { loading, saving, content, error, save } = usePageContent('site_chrome');

async function onSave() {
  const ok = await save();
  if (ok) toast.add({ severity: 'success', summary: 'Saved', life: 2500 });
}
</script>

<style scoped>
.tab-hint {
  margin: 0 0 1rem;
}
</style>
