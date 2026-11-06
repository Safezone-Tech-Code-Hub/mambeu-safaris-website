import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavourites } from '../FavouritesProvider.jsx';
import {
  destNavFeatured,
  destNavPlaces,
  experienceNavFeatured,
  safariNavPlaces,
} from '../lib/nav-menus.js';
import { planHref } from '../lib/plan-link.js';
import { href, Img } from '../lib/utils.js';

const OPEN_MS = 140;
const CLOSE_MS = 260;

const LINKS = [
  { to: '/', label: 'Home' },
  {
    to: href('safaris'),
    label: 'Safaris',
    matchPrefix: href('safaris'),
    parentIsLink: true,
    mega: 'safaris',
    children: safariNavPlaces,
  },
  {
    to: href('destinations'),
    label: 'Destinations',
    matchPrefix: href('destinations'),
    parentIsLink: true,
    mega: 'destinations',
    children: destNavPlaces,
  },
  { to: href('experiences'), label: 'Experiences' },
  { to: href('about'), label: 'Our story' },
  { to: planHref(), label: 'Contact Us' },
];

function normPath(path) {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') + '/';
}

function motionDelay(ms) {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 0;
  }
  return ms;
}

function PlaceIcon({ name }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'Comfort') {
    return (
      <svg {...common}>
        <path d="M4 11.5l8-5.5 8 5.5" />
        <path d="M6 11v7h12v-7" />
        <path d="M10 18v-4h4v4" />
      </svg>
    );
  }

  if (name === 'Luxury') {
    return (
      <svg {...common}>
        <path d="M12 4.5l1.8 4.6 5 .4-3.8 3.2 1.2 4.8L12 15.4 7.8 17.5l1.2-4.8L5.2 9.5l5-.4L12 4.5z" />
      </svg>
    );
  }

  if (name === 'Camping') {
    return (
      <svg {...common}>
        <path d="M4 18l8-12 8 12H4z" />
        <path d="M12 6v12" />
      </svg>
    );
  }

  if (name === 'Kilimanjaro') {
    return (
      <svg {...common}>
        <path d="M3 18l6.2-8.4 2.3 3.1 3.3-4.7L21 18H3z" />
        <path d="M11.5 12.7l1.3-1.1 1.4 1.4" />
      </svg>
    );
  }

  if (name === 'Zanzibar') {
    return (
      <svg {...common}>
        <path d="M3 14c1.6-1.2 3.2-1.2 4.8 0s3.2 1.2 4.8 0 3.2-1.2 4.8 0 3.2 1.2 4.8 0" />
        <path d="M3 18c1.6-1.2 3.2-1.2 4.8 0s3.2 1.2 4.8 0 3.2-1.2 4.8 0 3.2 1.2 4.8 0" />
        <path d="M12 6.5V11" />
        <circle cx="12" cy="5.2" r="1.2" />
      </svg>
    );
  }

  const needle =
    name === 'Southern circuit' ? 'M12 16.5V8.2' : name === 'Western circuit' ? 'M7.5 12h8.3' : 'M12 7.5v8.3';

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d={needle} />
      <path d="M12 4.2v1.4M12 18.4v1.4M4.2 12h1.4M18.4 12h1.4" />
    </svg>
  );
}

