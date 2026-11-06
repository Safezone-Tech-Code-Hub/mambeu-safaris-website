import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExperiencesBrowser from '../components/ExperiencesBrowser.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SidePanel from '../components/SidePanel.jsx';
import { useCms } from '../CmsProvider.jsx';
import { experiencesPageDefaults } from '../data/experiences-page-defaults.js';
import { experiences } from '../lib/experiences.js';
import { planHref } from '../lib/plan-link.js';

const WHATSAPP = 'https://wa.me/255796086799';

export default function Experiences() {
  const { pages } = useCms();
  const intro = {
    ...experiencesPageDefaults.intro,
    ...(pages.experiences?.intro || {}),
  };
  const [openSlug, setOpenSlug] = useState(null);
  const lastShown = useRef(null);
  const list = experiences.filter((e) => e.published);
  const current = list.find((e) => e.slug === openSlug) || null;
  if (current) lastShown.current = current;
  const shown = current || lastShown.current;
  const expectMeta = shown
    ? [
        ['Best time', shown.bestTime],
        ['Best for', shown.bestFor],
      ].filter(([, v]) => v)
    : [];
  const factRows = shown
    ? [
        ['Where', shown.location],
        ['When', shown.bestTime],
        ['Duration', shown.duration],
      ].filter(([, v]) => v)
    : [];

  return (
    <main id="main" className="xp-page">
      <PageHeader
        id="experiences-heading"
        eyebrow="Beyond the game drive"
        title={
          <>
            Experiences to make
            <br />
            <span className="page-header__quiet">it yours.</span>
          </>
        }
        description="Add experiences that mean something to you, from short day tours to a hot air balloon safari."
        image="/images/experiences-header.jpg"
      />

      <ExperiencesBrowser experiences={experiences} intro={intro} onOpen={setOpenSlug} />

      <SidePanel
        open={Boolean(current)}
        onClose={() => setOpenSlug(null)}
        labelledBy="xp-panel-title"
      >
        {shown ? (
          <article className="xp-panel">
            <div className="xp-panel__media">
              <img
                src={shown.image}
                alt={shown.imageAlt || ''}
                className="xp-panel__img"
              />
              <button
                type="button"
                className="xp-panel__close"
                onClick={() => setOpenSlug(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="xp-panel__body">
              <p className="xp-panel__eyebrow">{shown.category}</p>
              <h2 id="xp-panel-title" className="xp-panel__title">
                {shown.title}
              </h2>
              <p className="xp-panel__lead">{shown.summary}</p>

              {factRows.length > 0 ? (
                <dl className="xp-panel__glance">
                  {factRows.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {expectMeta.length > 0 ? (
                <div className="xp-panel__section">
                  <h3 className="xp-panel__heading">What to expect</h3>
                  <dl className="xp-panel__rows">
                    {expectMeta.map(([k, v]) => (
                      <div key={k} className="xp-panel__rows-row">
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}

              {shown.included.length > 0 ? (
                <div className="xp-panel__section">
                  <h3 className="xp-panel__heading">Usually included</h3>
                  <ul className="xp-panel__list">
                    {shown.included.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {shown.goodToKnow.length > 0 ? (
                <div className="xp-panel__section xp-panel__section--note">
                  <h3 className="xp-panel__heading">Good to know</h3>
                  <ul className="xp-panel__list">
                    {shown.goodToKnow.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {shown.highlights.length > 0 ? (
                <div className="xp-panel__section">
                  <h3 className="xp-panel__heading">Highlights</h3>
                  <ul className="xp-panel__tags">
                    {shown.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="xp-panel__foot">
              <Link className="xp-panel__plan" to={planHref({ experience: shown.slug })}>
                Plan this experience <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ) : null}
      </SidePanel>

      <section aria-labelledby="experiences-cta-heading" className="xp-close">
        <div className="xp-close__inner">
          <div>
            <h2 id="experiences-cta-heading" className="xp-close__title">
              Not sure what fits?
              <br />
              <span className="xp-close__quiet">Tell us and we’ll suggest.</span>
            </h2>
            <p className="xp-close__lede">
              Share who is travelling and what matters to you. We’ll shape the route around it.
            </p>
          </div>
          <div className="xp-close__actions">
            <Link to={planHref()} className="xp-close__btn xp-close__btn--solid">
              Plan my safari
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="xp-close__btn xp-close__btn--ghost"
            >
              Talk to us on WhatsApp
              <span className="xp-sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
