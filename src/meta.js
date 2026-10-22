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
    return { title: 'Safari Collection | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'about') {
    return { title: 'Our Story | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'comfort') {
    return { title: 'Your Comfort Level | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'destinations') {
    return { title: 'Tanzania Destinations | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route.startsWith('destinations/')) {
    const p = places.find((x) => route === 'destinations/' + x.slug);
    return {
      title: `${p?.name || 'Destinations'} | Mambeu Safaris`,
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
    return { title: 'Safari Experiences | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'travel-guide') {
    return { title: 'Planning & FAQs | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  if (route === 'plan') {
    return { title: 'Plan Your Journey | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
  }
  return { title: 'Page Not Found | Mambeu Safaris', description: DEFAULT_DESCRIPTION };
}
