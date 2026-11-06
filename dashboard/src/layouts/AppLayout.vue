<template>
  <div class="app-shell">
    <aside class="app-sidebar">
      <div class="sidebar-brand">
        <div class="sidebar-brand-row">
          <div class="sidebar-brand-mark" aria-hidden="true">
            <i class="pi pi-compass"></i>
          </div>
          <div class="sidebar-brand-text">
            <strong>Mambeu Manage</strong>
            <span>Content &amp; enquiries</span>
          </div>
        </div>
      </div>
      <nav class="sidebar-scroll" aria-label="Main">
        <button type="button" class="sidebar-link" :class="{ 'sidebar-link-active': isRoute('overview') }" @click="go('overview')">
          <i class="pi pi-home"></i>
          Overview
        </button>

        <div class="sidebar-section-label">Content</div>
        <button
          type="button"
          class="sidebar-link sidebar-toggle"
          :aria-expanded="pagesOpen"
          @click="pagesOpen = !pagesOpen"
        >
          <span style="display: flex; align-items: center; gap: 0.65rem">
            <i class="pi pi-file"></i>
            Pages
          </span>
          <i class="pi pi-chevron-down sidebar-chevron"></i>
        </button>
        <div v-show="pagesOpen" class="sidebar-nested">
          <button
            v-for="item in navPages"
            :key="item.to"
            type="button"
            class="sidebar-link"
            :class="{ 'sidebar-link-active': isRoute(item.to) }"
            @click="go(item.to)"
          >
            {{ item.label }}
          </button>
        </div>

        <button
          type="button"
          class="sidebar-link sidebar-toggle"
          :aria-expanded="collectionsOpen"
          @click="collectionsOpen = !collectionsOpen"
        >
          <span style="display: flex; align-items: center; gap: 0.65rem">
            <i class="pi pi-database"></i>
            Library
          </span>
          <i class="pi pi-chevron-down sidebar-chevron"></i>
        </button>
        <div v-show="collectionsOpen" class="sidebar-nested">
          <button
            v-for="item in navCollections"
            :key="item.to"
            type="button"
            class="sidebar-link"
            :class="{ 'sidebar-link-active': isRoute(item.to) }"
            @click="go(item.to)"
          >
            {{ item.label }}
          </button>
        </div>

        <div class="sidebar-section-label">Operations</div>
        <button type="button" class="sidebar-link" :class="{ 'sidebar-link-active': isRoute('media') }" @click="go('media')">
          <i class="pi pi-images"></i>
          Media
        </button>
        <button type="button" class="sidebar-link" :class="{ 'sidebar-link-active': isRoute('leads') }" @click="go('leads')">
          <i class="pi pi-inbox"></i>
          Leads
        </button>
        <button type="button" class="sidebar-link" :class="{ 'sidebar-link-active': isRoute('settings') }" @click="go('settings')">
          <i class="pi pi-cog"></i>
          Settings
        </button>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-profile">
          <div class="sidebar-profile-avatar">{{ userInitials }}</div>
          <div class="sidebar-profile-text">
            <strong>{{ displayName }}</strong>
            <span>{{ roleLabel }}</span>
          </div>
        </div>
      </div>
    </aside>
    <div class="app-main">
      <header class="app-topbar">
        <div>
          <h1 class="app-topbar-title">{{ headerTitle }}</h1>
          <p class="app-topbar-sub">{{ headerSubtitle }}</p>
        </div>
        <div class="app-topbar-actions">
          <span class="status-pulse" title="Connected to PocketBase">
            <span class="status-pulse-dot" aria-hidden="true"></span>
            Live
          </span>
          <button type="button" class="icon-btn" v-tooltip.bottom="'New enquiries'" aria-label="Notifications" @click="go('leads')">
            <i class="pi pi-bell"></i>
            <span v-if="newEnquiryCount > 0" class="icon-btn-dot" aria-hidden="true"></span>
          </button>
          <a class="btn-help" :href="helpUrl" target="_blank" rel="noopener">Help center</a>
          <Button label="View site" icon="pi pi-external-link" severity="secondary" outlined @click="openSite" />
          <Button label="Publish" icon="pi pi-cloud-upload" @click="publishSite" :loading="publishing" />
          <Button icon="pi pi-sign-out" severity="secondary" text rounded @click="onLogout" v-tooltip.bottom="'Sign out'" aria-label="Sign out" />
        </div>
      </header>
      <main class="app-content">
        <RouterView :key="route.fullPath" />
      </main>
    </div>
    <Toast />
    <ConfirmDialog />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { useAuthStore } from '@/stores/auth';
import { COLLECTIONS, describePbError, getPublicSiteUrl, pb } from '@/lib/pb';

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const toast = useToast();
const confirm = useConfirm();
const publishing = ref(false);
const newEnquiryCount = ref(0);

const pagesOpen = ref(true);
const collectionsOpen = ref(true);

