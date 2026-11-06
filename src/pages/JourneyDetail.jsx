import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeJourneyDetailContent } from '../content/journeyDefaults.js';
import { mergeNotFoundContent } from '../content/notFoundDefaults.js';
import { siteChrome } from '../lib/cms.js';
import { esc, href, itineraryRoute, money, Img } from '../lib/utils.js';

export default function JourneyDetail({ tourPath }) {
  const params = useParams();
  const path = tourPath || params.tourPath;
  const { tours, pages } = useCms();
  const jd = mergeJourneyDetailContent(pages.journey_detail);
  const contact = siteChrome(pages);
  const t = tours.find((x) => x.path === path);
  const [tierIndex, setTierIndex] = useState(0);
  const [daysExpanded, setDaysExpanded] = useState(false);
  const a = jd.anchors || {};
  const ov = jd.overview || {};
  const it = jd.itinerary || {};
  const st = jd.stays || {};
  const inc = jd.inclusions || {};
  const q = jd.quotation || {};
  const rel = jd.related || {};
  const nfPage = mergeNotFoundContent(pages.not_found);

  useEffect(() => {
    if (!t) return;
    const idx = (t.pricingTiers || []).findIndex((p) => p.people === '2 people');
    setTierIndex(Math.max(idx, 0));
    setDaysExpanded(false);
  }, [t]);

  if (!t) {
    return (
      <main id="main">
        <section className="wrap">
          <h1>{nfPage.head.titleLine1 || 'Journey not found'}</h1>
          <Link to={href(nfPage.buttonPath || 'safaris')} className="button">
            {nfPage.button}
          </Link>
        </section>
      </main>
    );
  }

  t.highlights = t.highlights || [];
  t.itinerary = t.itinerary || [];
  t.included = t.included || [];
  t.excluded = t.excluded || [];
  t.gallery = t.gallery || [];

  const tiers = t.pricingTiers || [];
  const activeTier = tiers.length ? tiers[tierIndex] : null;
  const imageFile = t.image || 'hero.webp';
  const related = tours.filter((x) => x.id !== t.id && x.style === t.style).slice(0, 3);
  const stays = (t.itinerary || []).filter(
    (d) => d.accommodation && !/no accom|end of tour/i.test(d.accommodation),
  );

  return (
    <main id="main">
      <section className="journey-hero">
        <Img src={imageFile} alt={t.title} priority />
        <div className="wrap">
          <Link to={href('safaris')} className="breadcrumb">
            Safari collection / {t.style}
          </Link>
          <span className="eyebrow">
            {t.duration} · TAILOR-MADE JOURNEY
          </span>
          <h1>{t.title}</h1>
          <p>{itineraryRoute(t)}</p>
        </div>
      </section>

      <nav className="journey-anchor-nav" aria-label="Journey sections">
        <div className="wrap">
          <a href="#overview">{a.overview}</a>
          <a href="#itinerary">{a.itinerary}</a>
          <a href="#stays">{a.stays}</a>
          <a href="#included">{a.included}</a>
          <a href="#enquire">{a.enquire}</a>
        </div>
      </nav>

      <section className="wrap journey-layout">
        <article>
          <div id="overview" className="journey-section">
            <span className="eyebrow">{ov.eyebrow}</span>
            <h2>
              {ov.titleLine1}
              <br />
              {ov.titleLine2}
            </h2>
            <p className="lead">{t.fullDescription || t.description}</p>
            <div className="journey-facts">
              <div>
                <span>{ov.durationLabel}</span>
                <b>
                  {t.days} {ov.durationSuffix}
                </b>
              </div>
              <div>
                <span>{ov.styleLabel}</span>
                <b>{t.style}</b>
              </div>
              <div>
                <span>{ov.planningLabel}</span>
                <b>{ov.planningValue}</b>
              </div>
            </div>
            {t.highlights.length ? (
              <div className="highlights">
                {t.highlights.map((x) => (
                  <span key={x}>{x}</span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="journey-section" id="itinerary">
            <div className="section-heading">
              <div>
                <span className="eyebrow">{it.eyebrow}</span>
                <h2>{it.title}</h2>
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
                  {daysExpanded ? it.collapseLabel : it.expandLabel}
                </button>
              ) : null}
            </div>
            {t.itinerary.length ? (
              t.itinerary.map((d, i) => (
                <details className="day" key={i} defaultOpen={i === 0}>
                  <summary>
                    <span className="day-number">{String(d.day || i + 1).padStart(2, '0')}</span>
                    <span>
                      <small>
                        {it.dayPrefix} {d.day || i + 1}
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
                            <b>Stay</b> {d.accommodation}
                          </p>
                        ) : null}
                        {d.meals ? (
                          <p>
                            <b>Meals & drinks</b> {d.meals}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </details>
              ))
            ) : (
              <p>{it.noItinerary}</p>
            )}
          </div>

          <div className="journey-section" id="stays">
            <span className="eyebrow">{st.eyebrow}</span>
            <h2>{st.title}</h2>
            <div className="stay-list">
              {stays.length ? (
                stays.map((d) => (
                  <div key={d.day}>
                    <span>Day {d.day}</span>
                    <b>{d.accommodation}</b>
                  </div>
                ))
              ) : (
                <p>{st.fallback}</p>
              )}
            </div>
            <p className="fineprint">{st.fineprint}</p>
            <Link className="text-link" to={`/plan/?journey=${encodeURIComponent(t.title)}`}>
              {st.askLink}
            </Link>
          </div>

          <div className="journey-section inclusions" id="included">
            <div>
              <span className="eyebrow">{inc.includedEyebrow}</span>
              <h3>{inc.includedTitle}</h3>
              {t.included.length ? (
                <ul>
                  {t.included
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>{inc.includedFallback}</p>
              )}
            </div>
            <div>
              <span className="eyebrow">{inc.excludedEyebrow}</span>
              <h3>{inc.excludedTitle}</h3>
              {t.excluded.length ? (
                <ul>
                  {t.excluded
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>{inc.excludedFallback}</p>
              )}
            </div>
          </div>
          <p className="fineprint">{inc.activitiesNote}</p>
        </article>

        <aside className="quotation" id="enquire">
          <span className="eyebrow">{q.eyebrow}</span>
          <h3>
            {q.titleLine1}
            <br />
            {q.titleLine2}
          </h3>
          {tiers.length ? (
            <>
              <label htmlFor="group-size">{q.groupLabel}</label>
              <select id="group-size" value={tierIndex} onChange={(e) => setTierIndex(Number(e.target.value))}>
                {tiers.map((p, i) => (
                  <option key={i} value={i}>
                    {p.people}
                  </option>
                ))}
              </select>
              <p className="quoted-price" id="journey-price">
                {money(activeTier.price)}
              </p>
              <span className="price-unit">{q.priceUnit}</span>
              <p className="fineprint">{q.priceFineprint}</p>
            </>
          ) : (
            <p>{q.noTiers}</p>
          )}
          <Link className="button orange" to={`/plan/?journey=${encodeURIComponent(t.title)}&style=${t.style}`}>
            {q.enquireButton}
          </Link>
          <a
            className="whatsapp-link"
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(q.whatsappPrefix + t.title)}`}
            target="_blank"
            rel="noopener"
          >
            {q.whatsappLink}
          </a>
          <div className="quotation-note">
            <b>{q.noteHeading}</b>
            <p>{q.noteText}</p>
          </div>
        </aside>
      </section>

      <section className="wrap related">
        <div className="section-heading">
          <h2>{rel.heading}</h2>
          <Link to={href(rel.linkPath || 'safaris')} className="text-link">
            {rel.linkText}
          </Link>
        </div>
        <div className="related-grid">
          {related.map((x) => (
            <JourneyCard key={x.id} t={x} />
          ))}
        </div>
      </section>
    </main>
  );
}
