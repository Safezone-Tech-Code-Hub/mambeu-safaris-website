import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AppLayout from '@/layouts/AppLayout.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { public: true },
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', name: 'overview', component: () => import('@/views/OverviewView.vue') },
      { path: 'pages/home', name: 'page-home', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'home', title: 'Homepage' } },
      { path: 'pages/about', name: 'page-about', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'about', title: 'About page' } },
      { path: 'pages/comfort', name: 'page-comfort', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'comfort', title: 'Comfort page' } },
      { path: 'pages/destinations', name: 'page-destinations', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'destinations', title: 'Destinations hub' } },
      { path: 'pages/experiences', name: 'page-experiences', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'experiences', title: 'Experiences page' } },
      { path: 'pages/travel-guide', name: 'page-travel-guide', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'travel_guide', title: 'Travel guide' } },
      { path: 'pages/plan', name: 'page-plan', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'plan', title: 'Plan your trip' } },
      { path: 'pages/kilimanjaro', name: 'page-kilimanjaro', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'kilimanjaro', title: 'Kilimanjaro' } },
      { path: 'pages/zanzibar', name: 'page-zanzibar', component: () => import('@/views/pages/PageEditorView.vue'), props: { pageKey: 'zanzibar', title: 'Zanzibar' } },
      { path: 'pages/site-chrome', name: 'page-site-chrome', component: () => import('@/views/pages/SiteChromeEditorView.vue') },
      { path: 'content/tours', name: 'tours', component: () => import('@/views/content/ToursListView.vue') },
      { path: 'content/tours/:id', name: 'tour-edit', component: () => import('@/views/content/TourEditView.vue') },
      { path: 'content/places', name: 'places', component: () => import('@/views/content/PlacesListView.vue') },
      { path: 'content/places/:id', name: 'place-edit', component: () => import('@/views/content/PlaceEditView.vue') },
      { path: 'content/experiences', name: 'experiences', component: () => import('@/views/content/ExperiencesListView.vue') },
      { path: 'content/comfort-levels', name: 'comfort-levels', component: () => import('@/views/content/ComfortLevelsView.vue') },
      { path: 'content/faq', name: 'faq', component: () => import('@/views/content/FaqListView.vue') },
      { path: 'leads', name: 'leads', component: () => import('@/views/leads/EnquiriesListView.vue') },
      { path: 'leads/:id', name: 'lead-detail', component: () => import('@/views/leads/EnquiryDetailView.vue') },
      { path: 'settings', name: 'settings', component: () => import('@/views/SettingsView.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.public) return true;
  if (!auth.isLoggedIn) return { name: 'login', query: { redirect: to.fullPath } };
  return true;
});

export default router;
