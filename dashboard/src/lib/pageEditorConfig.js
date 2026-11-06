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
      panel: 'home-places',
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
      panel: 'home-faq',
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
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent colour)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Who we are',
      fields: [
        { key: 'storyPhoto', label: 'Photo', path: ['storyPhoto'], type: 'image' },
        { key: 'storyPhotoAlt', label: 'Photo description (for accessibility)', path: ['storyPhotoAlt'] },
        { key: 'storyPhotoCaption', label: 'Caption on photo', path: ['storyPhotoCaption'] },
        { key: 'story.eyebrow', label: 'Eyebrow', path: ['story', 'eyebrow'] },
        { key: 'story.titleLine1', label: 'Heading line 1', path: ['story', 'titleLine1'] },
        { key: 'story.titleLine2', label: 'Heading line 2', path: ['story', 'titleLine2'] },
        { key: 'story.paragraph1', label: 'Paragraph 1', path: ['story', 'paragraph1'], long: true },
        { key: 'story.paragraph2', label: 'Paragraph 2', path: ['story', 'paragraph2'], long: true },
        { key: 'story.paragraph3', label: 'Paragraph 3', path: ['story', 'paragraph3'], long: true },
      ],
    },
    {
      label: 'What guides us',
      fields: [
        { key: 'valuesSection.eyebrow', label: 'Eyebrow', path: ['valuesSection', 'eyebrow'] },
        { key: 'valuesSection.titleLine1', label: 'Heading line 1', path: ['valuesSection', 'titleLine1'] },
        { key: 'valuesSection.titleLine2', label: 'Heading line 2', path: ['valuesSection', 'titleLine2'] },
        { key: 'values.0.number', label: 'Value 1 number', path: ['values', 0, 'number'] },
        { key: 'values.0.title', label: 'Value 1 title', path: ['values', 0, 'title'] },
        { key: 'values.0.text', label: 'Value 1 text', path: ['values', 0, 'text'], long: true },
        { key: 'values.1.number', label: 'Value 2 number', path: ['values', 1, 'number'] },
        { key: 'values.1.title', label: 'Value 2 title', path: ['values', 1, 'title'] },
        { key: 'values.1.text', label: 'Value 2 text', path: ['values', 1, 'text'], long: true },
        { key: 'values.2.number', label: 'Value 3 number', path: ['values', 2, 'number'] },
        { key: 'values.2.title', label: 'Value 3 title', path: ['values', 2, 'title'] },
        { key: 'values.2.text', label: 'Value 3 text', path: ['values', 2, 'text'], long: true },
      ],
    },
    {
      label: 'Our mission',
      fields: [
        { key: 'mission.eyebrow', label: 'Eyebrow', path: ['mission', 'eyebrow'] },
        { key: 'mission.titleLine1', label: 'Heading line 1', path: ['mission', 'titleLine1'] },
        { key: 'mission.titleLine2', label: 'Heading line 2', path: ['mission', 'titleLine2'] },
        { key: 'mission.lead', label: 'Lead paragraph', path: ['mission', 'lead'], long: true },
        { key: 'mission.body', label: 'Second paragraph', path: ['mission', 'body'], long: true },
        { key: 'mission.buttonText', label: 'Button text', path: ['mission', 'buttonText'] },
        { key: 'mission.buttonLink', label: 'Button path', path: ['mission', 'buttonLink'], hint: 'e.g. plan (no slashes)' },
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
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent colour, optional)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Comfort tabs',
      panel: 'comfort-levels',
      fields: [
        { key: 'comfortSection.eyebrow', label: 'Eyebrow', path: ['comfortSection', 'eyebrow'] },
        { key: 'comfortSection.titleLine1', label: 'Heading line 1', path: ['comfortSection', 'titleLine1'] },
        { key: 'comfortSection.titleLine2', label: 'Heading line 2', path: ['comfortSection', 'titleLine2'] },
        { key: 'comfortSection.introLine1', label: 'Intro line 1 (right column)', path: ['comfortSection', 'introLine1'] },
        { key: 'comfortSection.introLine2', label: 'Intro line 2', path: ['comfortSection', 'introLine2'] },
      ],
    },
    {
      label: 'Thoughtful balance',
      fields: [
        { key: 'balanceSection.eyebrow', label: 'Eyebrow', path: ['balanceSection', 'eyebrow'] },
        { key: 'balanceSection.titleLine1', label: 'Heading line 1', path: ['balanceSection', 'titleLine1'] },
        { key: 'balanceSection.titleLine2', label: 'Heading line 2', path: ['balanceSection', 'titleLine2'] },
        { key: 'balanceSection.lead', label: 'Lead paragraph', path: ['balanceSection', 'lead'], long: true },
        { key: 'balanceSection.body', label: 'Second paragraph', path: ['balanceSection', 'body'], long: true },
        { key: 'balanceSection.linkText', label: 'Link text', path: ['balanceSection', 'linkText'] },
        {
          key: 'balanceSection.linkPath',
          label: 'Link path',
          path: ['balanceSection', 'linkPath'],
          hint: 'e.g. safaris?style=Camping',
        },
      ],
    },
  ],
  destinations: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent colour, optional)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Destination cards',
      panel: 'home-places',
      fields: [
        {
          key: 'grid.placeEyebrowLabel',
          label: 'Label on park cards',
          path: ['grid', 'placeEyebrowLabel'],
          hint: 'Shown as 01 / EXPLORE, 02 / EXPLORE, … Order and copy: table below.',
        },
      ],
    },
    {
      label: 'Kilimanjaro & Zanzibar tiles',
      fields: [
        { key: 'extraTiles.0.eyebrow', label: 'Tile 1 eyebrow', path: ['extraTiles', 0, 'eyebrow'] },
        { key: 'extraTiles.0.title', label: 'Tile 1 title', path: ['extraTiles', 0, 'title'] },
        { key: 'extraTiles.0.tag', label: 'Tile 1 subtitle', path: ['extraTiles', 0, 'tag'] },
        { key: 'extraTiles.0.photo', label: 'Tile 1 photo', path: ['extraTiles', 0, 'photo'], type: 'image' },
        { key: 'extraTiles.0.path', label: 'Tile 1 path', path: ['extraTiles', 0, 'path'], hint: 'e.g. kilimanjaro' },
        { key: 'extraTiles.1.eyebrow', label: 'Tile 2 eyebrow', path: ['extraTiles', 1, 'eyebrow'] },
        { key: 'extraTiles.1.title', label: 'Tile 2 title', path: ['extraTiles', 1, 'title'] },
        { key: 'extraTiles.1.tag', label: 'Tile 2 subtitle', path: ['extraTiles', 1, 'tag'] },
        { key: 'extraTiles.1.photo', label: 'Tile 2 photo', path: ['extraTiles', 1, 'photo'], type: 'image' },
        { key: 'extraTiles.1.path', label: 'Tile 2 path', path: ['extraTiles', 1, 'path'], hint: 'e.g. zanzibar' },
      ],
    },
  ],
  experiences: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent colour)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Experience rows',
      panel: 'experiences-list',
      fields: [
        {
          key: 'list.buttonText',
          label: 'Button text (all rows)',
          path: ['list', 'buttonText'],
          hint: 'Each row’s title, photo and text: Content → Experiences.',
        },
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
    const nextKey = path[i + 1];
    const needsArray = typeof nextKey === 'number';
    if (cur[key] == null || typeof cur[key] !== 'object') {
      cur[key] = needsArray ? [] : {};
    }
    cur = cur[key];
  }
  cur[path[path.length - 1]] = value;
}
