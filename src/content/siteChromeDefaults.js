/** Header & footer content: contact details, footer columns and the final invite band. */

export const siteChromeDefaults = {
  email: 'info@mambeusafaris.com',
  phone: '+255 796 086 799',
  phoneE164: '255796086799',
  whatsapp: '255796086799',
  officeLocation: 'Arusha, Tanzania',
  officeHours: '08:00–19:30',
  finalCtaTitle: 'Your next chapter\nstarts in Tanzania.',
  finalCtaButton: 'Let’s plan your safari',
  finalCtaLink: 'plan',
  footerHeadline: 'Local roots. Personal journeys.',
  footerLede: 'Wildlife, mountains and coast, thoughtfully brought together.',
  footerWhatsappText: 'Talk to us on WhatsApp',
  footerColumn1Title: 'Your Tanzania',
  footerColumn1Links: [
    { label: 'Safari collection', link: 'safaris' },
    { label: 'Comfort levels', link: 'comfort' },
    { label: 'Kilimanjaro', link: 'kilimanjaro' },
    { label: 'Zanzibar', link: 'zanzibar' },
    { label: 'Destinations', link: 'destinations' },
    { label: 'Saved journeys', link: 'favourites' },
  ],
  footerColumn2Title: 'Get to know us',
  footerColumn2Links: [
    { label: 'Our story', link: 'about' },
    { label: 'Experiences', link: 'experiences' },
    { label: 'Planning & FAQs', link: 'travel-guide' },
    { label: 'Plan your safari', link: 'plan' },
  ],
  footerContactTitle: 'Your local team',
  footerCopyright: 'Mambeu Safaris',
  termsText: 'Booking terms',
  termsUrl: 'https://mambeusafaris.com/terms-conditions/',
};

/** Saved values win when non-empty; lists must stay lists. Unknown saved keys are kept. */
export function mergeSiteChrome(saved) {
  const out = { ...siteChromeDefaults };
  if (!saved || typeof saved !== 'object') return out;
  Object.entries(saved).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (typeof v === 'string' && !v.trim()) return;
    if (Array.isArray(siteChromeDefaults[k]) && !Array.isArray(v)) return;
    out[k] = v;
  });
  return out;
}
