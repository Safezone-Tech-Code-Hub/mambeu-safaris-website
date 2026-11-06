import { aboutIntro as a } from '../lib/about.js';
import Reveal from './Reveal.jsx';

function PillarIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'Conservationists') {
    return (
      <svg {...common}>
        <path d="M12 21v-7" />
        <path d="M7.5 16.5c0-4.2 2-7.5 4.5-7.5s4.5 3.3 4.5 7.5H7.5z" />
        <path d="M9 11.2C8.2 9 8.8 6.8 12 5.5c3.2 1.3 3.8 3.5 3 5.7" />
      </svg>
    );
  }

  if (name === 'Partners') {
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="2" />
        <path d="M5 19c.4-3.2 1.5-4.6 3-4.6s2.6 1.4 3 4.6" />
        <circle cx="16" cy="8" r="2" />
        <path d="M13 19c.4-3.2 1.5-4.6 3-4.6s2.6 1.4 3 4.6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 5.5v14" />
      <path d="M12 5.5c-2.4-1.3-5.6-1.4-8.2 0v13.2c2.6-1.4 5.8-1.3 8.2 0" />
      <path d="M12 5.5c2.4-1.3 5.6-1.4 8.2 0v13.2c-2.6-1.4-5.8-1.3-8.2 0" />
    </svg>
  );
}

export default function AboutIntro() {
  const photoSrc = a.image;
  const photoIsPublic = String(photoSrc).startsWith('/');

  return (
    <section className="about-intro" aria-labelledby="about-who-heading">
      <div className="about-intro__grid">
        <Reveal className="about-intro__copy">
          <p className="about-intro__eyebrow">{a.eyebrow}</p>
          <h2 id="about-who-heading" className="about-intro__title">
            {a.title} <span className="about-intro__accent">{a.titleAccent}</span>
          </h2>
          <p className="about-intro__lead">{a.lead}</p>
          <div className="about-intro__body">
            {a.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {Array.isArray(a.pillars) && a.pillars.length > 0 ? (
            <ul className="about-intro__pillars">
              {a.pillars.map((p) => (
                <li key={p.title} className="about-intro__pillar">
                  <span className="about-intro__icon">
                    <PillarIcon name={p.title} />
                  </span>
                  <h3 className="about-intro__pillar-title">{p.title}</h3>
                  <p className="about-intro__pillar-text">{p.text}</p>
                </li>
              ))}
            </ul>
          ) : null}

          {Array.isArray(a.stats) && a.stats.length > 0 ? (
            <dl className="about-intro__stats">
              {a.stats.map((s) => (
                <div key={s.label} className="about-intro__stat">
                  <dt className="about-intro__stat-label">{s.label}</dt>
                  <dd className="about-intro__stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </Reveal>

        <figure className="about-intro__figure">
          <Reveal variant="fade" className="about-intro__photo">
            <img
              src={photoIsPublic ? photoSrc : `/assets/${photoSrc}`}
              alt={a.imageAlt}
              className="about-intro__img"
              style={{ objectPosition: a.focal || '50% 50%' }}
              decoding="async"
            />
          </Reveal>
          <figcaption className="about-intro__caption">{a.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
