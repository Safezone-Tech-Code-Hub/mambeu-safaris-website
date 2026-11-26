import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink, isPlaceholder, lines } from '../content/schema.js';
import { resolveImageSrc } from '../lib/utils.js';
import Reveal from './Reveal.jsx';

export default function MambeuIntro() {
  const { pages } = useCms();
  const intro = pages.home.intro;
  const paragraphs = lines(intro.paragraphs);
  const paths = (intro.paths || []).filter((p) => p && String(p.label ?? '').trim());
  const facts = (intro.facts || []).filter((f) => f && !isPlaceholder(f.value));
  return (
    <section className="mambeu-intro" aria-labelledby="mambeu-intro-heading">
      <div className="mambeu-intro__container">
        <div className="mambeu-intro__masthead">
          <p>{intro.sectionLabel}</p>
          <p className="mambeu-intro__location">{intro.location}</p>
        </div>

        <div className="mambeu-intro__grid">
          <Reveal className="mambeu-intro__main">
            <h2 id="mambeu-intro-heading" className="mambeu-intro__title">
              {intro.titleLine1}
              {intro.titleLine2 ? (
                <>
                  <br />
                  <span className="section-header__quiet">{intro.titleLine2}</span>
                </>
              ) : null}
            </h2>

            <div className="home-intro__text">
              <p className="home-intro__lead">{intro.lead}</p>

              <div className="home-intro__body">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p className="home-intro__paths-label">
                {intro.pathsLabel}
              </p>
              <ul className="home-intro__paths">
                {paths.map((p, i) => (
                  <li key={i}>
                    <Link to={cmsLink(p.link)} className="home-intro__path">
                      <span>{p.label}</span>
                      <span aria-hidden="true" className="home-intro__path-arrow">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="home-intro__more">
                <Link to={cmsLink(intro.linkPath, '/about/')} className="mambeu-intro__link">
                  {intro.linkText}
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
                  <img src={resolveImageSrc(intro.photoLarge)} alt={intro.photoLargeAlt} decoding="async" />
                  <div className="mambeu-intro__photo-overlay" aria-hidden="true" />
                </Reveal>
                <Reveal
                  variant="image"
                  delay={150}
                  className="mambeu-intro__photo mambeu-intro__photo--small"
                >
                  <img src={resolveImageSrc(intro.photoSmall)} alt={intro.photoSmallAlt} decoding="async" />
                  <div className="mambeu-intro__photo-overlay" aria-hidden="true" />
                </Reveal>
              </div>
              <p className="mambeu-intro__caption">{intro.photoCaption}</p>
            </div>
          </div>
        </div>

        <Reveal as="dl" stagger className="mambeu-intro__facts">
          {facts.map((f, i) => (
            <div key={i} className="mambeu-intro__fact">
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
