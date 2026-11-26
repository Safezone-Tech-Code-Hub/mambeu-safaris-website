import { useCms } from '../CmsProvider.jsx';
import SafarisBrowser from '../components/SafarisBrowser.jsx';
import { fill } from '../content/safarisDefaults.js';
import { toJourneys } from '../lib/journeys.js';
import { resolveImageSrc } from '../lib/utils.js';

export default function Safaris() {
  const { tours, pages } = useCms();
  const head = pages.safaris.head;
  const journeys = toJourneys(tours);

  return (
    <main id="main" className="safaris-page">
      <section className="safaris-head" aria-labelledby="safaris-heading">
        {head.photo ? (
          <div className="safaris-head__media" aria-hidden="true">
            <img
              src={resolveImageSrc(head.photo)}
              alt=""
              fetchPriority="high"
              className="safaris-head__photo"
            />
            <div className="safaris-head__overlay" />
          </div>
        ) : null}
        <div className="safaris-head__inner">
          <p className="safaris-head__eyebrow">{head.label}</p>
          <h1 id="safaris-heading" className="safaris-head__title">
            {head.titleLine1}
            {head.titleLine2 ? (
              <>
                <br />
                <span className="safaris-head__quiet">{head.titleLine2}</span>
              </>
            ) : null}
          </h1>
          <p className="safaris-head__lede">{fill(head.text, { count: journeys.length })}</p>
        </div>
      </section>

      <SafarisBrowser journeys={journeys} />
    </main>
  );
}
