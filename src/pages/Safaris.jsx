import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import tours from '../data/tours.json';
import { href } from '../lib/utils.js';

function filterTours({ q, style, duration, sort }) {
  const query = q.trim().toLowerCase();
  let result = tours.filter(
    (t) =>
      (!style || t.style === style || (style === 'Midrange' && t.style === 'Comfort')) &&
      (!duration ||
        (duration === 'short' && t.days <= 4) ||
        (duration === 'medium' && t.days >= 5 && t.days <= 6) ||
        (duration === 'long' && t.days >= 7)) &&
      (!query ||
        JSON.stringify([t.title, t.fullDescription, t.highlights, t.itinerary])
          .toLowerCase()
          .includes(query)),
  );
  if (sort === 'shortest') result = [...result].sort((a, b) => a.days - b.days);
  if (sort === 'longest') result = [...result].sort((a, b) => b.days - a.days);
  return result;
}

export default function Safaris() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [style, setStyle] = useState(searchParams.get('style') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');
  const [sort, setSort] = useState('recommended');

  const applyFilter = useCallback(() => {
    const result = filterTours({ q: search, style, duration, sort });
    const query = new URLSearchParams();
    if (search.trim()) query.set('q', search);
    if (style) query.set('style', style);
    if (duration) query.set('duration', duration);
    setSearchParams(query, { replace: true });
    return result;
  }, [search, style, duration, sort, setSearchParams]);

  const [results, setResults] = useState(() =>
    filterTours({
      q: searchParams.get('q') || '',
      style: searchParams.get('style') || '',
      duration: searchParams.get('duration') || '',
      sort: 'recommended',
    }),
  );

  useEffect(() => {
    setResults(applyFilter());
  }, [applyFilter]);

  const reset = () => {
    setSearch('');
    setStyle('');
    setDuration('');
    setSort('recommended');
  };

  const countLabel = `${results.length} ${results.length === 1 ? 'journey' : 'journeys'} to explore`;

  return (
    <main id="main">
      <PageHead
        label="THE MAMBEU COLLECTION"
        title={'Find your<br><span class="accent">kind of wild.</span>'}
        text="22 starting points. Endless ways to make them yours. Explore our existing journeys, then tailor your route, dates and stays."
      />
      <section className="wrap catalogue-layout">
        <aside className="catalogue-filters">
          <h2>Shape your safari</h2>
          <label htmlFor="search">Search journeys</label>
          <input
            id="search"
            type="search"
            placeholder="Park, wildlife or experience"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="style">Comfort level</label>
          <select id="style" value={style} onChange={(e) => setStyle(e.target.value)}>
            <option value="">All styles</option>
            <option>Midrange</option>
            <option>Comfort</option>
            <option>Luxury</option>
            <option>Camping</option>
          </select>
          <label htmlFor="duration">Days to explore</label>
          <select id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="">Any duration</option>
            <option value="short">2–4 days</option>
            <option value="medium">5–6 days</option>
            <option value="long">7+ days</option>
          </select>
          <label htmlFor="sort">Arrange journeys</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="shortest">Shortest first</option>
            <option value="longest">Longest first</option>
          </select>
          <button id="reset-filters" type="button" className="text-link" onClick={reset}>
            Clear filters
          </button>
          <div className="filter-help">
            <b>Something more personal?</b>
            <p>Let’s create a journey around your ideas.</p>
            <Link to={href('plan')} className="button outline">
              Design my safari
            </Link>
          </div>
        </aside>
        <div>
          <div className="catalogue-top">
            <p id="result-count" aria-live="polite">
              {countLabel}
            </p>
            <span>Tailor-made around you</span>
          </div>
          <p id="midrange-note" className="notice" hidden={style !== 'Midrange'}>
            These routes can be adapted with midrange accommodation. The published prices apply to the
            original itineraries; request a tailored quotation for a different comfort level.
          </p>
          <div className="catalogue-grid" id="catalogue-results">
            {results.length ? (
              results.map((t) => <JourneyCard key={t.id} t={t} />)
            ) : (
              <div className="empty-results">
                <h3>A different starting point?</h3>
                <p>
                  No journeys match these choices. Clear the filters or ask us for a personal itinerary.
                </p>
                <button className="button outline" id="empty-reset" type="button" onClick={reset}>
                  Clear filters
                </button>
                <Link className="text-link" to={href('plan')}>
                  Design my safari
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
