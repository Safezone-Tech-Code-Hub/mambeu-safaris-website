/** Plan / contact enquiry page (code defaults; CMS values override). */
export const planPageDefaults = {
  hero: {
    eyebrow: 'Start the conversation',
    titleLine1: 'Let’s plan',
    titleLine2: 'your safari.',
    text: 'Share a few details and we’ll help shape a personal quotation. You can send your message by WhatsApp or email when you’re ready.',
  },
  form: {
    title: 'Tell us about your trip',
    requiredNote: 'Fields marked * are required. Everything else is optional.',
    groups: { you: 'About you', trip: 'Your trip', interests: 'What you have in mind' },
    chipsTitle: 'You’re asking about',
    submitNote:
      'Review your enquiry below, then send it through WhatsApp or your email app. Nothing is sent until you do.',
    replyTime: '', // e.g. "one working day". Shown only when not empty.
    placeholders: {
      name: 'Your full name',
      email: 'you@example.com',
      phone: '+255 …  (include your country code)',
      country: 'e.g. United Kingdom',
      journey: 'A journey name, or a park you have in mind',
      message:
        'Parks you would like to see, children’s ages, special occasions, anything we should know',
    },
    hints: {
      phone: 'We can reply on WhatsApp if you add your number.',
      date: 'An approximate date is fine. Leave it blank if you are still deciding.',
    },
  },
  aside: {
    title: 'No perfect plan needed.',
    text: 'Share what you know. We’ll help with the rest.',
    talkLabel: 'Prefer to talk?',
  },
};
