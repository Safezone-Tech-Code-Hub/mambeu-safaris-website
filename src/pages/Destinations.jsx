import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { Img } from '../lib/utils.js';

const extraTiles = [
  ['kilimanjaro', 'Kilimanjaro', 'mountain.webp', 'A higher perspective.'],
  ['zanzibar', 'Zanzibar', 'zanzibar.webp', 'Slow down by the sea.'],
];

export default function Destinations() {
  const { places, pages } = useCms();
  const head = pages.destinations?.head || {};
  return (
    <main id="main">
      <PageHead
        label={head.label || 'PLACES THAT STAY WITH YOU'}
        title={head.title || 'One Tanzania.<br><span class="accent">So many worlds.</span>'}
        text={
          head.text ||
          'Legendary wildlife parks, mountain landscapes and an Indian Ocean coast. Connect your favourite places into one personal journey.'
        }
      />
      <section className="wrap destination-grid">
        {places.map((p, i) => (
          <Link key={p.slug} className="destination-tile" to={`/destinations/${p.slug}/`}>
            <Img src={p.photo} alt={p.name} />
            <div>
              <span className="eyebrow">0{i + 1} / EXPLORE</span>
              <h2>{p.name}</h2>
              <p>{p.tag}</p>
            </div>
          </Link>
        ))}
        {extraTiles.map((p) => (
          <Link key={p[0]} className="destination-tile" to={`/${p[0]}/`}>
            <Img src={p[2]} alt={p[1]} />
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h2>{p[1]}</h2>
              <p>{p[3]}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
