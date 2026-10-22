<template>
  <div class="field-grid">
    <div v-for="field in fields" :key="field.key">
      <label :for="field.key">{{ field.label }}</label>
      <p v-if="field.hint" class="hint">{{ field.hint }}</p>
      <InputText
        v-if="field.type === 'text'"
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
