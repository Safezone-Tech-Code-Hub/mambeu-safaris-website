/**
 * Homepage content (schema 2). Defaults match what the redesigned homepage shows; the
 * dashboard editor (dashboard/src/lib/pageEditor/home.js) edits these exact paths.
 */
import { carry, mergePage } from './schema.js';

export const homePageDefaults = {
  hero: {
    eyebrow: 'TANZANIA, YOUR WAY.',
    titleLine1: 'Wildlife safaris',
    titleLine2: 'across northern Tanzania.',
    text: 'Extraordinary wildlife. Welcoming stays.\nThoughtfully planned around you.',
    ctaLabel: 'Plan my safari',
    ctaLink: 'plan',
    slides: [
      { image: 'hero.webp', alt: 'Wildebeest and zebras on the Serengeti plains' },
      { image: 'zebras.webp', alt: 'Zebras grazing on the savannah' },
      { image: 'lion.webp', alt: 'Lion on the Tanzanian savannah' },
      { image: 'tour-298.webp', alt: 'Wildlife in the Ngorongoro Crater' },
      { image: 'tour-302.webp', alt: 'Safari landscape in northern Tanzania' },
    ],
  },
  finder: {
    eyebrow: 'FIND YOUR STARTING POINT',
    interestLabel: 'What interests you?',
    styleLabel: 'Comfort level',
    durationLabel: 'Duration',
    submitLabel: 'Show safaris',
  },
  intro: {
    sectionLabel: 'Welcome to Mambeu Safaris',
    location: 'Arusha, Tanzania',
    titleLine1: 'Big on adventure.',
    titleLine2: 'Thoughtful about everything else.',
    lead: 'Locally owned and operated, Mambeu Safaris was founded to share the untamed beauty of Tanzania through authentic, expertly guided adventures.',
    paragraphs: [
      'Based in Arusha at the foot of Mount Meru, we combine intimate knowledge of Tanzania’s wildlife, culture and landscapes with a commitment to sustainable tourism.',
      'Our guides, many born and raised in the shadow of Kilimanjaro, bring decades of combined experience tracking the Big Five, navigating the Serengeti migration and creating personalised itineraries.',
    ],
    pathsLabel: 'Three ways in',
    paths: [
      { label: 'A classic safari', link: 'safaris' },
      { label: 'Climbing Kilimanjaro', link: 'kilimanjaro' },
      { label: 'Zanzibar’s beaches', link: 'zanzibar' },
    ],
    linkText: 'About us',
    linkPath: 'about',
    photoLarge: '/images/intro/people.jpg',
    photoLargeAlt: 'Mambeu guide with travellers beside a safari vehicle',
    photoSmall: '/images/intro/arusha.jpg',
    photoSmallAlt: 'Arusha with Mount Meru in the distance',
    photoCaption: 'Where every journey starts',
    facts: [
      { label: 'Home base', value: 'Arusha, Tanzania', note: '3.3869° S, 36.6830° E' },
      { label: 'Ownership', value: 'Locally owned', note: 'Operated in Tanzania' },
      { label: 'Years guiding', value: '[X]', note: '' },
      { label: 'Travellers hosted', value: '[X]', note: '' },
    ],
  },
  journeys: {
    eyebrow: 'A few good places to begin',
    titleLine1: 'Journeys with',
    titleLine2: 'something more.',
    featuredComfortTourIds: '302,298,291,293,294,64',
    collectionLinkText: 'View the full collection',
    emptyText: 'No journeys in this style yet. Check back soon.',
  },
  howItWorks: {
    eyebrow: 'How it works',
    title: 'From first message to a confirmed route.',
    mobileIntro: 'You get a quoted route and named lodges before you pay anything.',
    ctaText: 'Start with your dates',
    ctaLink: 'plan',
    steps: [
      {
        title: 'Tell us the shape of your trip',
        body: 'Share your dates, group size and the parks you care about. Two minutes is enough, and we confirm what we understood.',
        image: '/images/how/step-1.jpg',
        alt: 'Hot air balloon over the Serengeti at sunrise',
        imagePosition: 'center 45%',
      },
      {
        title: 'Receive a quoted route',
        body: 'We build a route around your pace, with named lodges and camps, and quote it in full. Nothing is hidden in add-ons.',
        image: '/images/how/step-2.jpg',
        alt: 'Wildebeest and zebra on open grassland',
        imagePosition: 'center 60%',
      },
      {
        title: 'Confirm, and we handle the rest',
        body: 'Once you are happy, we secure the lodges, book the guide, and send your final itinerary and booking references.',
        image: '/images/how/step-3.jpg',
        alt: 'Zebras crossing open savanna seen from above',
        imagePosition: 'center 40%',
      },
    ],
  },
  destinations: {
    eyebrow: 'Meet the places that make Tanzania',
    titleLine1: 'Seven landscapes.',
    titleLine2: 'Countless possibilities.',
    description: 'Each one is a different kind of safari. Open one to see where it could take you.',
    hintDesktop: 'Hover a landscape',
    hintTouch: 'Tap a landscape',
    tag: 'Tanzania',
    journeysLinkText: 'See journeys',
    planLinkPrefix: 'Plan a trip to',
    footerText: 'Connect your favourites into one personal journey.',
    footerLinkText: 'Explore all destinations',
    footerLinkPath: 'destinations',
    places: [
      {
        name: 'Serengeti',
        slug: 'serengeti',
        tagline: 'The plains go on. The moments stay.',
        image: '/images/destinations/serengeti.jpg',
        link: '',
        objectPosition: 'center 60%',
      },
      {
        name: 'Ngorongoro',
        slug: 'ngorongoro',
        tagline: 'A whole world inside a crater.',
        image: '/images/destinations/ngorongoro.jpg',
        link: '',
      },
      {
        name: 'Tarangire',
        slug: 'tarangire',
        tagline: 'Elephants. Baobabs. Room to roam.',
        image: '/images/destinations/tarangire.jpg',
        link: '',
      },
      {
        name: 'Lake Manyara',
        slug: 'lake-manyara',
        tagline: 'Forest meets the Rift Valley.',
        image: '/images/destinations/lake-manyara.jpg',
        link: '',
      },
      {
        name: 'Ndutu',
        slug: 'ndutu',
        tagline: 'Calving season on the southern plains.',
        image: '/images/destinations/ndutu.jpg',
        link: '',
        objectPosition: 'center 40%',
      },
      {
        name: 'Lake Natron',
        slug: 'lake-natron',
        tagline: 'Flamingos, salt and a very big sky.',
        image: '/images/destinations/lake-natron.jpg',
        link: '',
      },
      {
        name: 'Kilimanjaro',
        slug: 'kilimanjaro',
        tagline: 'A higher perspective.',
        image: '/images/destinations/kilimanjaro.jpg',
        link: 'kilimanjaro',
      },
    ],
  },
  beyond: {
    eyebrow: 'MAKE ROOM FOR A DIFFERENT KIND OF WILD',
    titleLine1: 'Extend your safari.',
    titleLine2: 'Coast, summit or culture.',
    text: 'Add any of these to a Mambeu safari. We build it into one route and send you one quote.',
    linkLabel: 'See all experiences',
    linkPath: 'experiences',
    extras: [
      {
        title: 'Zanzibar beach stay',
        description: 'Wildlife to white sands. Unwind in Zanzibar.',
        duration: '+[X] days',
        image: '/images/beyond/zanzibar.jpg',
        alt: 'Thatched beach lodge on stilts over turquoise water in Zanzibar',
        buttonText: 'Add Zanzibar to my trip',
        planDestination: 'zanzibar',
        planExperience: '',
      },
      {
        title: 'Kilimanjaro climb',
        description: 'Take the higher road. Your Kilimanjaro adventure.',
        duration: '+[X] days',
        image: '/images/beyond/kilimanjaro.jpg',
        alt: 'Climbers and an orange tent beneath the snow-capped summit of Kilimanjaro',
        buttonText: 'Add Kilimanjaro to my trip',
        planDestination: 'kilimanjaro',
        planExperience: '',
        imageClass: 'beyond-safari__photo-img--kili',
      },
      {
        title: 'Short day tours',
        description: 'Meet another side of Tanzania. Short, locally guided day tours.',
        duration: '+[X] days',
        image: '/images/beyond/culture.jpg',
        alt: 'A visitor meeting a local community in the forest',
        buttonText: 'Add a cultural visit to my trip',
        planDestination: '',
        planExperience: 'cultural-connections',
      },
      {
        title: 'Hot air balloon safaris',
        description: 'A sunrise balloon flight over the Serengeti, added to your safari.',
        duration: '+[X] days',
        image: '/images/beyond/balloon.jpg',
        alt: 'Hot-air balloons inflating beside safari vehicles on the Serengeti plains',
        buttonText: 'Add a balloon flight to my trip',
        planDestination: '',
        planExperience: 'hot-air-balloon',
      },
      {
        title: 'Family safari vacations',
        description: 'Time together, thoughtfully planned. A route and pace shaped around everyone.',
        duration: '+[X] days',
        image: '/images/beyond/family.jpg',
        alt: 'A family looking out from a safari vehicle across the savannah',
        buttonText: 'Add a family safari to my trip',
        planDestination: '',
        planExperience: 'family-safaris',
      },
      {
        title: 'Romantic safari holidays',
        description: 'Thoughtful stays and quiet evenings, from the bush to the coast.',
        duration: '+[X] days',
        image: '/images/beyond/romantic.jpg',
        alt: 'A candlelit dinner table set for two in the bush',
        buttonText: 'Add a romantic stay to my trip',
        planDestination: '',
        planExperience: 'romantic-bush-dinner',
      },
    ],
  },
  people: {
    photo: '/images/people/guests.jpg',
    photoAlt:
      'Two guests standing beside a Mambeu safari vehicle on a dusty road, with open savannah and a blue sky behind them',
    caption: 'Guests on safari with Mambeu',
    captionAside: 'Our home. Your adventure.',
    eyebrow: 'The people make the difference',
    titleLine1: 'Good safaris begin with',
    titleLine2: 'good people.',
    text: 'Mambeu is locally owned and operated in Arusha. We share Tanzania through expertly guided journeys, personal attention and a commitment to responsible travel.',
    buttonText: 'Plan my safari',
    buttonLink: 'plan',
    linkText: 'Get to know Mambeu',
    linkPath: 'about',
  },
  faq: {
    eyebrow: 'A little help before you go',
    titleLine1: 'Good questions.',
    titleLine2: 'Personal answers.',
    fallbackText: 'Can’t find your answer? Tell us what you are wondering and we will reply personally.',
    askButton: 'Ask us a question',
    moreLinkText: 'All planning questions',
    moreLinkPath: 'travel-guide',
    items: [
      {
        q: 'Can I change a published itinerary?',
        a: 'Yes. Published journeys are starting points. Tell us what you would like to change, such as the pace, the parks or the lodges, and we will rebuild the route and quote it in full before you commit.',
      },
      {
        q: 'What is the difference between Comfort, Luxury and Camping?',
        a: 'Comfort safaris use handpicked lodges and tented camps and balance a rewarding route with welcoming stays. Luxury raises the level of the stays and experiences. Camping keeps things simple and close to the wild. Tell us your dates and we will compare specific stays for you.',
      },
      {
        q: 'Can I combine a safari with Zanzibar?',
        a: 'Yes. Zanzibar can be added to the end of a safari, and so can a Kilimanjaro climb or a cultural visit. Tell us your dates and we will quote it together as one journey.',
      },
    ],
  },
};

/**
 * Content saved by the old dashboard: keep only what the homepage was already showing
 * (hero eyebrow and intro text, finder labels, Beyond eyebrow), plus a hero image picked in the old
 * single-image field, which becomes the first slide.
 */
function migrateV1(old) {
  const out = carry(old, [
    'hero.eyebrow',
    'hero.text',
    'finder.eyebrow',
    'finder.interestLabel',
    'finder.styleLabel',
    'finder.durationLabel',
    'beyond.eyebrow',
  ]);
  const picked = String(old?.hero?.image ?? '').trim();
  if (/^https?:\/\//i.test(picked)) {
    out.hero = {
      ...(out.hero || {}),
      slides: [{ image: picked, alt: old.hero.imageAlt || '' }, ...homePageDefaults.hero.slides],
    };
  }
  return out;
}

/** Full homepage payload for the public site and the dashboard editor. */
export function mergeHomeContent(cmsHome) {
  return mergePage(homePageDefaults, cmsHome, migrateV1);
}
