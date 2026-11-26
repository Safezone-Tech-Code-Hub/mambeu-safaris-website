/** Page editor tabs for `not_found` (legacy field layout, not yet matched to the redesign). */
export default [
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
];
