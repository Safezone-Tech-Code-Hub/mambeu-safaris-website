import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { homePageDefaults } from '../data/home-page-defaults.js';
import { href } from '../lib/utils.js';
import Reveal from './Reveal.jsx';

/** @typedef {{ label: string; value: string; note?: string }} MambeuIntroFact */

// Replace [X] only with confirmed numbers.
const DEFAULT_FACTS = /** @type {MambeuIntroFact[]} */ ([
  { label: 'Home base', value: 'Arusha, Tanzania', note: '3.3869° S, 36.6830° E' },
  { label: 'Ownership', value: 'Locally owned', note: 'Operated in Tanzania' },
  { label: 'Years guiding', value: '[X]' },
  { label: 'Travellers hosted', value: '[X]' },
]);

/**
 * @param {{
 *   sectionLabel?: string;
 *   location?: string;
 *   headline?: import('react').ReactNode;
 *   facts?: MambeuIntroFact[];
 * }} [props]
 */
export default function MambeuIntro({
  sectionLabel = 'Welcome to Mambeu Safaris',
  location = 'Arusha, Tanzania',
  headline = (
    <>
      Big on adventure.
      <br />
      <span className="section-header__quiet">Thoughtful about everything else.</span>
    </>
  ),
  facts = DEFAULT_FACTS,
}) {
  const { pages } = useCms();
  const intro = { ...homePageDefaults.intro, ...(pages.home?.intro || {}) };
  const paragraphs =
    Array.isArray(intro.paragraphs) && intro.paragraphs.length
      ? intro.paragraphs
      : homePageDefaults.intro.paragraphs;
  const paths =
    Array.isArray(intro.paths) && intro.paths.every((p) => p && p.label)
      ? intro.paths
      : homePageDefaults.intro.paths;
  return (
    <section className="mambeu-intro" aria-labelledby="mambeu-intro-heading">
      <div className="mambeu-intro__container">
        <div className="mambeu-intro__masthead">
          <p>{sectionLabel}</p>
          <p className="mambeu-intro__location">{location}</p>
        </div>

        <div className="mambeu-intro__grid">
          <Reveal className="mambeu-intro__main">
            <h2 id="mambeu-intro-heading" className="mambeu-intro__title">
              {headline}
            </h2>

            <div className="home-intro__text">
              <p className="home-intro__lead">{intro.lead || homePageDefaults.intro.lead}</p>

              <div className="home-intro__body">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <p className="home-intro__paths-label">
                {intro.pathsLabel || homePageDefaults.intro.pathsLabel}
              </p>
              <ul className="home-intro__paths">
                {paths.map((p) => (
                  <li key={p.label}>
                    <Link to={p.to} className="home-intro__path">
                      <span>{p.label}</span>
                      <span aria-hidden="true" className="home-intro__path-arrow">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="home-intro__more">
                <Link to={href('about')} className="mambeu-intro__link">
                  About us
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mambeu-intro__photos">
            <div className="mambeu-intro__photo-stack">
              <div className="mambeu-intro__photo-anchor">
                <Reveal
                  variant="image"
                  className="mambeu-intro__photo mambeu-intro__photo--large"
                >
                  <img
                    src="/images/intro/people.jpg"
                    alt="Mambeu guide with travellers beside a safari vehicle"
                    decoding="async"
                  />
                  <div className="mambeu-intro__photo-overlay" aria-hidden="true" />
                </Reveal>
                <Reveal
                  variant="image"
                  delay={150}
                  className="mambeu-intro__photo mambeu-intro__photo--small"
                >
                  <img
                    src="/images/intro/arusha.jpg"
                    alt="Arusha with Mount Meru in the distance"
                    decoding="async"
                  />
                  <div className="mambeu-intro__photo-overlay" aria-hidden="true" />
                </Reveal>
              </div>
              <p className="mambeu-intro__caption">Where every journey starts</p>
            </div>
          </div>
        </div>

        <Reveal as="dl" stagger className="mambeu-intro__facts">
          {facts
            .filter((f) => f.value && !String(f.value).includes('[X]'))
            .map((f) => (
              <div key={f.label} className="mambeu-intro__fact">
                <dt className="mambeu-intro__fact-label">{f.label}</dt>
                <dd className="mambeu-intro__fact-value">{f.value}</dd>
                {f.note ? <p className="mambeu-intro__fact-note">{f.note}</p> : null}
              </div>
            ))}
        </Reveal>
      </div>
    </section>
  );
}
