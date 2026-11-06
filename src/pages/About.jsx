import AboutIntro from '../components/AboutIntro.jsx';
import FinalCta from '../components/FinalCta.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Principles from '../components/Principles.jsx';
import Reveal from '../components/Reveal.jsx';
import { useCms } from '../CmsProvider.jsx';
import { aboutPageDefaults } from '../data/about-page-defaults.js';

function mergeAbout(cms) {
  const next = cms && typeof cms === 'object' ? cms : {};
  const who = { ...aboutPageDefaults.who, ...(next.who || {}) };
  const principles = { ...aboutPageDefaults.principles, ...(next.principles || {}) };
  const why = { ...aboutPageDefaults.why, ...(next.why || {}) };
  const mv = { ...aboutPageDefaults.missionVision, ...(next.missionVision || {}) };
  return {
    ...aboutPageDefaults,
    ...next,
    hero: { ...aboutPageDefaults.hero, ...(next.hero || {}) },
    who: {
      ...who,
      paragraphs:
        Array.isArray(who.paragraphs) && who.paragraphs.length
          ? who.paragraphs
          : aboutPageDefaults.who.paragraphs,
      image: { ...aboutPageDefaults.who.image, ...(who.image || {}) },
    },
    proof: { ...aboutPageDefaults.proof, ...(next.proof || {}) },
    principles: {
      ...principles,
      items:
        Array.isArray(principles.items) && principles.items.length
          ? principles.items
          : aboutPageDefaults.principles.items,
    },
    missionVision: {
      mission: { ...aboutPageDefaults.missionVision.mission, ...(mv.mission || {}) },
      vision: { ...aboutPageDefaults.missionVision.vision, ...(mv.vision || {}) },
    },
    why: {
      ...why,
      items:
        Array.isArray(why.items) && why.items.length ? why.items : aboutPageDefaults.why.items,
    },
  };
}

function WhyIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'var(--forest-display)',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'Local expertise') {
    return (
      <svg {...common}>
        <circle cx="12" cy="7.5" r="2.25" />
        <path d="M8 19c.5-3.4 1.8-5 4-5s3.5 1.6 4 5" />
      </svg>
    );
  }

  if (name === 'Sustainable') {
    return (
      <svg {...common}>
        <path d="M12 20V10" />
        <path d="M12 10c0-4.2 4.8-5.2 4.8-1.4 0 2.6-3.2 4-4.8 4.4-1.6-.4-4.8-1.8-4.8-4.4 0-3.8 4.8-2.8 4.8 1.4z" />
      </svg>
    );
  }

  if (name === 'Cultural exchange') {
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
      <path d="M3 17.5h18" />
      <path d="M3 17.5l5.2-6.2 3.1 3.4L16 8.5l5 9" />
    </svg>
  );
}

export default function About() {
  const { pages } = useCms();
  const a = mergeAbout(pages.about);

  return (
    <main id="main" className="about">
      <PageHeader
        id="about-heading"
        eyebrow={a.hero.eyebrow}
        title={
          <>
            {a.hero.titleLine1}
            <br />
            <span className="page-header__quiet">{a.hero.titleLine2}</span>
          </>
        }
        description={a.hero.text}
        image={a.hero.image}
        imagePosition={a.hero.imagePosition}
      />

      <AboutIntro />

      <div className="about-proof">
        <Reveal className="about-container about-proof__inner">
          {a.proof.logo ? (
            <img
              src={a.proof.logo}
              alt={a.proof.logoAlt || 'SafariBookings'}
              className="about-proof__logo"
              width="225"
              height="225"
            />
          ) : null}
          <div className="about-proof__copy">
            <p className="about-proof__label">{a.proof.label}</p>
            <p className="about-proof__text">{a.proof.text}</p>
          </div>
          <a
            className="about-button"
            href={a.proof.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            View our profile
            <span className="xp-sr-only"> on SafariBookings (opens in a new tab)</span>
          </a>
        </Reveal>
      </div>

      <Principles />

      <section className="about-mv" aria-label="Mission and vision">
        <Reveal stagger className="about-container about-mv__grid">
          {[a.missionVision.mission, a.missionVision.vision].map((b) => (
            <div key={b.label} className="about-mv__block">
              <p className="about-eyebrow">{b.label}</p>
              <p className="about-mv__text">{b.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="about-why" aria-labelledby="about-why-heading">
        <div className="about-container">
          <Reveal>
            <p className="about-eyebrow">{a.why.eyebrow}</p>
            <h2 id="about-why-heading" className="about-heading">
              {a.why.title}
            </h2>
            <p className="about-why__intro">{a.why.text}</p>
          </Reveal>
          <Reveal as="ul" stagger className="about-why__list">
            {a.why.items.map((it) => (
              <li key={it.title} className="about-why__item">
                <span className="about-why__icon">
                  <WhyIcon name={it.title} />
                </span>
                <h3 className="about-why__title">{it.title}</h3>
                <p className="about-body">{it.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
