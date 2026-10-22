import { Link } from 'react-router-dom';
import { href } from '../lib/utils.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <section className="final-invite">
        <div className="wrap">
          <div>
            <span className="eyebrow">TELL US WHAT YOU’RE DREAMING OF</span>
            <h2>
              Your next chapter
              <br />
              starts in Tanzania.
            </h2>
          </div>
          <div>
            <p>A few ideas are all we need. Let’s shape a journey that feels like you.</p>
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
              href="https://wa.me/255796086799"
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
            <a href="mailto:info@mambeusafaris.com">info@mambeusafaris.com</a>
            <a href="tel:+255796086799">+255 796 086 799</a>
            <p>
              Arusha, Tanzania
              <br />
              Office hours 08:00–19:30
            </p>
          </div>
        </div>
        <div className="wrap foot-base">
          <span>© {year} Mambeu Safaris</span>
          <span>Dream · Discover · Explore</span>
        </div>
      </footer>
    </>
  );
}
