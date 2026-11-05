export const pageEditorTabs = {
  home: [
    {
      label: 'Hero',
      fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow', path: ['hero', 'eyebrow'] },
        { key: 'hero.titleLine1', label: 'Title line 1', path: ['hero', 'titleLine1'] },
        { key: 'hero.titleLine2', label: 'Title line 2', path: ['hero', 'titleLine2'] },
        { key: 'hero.text', label: 'Intro text', path: ['hero', 'text'], long: true },
        { key: 'hero.image', label: 'Hero image', path: ['hero', 'image'], type: 'image' },
        { key: 'hero.imageAlt', label: 'Hero image alt text', path: ['hero', 'imageAlt'] },
        { key: 'hero.ctaPrimary', label: 'Primary button text', path: ['hero', 'ctaPrimary'] },
        { key: 'hero.ctaPrimaryLink', label: 'Primary button path', path: ['hero', 'ctaPrimaryLink'], hint: 'e.g. safaris (no slashes)' },
        { key: 'hero.ctaSecondary', label: 'Secondary button text', path: ['hero', 'ctaSecondary'] },
        { key: 'hero.ctaSecondaryLink', label: 'Secondary button path', path: ['hero', 'ctaSecondaryLink'] },
        { key: 'hero.bottomLeft', label: 'Footer line (left)', path: ['hero', 'bottomLeft'] },
        { key: 'hero.bottomRight', label: 'Footer line (right)', path: ['hero', 'bottomRight'] },
        { key: 'hero.scrollLabel', label: 'Scroll link text', path: ['hero', 'scrollLabel'] },
      ],
    },
    {
      label: 'Safari finder',
      fields: [
        { key: 'finder.eyebrow', label: 'Eyebrow', path: ['finder', 'eyebrow'] },
        { key: 'finder.title', label: 'Title (use line breaks)', path: ['finder', 'title'], long: true },
        { key: 'finder.styleLabel', label: 'Comfort dropdown label', path: ['finder', 'styleLabel'] },
        { key: 'finder.durationLabel', label: 'Duration dropdown label', path: ['finder', 'durationLabel'] },
        { key: 'finder.interestLabel', label: 'Interest dropdown label', path: ['finder', 'interestLabel'] },
        { key: 'finder.submitLabel', label: 'Submit button', path: ['finder', 'submitLabel'] },
      ],
    },
    {
      label: 'Welcome',
      fields: [
        { key: 'welcome.eyebrow', label: 'Eyebrow', path: ['welcome', 'eyebrow'] },
        { key: 'welcome.titleHtml', label: 'Title (HTML allowed)', path: ['welcome', 'titleHtml'], long: true },
        { key: 'welcome.lead', label: 'Lead paragraph', path: ['welcome', 'lead'], long: true },
        { key: 'welcome.body', label: 'Body paragraph', path: ['welcome', 'body'], long: true },
        { key: 'welcome.linkText', label: 'Link text', path: ['welcome', 'linkText'] },
        { key: 'welcome.linkPath', label: 'Link path', path: ['welcome', 'linkPath'] },
        { key: 'welcome.point1Title', label: 'Highlight 1 title', path: ['welcome', 'point1Title'] },
        { key: 'welcome.point1Text', label: 'Highlight 1 text', path: ['welcome', 'point1Text'] },
        { key: 'welcome.point2Title', label: 'Highlight 2 title', path: ['welcome', 'point2Title'] },
        { key: 'welcome.point2Text', label: 'Highlight 2 text', path: ['welcome', 'point2Text'] },
      ],
    },
    {
      label: 'Featured journeys',
      fields: [
        { key: 'curated.eyebrow', label: 'Eyebrow', path: ['curated', 'eyebrow'] },
        { key: 'curated.title', label: 'Title (line breaks OK)', path: ['curated', 'title'], long: true },
        { key: 'curated.tabs', label: 'Style tabs (comma-separated)', path: ['curated', 'tabs'], hint: 'Comfort,Luxury,Camping' },
        {
          key: 'curated.featuredComfortTourIds',
          label: 'Comfort tab tour IDs',
          path: ['curated', 'featuredComfortTourIds'],
          hint: 'Comma-separated tour id numbers when Comfort tab is selected. Other tabs pull from Tours content.',
        },
        { key: 'curated.collectionLinkText', label: 'Collection link text', path: ['curated', 'collectionLinkText'] },
      ],
    },
    {
      label: 'Comfort block',
      fields: [
        { key: 'comfortSection.eyebrow', label: 'Section eyebrow', path: ['comfortSection', 'eyebrow'] },
        { key: 'comfortSection.title', label: 'Section title', path: ['comfortSection', 'title'], long: true },
        { key: 'comfortSection.intro', label: 'Intro (right column)', path: ['comfortSection', 'intro'], long: true, hint: 'Midrange / Comfort / Luxury panels: Content → Comfort levels.' },
      ],
    },
    {
      label: 'Destinations slider',
      fields: [
        { key: 'placesSection.eyebrow', label: 'Eyebrow', path: ['placesSection', 'eyebrow'] },
        { key: 'placesSection.title', label: 'Title', path: ['placesSection', 'title'], long: true },
        { key: 'placesSection.prevLabel', label: 'Previous button', path: ['placesSection', 'prevLabel'] },
        { key: 'placesSection.nextLabel', label: 'Next button', path: ['placesSection', 'nextLabel'] },
        { key: 'placesSection.tailText', label: 'Text below slider', path: ['placesSection', 'tailText'] },
        { key: 'placesSection.tailLinkText', label: 'Link below slider', path: ['placesSection', 'tailLinkText'], hint: 'Place cards (photo, name, tag): Content → Places.' },
      ],
    },
    {
      label: 'Beyond safari',
      fields: [
        { key: 'beyond.eyebrow', label: 'Eyebrow', path: ['beyond', 'eyebrow'] },
        { key: 'beyond.title', label: 'Title', path: ['beyond', 'title'] },
        { key: 'beyond.intro', label: 'Intro (line breaks OK)', path: ['beyond', 'intro'], long: true },
        { key: 'beyond.card1Image', label: 'Card 1 image', path: ['beyond', 'card1Image'], type: 'image' },
        { key: 'beyond.card1ImageAlt', label: 'Card 1 image alt', path: ['beyond', 'card1ImageAlt'] },
        { key: 'beyond.card1Link', label: 'Card 1 path', path: ['beyond', 'card1Link'] },
        { key: 'beyond.card1Eyebrow', label: 'Card 1 eyebrow', path: ['beyond', 'card1Eyebrow'] },
        { key: 'beyond.card1Title', label: 'Card 1 title', path: ['beyond', 'card1Title'], long: true },
        { key: 'beyond.card1Text', label: 'Card 1 text', path: ['beyond', 'card1Text'] },
        { key: 'beyond.card2Image', label: 'Card 2 image', path: ['beyond', 'card2Image'], type: 'image' },
        { key: 'beyond.card2ImageAlt', label: 'Card 2 image alt', path: ['beyond', 'card2ImageAlt'] },
        { key: 'beyond.card2Link', label: 'Card 2 path', path: ['beyond', 'card2Link'] },
        { key: 'beyond.card2Eyebrow', label: 'Card 2 eyebrow', path: ['beyond', 'card2Eyebrow'] },
        { key: 'beyond.card2Title', label: 'Card 2 title', path: ['beyond', 'card2Title'], long: true },
        { key: 'beyond.card2Text', label: 'Card 2 text', path: ['beyond', 'card2Text'] },
        { key: 'beyond.card3Image', label: 'Card 3 image', path: ['beyond', 'card3Image'], type: 'image' },
        { key: 'beyond.card3ImageAlt', label: 'Card 3 image alt', path: ['beyond', 'card3ImageAlt'] },
        { key: 'beyond.card3Link', label: 'Card 3 path', path: ['beyond', 'card3Link'] },
        { key: 'beyond.card3Eyebrow', label: 'Card 3 eyebrow', path: ['beyond', 'card3Eyebrow'] },
        { key: 'beyond.card3Title', label: 'Card 3 title', path: ['beyond', 'card3Title'], long: true },
        { key: 'beyond.card3Text', label: 'Card 3 text', path: ['beyond', 'card3Text'] },
      ],
    },
    {
      label: 'Local story',
      fields: [
        { key: 'localStory.photo', label: 'Photo', path: ['localStory', 'photo'], type: 'image' },
        { key: 'localStory.photoAlt', label: 'Photo alt', path: ['localStory', 'photoAlt'] },
        { key: 'localStory.photoCaption', label: 'Photo caption', path: ['localStory', 'photoCaption'] },
        { key: 'localStory.eyebrow', label: 'Eyebrow', path: ['localStory', 'eyebrow'] },
        { key: 'localStory.title', label: 'Title', path: ['localStory', 'title'], long: true },
        { key: 'localStory.body1', label: 'Paragraph 1', path: ['localStory', 'body1'], long: true },
        { key: 'localStory.body2', label: 'Paragraph 2', path: ['localStory', 'body2'], long: true },
        { key: 'localStory.buttonText', label: 'Button text', path: ['localStory', 'buttonText'] },
        { key: 'localStory.buttonLink', label: 'Button path', path: ['localStory', 'buttonLink'] },
      ],
    },
    {
      label: 'FAQ',
      fields: [
        { key: 'faqSection.eyebrow', label: 'Eyebrow', path: ['faqSection', 'eyebrow'] },
        { key: 'faqSection.title', label: 'Title', path: ['faqSection', 'title'], long: true },
        { key: 'faqSection.linkText', label: 'Link to travel guide', path: ['faqSection', 'linkText'] },
        { key: 'faqSection.faqCount', label: 'Number of FAQs to show', path: ['faqSection', 'faqCount'], hint: 'Q&A rows: Content → FAQ. Green footer band: Header & footer.' },
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
        { key: 'storyPhoto', label: 'Story photo', path: ['storyPhoto'], type: 'image' },
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
        { key: 'photo', label: 'Photo', path: ['photo'], type: 'image' },
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
        { key: 'photo', label: 'Photo', path: ['photo'], type: 'image' },
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
