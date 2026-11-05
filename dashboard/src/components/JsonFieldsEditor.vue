<template>
  <div class="field-grid">
    <div v-for="field in fields" :key="field.key">
      <label :for="field.key">{{ field.label }}</label>
      <p v-if="field.hint" class="hint">{{ field.hint }}</p>
      <MediaFilePicker
        v-if="field.type === 'image' || field.type === 'images'"
        :id="field.key"
        v-model="model[field.key]"
        :multiple="field.type === 'images'"
        :hint="field.hint"
      />
      <InputText
        v-else-if="field.type === 'text' || !field.type"
        :id="field.key"
        v-model="model[field.key]"
        class="w-full"
      />
      <Textarea
        v-else
        :id="field.key"
        v-model="model[field.key]"
        rows="4"
        class="w-full"
        autoResize
      />
    </div>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import MediaFilePicker from '@/components/MediaFilePicker.vue';

defineProps({
  fields: { type: Array, required: true },
});

const model = defineModel({ type: Object, required: true });
</script>

<style scoped>
label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}
.w-full {
  width: 100%;
}
</style>
