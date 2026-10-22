<template>
  <div class="page-header">
    <div>
      <h1>Overview</h1>
      <p class="hint">A quick snapshot of new leads and drafts.</p>
    </div>
  </div>
  <div class="field-grid two">
    <Card>
      <template #title>New enquiries</template>
      <template #content>
        <p class="stat">{{ counts.newEnquiries }}</p>
        <Button label="Open inbox" link @click="$router.push({ name: 'leads' })" />
      </template>
    </Card>
    <Card>
      <template #title>Draft tours</template>
      <template #content>
        <p class="stat">{{ counts.draftTours }}</p>
        <Button label="Safari tours" link @click="$router.push({ name: 'tours' })" />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import { COLLECTIONS, pb } from '@/lib/pb';

const counts = reactive({ newEnquiries: 0, draftTours: 0 });

onMounted(async () => {
  try {
    const [enq, tours] = await Promise.all([
      pb.collection(COLLECTIONS.enquiries).getList(1, 1, { filter: 'status = "new"' }),
      pb.collection(COLLECTIONS.tours).getList(1, 1, { filter: 'status = "draft"' }),
    ]);
    counts.newEnquiries = enq.totalItems;
    counts.draftTours = tours.totalItems;
  } catch {
    /* overview is best-effort */
  }
});
</script>

<style scoped>
.stat {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
}
</style>
