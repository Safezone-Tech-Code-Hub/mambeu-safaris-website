import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { planHref } from '../lib/plan-link.js';
import { href, Img } from '../lib/utils.js';

const TANZANIA = [
  { to: href('safaris'), label: 'Safari collection' },
  { to: href('comfort'), label: 'Comfort levels' },
  { to: href('kilimanjaro'), label: 'Kilimanjaro' },
  { to: href('zanzibar'), label: 'Zanzibar' },
  { to: href('destinations'), label: 'Destinations' },
  { to: href('favourites'), label: 'Saved journeys' },
];

const KNOW = [
  { to: href('about'), label: 'Our story' },
  { to: href('experiences'), label: 'Experiences' },
  { to: href('travel-guide'), label: 'Planning & FAQs' },
  { to: planHref(), label: 'Plan your safari' },
];

const TERMS_HREF = 'https://mambeusafaris.com/terms-conditions/';

function ColumnTitle({ children }) {
  return <h3 className="site-footer__title">{children}</h3>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { pages } = useCms();
  const c = siteChrome(pages);
  const phoneTel = c.phoneE164 || c.whatsapp;

  return (
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <Link className="site-footer__logo" to="/" aria-label="Mambeu Safaris home">
                <Img
                  src="logo-white.webp"
                  alt="Mambeu Tanzania Safaris"
                  className="site-footer__logo-img"
                />
              </Link>

              <p className="site-footer__tagline">Local roots. Personal journeys.</p>
              <p className="site-footer__lede">
                Wildlife, mountains and coast, thoughtfully brought together.
              </p>

              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__whatsapp"
              >
                Talk to us on WhatsApp
                <span className="site-footer__sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="site-footer__links">
              <nav aria-label="Your Tanzania">
                <ColumnTitle>Your Tanzania</ColumnTitle>
                <ul className="site-footer__list">
                  {TANZANIA.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="site-footer__link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Get to know us">
                <ColumnTitle>Get to know us</ColumnTitle>
                <ul className="site-footer__list">
                  {KNOW.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="site-footer__link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="site-footer__contact">
              <ColumnTitle>Your local team</ColumnTitle>
              <dl className="site-footer__dl">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${c.email}`} className="site-footer__link site-footer__link--solid">
                      {c.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:+${phoneTel}`} className="site-footer__link site-footer__link--solid">
                      {c.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>
                    {c.officeLocation}
                    <br />
                    {c.officeHours} EAT
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="site-footer__base">
            <p>© {year} Mambeu Safaris</p>
            <ul className="site-footer__legal">
              <li>
                <a
                  href={TERMS_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__base-link"
                >
                  Booking terms
                  <span className="site-footer__sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link to={href('privacy')} className="site-footer__base-link">
                  Privacy
                </Link>
              </li>
              <li>
                <a href="#top" className="site-footer__base-link">
                  Back to top <span aria-hidden="true">↑</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
}
