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
        { key: 'welcome.titleLine1', label: 'Title line 1', path: ['welcome', 'titleLine1'] },
        { key: 'welcome.titleLine2', label: 'Title line 2', path: ['welcome', 'titleLine2'] },
        { key: 'welcome.titleLine3Accent', label: 'Title line 3 (accent colour)', path: ['welcome', 'titleLine3Accent'] },
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
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Sidebar (local team)',
      fields: [
        { key: 'aside.eyebrow', label: 'Eyebrow', path: ['aside', 'eyebrow'] },
        { key: 'aside.titleLine1', label: 'Heading line 1', path: ['aside', 'titleLine1'] },
        { key: 'aside.titleLine2', label: 'Heading line 2', path: ['aside', 'titleLine2'] },
        { key: 'aside.intro', label: 'Intro', path: ['aside', 'intro'], long: true },
        { key: 'aside.step1Title', label: 'Step 1 title', path: ['aside', 'step1Title'] },
        { key: 'aside.step1Detail', label: 'Step 1 detail', path: ['aside', 'step1Detail'] },
        { key: 'aside.step2Title', label: 'Step 2 title', path: ['aside', 'step2Title'] },
        { key: 'aside.step2Detail', label: 'Step 2 detail', path: ['aside', 'step2Detail'] },
        { key: 'aside.step3Title', label: 'Step 3 title', path: ['aside', 'step3Title'] },
        { key: 'aside.step3Detail', label: 'Step 3 detail', path: ['aside', 'step3Detail'] },
      ],
    },
    {
      label: 'Form & preview',
      fields: [
        { key: 'form.eyebrow', label: 'Form eyebrow', path: ['form', 'eyebrow'] },
        { key: 'form.whatsappButton', label: 'Primary button (WhatsApp)', path: ['form', 'whatsappButton'] },
        { key: 'form.emailButton', label: 'Secondary button (email)', path: ['form', 'emailButton'] },
        { key: 'form.fineprint', label: 'Below buttons', path: ['form', 'fineprint'], long: true },
        { key: 'form.previewTitle', label: 'Preview heading', path: ['form', 'previewTitle'] },
        { key: 'form.previewIntro', label: 'Preview intro', path: ['form', 'previewIntro'], long: true },
        { key: 'form.whatsappOpen', label: 'Open WhatsApp label', path: ['form', 'whatsappOpen'] },
        { key: 'form.emailOpen', label: 'Open email label', path: ['form', 'emailOpen'] },
        { key: 'form.copyLabel', label: 'Copy button', path: ['form', 'copyLabel'] },
      ],
    },
  ],
  safaris: [
    {
      label: 'Page head',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Filters & sidebar',
      fields: [
        { key: 'catalogue.asideHeading', label: 'Sidebar heading', path: ['catalogue', 'asideHeading'] },
        { key: 'catalogue.searchLabel', label: 'Search label', path: ['catalogue', 'searchLabel'] },
        { key: 'catalogue.searchPlaceholder', label: 'Search placeholder', path: ['catalogue', 'searchPlaceholder'] },
        { key: 'catalogue.styleLabel', label: 'Comfort label', path: ['catalogue', 'styleLabel'] },
        { key: 'catalogue.durationLabel', label: 'Duration label', path: ['catalogue', 'durationLabel'] },
        { key: 'catalogue.sortLabel', label: 'Sort label', path: ['catalogue', 'sortLabel'] },
        { key: 'catalogue.clearFilters', label: 'Clear filters', path: ['catalogue', 'clearFilters'] },
        { key: 'catalogue.helpHeading', label: 'Help box heading', path: ['catalogue', 'helpHeading'] },
        { key: 'catalogue.helpText', label: 'Help box text', path: ['catalogue', 'helpText'], long: true },
        { key: 'catalogue.helpButton', label: 'Help button', path: ['catalogue', 'helpButton'] },
        { key: 'catalogue.resultSuffixSingular', label: 'Count suffix (1 journey)', path: ['catalogue', 'resultSuffixSingular'] },
        { key: 'catalogue.resultSuffixPlural', label: 'Count suffix (many)', path: ['catalogue', 'resultSuffixPlural'] },
        { key: 'catalogue.tailorLine', label: 'Tagline above grid', path: ['catalogue', 'tailorLine'] },
        { key: 'catalogue.midrangeNotice', label: 'Midrange notice', path: ['catalogue', 'midrangeNotice'], long: true },
        { key: 'catalogue.emptyHeading', label: 'Empty state heading', path: ['catalogue', 'emptyHeading'] },
        { key: 'catalogue.emptyText', label: 'Empty state text', path: ['catalogue', 'emptyText'], long: true },
      ],
    },
    {
      label: 'Safari journeys',
      panel: 'tours-list',
      fields: [],
    },
  ],
  kilimanjaro: [
    {
      label: 'Hero',
      fields: [
        { key: 'label', label: 'Eyebrow', path: ['label'] },
        { key: 'titleLine1', label: 'Title line 1', path: ['titleLine1'] },
        { key: 'titleLine2', label: 'Title line 2 (accent)', path: ['titleLine2'] },
        { key: 'text', label: 'Intro', path: ['text'], long: true },
        { key: 'photo', label: 'Photo', path: ['photo'], type: 'image' },
      ],
    },
    {
      label: 'Story & CTA',
      fields: [
        { key: 'splitSection.eyebrow', label: 'Eyebrow', path: ['splitSection', 'eyebrow'] },
        { key: 'splitSection.titleLine1', label: 'Heading line 1', path: ['splitSection', 'titleLine1'] },
        { key: 'splitSection.titleLine2', label: 'Heading line 2', path: ['splitSection', 'titleLine2'] },
        { key: 'splitSection.lead', label: 'Lead', path: ['splitSection', 'lead'], long: true },
        { key: 'splitSection.body', label: 'Body', path: ['splitSection', 'body'], long: true },
        { key: 'splitSection.buttonText', label: 'Button text', path: ['splitSection', 'buttonText'] },
        { key: 'splitSection.buttonInterest', label: 'Plan form interest', path: ['splitSection', 'buttonInterest'], hint: 'Matches Plan page dropdown' },
      ],
    },
    {
      label: 'Three steps',
      fields: [
        { key: 'blocks.0.0', label: 'Step 1 title', path: ['blocks', 0, 0] },
        { key: 'blocks.0.1', label: 'Step 1 text', path: ['blocks', 0, 1], long: true },
        { key: 'blocks.1.0', label: 'Step 2 title', path: ['blocks', 1, 0] },
        { key: 'blocks.1.1', label: 'Step 2 text', path: ['blocks', 1, 1], long: true },
        { key: 'blocks.2.0', label: 'Step 3 title', path: ['blocks', 2, 0] },
        { key: 'blocks.2.1', label: 'Step 3 text', path: ['blocks', 2, 1], long: true },
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
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2 (accent)', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
      ],
    },
    {
      label: 'Sidebar',
      fields: [
        { key: 'aside.eyebrow', label: 'Eyebrow', path: ['aside', 'eyebrow'] },
        { key: 'aside.title', label: 'Heading', path: ['aside', 'title'] },
        { key: 'aside.intro', label: 'Intro', path: ['aside', 'intro'], long: true },
        { key: 'aside.buttonText', label: 'Button text', path: ['aside', 'buttonText'] },
        { key: 'aside.buttonPath', label: 'Button path', path: ['aside', 'buttonPath'], hint: 'e.g. plan' },
      ],
    },
    {
      label: 'FAQ list',
      panel: 'home-faq',
      fields: [],
    },
  ],
  zanzibar: [
    {
      label: 'Hero',
      fields: [
        { key: 'label', label: 'Eyebrow', path: ['label'] },
        { key: 'titleLine1', label: 'Title line 1', path: ['titleLine1'] },
        { key: 'titleLine2', label: 'Title line 2 (accent)', path: ['titleLine2'] },
        { key: 'text', label: 'Intro', path: ['text'], long: true },
        { key: 'photo', label: 'Photo', path: ['photo'], type: 'image' },
      ],
    },
    {
      label: 'Story & CTA',
      fields: [
        { key: 'splitSection.eyebrow', label: 'Eyebrow', path: ['splitSection', 'eyebrow'] },
        { key: 'splitSection.titleLine1', label: 'Heading line 1', path: ['splitSection', 'titleLine1'] },
        { key: 'splitSection.titleLine2', label: 'Heading line 2', path: ['splitSection', 'titleLine2'] },
        { key: 'splitSection.lead', label: 'Lead', path: ['splitSection', 'lead'], long: true },
        { key: 'splitSection.body', label: 'Body', path: ['splitSection', 'body'], long: true },
        { key: 'splitSection.buttonText', label: 'Button text', path: ['splitSection', 'buttonText'] },
        { key: 'splitSection.buttonInterest', label: 'Plan form interest', path: ['splitSection', 'buttonInterest'] },
      ],
    },
    {
      label: 'Three steps',
      fields: [
        { key: 'blocks.0.0', label: 'Step 1 title', path: ['blocks', 0, 0] },
        { key: 'blocks.0.1', label: 'Step 1 text', path: ['blocks', 0, 1], long: true },
        { key: 'blocks.1.0', label: 'Step 2 title', path: ['blocks', 1, 0] },
        { key: 'blocks.1.1', label: 'Step 2 text', path: ['blocks', 1, 1], long: true },
        { key: 'blocks.2.0', label: 'Step 3 title', path: ['blocks', 2, 0] },
        { key: 'blocks.2.1', label: 'Step 3 text', path: ['blocks', 2, 1], long: true },
      ],
    },
    {
      label: 'Related safaris',
      panel: 'tours-list',
      fields: [
        { key: 'relatedSection.title', label: 'Section heading', path: ['relatedSection', 'title'] },
        { key: 'relatedSection.linkText', label: 'Link text', path: ['relatedSection', 'linkText'] },
        { key: 'relatedSection.linkPath', label: 'Link path', path: ['relatedSection', 'linkPath'], hint: 'e.g. safaris?q=Zanzibar' },
      ],
    },
  ],
  place_detail: [
    {
      label: 'Intro (shared)',
      fields: [
        { key: 'head.label', label: 'Eyebrow (prefix before place name)', path: ['head', 'label'] },
      ],
    },
    {
      label: 'Story section',
      fields: [
        { key: 'story.eyebrow', label: 'Eyebrow', path: ['story', 'eyebrow'] },
        { key: 'story.titleLine1', label: 'Heading line 1', path: ['story', 'titleLine1'] },
        { key: 'story.titleLine2', label: 'Heading line 2', path: ['story', 'titleLine2'] },
        { key: 'searchButton', label: 'Search journeys button', path: ['searchButton'] },
      ],
    },
    {
      label: 'Related journeys',
      fields: [
        { key: 'related.heading', label: 'Section heading', path: ['related', 'heading'] },
        { key: 'related.planLinkText', label: 'Plan link text', path: ['related', 'planLinkText'] },
      ],
    },
    {
      label: 'Empty state',
      fields: [
        { key: 'empty.heading', label: 'Heading', path: ['empty', 'heading'] },
        { key: 'empty.text', label: 'Text', path: ['empty', 'text'], long: true },
        { key: 'empty.button', label: 'Button', path: ['empty', 'button'] },
      ],
    },
    {
      label: 'Place records',
      panel: 'home-places',
      fields: [],
    },
  ],
  journey_detail: [
    {
      label: 'Anchor nav',
      fields: [
        { key: 'anchors.overview', label: 'Overview', path: ['anchors', 'overview'] },
        { key: 'anchors.itinerary', label: 'Itinerary', path: ['anchors', 'itinerary'] },
        { key: 'anchors.stays', label: 'Stays', path: ['anchors', 'stays'] },
        { key: 'anchors.included', label: 'Inclusions', path: ['anchors', 'included'] },
        { key: 'anchors.enquire', label: 'Enquire', path: ['anchors', 'enquire'] },
      ],
    },
    {
      label: 'Overview section',
      fields: [
        { key: 'overview.eyebrow', label: 'Eyebrow', path: ['overview', 'eyebrow'] },
        { key: 'overview.titleLine1', label: 'Heading line 1', path: ['overview', 'titleLine1'] },
        { key: 'overview.titleLine2', label: 'Heading line 2', path: ['overview', 'titleLine2'] },
        { key: 'overview.durationLabel', label: 'Duration label', path: ['overview', 'durationLabel'] },
        { key: 'overview.durationSuffix', label: 'Duration suffix', path: ['overview', 'durationSuffix'] },
        { key: 'overview.styleLabel', label: 'Style label', path: ['overview', 'styleLabel'] },
        { key: 'overview.planningLabel', label: 'Planning label', path: ['overview', 'planningLabel'] },
        { key: 'overview.planningValue', label: 'Planning value', path: ['overview', 'planningValue'] },
      ],
    },
    {
      label: 'Day by day',
      fields: [
        { key: 'itinerary.eyebrow', label: 'Eyebrow', path: ['itinerary', 'eyebrow'] },
        { key: 'itinerary.title', label: 'Section title', path: ['itinerary', 'title'] },
        { key: 'itinerary.expandLabel', label: 'Expand button', path: ['itinerary', 'expandLabel'] },
        { key: 'itinerary.collapseLabel', label: 'Collapse button', path: ['itinerary', 'collapseLabel'] },
        { key: 'itinerary.dayPrefix', label: 'Day prefix', path: ['itinerary', 'dayPrefix'] },
        { key: 'itinerary.noItinerary', label: 'Fallback text', path: ['itinerary', 'noItinerary'], long: true },
      ],
    },
    {
      label: 'Stays',
      fields: [
        { key: 'stays.eyebrow', label: 'Eyebrow', path: ['stays', 'eyebrow'] },
        { key: 'stays.title', label: 'Heading', path: ['stays', 'title'] },
        { key: 'stays.fallback', label: 'No stays text', path: ['stays', 'fallback'], long: true },
        { key: 'stays.fineprint', label: 'Fine print', path: ['stays', 'fineprint'], long: true },
        { key: 'stays.askLink', label: 'Ask accommodation link', path: ['stays', 'askLink'] },
      ],
    },
    {
      label: 'Inclusions',
      fields: [
        { key: 'inclusions.includedEyebrow', label: 'Included eyebrow', path: ['inclusions', 'includedEyebrow'] },
        { key: 'inclusions.includedTitle', label: 'Included title', path: ['inclusions', 'includedTitle'] },
        { key: 'inclusions.includedFallback', label: 'Included fallback', path: ['inclusions', 'includedFallback'], long: true },
        { key: 'inclusions.excludedEyebrow', label: 'Excluded eyebrow', path: ['inclusions', 'excludedEyebrow'] },
        { key: 'inclusions.excludedTitle', label: 'Excluded title', path: ['inclusions', 'excludedTitle'] },
        { key: 'inclusions.excludedFallback', label: 'Excluded fallback', path: ['inclusions', 'excludedFallback'], long: true },
        { key: 'inclusions.activitiesNote', label: 'Bottom note', path: ['inclusions', 'activitiesNote'], long: true },
      ],
    },
    {
      label: 'Quotation sidebar',
      fields: [
        { key: 'quotation.eyebrow', label: 'Eyebrow', path: ['quotation', 'eyebrow'] },
        { key: 'quotation.titleLine1', label: 'Heading line 1', path: ['quotation', 'titleLine1'] },
        { key: 'quotation.titleLine2', label: 'Heading line 2', path: ['quotation', 'titleLine2'] },
        { key: 'quotation.groupLabel', label: 'Group size label', path: ['quotation', 'groupLabel'] },
        { key: 'quotation.priceUnit', label: 'Price unit', path: ['quotation', 'priceUnit'] },
        { key: 'quotation.priceFineprint', label: 'Price fine print', path: ['quotation', 'priceFineprint'], long: true },
        { key: 'quotation.noTiers', label: 'No price tiers text', path: ['quotation', 'noTiers'], long: true },
        { key: 'quotation.enquireButton', label: 'Enquire button', path: ['quotation', 'enquireButton'] },
        { key: 'quotation.whatsappPrefix', label: 'WhatsApp message prefix', path: ['quotation', 'whatsappPrefix'] },
        { key: 'quotation.whatsappLink', label: 'WhatsApp link text', path: ['quotation', 'whatsappLink'] },
        { key: 'quotation.noteHeading', label: 'Note heading', path: ['quotation', 'noteHeading'] },
        { key: 'quotation.noteText', label: 'Note text', path: ['quotation', 'noteText'], long: true },
      ],
    },
    {
      label: 'Related section',
      fields: [
        { key: 'related.heading', label: 'Related heading', path: ['related', 'heading'] },
        { key: 'related.linkText', label: 'Related link', path: ['related', 'linkText'] },
        { key: 'related.linkPath', label: 'Related path', path: ['related', 'linkPath'] },
      ],
    },
    {
      label: 'Tour records',
      panel: 'tours-list',
      fields: [],
    },
  ],
  not_found: [
    {
      label: 'Page',
      fields: [
        { key: 'head.label', label: 'Eyebrow', path: ['head', 'label'] },
        { key: 'head.titleLine1', label: 'Title line 1', path: ['head', 'titleLine1'] },
        { key: 'head.titleLine2', label: 'Title line 2', path: ['head', 'titleLine2'] },
        { key: 'head.text', label: 'Intro', path: ['head', 'text'], long: true },
        { key: 'button', label: 'Button text', path: ['button'] },
        { key: 'buttonPath', label: 'Button path', path: ['buttonPath'] },
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
