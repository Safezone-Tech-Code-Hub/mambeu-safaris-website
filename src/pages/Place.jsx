import { Link, useParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { places } from '../data/places.js';
import tours from '../data/tours.json';
import Destinations from './Destinations.jsx';

export default function Place() {
  const { slug } = useParams();
  const p = places.find((x) => x.slug === slug);

  if (!p) {
    return <Destinations />;
  }

  const related = tours
    .filter((t) => JSON.stringify(t).toLowerCase().includes(p.q.toLowerCase()))
    .slice(0, 3);

  return (
    <main id="main">
      <PageHead label="MEET TANZANIA" title={p.name} text={p.tag} photo={p.photo} />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">A PLACE TO REMEMBER</span>
          <h2>
            A different view.
            <br />
            A deeper connection.
          </h2>
        </div>
        <div>
          <p className="lead">{p.text}</p>
          <div className="highlights">
            {p.facts.map((f) => (
              <span key={f}>{f}</span>
            ))}
          </div>
          <Link className="button" to={`/safaris/?q=${encodeURIComponent(p.q)}`}>
            Explore journeys here
          </Link>
        </div>
      </section>
      <section className="wrap related">
        <div className="section-heading">
          <h2>Start with a journey.</h2>
          <Link
            className="text-link"
            to={`/plan/?interest=${encodeURIComponent(p.name)}`}
          >
            Plan a personal route
          </Link>
        </div>
        <div className="related-grid">
          {related.length ? (
            related.map((t) => <JourneyCard key={t.id} t={t} />)
          ) : (
            <div className="empty-results">
              <h3>A journey made for you.</h3>
              <p>Ask our local team to include this destination in a personal itinerary.</p>
              <Link className="button" to={`/plan/?interest=${encodeURIComponent(p.name)}`}>
                Plan a journey here
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
