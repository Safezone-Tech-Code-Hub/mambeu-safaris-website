import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useCms } from '../CmsProvider.jsx';
import { planPageDefaults } from '../data/plan-page-defaults.js';
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

function mergePlan(cms) {
  const next = cms && typeof cms === 'object' ? cms : {};
  const head = next.head || {};
  const form = { ...planPageDefaults.form, ...(next.form || {}) };
  return {
    ...planPageDefaults,
    ...next,
    hero: {
      ...planPageDefaults.hero,
      ...(head.label ? { eyebrow: head.label } : {}),
      ...(head.text ? { text: head.text } : {}),
      ...(next.hero || {}),
    },
    form: {
      ...form,
      groups: { ...planPageDefaults.form.groups, ...(form.groups || {}) },
      placeholders: {
        ...planPageDefaults.form.placeholders,
        ...(form.placeholders || {}),
      },
      hints: { ...planPageDefaults.form.hints, ...(form.hints || {}) },
    },
    aside: { ...planPageDefaults.aside, ...(next.aside || {}) },
  };
}

export default function Plan() {
  const { pages, tours } = useCms();
  const contact = siteChrome(pages);
  const plan = mergePlan(pages.plan);
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef(null);
  const messageRef = useRef(null);
  const lastPrefill = useRef('');
  const [interests, setInterests] = useState([]);
  const [previewHidden, setPreviewHidden] = useState(true);
  const [enquiryText, setEnquiryText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [whatsappHref, setWhatsappHref] = useState('https://wa.me/255796086799');
  const [emailHref, setEmailHref] = useState('mailto:info@mambeusafaris.com');
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
    'Hello Mambeu Safaris, I would like to plan a journey.\n\n' +
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
    if (!filledHoneypot) {
      submitEnquiry(values).catch(() => {
        /* inbox is optional; WhatsApp/email remain primary */
      });
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
      setCopyStatus('Enquiry copied.');
    } catch {
      const pre = document.getElementById('enquiry-text');
      if (pre) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyStatus('Message selected. Copy it using your device’s copy command.');
    }
  };

  return (
    <main id="main" className="plan">
      <PageHeader
        id="plan-heading"
        compact
        eyebrow={plan.hero.eyebrow}
        title={
          <>
            {plan.hero.titleLine1}
            <br />
            <span className="page-header__quiet">{plan.hero.titleLine2}</span>
          </>
        }
        description={plan.hero.text}
      />

      <section className="plan-body" aria-labelledby="plan-form-title">
        <div className="plan-container plan-body__grid">
          <div className="plan-card">
            <h2 id="plan-form-title" className="plan-card__title">
              {plan.form.title}
            </h2>
            <p className="plan-card__note">{plan.form.requiredNote}</p>

            {interests.length > 0 ? (
              <div className="plan-chips-block" role="region" aria-label={plan.form.chipsTitle}>
                <p className="plan-chips-block__title">{plan.form.chipsTitle}</p>
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
                  {plan.form.groups.you}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="name">
                      Your name
                      <span className="plan-req" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      className="plan-input"
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder={plan.form.placeholders.name}
                    />
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="email">
                      Email address
                      <span className="plan-req" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </label>
                    <input
                      className="plan-input"
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={200}
                      placeholder={plan.form.placeholders.email}
                    />
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="phone">
                      Phone / WhatsApp
                    </label>
                    <input
                      className="plan-input"
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={50}
                      placeholder={plan.form.placeholders.phone}
                      aria-describedby={plan.form.hints.phone ? 'plan-hint-phone' : undefined}
                    />
                    {plan.form.hints.phone ? (
                      <p className="plan-hint" id="plan-hint-phone">
                        {plan.form.hints.phone}
                      </p>
                    ) : null}
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="country">
                      Country of residence
                    </label>
                    <input
                      className="plan-input"
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      maxLength={100}
                      placeholder={plan.form.placeholders.country}
                    />
                  </div>
                </div>
              </div>

              <div role="group" aria-labelledby="plan-g-trip" className="plan-group">
                <h3 id="plan-g-trip" className="plan-group__title">
                  {plan.form.groups.trip}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="date">
                      Preferred arrival date
                    </label>
                    <input
                      className="plan-input"
                      id="date"
                      name="date"
                      type="date"
                      aria-describedby={plan.form.hints.date ? 'plan-hint-date' : undefined}
                    />
                    {plan.form.hints.date ? (
                      <p className="plan-hint" id="plan-hint-date">
                        {plan.form.hints.date}
                      </p>
                    ) : null}
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="guests">
                      Number of travellers
                      <span className="plan-req" aria-hidden="true">
                        {' '}
                        *
                      </span>
                    </label>
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
                    <label className="plan-label" htmlFor="days">
                      Trip length
                    </label>
                    <select
                      className="plan-select"
                      id="days"
                      name="days"
                      defaultValue="Not sure yet"
                    >
                      <option value="Not sure yet">Not sure yet</option>
                      <option value="2–4 days">2 to 4 days</option>
                      <option value="5–6 days">5 to 6 days</option>
                      <option value="7–9 days">7 to 9 days</option>
                      <option value="10+ days">10+ days</option>
                    </select>
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="plan-style">
                      Safari style
                    </label>
                    <select
                      className="plan-select"
                      id="plan-style"
                      name="style"
                      defaultValue="Comfort"
                    >
                      <option>Comfort</option>
                      <option>Midrange</option>
                      <option>Luxury</option>
                      <option>Camping</option>
                      <option>Please advise me</option>
                    </select>
                  </div>
                </div>
              </div>

              <div role="group" aria-labelledby="plan-g-interests" className="plan-group">
                <h3 id="plan-g-interests" className="plan-group__title">
                  {plan.form.groups.interests}
                </h3>
                <div className="plan-grid">
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="interest">
                      Main interest
                    </label>
                    <select
                      className="plan-select"
                      id="interest"
                      name="interest"
                      defaultValue="Wildlife safari"
                    >
                      <option>Wildlife safari</option>
                      <option>Safari and beach</option>
                      <option>Kilimanjaro</option>
                      <option>Zanzibar</option>
                      <option>Family</option>
                      <option>Romantic</option>
                      <option>Balloon</option>
                      <option>Cultural experiences</option>
                    </select>
                  </div>
                  <div className="plan-field">
                    <label className="plan-label" htmlFor="journey">
                      A journey you like (optional)
                    </label>
                    <input
                      className="plan-input"
                      id="journey"
                      name="journey"
                      maxLength={200}
                      placeholder={plan.form.placeholders.journey}
                    />
                  </div>
                  <div className="plan-field plan-field--full">
                    <label className="plan-label" htmlFor="message">
                      Tell us a little more
                    </label>
                    <textarea
                      className="plan-textarea"
                      id="message"
                      name="message"
                      ref={messageRef}
                      rows={4}
                      maxLength={3000}
                      placeholder={plan.form.placeholders.message}
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
                  Prepare WhatsApp enquiry
                </button>
                <button
                  className="plan-btn plan-btn--secondary"
                  type="submit"
                  name="channel"
                  value="email"
                >
                  Prepare email enquiry
                </button>
              </div>
              <p className="plan-submit-note">
                {plan.form.submitNote}
                {plan.form.replyTime ? ` We usually reply within ${plan.form.replyTime}.` : ''}
              </p>

              <div
                id="enquiry-preview"
                className="plan-preview"
                ref={previewRef}
                hidden={previewHidden}
                aria-live="polite"
              >
                <h3 className="plan-preview__title">Your enquiry is ready.</h3>
                <p className="plan-preview__text">
                  Review the details, then choose how to send your message to Mambeu.
                </p>
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
                    Open WhatsApp
                  </a>
                  <a id="send-email" className="plan-btn plan-btn--secondary" href={emailHref}>
                    Open email
                  </a>
                  <button
                    className="plan-btn plan-btn--text"
                    type="button"
                    id="copy-enquiry"
                    onClick={onCopy}
                  >
                    Copy enquiry
                  </button>
                </div>
                <p id="copy-status" className="plan-preview__status" role="status">
                  {copyStatus}
                </p>
              </div>
            </form>
          </div>

          <aside className="plan-aside" aria-label="Help planning your safari">
            <h2 className="plan-aside__title">{plan.aside.title}</h2>
            <p className="plan-aside__text">{plan.aside.text}</p>

            <p className="plan-aside__label">{plan.aside.talkLabel}</p>
            <ul className="plan-talk" role="list">
              <li>
                <span className="plan-talk__label">WhatsApp</span>
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
                <span className="plan-talk__label">Email</span>
                <a className="plan-talk__link" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <span className="plan-talk__label">Phone</span>
                <a className="plan-talk__link" href={`tel:+${phoneTel}`}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <span className="plan-talk__label">Office</span>
                <span className="plan-talk__value">
                  {contact.officeLocation}
                  {contact.officeHours ? (
                    <>
                      <br />
                      {contact.officeHours} EAT
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
