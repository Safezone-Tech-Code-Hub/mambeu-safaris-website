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

export const siteChromeDefault = {
  siteName: 'Mambeu Tanzania Safaris',
  publicSiteUrl: 'https://new-mambeu.schoolhub.space',
  email: 'info@mambeusafaris.com',
  phone: '+255 796 086 799',
  phoneE164: '255796086799',
  whatsapp: '255796086799',
  officeLocation: 'Arusha, Tanzania',
  officeHours: '08:00–19:30',
  footerTagline: 'Dream · Discover · Explore',
  finalInviteEyebrow: 'TELL US WHAT YOU’RE DREAMING OF',
  finalInviteTitle: 'Your next chapter\nstarts in Tanzania.',
  finalInviteText: 'A few ideas are all we need. Let’s shape a journey that feels like you.',
};

export const pageRegistry = [
  { pageKey: 'home', label: 'Homepage', content: homePageDefaults },
  { pageKey: 'about', label: 'About page', content: aboutPageDefaults },
  { pageKey: 'comfort', label: 'Comfort page', content: comfortPageDefaults },
  { pageKey: 'destinations', label: 'Destinations hub', content: destinationsPageDefaults },
  { pageKey: 'experiences', label: 'Experiences page', content: experiencesPageDefaults },
  { pageKey: 'travel_guide', label: 'Travel guide & FAQs', content: travelGuidePageDefaults },
  { pageKey: 'plan', label: 'Plan your trip', content: planPageDefaults },
  { pageKey: 'safaris', label: 'Safari collection', content: safarisPageDefaults },
  { pageKey: 'kilimanjaro', label: 'Kilimanjaro page', content: thematicPageDefaults.kilimanjaro },
  { pageKey: 'zanzibar', label: 'Zanzibar page', content: thematicPageDefaults.zanzibar },
  { pageKey: 'place_detail', label: 'Destination place template', content: placeDetailDefaults },
  { pageKey: 'journey_detail', label: 'Safari journey template', content: journeyDetailDefaults },
  { pageKey: 'not_found', label: '404 page', content: notFoundPageDefaults },
  { pageKey: 'site_chrome', label: 'Header & footer', content: siteChromeDefault },
];
