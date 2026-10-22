export const pageEditorTabs = {
  home: [
    {
      label: 'Hero',
      fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow', path: ['hero', 'eyebrow'] },
        { key: 'hero.titleLine1', label: 'Title line 1', path: ['hero', 'titleLine1'] },
        { key: 'hero.titleLine2', label: 'Title line 2', path: ['hero', 'titleLine2'] },
        { key: 'hero.text', label: 'Intro text', path: ['hero', 'text'], long: true },
        { key: 'hero.image', label: 'Hero image filename', path: ['hero', 'image'], hint: 'File in /assets/ e.g. hero.webp' },
      ],
    },
    {
      label: 'Sections',
      fields: [
        { key: 'placesSection.eyebrow', label: 'Destinations eyebrow', path: ['placesSection', 'eyebrow'] },
        { key: 'placesSection.title', label: 'Destinations title', path: ['placesSection', 'title'] },
        { key: 'faqSection.eyebrow', label: 'FAQ eyebrow', path: ['faqSection', 'eyebrow'] },
        { key: 'faqSection.title', label: 'FAQ title', path: ['faqSection', 'title'] },
      ],
    },
  ],
  about: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title (HTML allowed)', path: ['head', 'title'], long: true },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
        { key: 'storyPhoto', label: 'Story photo', path: ['storyPhoto'] },
      ],
    },
  ],
  plan: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title', path: ['head', 'title'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
  ],
  kilimanjaro: [
    {
      label: 'Content',
      fields: [
        { key: 'label', label: 'Eyebrow', path: ['label'] },
        { key: 'title', label: 'Title (HTML)', path: ['title'], long: true },
        { key: 'text', label: 'Intro', path: ['text'], long: true },
        { key: 'photo', label: 'Photo filename', path: ['photo'] },
      ],
    },
  ],
  comfort: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title', path: ['head', 'title'], long: true },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
  ],
  destinations: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title', path: ['head', 'title'], long: true },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
  ],
  experiences: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title', path: ['head', 'title'], long: true },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
  ],
  travel_guide: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.title', label: 'Title', path: ['head', 'title'], long: true },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
  ],
  zanzibar: [
    {
      label: 'Content',
      fields: [
        { key: 'label', label: 'Eyebrow', path: ['label'] },
        { key: 'title', label: 'Title (HTML)', path: ['title'], long: true },
        { key: 'text', label: 'Intro', path: ['text'], long: true },
        { key: 'photo', label: 'Photo filename', path: ['photo'] },
      ],
    },
  ],
};

export function getNested(obj, path) {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
}

export function setNested(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!cur[key] || typeof cur[key] !== 'object') cur[key] = {};
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}
