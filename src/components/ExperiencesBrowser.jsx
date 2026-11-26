import { useMemo, useState } from 'react';
import ExperienceCard from './ExperienceCard.jsx';
import Reveal from './Reveal.jsx';

/** `experiences` arrive published and in display order (see publishedExperienceList). */
export default function ExperiencesBrowser({ experiences, intro, facts = [], filter, card, onOpen }) {
  const ALL = '__all__';
  const [category, setCategory] = useState(ALL);
  const published = experiences;

  const categories = useMemo(() => {
    const seen = [];
    published.forEach((e) => {
      if (!seen.includes(e.category)) seen.push(e.category);
    });
    return seen;
  }, [published]);

  const countFor = (c) =>
    c === ALL ? published.length : published.filter((e) => e.category === c).length;

  const featured = published.find((e) => e.featured) ?? null;
  const showFeatured = featured && (category === ALL || featured.category === category);
  const gridItems = published.filter((e) => {
    if (showFeatured && e.slug === featured.slug) return false;
    return category === ALL ? true : e.category === category;
  });

  return (
    <div className="xp-browser">
      {intro ? (
        <Reveal as="section" className="xp-intro" aria-labelledby="xp-intro-heading">
          <div className="xp-container">
            <p className="xp-intro__eyebrow">{intro.eyebrow}</p>
            <h2 id="xp-intro-heading" className="xp-intro__title">
              {intro.title}
            </h2>
            <p className="xp-intro__text">{intro.text}</p>

            <ul className="xp-intro__facts">
              {facts.map((f, i) => (
                <li key={i} className="xp-intro__fact">
                  <span className="xp-intro__fact-title">{f.title}</span>
                  <span className="xp-intro__fact-text">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}

      <div className="xp-filter">
        <div className="xp-container xp-filter__inner">
          <div role="group" aria-label="Filter experiences by category" className="xp-filter__chips">
            {[ALL, ...categories].map((c) => {
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(c)}
                  className={on ? 'xp-filter__btn xp-filter__btn--on' : 'xp-filter__btn'}
                >
                  {c === ALL ? filter.allLabel : c}
                  <span className="xp-filter__n">{countFor(c)}</span>
                </button>
              );
            })}
          </div>
          <p className="xp-filter__count">
            {published.length} {published.length === 1 ? filter.countSingular : filter.countPlural}
          </p>
        </div>
      </div>

      <section aria-label="Experiences" className="xp-browse">
        <div className="xp-container">
          {showFeatured ? <ExperienceCard e={featured} featured copy={card} onOpen={onOpen} /> : null}

          {gridItems.length > 0 ? (
            <ul className={showFeatured ? 'xp-grid xp-grid--after' : 'xp-grid'}>
              {gridItems.map((e) => (
                <li key={e.slug}>
                  <ExperienceCard e={e} copy={card} onOpen={onOpen} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  );
}
