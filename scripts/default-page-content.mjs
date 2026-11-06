/** Default CMS page payloads (editable in dashboard). */

export const siteChromeDefault = {
  siteName: 'Mambeu Tanzania Safaris',
  publicSiteUrl: 'https://new-mambeu.schoolhub.space',
  email: 'info@mambeusafaris.com',
  phone: '+255 796 086 799',
  phoneE164: '255796086799',
  whatsapp: '255796086799',
  officeLocation: 'Arusha, Tanzania',
  officeHours: '08:00 to 18:00',
  footerTagline: 'Dream · Discover · Explore',
  finalInviteEyebrow: 'TELL US WHAT YOU’RE DREAMING OF',
  finalInviteTitle: 'Your next chapter\nstarts in Tanzania.',
  finalInviteText: 'A few ideas are all we need. Let’s shape a journey that feels like you.',
};

export const homePageDefault = {
  hero: {
    eyebrow: 'Arusha · Northern Tanzania',
    titleLine1: 'Wildlife safaris',
    titleLine2: 'across northern Tanzania.',
    text: 'Routes and lodges quoted before you commit.',
    image: 'hero.webp',
    ctaPrimary: 'Plan with us',
  },
  finder: {
    eyebrow: 'Find your starting point',
    title: 'Three filters.\nMatching safaris.',
    lead: 'Pick a style, trip length, and focus—we’ll show what fits.',
    styleLabel: 'Safari style',
    durationLabel: 'Trip length',
    interestLabel: 'Main interest',
  },
  featuredComfortIds: [302, 298, 291, 293, 294, 64],
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
  // Legacy head keys kept for existing CMS / dashboard editors.
  head: {
    label: 'START THE CONVERSATION',
    title: 'Let’s plan your safari.',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
  hero: {
    eyebrow: 'Start the conversation',
    titleLine1: 'Let’s plan',
    titleLine2: 'your safari.',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
  form: {
    title: 'Tell us about your trip',
    requiredNote: 'Fields marked * are required. Everything else is optional.',
    groups: { you: 'About you', trip: 'Your trip', interests: 'What you have in mind' },
    chipsTitle: 'You’re asking about',
    submitNote:
      'Review your enquiry below, then send it through WhatsApp or your email app. Nothing is sent until you do.',
    replyTime: '',
    placeholders: {
      name: 'Your full name',
      email: 'you@example.com',
      phone: '+255 …  (include your country code)',
      country: 'e.g. United Kingdom',
      journey: 'A journey name, or a park you have in mind',
      message:
        'Parks you would like to see, children’s ages, special occasions, anything we should know',
    },
    hints: {
      phone: 'We can reply on WhatsApp if you add your number.',
      date: 'An approximate date is fine. Leave it blank if you are still deciding.',
    },
  },
  aside: {
    title: 'No perfect plan needed.',
    text: 'Share what you know. We’ll help with the rest.',
    talkLabel: 'Prefer to talk?',
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
