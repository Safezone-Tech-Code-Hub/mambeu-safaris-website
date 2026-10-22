/** Default CMS page payloads (editable in dashboard). */

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

export const homePageDefault = {
  hero: {
    eyebrow: 'TANZANIA, YOUR WAY',
    titleLine1: 'Your Tanzania.',
    titleLine2: 'Wildly personal.',
    text: 'Extraordinary wildlife. Welcoming stays.\nThoughtfully planned around you.',
    image: 'hero.webp',
    ctaPrimary: 'Explore safaris',
    ctaSecondary: 'Plan your trip',
  },
  finder: {
    title: 'Find your safari',
    styleLabel: 'Comfort level',
    durationLabel: 'Duration',
    interestLabel: 'What interests you?',
  },
  featuredComfortIds: [302, 298, 291],
  placesSection: {
    eyebrow: 'DESTINATIONS',
    title: 'Places that stay with you.',
  },
  faqSection: {
    eyebrow: 'GOOD TO KNOW',
    title: 'Questions travellers ask us',
  },
};

export const aboutPageDefault = {
  head: {
    label: 'THE PEOPLE BEHIND YOUR JOURNEY',
    title: 'Rooted in Tanzania.<br><span class="accent">Made around you.</span>',
    text: 'Mambeu Safaris is locally owned and based in Arusha, sharing the country we call home through personal wildlife, mountain, cultural and beach journeys.',
  },
  storyPhoto: 'team.webp',
  values: [
    ['01', 'Personal by design', 'Your dates, interests and comfort level shape the journey. We listen first, then help you connect the details.'],
    ['02', 'Rooted in Tanzania', 'Local knowledge helps us choose routes, stays and experiences that work together.'],
    ['03', 'Travel responsibly', 'Respect for nature and communities guides how we share Tanzania with our visitors.'],
  ],
};

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
  { pageKey: 'comfort', label: 'Comfort page', content: { head: { label: 'HOW YOU STAY', title: 'Comfort that fits your journey.', text: '' } } },
  { pageKey: 'destinations', label: 'Destinations hub', content: { head: { label: 'WHERE WE TAKE YOU', title: 'Discover Tanzania’s wild places.', text: '' } } },
  { pageKey: 'experiences', label: 'Experiences page', content: { head: { label: 'BEYOND THE GAME DRIVE', title: 'Experiences to make it yours.', text: '' } } },
  { pageKey: 'travel_guide', label: 'Travel guide & FAQs', content: { head: { label: 'PLAN WITH CONFIDENCE', title: 'Travel guide & FAQs', text: '' } } },
  { pageKey: 'plan', label: 'Plan your trip', content: planPageDefault },
  { pageKey: 'kilimanjaro', label: 'Kilimanjaro page', content: thematicDefaults.kilimanjaro },
  { pageKey: 'zanzibar', label: 'Zanzibar page', content: thematicDefaults.zanzibar },
  { pageKey: 'site_chrome', label: 'Header & footer', content: siteChromeDefault },
];
