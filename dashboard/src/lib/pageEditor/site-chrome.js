/** Header & footer editor. Paths match src/content/siteChromeDefaults.js. */
import { LINK_HINT, list, long, text } from './fields.js';

const linkItem = [text('label', 'Text'), text('link', 'Link', { hint: LINK_HINT })];

export default [
  {
    label: 'Contact details',
    hint: 'Used in the footer, the Plan page, journey pages and WhatsApp buttons across the site.',
    fields: [
      text('email', 'Email'),
      text('phone', 'Phone (as shown)'),
      text('phoneE164', 'Phone for the call link', { hint: 'Digits only with country code, e.g. 255796086799.' }),
      text('whatsapp', 'WhatsApp number', { hint: 'Digits only with country code, e.g. 255796086799.' }),
      text('officeLocation', 'Office location'),
      text('officeHours', 'Office hours'),
    ],
  },
  {
    label: 'Final invite band',
    hint: 'The green band near the bottom of the homepage and About page.',
    fields: [
      long('finalCtaTitle', 'Heading', { hint: 'The second line shows in a lighter colour.' }),
      text('finalCtaButton', 'Button text'),
      text('finalCtaLink', 'Button link', { hint: LINK_HINT }),
    ],
  },
  {
    label: 'Footer',
    fields: [
      text('footerHeadline', 'Headline under the logo'),
      long('footerLede', 'Text under the headline'),
      text('footerWhatsappText', 'WhatsApp button text'),
      text('footerColumn1Title', 'Column 1 heading'),
      list('footerColumn1Links', 'Column 1 links', linkItem, { itemLabel: 'link', itemTitleKey: 'label' }),
      text('footerColumn2Title', 'Column 2 heading'),
      list('footerColumn2Links', 'Column 2 links', linkItem, { itemLabel: 'link', itemTitleKey: 'label' }),
      text('footerContactTitle', 'Contact column heading'),
      text('footerCopyright', 'Name after ©'),
      text('termsText', 'Booking terms link text'),
      text('termsUrl', 'Booking terms link', { hint: 'Full https:// address.' }),
    ],
  },
];
