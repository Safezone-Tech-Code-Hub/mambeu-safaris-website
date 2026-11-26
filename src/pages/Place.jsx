import { Link, useParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { withPlaceName } from '../content/placeDefaults.js';
import { planHref } from '../lib/plan-link.js';
import NotFound from './NotFound.jsx';

export default function Place() {
  const { places, tours, pages } = useCms();
  const copy = pages.place_detail;
  const { slug } = useParams();
  const p = places.find((x) => x.slug === slug);

  if (!p) {
    return <NotFound />;
  }

  const fill = (text) => withPlaceName(text, p.name);
  const needle = String(p.q || p.name || '').toLowerCase();
  const related = needle
    ? tours.filter((t) => JSON.stringify(t).toLowerCase().includes(needle)).slice(0, 3)
    : [];

  return (
    <main id="main">
      <PageHead
        label={fill(copy.head.label)}
        title={p.name}
        text={p.tag}
        photo={p.photo}
        photoAlt={`${p.name}, Tanzania`}
      />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{fill(copy.story.eyebrow)}</span>
          <h2>
            {fill(copy.story.titleLine1)}
            {copy.story.titleLine2 ? (
              <>
                <br />
                {fill(copy.story.titleLine2)}
              </>
            ) : null}
          </h2>
        </div>
        <div>
          <p className="lead">{p.text}</p>
          <div className="highlights">
            {(p.facts || []).map((f, i) => (
              <span key={i}>{f}</span>
            ))}
          </div>
          <Link className="button" to={`/safaris/?q=${encodeURIComponent(p.q)}`}>
            {fill(copy.searchButton)}
          </Link>
        </div>
      </section>
      <section className="wrap related">
        <div className="section-heading">
          <h2>{fill(copy.related.heading)}</h2>
          <Link className="text-link" to={planHref({ destination: p.slug })}>
            {fill(copy.related.planLinkText)}
          </Link>
        </div>
        {related.length ? (
          <ul className="related-grid">
            {related.map((t) => (
              <JourneyCard key={t.id} t={t} />
            ))}
          </ul>
        ) : (
          <div className="empty-results">
            <h3>{fill(copy.empty.heading)}</h3>
            <p>{fill(copy.empty.text)}</p>
            <Link className="button" to={planHref({ destination: p.slug })}>
              {fill(copy.empty.button)}
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
