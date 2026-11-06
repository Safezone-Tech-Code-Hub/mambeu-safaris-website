/** Homepage hero & finder copy (code defaults; applied after CMS merge). */
export const homePageDefaults = {
  hero: {
    eyebrow: 'Arusha · Northern Tanzania',
    titleLine1: 'Wildlife safaris',
    titleLine2: 'across northern Tanzania.',
    text: 'Routes and lodges quoted before you commit.',
    image: 'hero.webp',
    ctaLabel: 'Plan my safari',
    slides: [
      { src: 'hero.webp', alt: 'Wildebeest and zebras on the Serengeti plains' },
      { src: 'zebras.webp', alt: 'Zebras grazing on the savannah' },
      { src: 'lion.webp', alt: 'Lion on the Tanzanian savannah' },
      { src: 'tour-298.webp', alt: 'Wildlife in the Ngorongoro Crater' },
      { src: 'tour-302.webp', alt: 'Safari landscape in northern Tanzania' },
    ],
  },
  finder: {
    eyebrow: 'Find your starting point',
    title: 'Three filters.\nMatching safaris.',
    lead: 'Pick a style, trip length, and focus—we’ll show what fits.',
    styleLabel: 'Safari style',
    durationLabel: 'Trip length',
    interestLabel: 'Main interest',
  },
  intro: {
    lead: 'Locally owned and operated, Mambeu Safaris was founded to share the untamed beauty of Tanzania through authentic, expertly guided adventures.',
    paragraphs: [
      'Based in Arusha at the foot of Mount Meru, we combine intimate knowledge of Tanzania’s wildlife, culture and landscapes with a commitment to sustainable tourism.',
      'Our guides, many born and raised in the shadow of Kilimanjaro, bring decades of combined experience tracking the Big Five, navigating the Serengeti migration and creating personalised itineraries.',
    ],
    pathsLabel: 'Three ways in',
    paths: [
      { label: 'A classic safari', to: '/safaris/' },
      { label: 'Climbing Kilimanjaro', to: '/kilimanjaro/' },
      { label: 'Zanzibar’s beaches', to: '/zanzibar/' },
    ],
  },
  featuredComfortIds: [302, 298, 291, 293, 294, 64],
  beyond: {
    eyebrow: 'Beyond the safari',
    titleLine1: 'Extend your safari.',
    titleLine2: 'Coast, summit or culture.',
    text: 'Add any of these to a Mambeu safari. We build it into one route and send you one quote.',
    linkLabel: 'See all experiences',
  },
};
