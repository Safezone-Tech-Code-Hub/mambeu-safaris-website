import { useMemo, useState } from 'react';
import ExperienceCard from './ExperienceCard.jsx';
import Reveal from './Reveal.jsx';

const KNOW = [
  { title: 'Optional add-ons', text: 'Added to any safari.' },
  { title: 'Priced separately', text: 'Confirmed with your quote.' },
  { title: 'Locally guided', text: 'By our own team and partners.' },
];

export default function ExperiencesBrowser({ experiences, intro, onOpen }) {
  const [category, setCategory] = useState('All');

  const published = useMemo(
    () =>
      experiences
        .filter((e) => e.published)
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [experiences],
  );

  const categories = useMemo(() => {
    const seen = [];
    published.forEach((e) => {
      if (!seen.includes(e.category)) seen.push(e.category);
    });
    return seen;
  }, [published]);

  const countFor = (c) =>
    c === 'All' ? published.length : published.filter((e) => e.category === c).length;

  const featured = published.find((e) => e.featured) ?? null;
  const showFeatured = featured && (category === 'All' || featured.category === category);
  const gridItems = published.filter((e) => {
    if (showFeatured && e.slug === featured.slug) return false;
    return category === 'All' ? true : e.category === category;
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
              {KNOW.map((f) => (
                <li key={f.title} className="xp-intro__fact">
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
            {['All', ...categories].map((c) => {
              const on = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(c)}
                  className={on ? 'xp-filter__btn xp-filter__btn--on' : 'xp-filter__btn'}
                >
                  {c}
                  <span className="xp-filter__n">{countFor(c)}</span>
                </button>
              );
            })}
          </div>
          <p className="xp-filter__count">
            {published.length} {published.length === 1 ? 'experience' : 'experiences'}
          </p>
        </div>
      </div>

      <section aria-label="Experiences" className="xp-browse">
        <div className="xp-container">
          {showFeatured ? <ExperienceCard e={featured} featured onOpen={onOpen} /> : null}

          {gridItems.length > 0 ? (
            <ul className={showFeatured ? 'xp-grid xp-grid--after' : 'xp-grid'}>
              {gridItems.map((e) => (
                <li key={e.slug}>
                  <ExperienceCard e={e} onOpen={onOpen} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </div>
  );
}
