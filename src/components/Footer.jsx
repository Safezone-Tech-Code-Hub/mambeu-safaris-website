import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { href } from '../lib/utils.js';

export default function Footer() {
  const year = new Date().getFullYear();
  const { pages } = useCms();
  const c = siteChrome(pages);
  const inviteTitle = String(c.finalInviteTitle || '').split('\n');
  return (
    <>
      <section className="final-invite">
        <div className="wrap">
          <div>
            <span className="eyebrow">{c.finalInviteEyebrow}</span>
            <h2>
              {inviteTitle.map((line, i) => (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <div>
            <p>{c.finalInviteText}</p>
            <Link to={href('plan')} className="button light">
              Let’s plan your safari
            </Link>
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap foot-grid">
          <div className="foot-intro">
            <Link className="wordmark" to="/">
              MAMBEU<span>TANZANIA SAFARIS</span>
            </Link>
            <p>
              Local roots. Personal journeys.
              <br />
              Wildlife, mountains and coast, thoughtfully brought together.
            </p>
            <a
              href={`https://wa.me/${c.whatsapp}`}
              target="_blank"
              rel="noopener"
              className="text-link"
            >
              Talk to us on WhatsApp
            </a>
          </div>
          <div>
            <h3>Your Tanzania</h3>
            <Link to={href('safaris')}>Safari collection</Link>
            <Link to={href('comfort')}>Comfort levels</Link>
            <Link to={href('kilimanjaro')}>Kilimanjaro</Link>
            <Link to={href('zanzibar')}>Zanzibar</Link>
            <Link to={href('destinations')}>Destinations</Link>
          </div>
          <div>
            <h3>Get to know us</h3>
            <Link to={href('about')}>Our story</Link>
            <Link to={href('experiences')}>Experiences</Link>
            <Link to={href('travel-guide')}>Planning & FAQs</Link>
            <Link to={href('plan')}>Plan your safari</Link>
            <a href="https://mambeusafaris.com/terms-conditions/" target="_blank" rel="noopener">
              Booking terms
            </a>
          </div>
          <div>
            <h3>Your local team</h3>
            <a href={`mailto:${c.email}`}>{c.email}</a>
            <a href={`tel:+${c.phoneE164 || c.whatsapp}`}>{c.phone}</a>
            <p>
              {c.officeLocation}
              <br />
              Office hours {c.officeHours}
            </p>
          </div>
        </div>
        <div className="wrap foot-base">
          <span>© {year} Mambeu Safaris</span>
          <span>{c.footerTagline}</span>
        </div>
      </footer>
    </>
  );
}
