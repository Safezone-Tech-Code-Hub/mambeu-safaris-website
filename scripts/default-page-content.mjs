/** Default CMS page payloads (editable in dashboard). */
import { aboutPageDefaults } from '../src/content/aboutDefaults.js';
import { comfortPageDefaults } from '../src/content/comfortDefaults.js';
import { destinationsPageDefaults } from '../src/content/destinationsDefaults.js';
import { experiencesPageDefaults } from '../src/content/experiencesDefaults.js';
import { homePageDefaults } from '../src/content/homeDefaults.js';
import { journeyDetailDefaults } from '../src/content/journeyDefaults.js';
import { notFoundPageDefaults } from '../src/content/notFoundDefaults.js';
import { placeDetailDefaults } from '../src/content/placeDefaults.js';
import { planPageDefaults } from '../src/content/planDefaults.js';
import { safarisPageDefaults } from '../src/content/safarisDefaults.js';
import { thematicPageDefaults } from '../src/content/thematicDefaults.js';
import { travelGuidePageDefaults } from '../src/content/travelGuideDefaults.js';
import { CONTENT_SCHEMA } from '../src/content/schema.js';
import { siteChromeDefaults } from '../src/content/siteChromeDefaults.js';

export const siteChromeDefault = {
  siteName: 'Mambeu Tanzania Safaris',
  publicSiteUrl: 'https://new-mambeu.schoolhub.space',
  ...siteChromeDefaults,
};

/** Seeded pages count as current-schema content, so the site uses them as saved. */
const current = (content) => ({ ...content, _schema: CONTENT_SCHEMA });

export const pageRegistry = [
  { pageKey: 'home', label: 'Homepage', content: current(homePageDefaults) },
  { pageKey: 'about', label: 'About page', content: current(aboutPageDefaults) },
  { pageKey: 'comfort', label: 'Comfort page', content: current(comfortPageDefaults) },
  { pageKey: 'destinations', label: 'Destinations hub', content: current(destinationsPageDefaults) },
  { pageKey: 'experiences', label: 'Experiences page', content: current(experiencesPageDefaults) },
  { pageKey: 'travel_guide', label: 'Travel guide & FAQs', content: current(travelGuidePageDefaults) },
  { pageKey: 'plan', label: 'Plan your trip', content: current(planPageDefaults) },
  { pageKey: 'safaris', label: 'Safari collection', content: current(safarisPageDefaults) },
  { pageKey: 'kilimanjaro', label: 'Kilimanjaro page', content: current(thematicPageDefaults.kilimanjaro) },
  { pageKey: 'zanzibar', label: 'Zanzibar page', content: current(thematicPageDefaults.zanzibar) },
  { pageKey: 'place_detail', label: 'Destination place template', content: current(placeDetailDefaults) },
  { pageKey: 'journey_detail', label: 'Safari journey template', content: current(journeyDetailDefaults) },
  { pageKey: 'not_found', label: '404 page', content: current(notFoundPageDefaults) },
  { pageKey: 'site_chrome', label: 'Header & footer', content: siteChromeDefault },
];
