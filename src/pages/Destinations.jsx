import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import { useCms } from '../CmsProvider.jsx';
import { destinations, countJourneysFor } from '../lib/destinations.js';
import { toJourneys } from '../lib/journeys.js';
import { planHref } from '../lib/plan-link.js';
import { href } from '../lib/utils.js';
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

const SOUTHERN = [
  {
    slug: 'ruaha',
    name: 'Ruaha',
    kind: 'Coming soon',
    tagline: 'Baobabs, lions and a very big sky.',
    description: 'Southern Tanzania at its quietest. We shape these as tailor-made journeys.',
    image: '/images/destinations/tarangire.jpg',
    highlights: ['Remote bush', 'Big cats', 'Baobab country'],
  },
  {
    slug: 'nyerere',
    name: 'Nyerere',
    kind: 'Coming soon',
    tagline: 'River, boats and open woodland.',
    description: 'Boat days and walking country, far from the northern circuit. Ask us to build it in.',
    image: '/images/destinations/ndutu.jpg',
    highlights: ['Boat safari', 'Walking', 'Fewer vehicles'],
  },
];

const WESTERN = [
  {
    slug: 'katavi',
    name: 'Katavi',
    kind: 'Coming soon',
    tagline: 'Floodplains, hippo and almost no one else.',
    description: 'West Tanzania’s open floodplains. We plan these as private, tailor-made additions.',
    image: '/images/destinations/lake-natron.jpg',
    highlights: ['Floodplains', 'Remote camps', 'Space to breathe'],
  },
  {
    slug: 'mahale',
    name: 'Mahale',
    kind: 'Coming soon',
    tagline: 'Forest, lake and a slower kind of wild.',
    description: 'Lakeshore forest on Tanganyika. A quiet finish after the game drives.',
    image: '/images/destinations/lake-manyara.jpg',
    highlights: ['Lakeshore forest', 'Chimpanzees', 'Tanganyika'],
  },
];

function PlaceCard({ d, journeys, className = '', featured = false, short = false, placeholder = false }) {
  const n = placeholder ? 0 : countJourneysFor(d, journeys);
  const to = placeholder
    ? planHref({ destination: d.slug })
    : d.href ?? href(`destinations/${d.slug}`);
  const hasBestTime = !placeholder && d.bestTime && d.bestTime !== '[X]';
  const highlights = (d.highlights || []).slice(0, 3);
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
          src={d.image}
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
            {placeholder ? `Plan a trip to ${d.name}` : `Explore ${d.name}`}
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
            {placeholder ? 'Coming soon' : n > 0 ? `${n} ${n === 1 ? 'journey' : 'journeys'}` : 'Tailor-made'}
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
                  {highlights.map((h) => (
                    <li key={h} className="dest-place__highlight">
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <Link to={planHref({ destination: d.slug })} className="dest-place__plan">
            Plan a trip to {d.name}
          </Link>
        </div>
      </div>
    </li>
  );
}

export default function Destinations() {
  const { tours } = useCms();
  const journeys = toJourneys(tours);
  const parks = destinations.filter((d) => d.group === 'parks');
  const beyond = destinations.filter((d) => d.group === 'beyond');

  return (
    <main id="main" className="dest-page">
      <PageHeader
        id="destinations-heading"
        eyebrow="Where we take you"
        title={
          <>
            Discover Tanzania’s
            <br />
            <span className="page-header__quiet">wild places.</span>
          </>
        }
        description="Legendary wildlife parks, mountain landscapes and an Indian Ocean coast. Connect your favourite places into one personal journey."
        image="/images/destinations-header.jpg"
      />

      <section id="northern-circuit" aria-labelledby="parks-heading" className="dest-parks">
        <div className="dest-parks__inner">
          <Reveal>
            <h2 id="parks-heading" className="dest-section-head__title">
              The northern circuit
            </h2>
            <p className="dest-section-head__lede">
              Classic parks plus seasonal plains and the Rift Valley, easily combined in one journey.
            </p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-parks__list">
            {parks.map((d, i) => (
              <PlaceCard
                key={d.slug}
                d={d}
                journeys={journeys}
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
              The southern circuit
            </h2>
            <p className="dest-section-head__lede">
              Quieter parks and longer days in the bush, further from the classic north. Tell us if
              you want to go south and we will shape the route.
            </p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-circuit__list">
            {SOUTHERN.map((d, i) => (
              <PlaceCard
                key={d.slug}
                d={d}
                journeys={journeys}
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
              The western circuit
            </h2>
            <p className="dest-section-head__lede">
              Remote west Tanzania, for travellers who want more space and fewer vehicles. We plan
              these as tailor-made additions.
            </p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-circuit__list">
            {WESTERN.map((d, i) => (
              <PlaceCard
                key={d.slug}
                d={d}
                journeys={journeys}
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
              Beyond the parks
            </h2>
            <p className="dest-section-head__lede">Add a mountain or a coast to any safari.</p>
          </Reveal>
          <Reveal as="ul" stagger className="dest-beyond__list">
            {beyond.map((d) => (
              <PlaceCard key={d.slug} d={d} journeys={journeys} short />
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