function NavChevron() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="nav-links__chevron">
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaPanel({ items, featured, footerTo, footerLabel }) {
  return (
    <div className="nav-mega__body">
      <div className="nav-mega__grid">
        <ul className="nav-mega__places">
          {items.map((place) => (
            <li key={place.title}>
              <Link to={place.to} className="nav-mega__place">
                <span className="nav-mega__icon">
                  <PlaceIcon name={place.title} />
                </span>
                <span className="nav-mega__place-copy">
                  <span className="nav-mega__place-title">{place.title}</span>
                  <span className="nav-mega__place-text">{place.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="nav-mega__featured">
          {featured.map((card) => (
            <li key={card.title}>
              <Link to={card.to} className="nav-mega__card">
                <span className="nav-mega__card-media">
                  <img src={card.image} alt="" className="nav-mega__card-img" />
                </span>
                <span className="nav-mega__card-label">{card.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="nav-mega__footer">
        <Link to={footerTo} className="nav-mega__all">
          {footerLabel}
        </Link>
      </div>
    </div>
  );
}

export default function Nav() {
  const location = useLocation();
  const { ids } = useFavourites();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(/** @type {string | null} */ (null));
  const [mobileAccord, setMobileAccord] = useState(/** @type {string | null} */ (null));
  const openTimer = useRef(0);
  const closeTimer = useRef(0);

  const isActive = (to, matchPrefix) => {
    const current = normPath(location.pathname);
    const base = normPath((matchPrefix || to).split('?')[0]);
    if (base === '/') return current === '/';
    return current.startsWith(base);
  };

  const clearTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };

  const requestOpen = (label) => {
    window.clearTimeout(closeTimer.current);
    if (dropOpen) {
      setDropOpen(label);
      return;
    }
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setDropOpen(label), motionDelay(OPEN_MS));
  };

  const requestClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setDropOpen(null), motionDelay(CLOSE_MS));
  };

  const keepOpen = () => {
    window.clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropOpen(null);
        setMenuOpen(false);
        setMobileAccord(null);
      }
    };
    const onClick = (e) => {
      if (!e.target.closest('[data-nav-hover]')) {
        setDropOpen(null);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
      clearTimers();
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(null);
    setMobileAccord(null);
    clearTimers();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-nav-open', menuOpen);
    return () => document.documentElement.classList.remove('is-nav-open');
  }, [menuOpen]);

  const openLink = LINKS.find((l) => l.label === dropOpen);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="site-header" data-nav-hover>
        <nav className="nav-shell" aria-label="Main">
          <Link to="/" className="nav-brand" aria-label="Mambeu Safaris home">
            <Img
              src="logo.webp"
              alt="Mambeu Tanzania Safaris"
              priority
              className="nav-brand__img"
            />
          </Link>

          <ul className="nav-links">
            {LINKS.map((l) =>
              l.children ? (
                <li
                  key={l.label}
                  className="nav-links__item nav-links__item--dropdown"
                  onMouseEnter={() => requestOpen(l.label)}
                  onMouseLeave={requestClose}
                >
                  <Link
                    to={l.to}
                    className="nav-links__trigger"
                    aria-haspopup="true"
                    aria-expanded={dropOpen === l.label}
                    aria-current={isActive(l.to, l.matchPrefix) ? 'page' : undefined}
                    onFocus={() => requestOpen(l.label)}
                  >
                    {l.label}
                    <NavChevron />
                    {isActive(l.to, l.matchPrefix) && (
                      <span className="nav-links__active-mark" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ) : (
                <li key={l.label} className="nav-links__item">
                  <Link
                    to={l.to}
                    className="nav-links__link"
                    aria-current={isActive(l.to) ? 'page' : undefined}
                  >
                    {l.label}
                  </Link>
                  {isActive(l.to) && <span className="nav-links__active-mark" aria-hidden="true" />}
                </li>
              ),
            )}
          </ul>

          <div className="nav-actions">
            <Link
              to={href('favourites')}
              className={
                ids.length
                  ? 'nav-favourites nav-favourites--has-items'
                  : 'nav-favourites'
              }
              aria-current={isActive(href('favourites')) ? 'page' : undefined}
              aria-label={ids.length ? `Saved, ${ids.length} journeys` : 'Saved journeys'}
            >
              <span className="nav-favourites__label">Saved</span>
              <span className="nav-favourites__icon-wrap">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-favourites__icon">
                  <path
                    d="M12 21s-7.5-4.6-9.5-9.1C1 8.6 3.1 5 6.6 5c2 0 3.6 1.1 4.4 2.6C11.8 6.1 13.4 5 15.4 5 18.9 5 21 8.6 21.5 11.9 19.5 16.4 12 21 12 21z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                </svg>
                {ids.length > 0 && (
                  <span className="nav-favourites__badge" aria-hidden="true">
                    {ids.length}
                  </span>
                )}
              </span>
            </Link>

            <button
              type="button"
              className="nav-menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setMenuOpen((o) => !o);
                setDropOpen(null);
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="nav-menu-toggle__icon">
                {menuOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 8h16M4 16h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {dropOpen && openLink?.children && (
          <div
            className={openLink.mega === 'safaris' ? 'nav-mega nav-mega--compact' : 'nav-mega'}
            onMouseEnter={keepOpen}
            onMouseLeave={requestClose}
          >
            {openLink.mega === 'destinations' ? (
              <MegaPanel
                items={destNavPlaces}
                featured={destNavFeatured}
                footerTo={href('destinations')}
                footerLabel="View all destinations"
              />
            ) : (
              <MegaPanel
                items={safariNavPlaces}
                featured={experienceNavFeatured}
                footerTo={href('safaris')}
                footerLabel="View all safaris"
              />
            )}
          </div>
        )}

        {menuOpen && (
          <div id="mobile-menu" className="nav-mobile">
            <ul className="nav-mobile__list">
              {LINKS.map((l) => (
                <li key={l.label} className="nav-mobile__item">
                  <div className="nav-mobile__row">
                    <Link
                      to={l.to}
                      className="nav-mobile__link"
                      aria-current={isActive(l.to, l.matchPrefix) ? 'page' : undefined}
                    >
                      {l.label}
                    </Link>
                    {l.children ? (
                      <button
                        type="button"
                        className="nav-mobile__accord"
                        aria-expanded={mobileAccord === l.label}
                        aria-controls={`mobile-sub-${l.label}`}
                        onClick={() =>
                          setMobileAccord((cur) => (cur === l.label ? null : l.label))
                        }
                      >
                        <span className="xp-sr-only">
                          {mobileAccord === l.label ? 'Collapse' : 'Expand'} {l.label}
                        </span>
                        <NavChevron />
                      </button>
                    ) : null}
                  </div>
                  {l.children && mobileAccord === l.label && (
                    <ul id={`mobile-sub-${l.label}`} className="nav-mobile__sub">
                      {l.children.map((c) => (
                        <li key={c.title}>
                          <Link to={c.to} className="nav-mobile__sublink">
                            {c.title}
                          </Link>
                        </li>
                      ))}
                      {l.mega === 'destinations' ? (
                        <li>
                          <Link to={href('destinations')} className="nav-mobile__sublink">
                            View all destinations
                          </Link>
                        </li>
                      ) : null}
                      {l.mega === 'safaris' ? (
                        <li>
                          <Link to={href('safaris')} className="nav-mobile__sublink">
                            View all safaris
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
