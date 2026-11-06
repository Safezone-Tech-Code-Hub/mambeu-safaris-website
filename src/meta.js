import { places } from './data/places.js';
import tours from './data/tours.json';

const DEFAULT_DESCRIPTION =
  'Personal Tanzania journeys with Mambeu Safaris. Explore midrange and comfort safaris, luxury stays, Kilimanjaro and Zanzibar with our local Arusha team.';

export function getPageMeta(pathname) {
  const route = pathname.replace(/^\/+|\/+$/g, '');
  const t = tours.find((x) => x.path === route);
  if (t) {
    return {
      title: `${t.title} | Mambeu Safaris`,
      description: (t.fullDescription || t.description).slice(0, 170),
    };
  }
  if (!route) {
    return { title: 'Tanzania, Your Way | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'safaris') {
    return {
      title: 'Safaris | Mambeu Safaris',
      description:
        "Explore Mambeu's Tanzania safari journeys, then tailor the route, dates and stays to you.",
    };
  }
  if (route === 'about') {
    return { title: 'Our Story | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'comfort') {
    return { title: 'Your Comfort Level | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'destinations') {
    return {
      title: 'Destinations | Mambeu Safaris',
      description:
        "Serengeti, Ngorongoro, Tarangire, Lake Manyara, Kilimanjaro and Zanzibar. Explore Tanzania's wild places with Mambeu.",
    };
  }
  if (route.startsWith('destinations/')) {
    const p = places.find((x) => route === 'destinations/' + x.slug);
    if (!p) {
      return { title: 'Page Not Found | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
    }
    return {
      title: `${p.name} | Mambeu Safaris`,
      description: DEFAULT_DESCRIPTION,
    };
  }
  if (route === 'kilimanjaro') {
    return { title: 'Kilimanjaro Adventures | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'zanzibar') {
    return { title: 'Zanzibar Escapes | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'experiences') {
    return {
      title: 'Experiences | Mambeu Safaris',
      description:
        'Family, couples, balloon and cultural experiences you can add to a Tanzania safari with Mambeu.',
    };
  }
  if (route === 'travel-guide') {
    return { title: 'Planning & FAQs | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'plan') {
    return { title: 'Plan Your Journey | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'favourites') {
    return {
      title: 'Saved Safaris | Mambeu Safaris',
      description: 'Journeys you have hearted while exploring Mambeu Safaris, kept on this device.',
    };
  }
  if (route === 'privacy') {
    return {
      title: 'Privacy | Mambeu Safaris',
      description:
        'How Mambeu Safaris handles the personal details you share when you enquire or plan a journey.',
    };
  }
  return { title: 'Page Not Found | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
}
