import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import { href } from '../lib/utils.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function GoodPeople() {
  return (
    <section className="good-people" aria-labelledby="good-people-heading">
      <div className="good-people__container">
        <div className="good-people__grid">
          <figure className="good-people__figure">
            <Reveal variant="image" className="good-people__photo">
              <img
                src="/images/people/guests.jpg"
                alt="Two guests standing beside a Mambeu safari vehicle on a dusty road, with open savannah and a blue sky behind them"
                decoding="async"
              />
              <div className="good-people__photo-overlay" aria-hidden="true" />
            </Reveal>
            <figcaption className="good-people__caption">
              <span>Guests on safari with Mambeu</span>
              <span className="good-people__caption-aside" aria-hidden="true">
                Our home. Your adventure.
              </span>
            </figcaption>
          </figure>

          <Reveal className="good-people__copy">
            <SectionHeader
              variant="inline"
              id="good-people-heading"
              eyebrow="The people make the difference"
              title={
                <>
                  Good safaris begin with{' '}
                  <span className="section-header__quiet">good people.</span>
                </>
              }
              description="Mambeu is locally owned and operated in Arusha. We share Tanzania through expertly guided journeys, personal attention and a commitment to responsible travel."
            />

            {/* Add a real guest quote here when you have one:
            <blockquote className="good-people__quote">
              <p>“Quote here.”</p>
              <footer>Guest name, trip</footer>
            </blockquote>
            */}

            <div className="good-people__actions">
              <Link to={planHref()} className="good-people__cta">
                Plan my safari
              </Link>
              <Link to={href('about')} className="good-people__text-link">
                Get to know Mambeu
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
