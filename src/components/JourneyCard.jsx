import { Link } from 'react-router-dom';
import { useFavourites } from '../FavouritesProvider.jsx';
import { href } from '../lib/utils.js';
import { toJourney } from '../lib/journeys.js';

const clean = (s) => String(s || '').replace(/\s*(\.{3}|…)\s*$/, '').trim();

/**
 * @param {{
 *   journey?: import('../lib/journeys.js').Journey;
 *   t?: Record<string, unknown> & { id: number; title: string; path: string; days: number };
 *   priority?: boolean;
 * }} props
 */
export default function JourneyCard({ journey, t, priority = false }) {
  const j = journey || (t ? toJourney(t) : null);
  const { has, toggle } = useFavourites();
  if (!j) return null;

  const saved = has(j.id);
  const priceValue = j.pricing === 'tailored' ? 'Tailored quotation' : 'By group size';

  return (
    <li className="journey-card">
      <div className="journey-card__media">
        <img
          src={j.image}
          alt={j.title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="journey-card__img"
          {...(priority ? { fetchPriority: 'high' } : {})}
        />
        <span className="journey-card__tier">{j.tier}</span>
        <button
          type="button"
          aria-label={saved ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={saved}
          onClick={() => toggle(j.id)}
          className={saved ? 'journey-card__save journey-card__save--active' : 'journey-card__save'}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="journey-card__heart"
            strokeWidth={2}
          >
            <path d="M12 21s-7.5-4.6-9.5-9.1C1 8.6 3.1 5 6.6 5c2 0 3.6 1.1 4.4 2.6C11.8 6.1 13.4 5 15.4 5 18.9 5 21 8.6 21.5 11.9 19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>

      <div className="journey-card__body">
        <p className="journey-card__route">{j.route.join(' · ')}</p>
        <h3 className="journey-card__title">{j.title}</h3>
        <p className="journey-card__desc">{clean(j.description)}</p>

        <dl className="journey-card__meta">
          <div>
            <dt>Duration</dt>
            <dd>
              {j.days} {j.days === 1 ? 'day' : 'days'}
            </dd>
          </div>
          <div>
            <dt>Pricing</dt>
            <dd>{priceValue}</dd>
          </div>
        </dl>

        <Link to={href(j.path)} className="journey-card__link">
          View more
          <span aria-hidden="true" className="journey-card__arrow">
            →
          </span>
          <span className="journey-card__sr">: {j.title}</span>
        </Link>
      </div>
    </li>
  );
}
