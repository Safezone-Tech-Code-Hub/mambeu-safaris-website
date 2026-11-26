import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { submitEnquiry } from '../lib/enquiry.js';
import { experiences as experienceCatalog } from '../lib/experiences.js';
import {
  formatInterests,
  KIND_LABEL,
  prefillMessage,
  resolveInterests,
  searchParamsWithoutInterest,
} from '../lib/plan-prefill.js';

/**
 * Values sent with an enquiry and matched by plan links (?style=Luxury, destination
 * Kilimanjaro, …). The visible labels come from the CMS (form.*Options), paired by position.
 */
const PLAN_OPTION_VALUES = {
  days: ['Not sure yet', '2–4 days', '5–6 days', '7–9 days', '10+ days'],
  style: ['Comfort', 'Midrange', 'Luxury', 'Camping', 'Please advise me'],
  interest: [
    'Wildlife safari',
    'Safari and beach',
    'Kilimanjaro',
    'Zanzibar',
    'Family',
    'Romantic',
    'Balloon',
    'Cultural experiences',
  ],
};

/** @param {{ name: keyof typeof PLAN_OPTION_VALUES; labels: string[] }} props */
function PlanOptions({ name, labels }) {
  return PLAN_OPTION_VALUES[name].map((value, i) => (
    <option key={value} value={value}>
      {String(labels?.[i] ?? '').trim() || value}
    </option>
  ));
}

/** @param {{ children: import('react').ReactNode; htmlFor: string; required?: boolean }} props */
function PlanLabel({ children, htmlFor, required = false }) {
  return (
    <label className="plan-label" htmlFor={htmlFor}>
      {children}
      {required ? (
        <span className="plan-req" aria-hidden="true">
          {' '}
          *
        </span>
      ) : null}
    </label>
  );
}

