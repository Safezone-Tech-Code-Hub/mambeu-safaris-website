<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <div class="brand">
        <img src="/mambeu-logo.webp" alt="Mambeu Tanzania Safaris" />
        <span>MANAGE</span>
      </div>
      <PanelMenu :model="menuItems" class="sidebar-menu" />
    </aside>
    <div class="app-main">
      <header class="app-topbar">
        <div>
          <strong>Mambeu Safaris</strong>
          <p class="hint">Content & enquiries</p>
        </div>
        <div class="flex gap-2 align-items-center">
          <Button label="View website" icon="pi pi-external-link" severity="secondary" outlined @click="openSite" />
          <Button label="Publish website" icon="pi pi-cloud-upload" @click="publishSite" :loading="publishing" />
          <Button icon="pi pi-sign-out" severity="secondary" text @click="onLogout" v-tooltip.bottom="'Sign out'" />
        </div>
      </header>
      <main class="app-content">
        <RouterView />
      </main>
    </div>
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PanelMenu from 'primevue/panelmenu';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useAuthStore } from '@/stores/auth';
import { getPublicSiteUrl } from '@/lib/pb';

const router = useRouter();
const auth = useAuthStore();
const toast = useToast();
const confirm = useConfirm();
const publishing = ref(false);

const menuItems = [
  {
    label: 'Overview',
    icon: 'pi pi-home',
    command: () => router.push({ name: 'overview' }),
  },
  {
    label: 'Pages',
    icon: 'pi pi-file',
    items: [
      { label: 'Homepage', command: () => router.push({ name: 'page-home' }) },
      { label: 'About', command: () => router.push({ name: 'page-about' }) },
      { label: 'Comfort', command: () => router.push({ name: 'page-comfort' }) },
      { label: 'Destinations hub', command: () => router.push({ name: 'page-destinations' }) },
      { label: 'Experiences page', command: () => router.push({ name: 'page-experiences' }) },
      { label: 'Travel guide', command: () => router.push({ name: 'page-travel-guide' }) },
      { label: 'Plan your trip', command: () => router.push({ name: 'page-plan' }) },
      { label: 'Kilimanjaro', command: () => router.push({ name: 'page-kilimanjaro' }) },
      { label: 'Zanzibar', command: () => router.push({ name: 'page-zanzibar' }) },
      { label: 'Header & footer', command: () => router.push({ name: 'page-site-chrome' }) },
    ],
  },
  {
    label: 'Content',
    icon: 'pi pi-database',
    items: [
      { label: 'Safari tours', command: () => router.push({ name: 'tours' }) },
      { label: 'Places', command: () => router.push({ name: 'places' }) },
      { label: 'Experiences', command: () => router.push({ name: 'experiences' }) },
      { label: 'Comfort levels', command: () => router.push({ name: 'comfort-levels' }) },
      { label: 'FAQ items', command: () => router.push({ name: 'faq' }) },
    ],
  },
  {
    label: 'Leads',
    icon: 'pi pi-inbox',
    command: () => router.push({ name: 'leads' }),
  },
  {
    label: 'Settings',
    icon: 'pi pi-cog',
    command: () => router.push({ name: 'settings' }),
  },
];

function openSite() {
  window.open(getPublicSiteUrl(), '_blank', 'noopener');
}

async function publishSite() {
  confirm.require({
    message: 'Rebuild the public website with the latest published content from PocketBase?',
    header: 'Publish website',
    icon: 'pi pi-cloud-upload',
    accept: async () => {
      publishing.value = true;
      const hook = import.meta.env.VITE_PUBLISH_WEBHOOK_URL;
      try {
        if (hook) {
          const res = await fetch(hook, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_PUBLISH_WEBHOOK_SECRET || ''}`,
            },
            body: JSON.stringify({ source: 'mambeu-dashboard' }),
          });
          if (!res.ok) throw new Error(`Publish hook returned ${res.status}`);
          toast.add({ severity: 'success', summary: 'Publish started', life: 4000 });
        } else {
          toast.add({
            severity: 'info',
            summary: 'Publish hook not configured',
            detail: 'On the VPS run: docker compose up -d --build (see Settings).',
            life: 6000,
          });
        }
      } catch (e) {
        toast.add({ severity: 'error', summary: 'Publish failed', detail: e.message, life: 5000 });
      } finally {
        publishing.value = false;
      }
    },
  });
}

function onLogout() {
  auth.logout();
  router.push({ name: 'login' });
}
</script>

<style scoped>
.sidebar-menu {
  border: none;
  background: transparent;
  flex: 1;
  overflow: auto;
}
:deep(.p-panelmenu-panel) {
  border: none;
  background: transparent;
}
:deep(.p-panelmenu-header-content),
:deep(.p-panelmenu-item-content) {
  background: transparent;
  color: #fff;
  border: none;
}
:deep(.p-panelmenu-item-link) {
  color: rgba(255, 255, 255, 0.92);
}
</style>
