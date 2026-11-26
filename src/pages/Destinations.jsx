import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink, isPlaceholder, lines } from '../content/schema.js';
import { toJourneys } from '../lib/journeys.js';
import { planHref } from '../lib/plan-link.js';
import { href, resolveImageSrc } from '../lib/utils.js';
import Reveal from '../components/Reveal.jsx';

const PARK_SPANS = [
  'dest-place--span-8',
  'dest-place--span-4',
  'dest-place--span-4',
  'dest-place--span-8',
  'dest-place--span-6',
  'dest-place--span-6',
];
const CIRCUIT_SPANS = ['dest-place--span-8', 'dest-place--span-4'];

/** Journeys whose title or route mentions the card's search word (or its name). */
function countJourneysFor(d, journeys) {
  const needle = String(d.query || d.name || '').trim().toLowerCase();
  if (!needle) return 0;
  return (journeys || []).filter((j) =>
    [j.title, ...(j.route || [])].join(' ').toLowerCase().includes(needle),
  ).length;
}

/** Cards with a name; the editor may leave half-filled rows. */
function cardsOf(section) {
  return (section?.places || []).filter((d) => d && String(d.name ?? '').trim());
}

function PlaceCard({ d, journeys, labels, className = '', featured = false, short = false, placeholder = false }) {
  const n = placeholder ? 0 : countJourneysFor(d, journeys);
  const custom = String(d.link ?? '').trim();
  const planTo = planHref({ destination: d.slug || undefined });
  const to = placeholder
    ? planTo
    : custom
      ? cmsLink(custom)
      : href(d.slug ? `destinations/${d.slug}` : 'destinations');
  const hasBestTime = !placeholder && !isPlaceholder(d.bestTime);
  const highlights = lines(d.highlights).slice(0, 3);
  const linkClass = [
    'dest-place__link',
    short ? 'dest-place__link--short' : '',
    featured ? 'dest-place__link--featured' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={['dest-place', placeholder ? 'dest-place--soon' : '', className].filter(Boolean).join(' ')}>
      <div className={linkClass}>
        <img
          src={resolveImageSrc(d.image)}
          alt=""
          loading="lazy"
          decoding="async"
          className="dest-place__img"
          style={d.position ? { objectPosition: d.position } : undefined}
        />
        <div className="dest-place__overlay" aria-hidden="true" />
        <div className="dest-place__veil" aria-hidden="true" />
        <Link to={to} className="dest-place__hit">
          <span className="dest-place__sr">
            {placeholder ? `${labels.planLinkPrefix} ${d.name}` : `${labels.exploreLinkPrefix} ${d.name}`}
          </span>
        </Link>

        <div className="dest-place__chips">
          <span
            className={
              placeholder
                ? 'dest-place__chip dest-place__chip--soon'
                : 'dest-place__chip dest-place__chip--count'
            }
          >
            {placeholder
              ? labels.comingSoon
              : n > 0
                ? `${n} ${n === 1 ? labels.journeySingular : labels.journeyPlural}`
                : labels.tailorMade}
          </span>
          {hasBestTime ? <span className="dest-place__chip dest-place__chip--time">{d.bestTime}</span> : null}
        </div>

        <span aria-hidden="true" className="dest-place__arrow">
          →
        </span>

        <div className="dest-place__copy">
          <p className="dest-place__kind">{d.kind}</p>
          <h3 className="dest-place__title">{d.name}</h3>
          <p className="dest-place__tagline">{d.tagline}</p>
          <div className="dest-place__reveal">
            <div className="dest-place__reveal-inner">
              <p className="dest-place__desc">{d.description}</p>
              {highlights.length > 0 ? (
                <ul className="dest-place__highlights">
                  {highlights.map((h, i) => (
                    <li key={i} className="dest-place__highlight">
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <Link to={planTo} className="dest-place__plan">
            {labels.planLinkPrefix} {d.name}
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function Destinations() {
  const { tours, pages } = useCms();
  const page = pages.destinations;
  const { header, labels } = page;
  const journeys = toJourneys(tours);
  const parks = cardsOf(page.northern);
  const southern = cardsOf(page.southern);
  const western = cardsOf(page.western);
  const beyond = cardsOf(page.beyond);

  return (
    <main id="main" className="dest-page">
      <PageHeader
        id="destinations-heading"
        eyebrow={header.eyebrow}
        title={
          <>
            {header.titleLine1}
            {header.titleLine2 ? (
              <>
                <br />
                <span className="page-header__quiet">{header.titleLine2}</span>
              </>
            ) : null}
          </>
        }
        description={header.text}
        image={header.image ? resolveImageSrc(header.image) : undefined}
      />

      <section id="northern-circuit" aria-labelledby="parks-heading" className="dest-parks">
        <div className="dest-parks__inner">
          <Reveal>
            <h2 id="parks-heading" className="dest-section-head__title">
              {page.northern.title}
            </h2>
            <p className="dest-section-head__lede">{page.northern.lede}</p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-parks__list">
            {parks.map((d, i) => (
              <PlaceCard
                key={`${d.slug}-${i}`}
                d={d}
                journeys={journeys}
                labels={labels}
                className={[PARK_SPANS[i] ?? 'dest-place--span-6', i === 0 ? 'dest-place--wide-md' : '']
                  .filter(Boolean)
                  .join(' ')}
                featured={i === 0}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="southern-circuit" aria-labelledby="southern-heading" className="dest-circuit">
        <div className="dest-circuit__inner">
          <Reveal>
            <h2 id="southern-heading" className="dest-section-head__title">
              {page.southern.title}
            </h2>
            <p className="dest-section-head__lede">{page.southern.lede}</p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-circuit__list">
            {southern.map((d, i) => (
              <PlaceCard
                key={`${d.slug}-${i}`}
                d={d}
                journeys={journeys}
                labels={labels}
                placeholder
                featured={i === 0}
                className={CIRCUIT_SPANS[i]}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="western-circuit" aria-labelledby="western-heading" className="dest-circuit">
        <div className="dest-circuit__inner">
          <Reveal>
            <h2 id="western-heading" className="dest-section-head__title">
              {page.western.title}
            </h2>
            <p className="dest-section-head__lede">{page.western.lede}</p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-circuit__list">
            {western.map((d, i) => (
              <PlaceCard
                key={`${d.slug}-${i}`}
                d={d}
                journeys={journeys}
                labels={labels}
                placeholder
                featured={i === 0}
                className={CIRCUIT_SPANS[i]}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="beyond-parks-heading" className="dest-beyond">
        <div className="dest-beyond__inner">
          <Reveal>
            <h2 id="beyond-parks-heading" className="dest-section-head__title">
              {page.beyond.title}
            </h2>
            <p className="dest-section-head__lede">{page.beyond.lede}</p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-beyond__list">
            {beyond.map((d, i) => (
              <PlaceCard key={`${d.slug}-${i}`} d={d} journeys={journeys} labels={labels} short />
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
