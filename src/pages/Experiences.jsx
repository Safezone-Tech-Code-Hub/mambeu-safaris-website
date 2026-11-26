import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ExperiencesBrowser from '../components/ExperiencesBrowser.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SidePanel from '../components/SidePanel.jsx';
import { useCms } from '../CmsProvider.jsx';
import { publishedExperienceList } from '../content/experiencesDefaults.js';
import { cmsLink } from '../content/schema.js';
import { siteChrome } from '../lib/cms.js';
import { planHref } from '../lib/plan-link.js';
import { resolveImageSrc } from '../lib/utils.js';

export default function Experiences() {
  const { pages } = useCms();
  const copy = pages.experiences;
  const { head, panel, closing } = copy;
  const whatsapp = `https://wa.me/${siteChrome(pages).whatsapp}`;
  const [openSlug, setOpenSlug] = useState(null);
  const lastShown = useRef(null);
  const list = useMemo(() => publishedExperienceList(copy), [copy]);
  const current = list.find((e) => e.slug === openSlug) || null;
  if (current) lastShown.current = current;
  const shown = current || lastShown.current;
  const expectMeta = shown
    ? [
        [panel.bestTimeLabel, shown.bestTime],
        [panel.bestForLabel, shown.bestFor],
      ].filter(([, v]) => v)
    : [];
  const factRows = shown
    ? [
        [panel.whereLabel, shown.location],
        [panel.whenLabel, shown.bestTime],
        [panel.durationLabel, shown.duration],
      ].filter(([, v]) => v)
    : [];

  return (
    <main id="main" className="xp-page">
      <PageHeader
        id="experiences-heading"
        eyebrow={head.eyebrow}
        title={
          <>
            {head.titleLine1}
            {head.titleLine2 ? (
              <>
                <br />
                <span className="page-header__quiet">{head.titleLine2}</span>
              </>
            ) : null}
          </>
        }
        description={head.text}
        image={head.image ? resolveImageSrc(head.image) : undefined}
      />

      <ExperiencesBrowser
        experiences={list}
        intro={copy.intro}
        facts={(copy.facts || []).filter((f) => f && String(f.title ?? '').trim())}
        filter={copy.filter}
        card={copy.card}
        onOpen={setOpenSlug}
      />

      <SidePanel
        open={Boolean(current)}
        onClose={() => setOpenSlug(null)}
        labelledBy="xp-panel-title"
      >
        {shown ? (
          <article className="xp-panel">
            <div className="xp-panel__media">
              <img
                src={resolveImageSrc(shown.image)}
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
                  <h3 className="xp-panel__heading">{panel.expectHeading}</h3>
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
                  <h3 className="xp-panel__heading">{panel.includedHeading}</h3>
                  <ul className="xp-panel__list">
                    {shown.included.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {shown.goodToKnow.length > 0 ? (
                <div className="xp-panel__section xp-panel__section--note">
                  <h3 className="xp-panel__heading">{panel.goodToKnowHeading}</h3>
                  <ul className="xp-panel__list">
                    {shown.goodToKnow.map((x, i) => (
                      <li key={i}>{x}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {shown.highlights.length > 0 ? (
                <div className="xp-panel__section">
                  <h3 className="xp-panel__heading">{panel.highlightsHeading}</h3>
                  <ul className="xp-panel__tags">
                    {shown.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="xp-panel__foot">
              <Link className="xp-panel__plan" to={planHref({ experience: shown.slug })}>
                {copy.card.planButton} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ) : null}
      </SidePanel>

      <section aria-labelledby="experiences-cta-heading" className="xp-close">
        <div className="xp-close__inner">
          <div>
            <h2 id="experiences-cta-heading" className="xp-close__title">
              {closing.titleLine1}
              {closing.titleLine2 ? (
                <>
                  <br />
                  <span className="xp-close__quiet">{closing.titleLine2}</span>
                </>
              ) : null}
            </h2>
            <p className="xp-close__lede">{closing.text}</p>
          </div>
          <div className="xp-close__actions">
            <Link
              to={cmsLink(closing.planLink, '/plan/')}
              className="xp-close__btn xp-close__btn--solid"
            >
              {closing.planButton}
            </Link>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="xp-close__btn xp-close__btn--ghost"
            >
              {closing.whatsappButton}
              <span className="xp-sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
