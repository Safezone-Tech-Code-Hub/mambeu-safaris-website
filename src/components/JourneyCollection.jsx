import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { href } from '../lib/utils.js';
import { toJourney } from '../lib/journeys.js';
import JourneyCard from './JourneyCard.jsx';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/** @typedef {'Comfort' | 'Luxury' | 'Camping'} SafariTier */

const TIERS = /** @type {SafariTier[]} */ (['Comfort', 'Luxury', 'Camping']);

export default function JourneyCollection() {
  const { tours, pages } = useCms();
  const copy = pages.home.journeys;
  const featuredComfortIds = useMemo(
    () =>
      String(copy.featuredComfortTourIds ?? '')
        .split(/[\s,]+/)
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id) && id > 0),
    [copy.featuredComfortTourIds],
  );
  const [active, setActive] = useState(/** @type {SafariTier} */ ('Comfort'));

  const visible = useMemo(() => {
    if (active === 'Comfort') {
      return featuredComfortIds
        .map((id) => tours.find((t) => Number(t.id) === id))
        .filter(Boolean);
    }
    return tours.filter((t) => t.style === active).slice(0, 6);
  }, [active, tours, featuredComfortIds]);

  return (
    <section className="journey-collection" aria-labelledby="journeys-heading">
      <div className="journey-collection__inner">
        <Reveal>
        <SectionHeader
          variant="split"
          id="journeys-heading"
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.titleLine1}{' '}
              <span className="section-header__quiet">{copy.titleLine2}</span>
            </>
          }
          aside={
            <div className="journey-collection__controls">
              <div
                className="journey-collection__tabs"
                role="group"
                aria-label="Filter journeys by safari style"
              >
                {TIERS.map((tier) => {
                  const isActive = tier === active;
                  return (
                    <button
                      key={tier}
                      type="button"
                      aria-pressed={isActive}
                      className={
                        isActive
                          ? 'journey-collection__tab journey-collection__tab--active'
                          : 'journey-collection__tab'
                      }
                      onClick={() => setActive(tier)}
                    >
                      {tier}
                    </button>
                  );
                })}
              </div>
              <Link to={href('safaris')} className="journey-collection__collection-link">
                {copy.collectionLinkText}
              </Link>
            </div>
          }
        />
        </Reveal>

        {visible.length > 0 ? (
          <Reveal as="ul" stagger className="journey-collection__grid" id="featured-journeys">
            {visible.map((t) => (
              <JourneyCard key={t.id} journey={toJourney(t)} />
            ))}
          </Reveal>
        ) : (
          <p className="journey-collection__empty">
            {copy.emptyText}
          </p>
        )}
      </div>
    </section>
  );
}
