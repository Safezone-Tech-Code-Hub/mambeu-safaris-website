/**
 * About / Our story page content (schema 2). Defaults match what the redesigned page shows;
 * the dashboard editor (dashboard/src/lib/pageEditor/about.js) edits these exact paths.
 */
import { mergePage } from './schema.js';

export const aboutPageDefaults = {
  head: {
    label: 'Our story',
    titleLine1: 'We plan safaris',
    titleLine2: 'from Arusha.',
    text: 'A locally owned operator in Arusha. We plan the route, the stays and the days on the ground with you.',
    image: '/images/intro/arusha.jpg',
    imagePosition: 'center 22%',
  },
  intro: {
    eyebrow: 'Who we are',
    titleLine1: 'More than a',
    titleLine2: 'tour company.',
    lead: 'Founded by local Tanzanians with a lifelong connection to this land, Mambeu Safaris is more than a tour company. We are storytellers, conservationists and your trusted partners in adventure.',
    paragraphs: [
      'Based in Arusha, we specialise in custom-made safari experiences that reveal the soul of Tanzania. Our guides are not only experts in wildlife tracking. They grew up listening to stories of the Serengeti, learned traditional tracking methods from their elders, and developed an intuitive understanding of animal behaviour that cannot be taught from books.',
      'We work directly with local communities, so your journey supports conservation efforts and provides sustainable livelihoods. From the moment you arrive, you will feel the difference of travelling with operators who truly call this place home.',
    ],
    pillars: [
      {
        title: 'Storytellers',
        text: 'Guides who grew up with the stories of the Serengeti.',
        icon: 'book',
      },
      {
        title: 'Conservationists',
        text: 'Journeys that support conservation and local livelihoods.',
        icon: 'tree',
      },
      {
        title: 'Partners',
        text: 'Your route and pace, shaped with people who call this place home.',
        icon: 'people',
      },
    ],
    photo: '/images/people/guests.jpg',
    photoAlt: 'Two guests standing beside a Mambeu safari vehicle in the bush',
    photoFocal: '50% 45%',
    caption: 'Guests on safari with Mambeu',
  },
  proof: {
    label: 'Find us on SafariBookings',
    text: 'View our profile and verified traveller reviews.',
    buttonText: 'View our profile',
    href: 'https://www.safaribookings.com/p7544',
    logo: '/images/safaribookings.png',
    logoAlt: 'SafariBookings',
  },
  principles: {
    eyebrow: 'How we work',
    titleLine1: 'What you can',
    titleLine2: 'count on',
    items: [
      {
        title: 'We know it first-hand',
        text: "We only recommend what we've seen ourselves. Our team lives in Africa, so we hear about changes early and can work them into your plan at short notice.",
        tag: 'Tested by our team',
        icon: 'pin',
      },
      {
        title: "We're close by",
        text: 'We meet you in person before you go to talk through the itinerary and last questions. If something serious comes up, someone is available around the clock.',
        tag: 'Available during your trip',
        icon: 'chat',
      },
      {
        title: 'We take responsibility',
        text: "We don't look away from the problems Africa faces. We try to be part of the solution, with new ideas for tackling them.",
        tag: 'Local solutions',
        icon: 'sprout',
      },
    ],
  },
  mission: {
    label: 'Our mission',
    text: 'To provide exceptional, personalised travel experiences that show the diverse beauty and cultural richness of Tanzania. Whether you want a budget-friendly adventure or a luxurious escape, we deliver high-quality service with comfort, safety and real local insight, so you leave with memories that last a lifetime.',
  },
  vision: {
    label: 'Our vision',
    text: 'To be the leading local tour operator in Tanzania, known for excellence and a deep understanding of the country’s landscapes and cultures. We aim to set the standard for sustainable, responsible tourism, deepen appreciation of Tanzania’s natural and cultural heritage, and support local communities.',
  },
  why: {
    eyebrow: 'Why book with us',
    title: 'Genuine experiences, guided from the inside',
    text: 'Choose Mambeu for an adventure that is authentic, sustainable and beautiful, with a team that knows this country from the inside.',
    items: [
      {
        title: 'Authentic',
        text: 'Immerse yourself in Tanzania’s culture, wildlife and natural wonders with an unfiltered, real-world perspective.',
        icon: 'landscape',
      },
      {
        title: 'Local expertise',
        text: 'Our local guides share insider knowledge, hidden gems and the stories that make a place memorable.',
        icon: 'person',
      },
      {
        title: 'Sustainable',
        text: 'Your trip is planned to benefit local communities and the environment.',
        icon: 'leaf',
      },
      {
        title: 'Cultural exchange',
        text: 'Thoughtful accommodation is paired with immersive cultural exchanges.',
        icon: 'people',
      },
    ],
  },
};

/** Nothing from the old About editor reached the redesigned page, so nothing is carried over. */
function migrateV1() {
  return {};
}

export function mergeAboutContent(cmsAbout) {
  return mergePage(aboutPageDefaults, cmsAbout, migrateV1);
}
