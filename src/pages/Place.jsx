import { Link, useParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergePlaceDetailContent } from '../content/placeDefaults.js';
import Destinations from './Destinations.jsx';
import { href } from '../lib/utils.js';

export default function Place() {
  const { places, tours, pages } = useCms();
  const { slug } = useParams();
  const p = places.find((x) => x.slug === slug);
  const copy = mergePlaceDetailContent(pages.place_detail);

  if (!p) {
    return <Destinations />;
  }

  const needle = String(p.q || p.name || '').toLowerCase();
  const related = needle
    ? tours.filter((t) => JSON.stringify(t).toLowerCase().includes(needle)).slice(0, 3)
    : [];

  return (
    <main id="main">
      <PageHead label={copy.head.label || 'MEET TANZANIA'} title={p.name} text={p.tag} photo={p.photo} />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{copy.story.eyebrow}</span>
          <h2>
            {copy.story.titleLine1}
            <br />
            {copy.story.titleLine2}
          </h2>
        </div>
        <div>
          <p className="lead">{p.text}</p>
          <div className="highlights">
            {(p.facts || []).map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <Link className="button" to={`/safaris/?q=${encodeURIComponent(p.q)}`}>
            {copy.searchButton}
          </Link>
        </div>
      </section>
      <section className="wrap related">
        <div className="section-heading">
          <h2>{copy.related.heading}</h2>
          <Link className="text-link" to={`/plan/?interest=${encodeURIComponent(p.name)}`}>
            {copy.related.planLinkText}
          </Link>
        </div>
        <div className="related-grid">
          {related.length ? (
            related.map((t) => <JourneyCard key={t.id} t={t} />)
          ) : (
            <div className="empty-results">
              <h3>{copy.empty.heading}</h3>
              <p>{copy.empty.text}</p>
              <Link className="button" to={`/plan/?interest=${encodeURIComponent(p.name)}`}>
                {copy.empty.button}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
