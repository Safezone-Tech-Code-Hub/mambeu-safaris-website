import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import { resolveImageSrc } from '../lib/utils.js';

export default function ExperienceCard({ e, featured = false, copy, onOpen }) {
  const facts = [e.location, e.duration].filter(Boolean).join(' · ');

  return (
    <article id={e.slug} className={featured ? 'xp-card xp-card--featured' : 'xp-card'}>
      <div className="xp-card__media">
        <img
          src={resolveImageSrc(e.image)}
          alt={e.imageAlt}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className="xp-card__img"
          style={{ objectPosition: e.focal ?? '50% 50%' }}
        />
      </div>

      <div className="xp-card__body">
        <p className="xp-card__kicker">{e.category}</p>
        <h3 className="xp-card__title">{e.title}</h3>
        <p className="xp-card__summary">{e.summary}</p>
        {facts ? <p className="xp-card__facts">{facts}</p> : null}

        {e.highlights.length > 0 ? (
          <ul className="xp-card__pills">
            {e.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="xp-card__pill">
                {h}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="xp-card__actions">
          <button
            type="button"
            className="xp-card__details"
            data-xp-open={e.slug}
            onClick={() => onOpen(e.slug)}
          >
            {copy.detailsButton}
            <span className="xp-sr-only">: {e.title}</span>
          </button>
          <Link className="xp-card__plan" to={planHref({ experience: e.slug })}>
            {copy.planButton} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
