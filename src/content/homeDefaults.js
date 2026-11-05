/** Default homepage CMS payload — keep in sync with dashboard page editor fields. */

export const homePageDefaults = {
  hero: {
    eyebrow: 'TANZANIA, YOUR WAY',
    titleLine1: 'Your Tanzania.',
    titleLine2: 'Wildly personal.',
    text: 'Extraordinary wildlife. Welcoming stays.\nThoughtfully planned around you.',
    image: 'hero.webp',
    imageAlt: 'Wildebeest and zebras on Tanzania’s plains',
    ctaPrimary: 'Explore our safaris',
    ctaPrimaryLink: 'safaris',
    ctaSecondary: 'Create your journey',
    ctaSecondaryLink: 'plan',
    bottomLeft: 'Locally owned · Arusha, Tanzania',
    bottomRight: 'Dream. Discover. Explore.',
    scrollLabel: 'Discover Mambeu',
  },
  finder: {
    eyebrow: 'FIND YOUR STARTING POINT',
    title: 'Where will\nyour story go?',
    styleLabel: 'Your comfort level',
    durationLabel: 'Time to explore',
    interestLabel: 'What draws you here?',
    submitLabel: 'Find my safari',
  },
  welcome: {
    eyebrow: 'WELCOME TO MAMBEU',
    titleHtml:
      'Big on adventure.<br>Thoughtful about<br><span class="accent">everything else.</span>',
    lead: 'You don’t need the most expensive safari to have an extraordinary one.',
    body: 'You need the right route, a knowledgeable guide and a welcoming place to end the day. From our home in Arusha, we bring these details together in journeys made around you.',
    linkText: 'Meet the people behind your journey',
    linkPath: 'about',
    point1Title: 'Local roots',
    point1Text: 'Locally owned in Tanzania',
    point2Title: 'Your pace',
    point2Text: 'Personalised routes & stays',
  },
  curated: {
    eyebrow: 'A FEW GOOD PLACES TO BEGIN',
    title: 'Journeys with\nsomething more.',
    tabs: 'Comfort,Luxury,Camping',
    collectionLinkText: 'View the full collection',
    featuredComfortTourIds: '302,298,291',
  },
  comfortSection: {
    eyebrow: 'YOUR SAFARI. YOUR KIND OF STAY.',
    title: 'Comfort is personal.\nLet’s find yours.',
    intro: 'Midrange and comfort at our heart.\nLuxury when you want a little more.',
  },
  placesSection: {
    eyebrow: 'DESTINATIONS',
    title: 'Places that stay with you.',
    prevLabel: 'Back',
    nextLabel: 'Next',
    tailText: 'Connect your favourites into one personal journey.',
    tailLinkText: 'Explore all destinations',
  },
  beyond: {
    eyebrow: 'MAKE ROOM FOR A DIFFERENT KIND OF WILD',
    title: 'Beyond the safari.',
    intro: 'Your adventure doesn’t have to end\nwhen the game drive does.',
    card1Image: 'zanzibar.webp',
    card1ImageAlt: 'Zanzibar coastline and Indian Ocean',
    card1Link: 'zanzibar',
    card1Eyebrow: 'ISLAND TIME',
    card1Title: 'Wildlife to\nwhite sands.',
    card1Text: 'Unwind in Zanzibar.',
    card2Image: 'mountain.webp',
    card2ImageAlt: 'Kilimanjaro mountain camp',
    card2Link: 'kilimanjaro',
    card2Eyebrow: 'A HIGHER PERSPECTIVE',
    card2Title: 'Take the\nhigher road.',
    card2Text: 'Your Kilimanjaro adventure.',
    card3Image: 'tour-296.webp',
    card3ImageAlt: 'A cultural visit with local people in Tanzania',
    card3Link: 'experiences',
    card3Eyebrow: 'HUMAN CONNECTIONS',
    card3Title: 'Meet another\nside of Tanzania.',
    card3Text: 'Culture, stories and shared moments.',
  },
  localStory: {
    photo: 'team.webp',
    photoAlt: 'Mambeu guests beside the branded safari vehicle',
    photoCaption: 'OUR HOME. YOUR ADVENTURE.',
    eyebrow: 'THE PEOPLE MAKE THE DIFFERENCE',
    title: 'Good safaris begin\nwith good people.',
    body1:
      'Mambeu is locally owned and operated. We share Tanzania through expertly guided journeys, personal attention and a commitment to responsible travel.',
    body2:
      'From your first ideas to the route, stays and special moments, we bring local knowledge to the details that matter.',
    buttonText: 'Get to know Mambeu',
    buttonLink: 'about',
  },
  faqSection: {
    eyebrow: 'GOOD TO KNOW',
    title: 'Questions travellers ask us',
    linkText: 'All planning questions',
    faqCount: '3',
  },
};

export function mergeHomeContent(cmsHome) {
  const src = cmsHome && typeof cmsHome === 'object' ? cmsHome : {};
  const out = {};
  for (const [key, defaults] of Object.entries(homePageDefaults)) {
    out[key] = { ...defaults, ...(src[key] || {}) };
  }
  return out;
}

export function splitLines(text) {
  return String(text || '')
    .split('\n')
    .filter((line, i, arr) => line.length > 0 || arr.length === 1);
}
