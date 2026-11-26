import { useCms } from '../CmsProvider.jsx';
import { lines } from '../content/schema.js';
import { resolveImageSrc } from '../lib/utils.js';
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

  if (name === 'tree') {
    return (
      <svg {...common}>
        <path d="M12 21v-7" />
        <path d="M7.5 16.5c0-4.2 2-7.5 4.5-7.5s4.5 3.3 4.5 7.5H7.5z" />
        <path d="M9 11.2C8.2 9 8.8 6.8 12 5.5c3.2 1.3 3.8 3.5 3 5.7" />
      </svg>
    );
  }

  if (name === 'people') {
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
  const { pages } = useCms();
  const a = pages.about.intro;
  const paragraphs = lines(a.paragraphs);
  const pillars = (a.pillars || []).filter((p) => p && String(p.title ?? '').trim());

  return (
    <section className="about-intro" aria-labelledby="about-who-heading">
      <div className="about-intro__grid">
        <Reveal className="about-intro__copy">
          <p className="about-intro__eyebrow">{a.eyebrow}</p>
          <h2 id="about-who-heading" className="about-intro__title">
            {a.titleLine1} <span className="about-intro__accent">{a.titleLine2}</span>
          </h2>
          <p className="about-intro__lead">{a.lead}</p>
          <div className="about-intro__body">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {pillars.length > 0 ? (
            <ul className="about-intro__pillars">
              {pillars.map((p, i) => (
                <li key={i} className="about-intro__pillar">
                  <span className="about-intro__icon">
                    <PillarIcon name={p.icon} />
                  </span>
                  <h3 className="about-intro__pillar-title">{p.title}</h3>
                  <p className="about-intro__pillar-text">{p.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <figure className="about-intro__figure">
          <Reveal variant="fade" className="about-intro__photo">
            <img
              src={resolveImageSrc(a.photo)}
              alt={a.photoAlt}
              className="about-intro__img"
              style={{ objectPosition: a.photoFocal || '50% 50%' }}
              decoding="async"
            />
          </Reveal>
          <figcaption className="about-intro__caption">{a.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
