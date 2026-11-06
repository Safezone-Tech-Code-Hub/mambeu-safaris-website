import { principles, principlesIntro as i } from '../lib/principles.js';
import Reveal from './Reveal.jsx';

const ICONS = {
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-4 3-7 8-7 0 5-3 8-8 7z" />
      <path d="M12 15c0-3-2-5-6-5 0 4 2 6 6 5z" />
    </>
  ),
};

export default function Principles() {
  const items = [...principles].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section className="principles" aria-labelledby="about-principles-heading">
      <div className="principles__inner">
        <Reveal>
          <p className="principles__eyebrow">{i.eyebrow}</p>
          <h2 id="about-principles-heading" className="principles__title">
            {i.title} {i.accent}
          </h2>
        </Reveal>

        <Reveal as="ol" stagger className="principles__list">
          {items.map((p) => (
            <li key={p.title} className="principles__item">
              <div className="principles__top">
                <span className="principles__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[p.icon]}
                  </svg>
                </span>
              </div>
              <h3 className="principles__item-title">{p.title}</h3>
              <p className="principles__text">{p.text}</p>
              {p.tag ? <p className="principles__tag">{p.tag}</p> : null}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