export default function Plan() {
  const { pages, tours } = useCms();
  const contact = siteChrome(pages);
  const plan = pages.plan;
  const { form, preview, aside } = plan;
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef(null);
  const messageRef = useRef(null);
  const lastPrefill = useRef('');
  const [interests, setInterests] = useState([]);
  const [previewHidden, setPreviewHidden] = useState(true);
  const [enquiryText, setEnquiryText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  /** '' | 'saving' | 'saved' | 'error' — PocketBase inbox after Prepare … */
  const [inboxStatus, setInboxStatus] = useState('');
  const [whatsappHref, setWhatsappHref] = useState(`https://wa.me/${contact.whatsapp}`);
  const [emailHref, setEmailHref] = useState(`mailto:${contact.email}`);
  const previewRef = useRef(null);
  const phoneTel = contact.phoneE164 || contact.whatsapp;

  useEffect(() => {
    const next = resolveInterests(searchParams, { tours });
    setInterests(next);

    const styleEl = document.getElementById('plan-style');
    const journeyEl = document.getElementById('journey');
    const interestEl = document.getElementById('interest');
    const messageEl = messageRef.current;
    const dateEl = document.getElementById('date');

    const setSelect = (el, value) => {
      if (!el || !value) return;
      if (el.tagName === 'SELECT' && ![...el.options].some((o) => o.value === value)) return;
      el.value = value;
    };

    if (searchParams.has('style')) setSelect(styleEl, searchParams.get('style'));
    if (searchParams.has('interest') && interestEl) {
      const v = searchParams.get('interest');
      if ([...interestEl.options].some((o) => o.value === v)) interestEl.value = v;
    }

    const journeys = next.filter((i) => i.kind === 'journey');
    if (journeys.length && journeyEl && !String(journeyEl.value || '').trim()) {
      journeyEl.value = journeys.map((i) => i.title).join(', ');
    }
    if (journeys.length === 1) {
      const tour = (tours || []).find(
        (t) => t.slug === journeys[0].slug || t.path === journeys[0].slug,
      );
      if (tour?.style) setSelect(styleEl, tour.style);
    }

    const dest = next.find((i) => i.kind === 'destination');
    if (dest && ['Kilimanjaro', 'Zanzibar'].includes(dest.title)) {
      setSelect(interestEl, dest.title);
    }
    const exp = next.find((i) => i.kind === 'experience');
    if (exp && !dest) {
      const row = experienceCatalog.find((e) => e.slug === exp.slug);
      const byCategory = {
        Family: 'Family',
        Couples: 'Romantic',
        Culture: 'Cultural experiences',
        Coast: 'Zanzibar',
        Adventure: exp.slug === 'hot-air-balloon' ? 'Balloon' : null,
      };
      setSelect(interestEl, byCategory[row?.category] || null);
    }

    const auto = prefillMessage(next);
    if (messageEl) {
      const current = String(messageEl.value || '');
      if (!current.trim() || current === lastPrefill.current) {
        messageEl.value = auto;
        lastPrefill.current = auto;
      }
    }

    if (dateEl) {
      const today = new Date();
      dateEl.min = today.toLocaleDateString('en-CA', { timeZone: 'Africa/Dar_es_Salaam' });
    }
  }, [searchParams, tours]);

  const fieldLabel = {
    days: 'Trip length',
    style: 'Safari style',
  };

  const buildMessage = (values) =>
    `${form.messageIntro}\n\n` +
    Object.entries(values)
      .filter(([k, v]) => k !== 'website' && String(v).trim())
      .map(
        ([k, v]) =>
          (fieldLabel[k] || k.charAt(0).toUpperCase() + k.slice(1)) +
          ': ' +
          String(v).trim(),
      )
      .join('\n');

  const removeInterest = (item) => {
    const remaining = interests.filter(
      (x) => !(x.kind === item.kind && x.slug === item.slug),
    );
    setInterests(remaining);
    setSearchParams(searchParamsWithoutInterest(searchParams, item, { tours }), {
      replace: true,
    });
    const messageEl = messageRef.current;
    if (messageEl) {
      const current = String(messageEl.value || '');
      if (!current.trim() || current === lastPrefill.current) {
        const auto = prefillMessage(remaining);
        messageEl.value = auto;
        lastPrefill.current = auto;
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const filledHoneypot = Boolean(String(form.elements.website?.value || '').trim());
    const raw = Object.fromEntries(new FormData(form));
    const { website: _website, ...values } = raw;
    const msg = buildMessage(values);
    setEnquiryText(msg);
    setWhatsappHref('https://wa.me/' + contact.whatsapp + '?text=' + encodeURIComponent(msg));
    setEmailHref(
      'mailto:' + contact.email + '?subject=' +
        encodeURIComponent('Safari enquiry from ' + values.name) +
        '&body=' +
        encodeURIComponent(msg),
    );
    setPreviewHidden(false);
    setCopyStatus('');
    if (filledHoneypot) {
      setInboxStatus('');
    } else {
      setInboxStatus('saving');
      submitEnquiry(values)
        .then(() => setInboxStatus('saved'))
        .catch(() => setInboxStatus('error'));
    }
    const channel = e.nativeEvent.submitter?.value || 'whatsapp';
    requestAnimationFrame(() => {
      document.getElementById('send-' + channel)?.focus();
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const onCopy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error();
      await navigator.clipboard.writeText(enquiryText);
      setCopyStatus(preview.copied);
    } catch {
      const pre = document.getElementById('enquiry-text');
      if (pre) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyStatus(preview.copyFallback);
    }
  };

  return (
    <main id="main" className="plan">
      <PageHeader
        id="plan-heading"
        compact
        eyebrow={plan.head.label}
        title={
          <>
            {plan.head.titleLine1}
            <br />
            <span className="page-header__quiet">{plan.head.titleLine2}</span>
          </>
        }
        description={plan.head.text}
      />

      <section className="plan-body" aria-labelledby="plan-form-title">
        <div className="plan-container plan-body__grid">
          <div className="plan-card">
            <h2 id="plan-form-title" className="plan-card__title">
              {form.title}
            </h2>
            <p className="plan-card__note">{form.requiredNote}</p>

            {interests.length > 0 ? (
              <div className="plan-chips-block" role="region" aria-label={form.chipsTitle}>
                <p className="plan-chips-block__title">{form.chipsTitle}</p>
                <ul className="plan-chips">
                  {interests.map((item) => (
                    <li key={`${item.kind}-${item.slug}`}>
                      <button
                        type="button"
                        className="plan-chip"
                        aria-label={`Remove ${item.title}`}
                        onClick={() => removeInterest(item)}
                      >
                        {KIND_LABEL[item.kind]}: {item.title}
                        <span aria-hidden="true">×</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <form
              id="plan-form"
              ref={formRef}
              className="plan-form"
              action={`mailto:${contact.email}`}
              method="post"
              encType="text/plain"
              onSubmit={onSubmit}
            >
              <div aria-hidden="true" className="plan-hp">
                <label htmlFor="plan-website">Website</label>
                <input
                  id="plan-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {interests.length > 0 ? (
                <input type="hidden" name="interests" value={formatInterests(interests)} />
              ) : null}

              <div role="group" aria-labelledby="plan-g-you" className="plan-group">
                <h3 id="plan-g-you" className="plan-group__title">
                  {form.groupYou}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <PlanLabel htmlFor="name" required>
                      {form.labels.name}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder={form.placeholders.name}
                    />
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="email" required>
                      {form.labels.email}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={200}
                      placeholder={form.placeholders.email}
                    />
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="phone">
                      {form.labels.phone}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={50}
                      placeholder={form.placeholders.phone}
                      aria-describedby={form.hints.phone ? 'plan-hint-phone' : undefined}
                    />
                    {form.hints.phone ? (
                      <p className="plan-hint" id="plan-hint-phone">
                        {form.hints.phone}
                      </p>
                    ) : null}
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="country">
                      {form.labels.country}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      maxLength={100}
                      placeholder={form.placeholders.country}
                    />
                  </div>
                </div>
              </div>

              <div role="group" aria-labelledby="plan-g-trip" className="plan-group">
                <h3 id="plan-g-trip" className="plan-group__title">
                  {form.groupTrip}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <PlanLabel htmlFor="date">
                      {form.labels.date}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="date"
                      name="date"
                      type="date"
                      aria-describedby={form.hints.date ? 'plan-hint-date' : undefined}
                    />
                    {form.hints.date ? (
                      <p className="plan-hint" id="plan-hint-date">
                        {form.hints.date}
                      </p>
                    ) : null}
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="guests" required>
                      {form.labels.guests}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="guests"
                      name="guests"
                      type="number"
                      min={1}
                      max={100}
                      required
                      defaultValue={2}
                    />
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="days">
                      {form.labels.days}
                    </PlanLabel>
                    <select
                      className="plan-select"
                      id="days"
                      name="days"
                      defaultValue="Not sure yet"
                    >
                      <PlanOptions name="days" labels={form.daysOptions} />
                    </select>
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="plan-style">
                      {form.labels.style}
                    </PlanLabel>
                    <select
                      className="plan-select"
                      id="plan-style"
                      name="style"
                      defaultValue="Comfort"
                    >
                      <PlanOptions name="style" labels={form.styleOptions} />
                    </select>
                  </div>
                </div>
              </div>

              <div role="group" aria-labelledby="plan-g-interests" className="plan-group">
                <h3 id="plan-g-interests" className="plan-group__title">
                  {form.groupInterests}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <PlanLabel htmlFor="interest">
                      {form.labels.interest}
                    </PlanLabel>
                    <select
                      className="plan-select"
                      id="interest"
                      name="interest"
                      defaultValue="Wildlife safari"
                    >
                      <PlanOptions name="interest" labels={form.interestOptions} />
                    </select>
                  </div>
                  <div className="plan-field">
                    <PlanLabel htmlFor="journey">
                      {form.labels.journey}
                    </PlanLabel>
                    <input
                      className="plan-input"
                      id="journey"
                      name="journey"
                      maxLength={200}
                      placeholder={form.placeholders.journey}
                    />
                  </div>
                  <div className="plan-field plan-field--full">
                    <PlanLabel htmlFor="message">
                      {form.labels.message}
                    </PlanLabel>
                    <textarea
                      className="plan-textarea"
                      id="message"
                      name="message"
                      ref={messageRef}
                      rows={4}
                      maxLength={3000}
                      placeholder={form.placeholders.message}
                    />
                  </div>
                </div>
              </div>

              <div className="plan-actions">
                <button
                  className="plan-btn plan-btn--primary"
                  type="submit"
                  name="channel"
                  value="whatsapp"
                >
                  {form.whatsappButton}
                </button>
                <button
                  className="plan-btn plan-btn--secondary"
                  type="submit"
                  name="channel"
                  value="email"
                >
                  {form.emailButton}
                </button>
              </div>
              <p className="plan-submit-note">
                {form.submitNote}
                {form.replyTime ? ` We usually reply within ${form.replyTime}.` : ''}
              </p>

              <div
                id="enquiry-preview"
                className="plan-preview"
                ref={previewRef}
                hidden={previewHidden}
                aria-live="polite"
              >
                <h3 className="plan-preview__title">{preview.title}</h3>
                <p className="plan-preview__text">{preview.text}</p>
                {inboxStatus ? (
                  <p
                    className={`plan-preview__inbox plan-preview__inbox--${inboxStatus}`}
                    role="status"
                    aria-live="polite"
                  >
                    {inboxStatus === 'saving' && preview.inboxSaving}
                    {inboxStatus === 'saved' && preview.inboxSaved}
                    {inboxStatus === 'error' && preview.inboxError}
                  </p>
                ) : null}
                <pre id="enquiry-text" className="plan-preview__body">
                  {enquiryText}
                </pre>
                <div className="plan-preview__actions">
                  <a
                    id="send-whatsapp"
                    className="plan-btn plan-btn--primary"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {preview.whatsappOpen}
                  </a>
                  <a id="send-email" className="plan-btn plan-btn--secondary" href={emailHref}>
                    {preview.emailOpen}
                  </a>
                  <button
                    className="plan-btn plan-btn--text"
                    type="button"
                    id="copy-enquiry"
                    onClick={onCopy}
                  >
                    {preview.copyLabel}
                  </button>
                </div>
                <p id="copy-status" className="plan-preview__status" role="status">
                  {copyStatus}
                </p>
              </div>
            </form>
          </div>

          <aside className="plan-aside" aria-label="Help planning your safari">
            <h2 className="plan-aside__title">{aside.title}</h2>
            <p className="plan-aside__text">{aside.text}</p>

            <p className="plan-aside__label">{aside.talkLabel}</p>
            <ul className="plan-talk" role="list">
              <li>
                <span className="plan-talk__label">{aside.whatsappLabel}</span>
                <a
                  className="plan-talk__link"
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.phone}
                  <span className="plan-sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <span className="plan-talk__label">{aside.emailLabel}</span>
                <a className="plan-talk__link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="plan-talk__label">{aside.phoneLabel}</span>
                <a className="plan-talk__link" href={`tel:+${phoneTel}`}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="plan-talk__label">{aside.officeLabel}</span>
                <span className="plan-talk__value">
                  {contact.officeLocation}
                  {contact.officeHours ? (
                    <>
                      <br />
                      {contact.officeHours} {aside.hoursSuffix}
                    </>
                  ) : null}
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
