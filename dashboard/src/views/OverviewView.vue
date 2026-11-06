<template>
  <div>
    <section class="stats-grid">
      <article class="stat-card">
        <div class="stat-card-top">
          <span class="stat-icon stat-icon-blue"><i class="pi pi-inbox"></i></span>
          <span v-if="counts.newEnquiries > 0" class="stat-badge stat-badge-warn">New</span>
          <span v-else class="stat-badge stat-badge-muted">—</span>
        </div>
        <p class="stat-label">New enquiries</p>
        <p class="stat-value">{{ counts.newEnquiries }}</p>
      </article>
      <article class="stat-card">
        <div class="stat-card-top">
          <span class="stat-icon stat-icon-amber"><i class="pi pi-database"></i></span>
          <span class="stat-badge stat-badge-info">Draft</span>
        </div>
        <p class="stat-label">Draft tours</p>
        <p class="stat-value">{{ counts.draftTours }}</p>
      </article>
      <article class="stat-card">
        <div class="stat-card-top">
          <span class="stat-icon stat-icon-red"><i class="pi pi-images"></i></span>
          <span class="stat-badge stat-badge-success">Library</span>
        </div>
        <p class="stat-label">Media files</p>
        <p class="stat-value">{{ counts.mediaFiles }}</p>
      </article>
      <article class="stat-card">
        <div class="stat-card-top">
          <span class="stat-icon stat-icon-violet"><i class="pi pi-file"></i></span>
          <span class="stat-badge stat-badge-success">Live</span>
        </div>
        <p class="stat-label">Published pages</p>
        <p class="stat-value">{{ counts.publishedPages }}</p>
      </article>
    </section>

    <div class="overview-body">
      <div class="overview-primary">
        <div class="page-card overview-section">
          <div class="section-head">
            <h2>Quick actions</h2>
            <button type="button" class="text-link-btn" @click="$router.push({ name: 'leads' })">View leads</button>
          </div>
          <ul class="action-list">
            <li>
              <RouterLink class="action-row" :to="{ name: 'leads' }">
                <span class="action-id">Inbox</span>
                <span class="action-desc">Review new safari planning requests</span>
                <span class="action-cta">Open →</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink class="action-row" :to="{ name: 'tours' }">
                <span class="action-id">Tours</span>
                <span class="action-desc">Edit itineraries, pricing and photos</span>
                <span class="action-cta">Safari tours →</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink class="action-row" :to="{ name: 'page-home' }">
                <span class="action-id">Pages</span>
                <span class="action-desc">Update homepage and thematic copy</span>
                <span class="action-cta">Homepage →</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <div class="page-card overview-section">
          <div class="section-head">
            <h2>Activity mix</h2>
            <span class="hint">Placeholder trend — counts from your CMS</span>
          </div>
          <div class="bar-chart" role="img" aria-label="Relative activity by area">
            <div v-for="(b, i) in barHeights" :key="i" class="bar-chart-col">
              <div class="bar-track">
                <div class="bar-fill" :style="{ height: b.p + '%' }"></div>
              </div>
              <span class="bar-label">{{ b.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <aside class="overview-widgets">
        <div class="page-card widget-card">
          <h3 class="widget-title">Workflow</h3>
          <p class="widget-quote">“Publish after content changes so the public site pulls the latest copy from PocketBase.”</p>
          <div class="widget-stars" aria-hidden="true">★★★★★</div>
        </div>

        <div class="dark-action-card">
          <span class="widget-pill">Tips</span>
          <h3>Publish to production</h3>
          <p>On the server, rebuild the static site so visitors see updates. The dashboard can trigger a webhook if configured.</p>
          <RouterLink class="dark-card-cta" :to="{ name: 'settings' }">Settings &amp; VPS notes</RouterLink>
        </div>

        <div class="page-card widget-card account-card">
          <h3 class="widget-title">Account</h3>
          <ul class="account-list">
            <li>
              <span class="account-icon ok"><i class="pi pi-check"></i></span>
              <div>
                <strong>PocketBase</strong>
                <span class="hint">Connected · manage content in real time</span>
              </div>
            </li>
            <li>
              <span class="account-icon ok"><i class="pi pi-shield"></i></span>
              <div>
                <strong>Staff session</strong>
                <span class="hint">Secure sign-in via PocketBase Auth</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { COLLECTIONS, pb } from '@/lib/pb';

const counts = reactive({
  newEnquiries: 0,
  draftTours: 0,
  mediaFiles: 0,
  publishedPages: 0,
});

const barHeights = [
  { label: 'Leads', p: 72 },
  { label: 'Tours', p: 88 },
  { label: 'Pages', p: 64 },
  { label: 'Media', p: 52 },
  { label: 'FAQ', p: 38 },
  { label: 'Team', p: 45 },
];

onMounted(async () => {
  try {
    const [enq, tours, media, pages] = await Promise.all([
      pb.collection(COLLECTIONS.enquiries).getList(1, 1, { filter: 'status = "new"' }),
      pb.collection(COLLECTIONS.tours).getList(1, 1, { filter: 'status = "draft"' }),
      pb.collection(COLLECTIONS.media).getList(1, 1),
      pb.collection(COLLECTIONS.pageContent).getList(1, 1, { filter: 'status = "published"' }),
    ]);
    counts.newEnquiries = enq.totalItems;
    counts.draftTours = tours.totalItems;
    counts.mediaFiles = media.totalItems;
    counts.publishedPages = pages.totalItems;
  } catch {
    /* overview is best-effort */
  }
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: var(--radius-2xl, 16px);
  padding: 1.5rem;
}

.stat-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-xl, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.stat-icon-blue {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}
.stat-icon-amber {
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
}
.stat-icon-red {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.stat-icon-violet {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.stat-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid transparent;
}

.stat-badge-warn {
  background: #fff7ed;
  color: #c2410c;
  border-color: #fed7aa;
}
.stat-badge-info {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}
.stat-badge-success {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}
.stat-badge-muted {
  background: #f1f5f9;
  color: #64748b;
  border-color: #e2e8f0;
}

.stat-label {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary, #64748b);
  font-weight: 500;
}

.stat-value {
  margin: 0.35rem 0 0;
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #0f172a);
  letter-spacing: -0.02em;
}

.overview-body {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .overview-body {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
}

.overview-primary {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.overview-section h2 {
  margin: 0;
  font-size: 1.125rem;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.text-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand, #ef4444);
  cursor: pointer;
  transition: opacity 0.2s var(--transition-hover, cubic-bezier(0.4, 0, 0.2, 1));
}

.text-link-btn:hover {
  opacity: 0.85;
}

.action-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.action-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border, #e2e8f0);
  cursor: pointer;
  transition: background 0.2s var(--transition-hover, cubic-bezier(0.4, 0, 0.2, 1));
  border-radius: var(--radius-xl, 12px);
  margin: 0 -0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.action-row:last-child {
  border-bottom: none;
}

.action-row:hover {
  background: #f8fafc;
}

.action-id {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted, #94a3b8);
}

.action-desc {
  font-size: 0.875rem;
  color: var(--text-primary, #0f172a);
}

.action-cta {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--brand, #ef4444);
  white-space: nowrap;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.75rem;
  height: 16rem;
  padding-top: 0.5rem;
}

.bar-chart-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.bar-track {
  position: relative;
  width: 100%;
  height: 12rem;
  background: #f1f5f9;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #f87171 0%, #ef4444 100%);
  border-radius: 0.5rem 0.5rem 0 0;
  transition: transform 0.3s var(--transition-hover, cubic-bezier(0.4, 0, 0.2, 1));
  transform-origin: bottom;
}

.bar-chart-col:hover .bar-fill {
  transform: scaleY(1.05);
}

.bar-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted, #94a3b8);
  text-align: center;
}

.overview-widgets {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.widget-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.widget-title {
  font-size: 1rem !important;
}

.widget-quote {
  margin: 0;
  font-size: 0.8125rem;
  font-style: italic;
  line-height: 1.55;
  color: var(--text-secondary, #64748b);
}

.widget-stars {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  color: #eab308;
}

.widget-pill {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  margin-bottom: 0.75rem;
}

.account-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.account-list li {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border, #e2e8f0);
}

.account-list li:last-child {
  border-bottom: none;
}

.account-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.85rem;
}

.account-icon.ok {
  background: #f0fdf4;
  color: #16a34a;
}

.account-list strong {
  display: block;
  font-size: 0.8125rem;
  margin-bottom: 0.15rem;
}

.account-list .hint {
  display: block;
  margin: 0;
  font-size: 0.7rem;
}
</style>
