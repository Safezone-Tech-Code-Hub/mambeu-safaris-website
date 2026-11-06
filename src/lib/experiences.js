/** @typedef {{
 *   slug: string;
 *   category: 'Family' | 'Couples' | 'Adventure' | 'Culture' | 'Coast' | 'Day tours';
 *   title: string;
 *   summary: string;
 *   image: string;
 *   imageAlt: string;
 *   focal?: string;
 *   location?: string;
 *   bestTime?: string;
 *   duration?: string;
 *   bestFor?: string;
 *   highlights: string[];
 *   included: string[];
 *   goodToKnow: string[];
 *   featured?: boolean;
 *   published: boolean;
 *   sortOrder: number;
 * }} Experience */

/** @type {Experience[]} */
export const experiences = [
  {
    slug: 'family-safaris',
    category: 'Family',
    title: 'Family safari vacations',
    summary:
      "A route and pace shaped around your family, with accommodation and activities discussed around everyone's needs.",
    image: '/images/experiences/family.jpg',
    imageAlt: 'Children in a safari vehicle looking over the plains',
    location: 'Northern circuit',
    bestTime: 'Year-round',
    duration: '5 to 10 days',
    bestFor: 'Families with children of most ages',
    highlights: ['Flexible pace', 'Family-friendly stays', 'Guide who loves kids'],
    included: ['Shorter drives and rest breaks', 'Family or connecting rooms', 'Child-friendly meals'],
    goodToKnow: [
      'Minimum age rules apply at some lodges and activities',
      'Tell us ages when you plan so we can match stays',
    ],
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    slug: 'romantic-bush-dinner',
    category: 'Couples',
    title: 'Romantic safari holidays',
    summary:
      'Quiet lodges and optional special experiences, from a private dinner in the bush to a slow finish in Zanzibar.',
    image: '/images/experiences/romantic.jpg',
    imageAlt: 'Candlelit bush dinner for two',
    location: 'Bush & coast',
    bestTime: 'Year-round',
    duration: 'One evening, or a full trip',
    bestFor: 'Honeymoons and anniversaries',
    highlights: ['Private bush dinner', 'Quiet lodges', 'Beach finish'],
    included: ['Table set in a private spot', 'Lantern-lit setting', 'Host and guide on hand'],
    goodToKnow: ['Offered at selected lodges only', 'Book early for peak months'],
    published: true,
    sortOrder: 2,
  },
  {
    slug: 'hot-air-balloon',
    category: 'Adventure',
    title: 'Hot air balloon safaris',
    summary: 'An optional sunrise balloon flight over the Serengeti.',
    image: '/images/experiences/balloon.jpg',
    imageAlt: 'Hot-air balloons at sunrise over the Serengeti',
    focal: '50% 25%',
    location: 'Serengeti',
    bestTime: 'Year-round, early morning',
    duration: 'About 1 hour in the air',
    bestFor: 'Anyone happy with an early start',
    highlights: ['Sunrise flight', "Bird's-eye view"],
    included: ['Pre-dawn pick-up', 'Flight with a licensed pilot'],
    goodToKnow: [
      'Weather can cancel flights',
      'Availability and costs are confirmed separately',
      'Age and health limits apply',
    ],
    published: true,
    sortOrder: 3,
  },
  {
    slug: 'cultural-connections',
    category: 'Day tours',
    title: 'Short day tours',
    summary: 'Maasai and Hadzabe experiences with respectful, locally guided visits.',
    image: '/images/experiences/culture.jpg',
    imageAlt: 'Guided cultural visit near Lake Eyasi',
    location: 'Lake Eyasi & Arusha',
    bestTime: 'Dry months are easiest',
    duration: 'Half day to full day',
    bestFor: 'Curious travellers and families',
    highlights: ['Locally guided', 'Community-led', 'Respectful visits'],
    included: ['Community-agreed visit', 'Local guide and interpreter'],
    goodToKnow: ['Ask before taking photos', 'Dress modestly', 'Early starts for Hadzabe hunts'],
    published: true,
    sortOrder: 4,
  },
  {
    slug: 'zanzibar-beach-excursions',
    category: 'Coast',
    title: 'Zanzibar beach excursions',
    summary:
      'Spice tours, Stone Town walks and time on the water, added to a Zanzibar stay after your safari.',
    image: '/images/destinations/zanzibar.jpg',
    imageAlt: 'Thatched beach lodge over turquoise water in Zanzibar',
    location: 'Zanzibar',
    bestTime: 'June to October is driest',
    duration: 'Half day to full day',
    bestFor: 'Anyone adding Zanzibar',
    highlights: ['Stone Town', 'Spice farm', 'Boat days'],
    included: ['Local guide', 'Hotel pick-up', 'Entry where needed'],
    goodToKnow: [
      'Sea conditions decide boat days',
      'Cover shoulders and knees in Stone Town',
    ],
    published: true,
    sortOrder: 5,
  },

  // DRAFTS: verify before publishing
  {
    slug: 'walking-safari',
    category: 'Adventure',
    title: 'Slow down and step out.',
    summary:
      'Follow a ranger on foot and read the tracks, plants and small life you miss from a vehicle.',
    image: '/images/experiences/walking.jpg',
    imageAlt: 'Guide and guests walking in the bush',
    location: 'Selected areas outside the main parks',
    bestTime: 'Cooler months and mornings',
    duration: '2 to 3 hours',
    bestFor: 'Active adults and older children',
    highlights: ['Ranger-led', 'Tracks and plants', 'Quiet and close'],
    included: ['Ranger-guide', 'Safety briefing', 'Water'],
    goodToKnow: ['Not allowed inside every park', 'Closed shoes and neutral colours', 'Minimum age applies'],
    published: false,
    sortOrder: 5,
  },
  {
    slug: 'materuni-coffee-waterfall',
    category: 'Culture',
    title: 'From the slopes to the cup.',
    summary: 'Walk through village farms to a waterfall, then roast and taste coffee with a local family.',
    image: '/images/experiences/coffee.jpg',
    imageAlt: 'Coffee roasting on the slopes of Kilimanjaro',
    location: 'Moshi, Kilimanjaro foothills',
    bestTime: 'Year-round',
    duration: 'Half day',
    bestFor: 'Rest days around a trek',
    highlights: ['Village walk', 'Waterfall', 'Coffee tasting'],
    included: ['Local guide', 'Hands-on roasting', 'Tasting'],
    goodToKnow: ['Paths can be muddy after rain', 'Bring a swimsuit if you want to dip'],
    published: false,
    sortOrder: 6,
  },
  {
    slug: 'lake-duluti-canoe',
    category: 'Adventure',
    title: 'A calm morning on the water.',
    summary: 'Paddle a crater lake near Arusha, with birds and forest edges along the shore.',
    image: '/images/experiences/duluti.jpg',
    imageAlt: 'Canoe on Lake Duluti',
    location: 'Arusha',
    bestTime: 'Year-round',
    duration: '1 to 2 hours',
    bestFor: 'Arrival or departure day',
    highlights: ['Birdlife', 'Easy paddling', 'Close to town'],
    included: ['Canoe and paddles', 'Guide'],
    goodToKnow: ['Short and gentle, good for a first day'],
    published: false,
    sortOrder: 7,
  },
  {
    slug: 'stone-town-spice',
    category: 'Coast',
    title: 'Spices, streets and sea.',
    summary: "Wander Stone Town's lanes and a spice farm, then end the day by the water.",
    image: '/images/experiences/stonetown.jpg',
    imageAlt: 'Stone Town streets',
    location: 'Zanzibar',
    bestTime: 'June to October is driest',
    duration: 'Half day',
    bestFor: 'Anyone adding Zanzibar',
    highlights: ['Old town walk', 'Spice farm', 'Sunset'],
    included: ['Local guide', 'Spice tasting'],
    goodToKnow: ['Hot at midday, start early', 'Cover shoulders and knees in town'],
    published: false,
    sortOrder: 8,
  },
  {
    slug: 'mnemba-snorkel',
    category: 'Coast',
    title: 'Reef, dolphins and slow days.',
    summary: 'A boat trip to the Mnemba reef for snorkelling in clear water.',
    image: '/images/experiences/snorkel.jpg',
    imageAlt: 'Snorkelling off Zanzibar',
    location: 'Zanzibar',
    bestTime: 'Calmer seas outside the rains',
    duration: 'Half day',
    bestFor: 'Families and couples',
    highlights: ['Reef snorkelling', 'Boat trip', 'Marine life'],
    included: ['Boat and crew', 'Snorkel gear', 'Fruit and water'],
    goodToKnow: ['Sea conditions decide the day', 'Ability to swim recommended'],
    published: false,
    sortOrder: 9,
  },
];

export const publishedExperiences = experiences
  .filter((e) => e.published)
  .slice()
  .sort((a, b) => a.sortOrder - b.sortOrder);
