<template>
  <div class="field-input">
    <label v-if="showLabel" class="field-input__label">{{ field.label }}</label>
    <p v-if="field.hint && kind !== 'image'" class="hint">{{ field.hint }}</p>

    <MediaFilePicker
      v-if="kind === 'image'"
      :hint="field.hint"
      :modelValue="model ?? ''"
      @update:modelValue="(v) => (model = v)"
    />

    <Textarea
      v-else-if="kind === 'long'"
      :modelValue="model ?? ''"
      @update:modelValue="(v) => (model = v)"
      rows="3"
      class="w-full"
      autoResize
    />

    <Textarea
      v-else-if="kind === 'lines'"
      :modelValue="Array.isArray(model) ? model.join('\n') : model ?? ''"
      @update:modelValue="onLines"
      rows="4"
      class="w-full"
      autoResize
    />

    <div v-else-if="kind === 'list'" class="field-list">
      <div v-for="(item, index) in items" :key="index" class="field-list__item">
        <div class="field-list__head">
          <strong>{{ itemTitle(item, index) }}</strong>
          <div class="field-list__actions">
            <Button
              type="button"
              icon="pi pi-arrow-up"
              text
              rounded
              size="small"
              :disabled="index === 0"
              aria-label="Move up"
              @click="move(index, -1)"
            />
            <Button
              type="button"
              icon="pi pi-arrow-down"
              text
              rounded
              size="small"
              :disabled="index === items.length - 1"
              aria-label="Move down"
              @click="move(index, 1)"
            />
            <Button
              type="button"
              icon="pi pi-trash"
              text
              rounded
              size="small"
              severity="danger"
              aria-label="Remove"
              @click="remove(index)"
            />
          </div>
        </div>
        <div class="field-list__fields">
          <FieldInput
            v-for="sub in field.itemFields"
            :key="sub.key"
            :field="sub"
            :modelValue="getNested(item, sub.path)"
            @update:modelValue="(v) => updateItem(index, sub.path, v)"
          />
        </div>
      </div>
      <Button
        type="button"
        :label="`Add ${field.itemLabel || 'item'}`"
        icon="pi pi-plus"
        severity="secondary"
        outlined
        size="small"
        @click="add"
      />
    </div>

    <InputText
      v-else
      :modelValue="model ?? ''"
      @update:modelValue="(v) => (model = v)"
      class="w-full"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import MediaFilePicker from '@/components/MediaFilePicker.vue';
import { getNested, setNested } from '@/lib/pageEditor/fields';

defineOptions({ name: 'FieldInput' });

const props = defineProps({
  field: { type: Object, required: true },
  showLabel: { type: Boolean, default: true },
});

const model = defineModel({ default: undefined });

/** Older configs mark multi-line text with `long: true` instead of `type: 'long'`. */
const kind = computed(() => props.field.type || (props.field.long ? 'long' : 'text'));

const items = computed(() => (Array.isArray(model.value) ? model.value : []));

function onLines(v) {
  model.value = String(v ?? '').split('\n');
}

function blankItem() {
  const item = {};
  (props.field.itemFields || []).forEach((sub) => {
    setNested(item, sub.path, sub.type === 'lines' || sub.type === 'list' ? [] : '');
  });
  return item;
}

function itemTitle(item, index) {
  const key = props.field.itemTitleKey;
  const text = key ? String(item?.[key] ?? '').trim() : '';
  const label = props.field.itemLabel || 'Item';
  const name = label.charAt(0).toUpperCase() + label.slice(1);
  return text ? `${index + 1}. ${text}` : `${name} ${index + 1}`;
}

function commit(next) {
  model.value = next;
}

function updateItem(index, path, value) {
  const next = items.value.map((it) => clone(it));
  setNested(next[index], path, value);
  commit(next);
}

function add() {
  commit([...items.value.map((it) => clone(it)), blankItem()]);
}

function remove(index) {
  commit(items.value.filter((_, i) => i !== index).map((it) => clone(it)));
}

function move(index, delta) {
  const next = items.value.map((it) => clone(it));
  const [row] = next.splice(index, 1);
  next.splice(index + delta, 0, row);
  commit(next);
}

function clone(v) {
  return JSON.parse(JSON.stringify(v ?? {}));
}
</script>

<style scoped>
.field-input__label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.w-full {
  width: 100%;
}
.field-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}
.field-list__item {
  width: 100%;
  border: 1px solid var(--p-content-border-color, #e5e7eb);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem 1rem;
  background: var(--p-content-background, #fff);
}
.field-list__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.field-list__actions {
  display: flex;
  gap: 0.125rem;
}
.field-list__fields {
  display: grid;
  gap: 0.85rem;
}
</style>
