import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { submitEnquiry } from '../lib/enquiry.js';

export default function Plan() {
  const { pages } = useCms();
  const contact = siteChrome(pages);
  const head = pages.plan?.head || {};
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);
  const messageRef = useRef(null);
  const [previewHidden, setPreviewHidden] = useState(true);
  const [enquiryText, setEnquiryText] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [whatsappHref, setWhatsappHref] = useState('https://wa.me/255796086799');
  const [emailHref, setEmailHref] = useState('mailto:info@mambeusafaris.com');
  const previewRef = useRef(null);

  useEffect(() => {
    const styleEl = document.getElementById('plan-style');
    const journeyEl = document.getElementById('journey');
    const interestEl = document.getElementById('interest');
    const messageEl = messageRef.current;
    const dateEl = document.getElementById('date');

    ['style', 'journey'].forEach((key) => {
      if (!searchParams.has(key)) return;
      const el = key === 'style' ? styleEl : journeyEl;
      const val = searchParams.get(key);
      if (el?.tagName === 'SELECT' && ![...el.options].some((o) => o.value === val)) return;
      if (el) el.value = val;
    });

    if (searchParams.has('interest') && interestEl) {
      const v = searchParams.get('interest');
      if ([...interestEl.options].some((o) => o.value === v)) interestEl.value = v;
      else if (messageEl) messageEl.value = 'I would like to include ' + v + ' in my journey.';
    }

    if (dateEl) {
      const today = new Date();
      dateEl.min = today.toLocaleDateString('en-CA', { timeZone: 'Africa/Dar_es_Salaam' });
    }
  }, [searchParams]);

  const buildMessage = (form) => {
    const values = Object.fromEntries(new FormData(form));
    return (
      'Hello Mambeu Safaris, I would like to plan a journey.\n\n' +
      Object.entries(values)
        .filter(([, v]) => String(v).trim())
        .map(([k, v]) => k.charAt(0).toUpperCase() + k.slice(1) + ': ' + String(v).trim())
        .join('\n')
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const msg = buildMessage(form);
    const values = Object.fromEntries(new FormData(form));
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
    submitEnquiry(values).catch(() => {
      /* inbox is optional; WhatsApp/email remain primary */
    });
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
    <main id="main">
      <PageHead
        label={head.label || 'LET’S MAKE IT YOURS'}
        title={head.title || 'Your ideas.<br><span class="accent">Our Tanzania.</span>'}
        text={
          head.text ||
          'Tell us what you have in mind. We’ll help shape a journey around your interests, dates and comfort level.'
        }
      />
      <section className="wrap planner-layout">
        <aside>
          <span className="eyebrow">TALK TO YOUR LOCAL TEAM</span>
          <h2>
            No perfect plan
            <br />
            needed.
          </h2>
          <p>Share what you know. We’ll help with the rest.</p>
          <ol className="plan-steps">
            <li>
              <b>Share your ideas</b>
              <span>Your dates, interests and comfort.</span>
            </li>
            <li>
              <b>Shape the journey</b>
              <span>A personal route and quotation.</span>
            </li>
            <li>
              <b>Make it happen</b>
              <span>Confirm the details with our team.</span>
            </li>
          </ol>
          <div className="planner-contact">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:+${contact.phoneE164 || contact.whatsapp}`}>{contact.phone}</a>
            <span>{contact.officeLocation}</span>
          </div>
        </aside>
        <form
          id="plan-form"
          ref={formRef}
          className="planner-form"
          action={`mailto:${contact.email}`}
          method="post"
          encType="text/plain"
          onSubmit={onSubmit}
        >
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Your name *</label>
              <input id="name" name="name" autoComplete="name" required maxLength={120} />
            </div>
            <div className="field">
              <label htmlFor="email">Email address *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={50} />
            </div>
            <div className="field">
              <label htmlFor="country">Country of residence</label>
              <input
                id="country"
                name="country"
                autoComplete="country-name"
                maxLength={100}
              />
            </div>
            <div className="field">
              <label htmlFor="date">Preferred arrival date</label>
              <input id="date" name="date" type="date" />
            </div>
            <div className="field">
              <label htmlFor="guests">Number of travellers *</label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                max={100}
                required
                defaultValue={2}
              />
            </div>
            <div className="field">
              <label htmlFor="days">Time available</label>
              <select id="days" name="days" defaultValue="Not sure yet">
                <option>Not sure yet</option>
                <option>2–4 days</option>
                <option>5–6 days</option>
                <option>7–9 days</option>
                <option>10+ days</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="plan-style">Preferred comfort level</label>
              <select id="plan-style" name="style" defaultValue="Comfort">
                <option>Comfort</option>
                <option>Midrange</option>
                <option>Luxury</option>
                <option>Camping</option>
                <option>Please advise me</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="interest">Main interest</label>
              <select id="interest" name="interest" defaultValue="Wildlife safari">
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
            <div className="field">
              <label htmlFor="budget">Safari budget per person (USD)</label>
              <input
                id="budget"
                name="budget"
                placeholder="e.g. 2,500, excluding flights"
                maxLength={100}
              />
            </div>
            <div className="field full">
              <label htmlFor="journey">A journey you like (optional)</label>
              <input id="journey" name="journey" maxLength={200} />
            </div>
            <div className="field full">
              <label htmlFor="message">Tell us a little more</label>
              <textarea
                id="message"
                name="message"
                ref={messageRef}
                rows={4}
                maxLength={3000}
                placeholder="Favourite parks, children’s ages, special occasions or anything we should know"
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="button orange" type="submit" name="channel" value="whatsapp">
              Prepare WhatsApp enquiry
            </button>
            <button className="button outline" type="submit" name="channel" value="email">
              Prepare email enquiry
            </button>
          </div>
          <p className="fineprint">
            Review your enquiry below, then send it through WhatsApp or your email app. Nothing is sent
            until you do.
          </p>
          <div
            id="enquiry-preview"
            className="enquiry-preview"
            ref={previewRef}
            hidden={previewHidden}
            aria-live="polite"
          >
            <h3>Your enquiry is ready.</h3>
            <p>Review the details, then choose how to send your message to Mambeu.</p>
            <pre id="enquiry-text">{enquiryText}</pre>
            <div className="form-actions">
              <a id="send-whatsapp" className="button" href={whatsappHref} target="_blank" rel="noopener">
                Open WhatsApp
              </a>
              <a id="send-email" className="button outline" href={emailHref}>
                Open email
              </a>
              <button className="text-link" type="button" id="copy-enquiry" onClick={onCopy}>
                Copy enquiry
              </button>
            </div>
            <p id="copy-status" role="status">
              {copyStatus}
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
