import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { siteChrome } from '../lib/cms.js';
import { planHref, urlKey } from '../lib/plan-link.js';
import { esc, href, itineraryRoute, money, Img } from '../lib/utils.js';
import NotFound from './NotFound.jsx';

export default function JourneyDetail({ tourPath }) {
  const params = useParams();
  const path = tourPath || params.tourPath;
  const { tours, pages } = useCms();
  const contact = siteChrome(pages);
  const copy = pages.journey_detail;
  const t = tours.find((x) => x.path === path);
  const [tierIndex, setTierIndex] = useState(0);
  const [daysExpanded, setDaysExpanded] = useState(false);

  useEffect(() => {
    if (!t) return;
    const idx = (t.pricingTiers || []).findIndex((p) => p.people === '2 people');
    setTierIndex(Math.max(idx, 0));
    setDaysExpanded(false);
  }, [t]);

  if (!t) {
    return <NotFound />;
  }

  t.highlights = t.highlights || [];
  t.itinerary = t.itinerary || [];
  t.included = t.included || [];
  t.excluded = t.excluded || [];
  t.gallery = t.gallery || [];

  const tiers = t.pricingTiers || [];
  const activeTier = tiers.length ? tiers[tierIndex] : null;
  const related = tours.filter((x) => x.id !== t.id && x.style === t.style).slice(0, 3);
  const stays = (t.itinerary || []).filter(
    (d) => d.accommodation && !/no accom|end of tour/i.test(d.accommodation),
  );

  return (
    <main id="main">
      <section className="journey-hero">
        <Img src={t.image || 'hero.webp'} alt={t.title} priority />
        <div className="wrap">
          <Link to={href('safaris')} className="breadcrumb">
            {copy.hero.breadcrumbPrefix} / {t.style}
          </Link>
          <span className="eyebrow">
            {t.duration} · {copy.hero.eyebrowSuffix}
          </span>
          <h1>{t.title}</h1>
          <p>{itineraryRoute(t)}</p>
        </div>
      </section>

      <nav className="journey-anchor-nav" aria-label="Journey sections">
        <div className="wrap">
          <a href="#overview">{copy.anchors.overview}</a>
          <a href="#itinerary">{copy.anchors.itinerary}</a>
          <a href="#stays">{copy.anchors.stays}</a>
          <a href="#included">{copy.anchors.included}</a>
          <a href="#enquire">{copy.anchors.enquire}</a>
        </div>
      </nav>

      <section className="wrap journey-layout">
        <article>
          <Reveal as="div" id="overview" className="journey-section">
            <span className="eyebrow">{copy.overview.eyebrow}</span>
            <h2>
              {copy.overview.titleLine1}
              <br />
              {copy.overview.titleLine2}
            </h2>
            <p className="lead">{t.fullDescription || t.description}</p>
            <div className="journey-facts">
              <div>
                <span>{copy.overview.durationLabel}</span>
                <b>
                  {t.days} {copy.overview.durationSuffix}
                </b>
              </div>
              <div>
                <span>{copy.overview.styleLabel}</span>
                <b>{t.style}</b>
              </div>
              <div>
                <span>{copy.overview.planningLabel}</span>
                <b>{copy.overview.planningValue}</b>
              </div>
            </div>
            {t.highlights.length ? (
              <div className="highlights">
                {t.highlights.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal as="div" className="journey-section" id="itinerary">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{copy.itinerary.eyebrow}</span>
                <h2>{copy.itinerary.title}</h2>
              </div>
              {t.itinerary.length ? (
                <button
                  className="text-link"
                  id="expand-days"
                  type="button"
                  aria-expanded={daysExpanded}
                  onClick={() => {
                    const open = !daysExpanded;
                    setDaysExpanded(open);
                    document.querySelectorAll('details.day').forEach((el) => {
                      el.open = open;
                    });
                  }}
                >
                  {daysExpanded ? copy.itinerary.collapseLabel : copy.itinerary.expandLabel}
                </button>
              ) : null}
            </div>
            {t.itinerary.length ? (
              t.itinerary.map((d, i) => (
                <details
                  className="day"
                  key={i}
                  defaultOpen={i === 0}
                >
                  <summary>
                    <span className="day-number">
                      {String(d.day || i + 1).padStart(2, '0')}
                    </span>
                    <span>
                      <small>
                        {copy.itinerary.dayPrefix} {d.day || i + 1}
                      </small>
                      <b>{d.title}</b>
                    </span>
                    <span className="day-icon" aria-hidden="true"></span>
                  </summary>
                  <div className="day-body">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: esc(d.description).replace(/\n/g, '<br>'),
                      }}
                    />
                    {d.accommodation || d.meals ? (
                      <div className="day-stay">
                        {d.accommodation ? (
                          <p>
                            <b>{copy.itinerary.stayLabel}</b> {d.accommodation}
                          </p>
                        ) : null}
                        {d.meals ? (
                          <p>
                            <b>{copy.itinerary.mealsLabel}</b> {d.meals}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </details>
              ))
            ) : (
              <p>{copy.itinerary.noItinerary}</p>
            )}
          </Reveal>

          <Reveal as="div" className="journey-section" id="stays">
            <span className="eyebrow">{copy.stays.eyebrow}</span>
            <h2>{copy.stays.title}</h2>
            <div className="stay-list">
              {stays.length ? (
                stays.map((d) => (
                  <div key={d.day}>
                    <span>
                      {copy.stays.dayPrefix} {d.day}
                    </span>
                    <b>{d.accommodation}</b>
                  </div>
                ))
              ) : (
                <p>{copy.stays.fallback}</p>
              )}
            </div>
            <p className="fineprint">{copy.stays.fineprint}</p>
            <Link
              className="text-link"
              to={planHref({ journey: urlKey(t) })}
            >
              {copy.stays.askLink}
            </Link>
          </Reveal>

          <Reveal as="div" className="journey-section inclusions" id="included">
            <div>
              <span className="eyebrow">{copy.inclusions.includedEyebrow}</span>
              <h3>{copy.inclusions.includedTitle}</h3>
              {t.included.length ? (
                <ul>
                  {t.included
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>{copy.inclusions.includedFallback}</p>
              )}
            </div>
            <div>
              <span className="eyebrow">{copy.inclusions.excludedEyebrow}</span>
              <h3>{copy.inclusions.excludedTitle}</h3>
              {t.excluded.length ? (
                <ul>
                  {t.excluded
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>{copy.inclusions.excludedFallback}</p>
              )}
            </div>
          </Reveal>
          <p className="fineprint">{copy.inclusions.activitiesNote}</p>
        </article>

        <aside className="quotation" id="enquire">
          <span className="eyebrow">{copy.quotation.eyebrow}</span>
          <h3>
            {copy.quotation.titleLine1}
            <br />
            {copy.quotation.titleLine2}
          </h3>
          {tiers.length ? (
            <>
              <label htmlFor="group-size">{copy.quotation.groupLabel}</label>
              <select
                id="group-size"
                value={tierIndex}
                onChange={(e) => setTierIndex(Number(e.target.value))}
              >
                {tiers.map((p, i) => (
                  <option key={i} value={i}>
                    {p.people}
                  </option>
                ))}
              </select>
              <p className="quoted-price" id="journey-price">
                {money(activeTier.price)}
              </p>
              <span className="price-unit">{copy.quotation.priceUnit}</span>
              <p className="fineprint">{copy.quotation.priceFineprint}</p>
            </>
          ) : (
            <p>{copy.quotation.noTiers}</p>
          )}
          <Link
            className="button orange"
            to={planHref({ journey: urlKey(t) })}
          >
            {copy.quotation.enquireButton}
          </Link>
          <a
            className="whatsapp-link"
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
              copy.quotation.whatsappPrefix + t.title,
            )}`}
            target="_blank"
            rel="noopener"
          >
            {copy.quotation.whatsappLink}
          </a>
          <div className="quotation-note">
            <b>{copy.quotation.noteHeading}</b>
            <p>{copy.quotation.noteText}</p>
          </div>
        </aside>
      </section>

      <section className="wrap related">
        <Reveal>
          <div className="section-heading">
            <h2>{copy.related.heading}</h2>
            <Link to={cmsLink(copy.related.linkPath, href('safaris'))} className="text-link">
              {copy.related.linkText}
            </Link>
          </div>
        </Reveal>
        <Reveal as="ul" stagger className="related-grid">
          {related.map((x) => (
            <JourneyCard key={x.id} t={x} />
          ))}
        </Reveal>
      </section>
    </main>
  );
}
