import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeDestinationsContent } from '../content/destinationsDefaults.js';
import { href, Img } from '../lib/utils.js';

export default function Destinations() {
  const { places, pages } = useCms();
  const dest = mergeDestinationsContent(pages.destinations);
  const { head, grid, extraTiles } = dest;
  const placeEyebrow = grid.placeEyebrowLabel || 'EXPLORE';
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
      />
      <section className="wrap destination-grid">
        {places.map((p, i) => (
          <Link key={p.slug} className="destination-tile" to={`/destinations/${p.slug}/`}>
            <Img src={p.photo} alt={p.name} />
            <div>
              <span className="eyebrow">
                {String(i + 1).padStart(2, '0')} / {placeEyebrow}
              </span>
              <h2>{p.name}</h2>
              <p>{p.tag}</p>
            </div>
          </Link>
        ))}
        {extraTiles.map((tile) => (
          <Link key={tile.path} className="destination-tile" to={href(tile.path)}>
            <Img src={tile.photo} alt={tile.title} />
            <div>
              <span className="eyebrow">{tile.eyebrow}</span>
              <h2>{tile.title}</h2>
              <p>{tile.tag}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
