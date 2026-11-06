<template>
  <div class="page-header"><h1>Comfort levels</h1></div>
  <p class="hint page-hint">Plain text only — line breaks in titles are two separate fields. Bullets: one point per line.</p>
  <Card v-for="row in rows" :key="row.id" class="mb-3">
    <template #title>{{ row.title }}</template>
    <template #content>
      <div class="field-grid">
        <div><label>Tab subtitle (under tab name)</label><InputText v-model="payloads[row.id].tabSubtitle" class="w-full" /></div>
        <div><label>Panel number</label><InputText v-model="payloads[row.id].number" class="w-full" /></div>
        <div><label>Title line 1</label><InputText v-model="payloads[row.id].titleLine1" class="w-full" /></div>
        <div><label>Title line 2</label><InputText v-model="payloads[row.id].titleLine2" class="w-full" /></div>
        <div><label>Subtitle under title</label><InputText v-model="payloads[row.id].sub" class="w-full" /></div>
        <div><label>Image</label><MediaFilePicker v-model="payloads[row.id].image" /></div>
        <div><label>Image description (accessibility)</label><InputText v-model="payloads[row.id].alt" class="w-full" /></div>
        <div><label>Caption on photo</label><InputText v-model="payloads[row.id].imageNote" class="w-full" /></div>
        <div><label>Body</label><Textarea v-model="payloads[row.id].body" rows="4" class="w-full" autoResize /></div>
        <div>
          <label>Bullet points (one per line)</label>
          <Textarea v-model="bulletText[row.id]" rows="4" class="w-full" autoResize />
        </div>
        <div><label>Button text</label><InputText v-model="payloads[row.id].cta" class="w-full" /></div>
        <div><label>Small print below button</label><Textarea v-model="payloads[row.id].note" rows="2" class="w-full" autoResize /></div>
        <Button label="Save" @click="save(row)" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import MediaFilePicker from '@/components/MediaFilePicker.vue';
import { COLLECTIONS, getListWithSort, pb } from '@/lib/pb';

const toast = useToast();
const rows = ref([]);
const payloads = reactive({});
const bulletText = reactive({});

function bulletsToText(bullets) {
  return Array.isArray(bullets) ? bullets.join('\n') : '';
}

function textToBullets(text) {
  return String(text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function hydratePayload(raw, levelKey) {
  const p = { ...(raw || {}) };
  if (p.title && !p.titleLine1) {
    const parts = String(p.title).split(/<br\s*\/?>/i);
    p.titleLine1 = parts[0].replace(/<[^>]+>/g, '').trim();
    p.titleLine2 = (parts[1] || '').replace(/<[^>]+>/g, '').trim();
    delete p.title;
  }
  const fallbacks = {
    Midrange: { tabSubtitle: 'Thoughtful value', imageNote: 'Time to unwind between game drives' },
    Comfort: { tabSubtitle: 'The perfect balance', imageNote: 'A little space to take it all in' },
    Luxury: { tabSubtitle: 'Elevated experiences', imageNote: 'Special experiences, by arrangement' },
  };
  const fb = fallbacks[levelKey] || {};
  if (!p.tabSubtitle) p.tabSubtitle = fb.tabSubtitle || '';
  if (!p.imageNote) p.imageNote = fb.imageNote || '';
  return p;
}

onMounted(async () => {
  const res = await getListWithSort(COLLECTIONS.comfortLevels, 1, 10, { sort: 'sortOrder' });
  rows.value = res.items;
  for (const row of res.items) {
    payloads[row.id] = hydratePayload(row.payload, row.levelKey || row.title);
    bulletText[row.id] = bulletsToText(payloads[row.id].bullets);
  }
});

async function save(row) {
  const payload = { ...payloads[row.id], bullets: textToBullets(bulletText[row.id]) };
  delete payload.title;
  await pb.collection(COLLECTIONS.comfortLevels).update(row.id, { payload });
  payloads[row.id] = payload;
  toast.add({ severity: 'success', summary: `${row.title} saved`, life: 2000 });
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
.page-hint {
  margin-bottom: 1rem;
}
</style>
