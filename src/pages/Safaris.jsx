import { useCms } from '../CmsProvider.jsx';
import SafarisBrowser from '../components/SafarisBrowser.jsx';
import { toJourneys } from '../lib/journeys.js';

export default function Safaris() {
  const { tours } = useCms();
  const journeys = toJourneys(tours);

  return (
    <main id="main" className="safaris-page">
      <section className="safaris-head" aria-labelledby="safaris-heading">
        <div className="safaris-head__media" aria-hidden="true">
          <img
            src="/images/safaris-header.jpg"
            alt=""
            fetchPriority="high"
            className="safaris-head__photo"
          />
          <div className="safaris-head__overlay" />
        </div>
        <div className="safaris-head__inner">
          <p className="safaris-head__eyebrow">The Mambeu collection</p>
          <h1 id="safaris-heading" className="safaris-head__title">
            Find your
            <br />
            <span className="safaris-head__quiet">kind of wild.</span>
          </h1>
          <p className="safaris-head__lede">
            {journeys.length} starting points. Explore our existing journeys, then tailor your route,
            dates and stays.
          </p>
        </div>
      </section>

      <SafarisBrowser journeys={journeys} />
    </main>
  );
}
