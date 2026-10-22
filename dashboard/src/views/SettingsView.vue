<template>
  <div class="page-header">
    <h1>Settings</h1>
  </div>
  <div class="page-card field-grid">
    <Message severity="info" :closable="false">
      PocketBase URL: {{ pbUrl }} · Public site: {{ siteUrl }}
    </Message>
    <h3>Publish website</h3>
    <p class="hint">
      After editing content, rebuild the static site on the VPS so visitors see changes.
      Set <code>VITE_PUBLISH_WEBHOOK_URL</code> in the dashboard build to call an internal hook,
      or run manually:
    </p>
    <pre class="code">cd ~/production/applications/mambeu-safaris-website
POCKETBASE_URL={{ pbUrl }} docker compose up -d --build</pre>
    <h3>First-time setup</h3>
    <pre class="code">npm run seed:pb</pre>
    <p class="hint">Run from the website repo with PocketBase admin credentials in pocketbase/.env</p>
  </div>
</template>

<script setup>
import Message from 'primevue/message';
import { getPbUrl, getPublicSiteUrl } from '@/lib/pb';

const pbUrl = getPbUrl();
const siteUrl = getPublicSiteUrl();
</script>

<style scoped>
.code {
  background: var(--p-surface-100);
  padding: 1rem;
  border-radius: 8px;
  overflow: auto;
  font-size: 0.85rem;
}
</style>