const navPages = [
  { label: 'Homepage', to: 'page-home' },
  { label: 'About', to: 'page-about' },
  { label: 'Comfort', to: 'page-comfort' },
  { label: 'Destinations hub', to: 'page-destinations' },
  { label: 'Experiences page', to: 'page-experiences' },
  { label: 'Travel guide', to: 'page-travel-guide' },
  { label: 'Plan your trip', to: 'page-plan' },
  { label: 'Safari collection', to: 'page-safaris' },
  { label: 'Kilimanjaro', to: 'page-kilimanjaro' },
  { label: 'Zanzibar', to: 'page-zanzibar' },
  { label: 'Place template', to: 'page-place-detail' },
  { label: 'Journey template', to: 'page-journey-detail' },
  { label: '404 page', to: 'page-not-found' },
  { label: 'Header & footer', to: 'page-site-chrome' },
];

const navCollections = [
  { label: 'Safari tours', to: 'tours' },
  { label: 'Places', to: 'places' },
  { label: 'Experiences', to: 'experiences' },
  { label: 'Comfort levels', to: 'comfort-levels' },
  { label: 'FAQ items', to: 'faq' },
];

const pageNames = new Set(navPages.map((x) => x.to));
const collectionNames = new Set(navCollections.map((x) => x.to));

const routeTitles = {
  overview: { title: 'Overview', sub: 'Snapshot of enquiries and drafts across your site.' },
  'page-home': { title: 'Homepage', sub: 'Hero, finder, featured journeys and homepage copy.' },
  'page-about': { title: 'About page', sub: 'Story, values and mission content.' },
  'page-comfort': { title: 'Comfort page', sub: 'How you stay and balance of comfort.' },
  'page-destinations': { title: 'Destinations hub', sub: 'Hub copy and extra tiles.' },
  'page-experiences': { title: 'Experiences page', sub: 'Intro and experience list button text.' },
  'page-travel-guide': { title: 'Travel guide', sub: 'FAQs and planning sidebar copy.' },
  'page-plan': { title: 'Plan your trip', sub: 'Planner form and sidebar wording.' },
  'page-safaris': { title: 'Safari collection', sub: 'Catalogue filters and collection chrome.' },
  'page-kilimanjaro': { title: 'Kilimanjaro', sub: 'Mountain thematic page copy.' },
  'page-zanzibar': { title: 'Zanzibar', sub: 'Island thematic page copy.' },
  'page-place-detail': { title: 'Place template', sub: 'Shared copy for destination place pages.' },
  'page-journey-detail': { title: 'Journey template', sub: 'Labels for safari journey detail pages.' },
  'page-not-found': { title: '404 page', sub: 'Not-found messaging and recovery link.' },
  'page-site-chrome': { title: 'Header & footer', sub: 'Site-wide contact and footer invitation.' },
  tours: { title: 'Safari tours', sub: 'Itineraries, pricing and gallery for each journey.' },
  places: { title: 'Places', sub: 'Destination cards and park copy.' },
  experiences: { title: 'Experiences', sub: 'Rows on the experiences page.' },
  'comfort-levels': { title: 'Comfort levels', sub: 'Midrange, comfort and luxury tab content.' },
  faq: { title: 'FAQ items', sub: 'Questions and answers for the travel guide.' },
  media: { title: 'Media library', sub: 'Uploads used across pages and journeys.' },
  leads: { title: 'Leads', sub: 'Safari planning enquiries from the public site.' },
  settings: { title: 'Settings', sub: 'Dashboard preferences and publish notes.' },
  'tour-edit': { title: 'Edit safari tour', sub: 'Journey content and pricing.' },
  'place-edit': { title: 'Edit place', sub: 'Place card copy and imagery.' },
  'lead-detail': { title: 'Enquiry detail', sub: 'Guest request and internal notes.' },
};

function isRoute(name) {
  return route.name === name;
}

function go(name) {
  router.push({ name });
}

watch(
  () => route.name,
  (n) => {
    if (pageNames.has(n)) pagesOpen.value = true;
    if (collectionNames.has(n)) collectionsOpen.value = true;
  },
  { immediate: true },
);

const headerTitle = computed(() => routeTitles[route.name]?.title || 'Mambeu Manage');
const headerSubtitle = computed(() => routeTitles[route.name]?.sub || 'Content & enquiries');

const displayName = computed(() => {
  const u = auth.user;
  if (!u) return 'Signed in';
  return u.name || u.email || 'Team member';
});

const roleLabel = computed(() => {
  const u = auth.user;
  if (!u) return 'Staff';
  if (u.role === 'admin') return 'Administrator';
  return 'Editor';
});

const userInitials = computed(() => {
  const n = displayName.value.trim();
  if (!n || n === 'Signed in') return 'M';
  const parts = n.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  return n.slice(0, 2).toUpperCase();
});

const helpUrl = computed(() => {
  const base = getPublicSiteUrl().replace(/\/$/, '');
  return `${base}/travel-guide/`;
});

onMounted(async () => {
  try {
    const res = await pb.collection(COLLECTIONS.enquiries).getList(1, 1, { filter: 'status = "new"' });
    newEnquiryCount.value = res.totalItems;
  } catch {
    /* optional */
  }
});

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
        toast.add({ severity: 'error', summary: 'Publish failed', detail: describePbError(e), life: 5000 });
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
