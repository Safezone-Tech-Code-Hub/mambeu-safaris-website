import { Link } from 'react-router-dom';
import { useFavourites } from '../FavouritesProvider.jsx';
import { useCms } from '../CmsProvider.jsx';
import { toJourney } from '../lib/journeys.js';
import { href, money, tourCardPricingTier } from '../lib/utils.js';

function HeartIcon({ className, filled = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7.5-4.6-9.5-9.1C1 8.6 3.1 5 6.6 5c2 0 3.6 1.1 4.4 2.6C11.8 6.1 13.4 5 15.4 5 18.9 5 21 8.6 21.5 11.9 19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function PinIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 8.5V12l2.5 2" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

function priceLabel(tour) {
  const tier = tourCardPricingTier(tour);
  if (tier?.price != null && Number(tier.price) > 0) {
    return `From ${money(tier.price)} per person`;
  }
  return 'Tailored quotation';
}

export default function Favourites() {
  const { ids, toggle, clear } = useFavourites();
  const { tours } = useCms();
  const savedTours = ids.map((id) => tours.find((t) => t.id === id)).filter(Boolean);
  const count = savedTours.length;

  return (
    <main id="main" className="fav-page">
      <header className="fav-hero">
        <div className="fav-hero__inner">
          <HeartIcon className="fav-hero__heart" filled />
          <h1 id="favourites-heading" className="fav-hero__title">
            Your saved safaris
          </h1>
          <p className="fav-hero__lede">
            {count === 0
              ? 'Tap the heart on any tour or destination and it will wait for you here.'
              : `${count} ${count === 1 ? 'item' : 'items'} you have hearted, kept on this device.`}
          </p>
        </div>
      </header>

      <section className="fav-body" aria-labelledby="favourites-heading">
        <div className="fav-body__inner">
          {count > 0 ? (
            <>
              <div className="fav-toolbar">
                <p className="fav-toolbar__label">
                  Saved safaris
                  <span className="fav-toolbar__count">{count}</span>
                </p>
                <Link to={href('safaris')} className="fav-toolbar__link">
                  Browse all safaris
                </Link>
              </div>

              <ul className="fav-list">
                {savedTours.map((t) => {
                  const j = toJourney(t);
                  return (
                    <li key={t.id} className="fav-item">
                      <div className="fav-item__media">
                        <img src={j.image} alt="" loading="lazy" decoding="async" />
                      </div>
                      <div className="fav-item__body">
                        <p className="fav-item__place">
                          <PinIcon className="fav-item__icon" />
                          Tanzania
                        </p>
                        <h2 className="fav-item__title">
                          <Link to={href(j.path)}>{j.title}</Link>
                        </h2>
                        <p className="fav-item__meta">
                          <ClockIcon className="fav-item__icon" />
                          <span>
                            {j.days} {j.days === 1 ? 'day' : 'days'}
                            <span aria-hidden="true"> - </span>
                            {priceLabel(t)}
                          </span>
                        </p>
                        <div className="fav-item__actions">
                          <Link to={href(j.path)} className="fav-item__view">
                            View details
                          </Link>
                          <button
                            type="button"
                            className="fav-item__remove"
                            onClick={() => toggle(t.id)}
                          >
                            <TrashIcon className="fav-item__trash" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="fav-clear">
                <button type="button" className="fav-clear__btn" onClick={clear}>
                  <TrashIcon className="fav-clear__icon" />
                  Clear all saved items
                </button>
              </div>
            </>
          ) : (
            <div className="fav-empty">
              <HeartIcon className="fav-empty__heart" />
              <h2 className="fav-empty__title">Nothing saved yet</h2>
              <p className="fav-empty__text">
                Browse the safaris and destinations, tap the heart in the corner of any card, and
                they will collect here so you can compare them later.
              </p>
              <div className="fav-empty__actions">
                <Link to={href('safaris')} className="fav-empty__primary">
                  Browse safaris
                </Link>
                <Link to={href('destinations')} className="fav-empty__secondary">
                  Browse destinations
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
