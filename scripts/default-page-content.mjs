/** Default CMS page payloads (editable in dashboard). */
import { aboutPageDefaults } from '../src/content/aboutDefaults.js';
import { comfortPageDefaults } from '../src/content/comfortDefaults.js';
import { destinationsPageDefaults } from '../src/content/destinationsDefaults.js';
import { experiencesPageDefaults } from '../src/content/experiencesDefaults.js';
import { homePageDefaults } from '../src/content/homeDefaults.js';

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

export const homePageDefault = homePageDefaults;

export const aboutPageDefault = aboutPageDefaults;

export const planPageDefault = {
  head: {
    label: 'START THE CONVERSATION',
    title: 'Let’s plan your safari.',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
};

export const thematicDefaults = {
  kilimanjaro: {
    label: 'MOUNTAIN ADVENTURES',
    title: 'Take the<br>higher road.',
    text: 'A Kilimanjaro adventure with personal preparation, local guiding and support along the way.',
    photo: 'mountain.webp',
    blocks: [
      ['Prepare well', 'Share your hiking experience, fitness and questions with our team.'],
      ['Choose your route', 'Discuss route options, duration, equipment and preparation before confirming your climb.'],
      ['Keep exploring', 'Add a wildlife safari or a Zanzibar stay to round off your adventure.'],
    ],
  },
  zanzibar: {
    label: 'SAFARI & ISLAND ESCAPES',
    title: 'From wild plains<br>to white sands.',
    text: 'Pair your wildlife adventure with Zanzibar’s beaches, historic Stone Town and the Indian Ocean.',
    photo: 'zanzibar.webp',
    blocks: [
      ['Time by the sea', 'Unhurried days, warm waters and accommodation matched to your comfort level.'],
      ['Culture & history', 'Explore Stone Town, local flavours and the island’s spice heritage.'],
      ['Ocean experiences', 'Ask about snorkelling, diving and excursions for your travel dates.'],
    ],
  },
};

export const pageRegistry = [
  { pageKey: 'home', label: 'Homepage', content: homePageDefault },
  { pageKey: 'about', label: 'About page', content: aboutPageDefault },
  { pageKey: 'comfort', label: 'Comfort page', content: comfortPageDefaults },
  { pageKey: 'destinations', label: 'Destinations hub', content: destinationsPageDefaults },
  { pageKey: 'experiences', label: 'Experiences page', content: experiencesPageDefaults },
  { pageKey: 'travel_guide', label: 'Travel guide & FAQs', content: { head: { label: 'PLAN WITH CONFIDENCE', title: 'Travel guide & FAQs', text: '' } } },
  { pageKey: 'plan', label: 'Plan your trip', content: planPageDefault },
  { pageKey: 'kilimanjaro', label: 'Kilimanjaro page', content: thematicDefaults.kilimanjaro },
  { pageKey: 'zanzibar', label: 'Zanzibar page', content: thematicDefaults.zanzibar },
  { pageKey: 'site_chrome', label: 'Header & footer', content: siteChromeDefault },
];
