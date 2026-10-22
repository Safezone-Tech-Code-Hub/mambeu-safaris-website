import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import tours from '../data/tours.json';
import { esc, href, itineraryRoute, money, Img } from '../lib/utils.js';

export default function JourneyDetail({ tourPath }) {
  const t = tours.find((x) => x.path === tourPath);
  const [tierIndex, setTierIndex] = useState(0);
  const [daysExpanded, setDaysExpanded] = useState(false);

  useEffect(() => {
    if (!t) return;
    const idx = t.pricingTiers.findIndex((p) => p.people === '2 people');
    setTierIndex(Math.max(idx, 0));
    setDaysExpanded(false);
  }, [t]);

  if (!t) {
    return (
      <main id="main">
        <section className="wrap">
          <h1>Journey not found</h1>
          <Link to={href('safaris')} className="button">
            Explore our safaris
          </Link>
        </section>
      </main>
    );
  }

  const tiers = t.pricingTiers;
  const activeTier = tiers.length ? tiers[tierIndex] : null;
  const imageFile = t.image.split('/').pop();
  const related = tours.filter((x) => x.id !== t.id && x.style === t.style).slice(0, 3);
  const stays = t.itinerary.filter(
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
          <a href="#overview">Overview</a>
          <a href="#itinerary">Day by day</a>
          <a href="#stays">Accommodation</a>
          <a href="#included">Inclusions</a>
          <a href="#enquire">Your quotation</a>
        </div>
      </nav>

      <section className="wrap journey-layout">
        <article>
          <div id="overview" className="journey-section">
            <span className="eyebrow">THE JOURNEY AT A GLANCE</span>
            <h2>
              Make every
              <br />
              day count.
            </h2>
            <p className="lead">{t.fullDescription || t.description}</p>
            <div className="journey-facts">
              <div>
                <span>Duration</span>
                <b>{t.days} days</b>
              </div>
              <div>
                <span>Published style</span>
                <b>{t.style}</b>
              </div>
              <div>
                <span>Planning</span>
                <b>Personalised</b>
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
                <span className="eyebrow">YOUR TIME IN TANZANIA</span>
                <h2>Day by day.</h2>
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
                  {daysExpanded ? 'Collapse all days' : 'Expand all days'}
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
                      <small>DAY {d.day || i + 1}</small>
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
              <p>
                Your safari specialist will provide a detailed itinerary with your personalised
                quotation.
              </p>
            )}
          </div>

          <div className="journey-section" id="stays">
            <span className="eyebrow">YOUR HOME ALONG THE WAY</span>
            <h2>Where you’ll rest.</h2>
            <div className="stay-list">
              {stays.length ? (
                stays.map((d) => (
                  <div key={d.day}>
                    <span>Day {d.day}</span>
                    <b>{d.accommodation}</b>
                  </div>
                ))
              ) : (
                <p>
                  Our team will suggest accommodation for your dates and preferred comfort level.
                </p>
              )}
            </div>
            <p className="fineprint">
              Stays are subject to availability. Your final quotation confirms accommodation and any
              requested changes.
            </p>
            <Link
              className="text-link"
              to={`/plan/?journey=${encodeURIComponent(t.title)}`}
            >
              Ask about different accommodation
            </Link>
          </div>

          <div className="journey-section inclusions" id="included">
            <div>
              <span className="eyebrow">WHAT’S IN YOUR JOURNEY</span>
              <h3>Included</h3>
              {t.included.length ? (
                <ul>
                  {t.included
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>Inclusions are confirmed in your personalised quotation.</p>
              )}
            </div>
            <div>
              <span className="eyebrow">PLAN FOR THESE SEPARATELY</span>
              <h3>Excluded</h3>
              {t.excluded.length ? (
                <ul>
                  {t.excluded
                    .filter((x) => !/^\(/.test(x))
                    .map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                </ul>
              ) : (
                <p>Exclusions and optional activities are set out in your quotation.</p>
              )}
            </div>
          </div>
          <p className="fineprint">
            Activities and meals apply as specified in the itinerary. Optional experiences, upgrades
            and changes are quoted separately.
          </p>
        </article>

        <aside className="quotation" id="enquire">
          <span className="eyebrow">LET’S MAKE IT YOURS</span>
          <h3>
            Your journey.
            <br />
            Your details.
          </h3>
          {tiers.length ? (
            <>
              <label htmlFor="group-size">Number of travellers</label>
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
              <span className="price-unit">per person · USD</span>
              <p className="fineprint">
                Published group-size price. Your dates, availability and requested changes are
                confirmed in a personalised quotation.
              </p>
            </>
          ) : (
            <p>
              Request a quotation based on your dates, group size and preferred accommodation.
            </p>
          )}
          <Link
            className="button orange"
            to={`/plan/?journey=${encodeURIComponent(t.title)}&style=${t.style}`}
          >
            Enquire about this journey
          </Link>
          <a
            className="whatsapp-link"
            href={`https://wa.me/255796086799?text=${encodeURIComponent(
              'Hello Mambeu, I would like to discuss ' + t.title,
            )}`}
            target="_blank"
            rel="noopener"
          >
            Talk to us on WhatsApp
          </a>
          <div className="quotation-note">
            <b>Love the route, want different stays?</b>
            <p>Ask us to tailor the journey to midrange, comfort or luxury accommodation.</p>
          </div>
        </aside>
      </section>

      <section className="wrap related">
        <div className="section-heading">
          <h2>Keep exploring.</h2>
          <Link to={href('safaris')} className="text-link">
            All safari journeys
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
