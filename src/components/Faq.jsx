import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { planHref } from '../lib/plan-link.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function Faq() {
  const { pages } = useCms();
  const copy = pages.home.faq;
  const items = (copy.items || []).filter((i) => i && String(i.q ?? '').trim());
  const [open, setOpen] = useState(/** @type {number | null} */ (0));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <section className="home-faq" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="home-faq__grid">
        <div className="home-faq__intro">
          <Reveal>
            <SectionHeader
              variant="inline"
              id="faq-heading"
              eyebrow={copy.eyebrow}
              title={
                <>
                  {copy.titleLine1}{' '}
                  <span className="section-header__quiet">{copy.titleLine2}</span>
                </>
              }
            />

            <div className="home-faq__fallback">
              <p>{copy.fallbackText}</p>
              <Link to={planHref()} className="home-faq__ask">
                {copy.askButton}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="home-faq__list-wrap">
          <Reveal as="ul" stagger className="home-faq__list">
            {items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="home-faq__item">
                  <h3 className="home-faq__q">
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="home-faq__toggle"
                    >
                      <span className="home-faq__question">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={
                          isOpen
                            ? 'home-faq__icon home-faq__icon--open'
                            : 'home-faq__icon'
                        }
                      >
                        <span className="home-faq__icon-h" />
                        <span className="home-faq__icon-v" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={
                      isOpen
                        ? 'home-faq__panel home-faq__panel--open'
                        : 'home-faq__panel'
                    }
                  >
                    <div className="home-faq__panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>

          <p className="home-faq__more">
            <Link to={cmsLink(copy.moreLinkPath, '/travel-guide/')} className="home-faq__more-link">
              {copy.moreLinkText}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
