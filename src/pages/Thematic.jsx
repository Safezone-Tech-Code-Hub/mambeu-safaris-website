import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeThematicContent } from '../content/thematicDefaults.js';
import { href } from '../lib/utils.js';

export default function Thematic({ type }) {
  const { tours, pages } = useCms();
  const mountain = type === 'kilimanjaro';
  const copy = mergeThematicContent(type, pages[type] || {});
  const blocks = copy.blocks?.length ? copy.blocks : [];
  const zanzibarTours = tours.filter((t) => String(t.title || '').includes('Zanzibar'));
  const split = copy.splitSection || {};
  const related = copy.relatedSection || {};

  return (
    <main id="main">
      <PageHead
        label={copy.label}
        titleLine1={copy.titleLine1}
        titleLine2={copy.titleLine2}
        text={copy.text}
        photo={copy.photo}
      />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{split.eyebrow}</span>
          <h2>
            {split.titleLine1}
            <br />
            {split.titleLine2}
          </h2>
        </div>
        <div>
          <p className="lead">{split.lead}</p>
          <p>{split.body}</p>
          <Link
            className="button orange"
            to={`/plan/?interest=${encodeURIComponent(split.buttonInterest || (mountain ? 'Kilimanjaro' : 'Zanzibar'))}`}
          >
            {split.buttonText}
          </Link>
        </div>
      </section>
      <section className="values">
        <div className="wrap values-grid">
          {blocks.map((b, i) => (
            <article key={b[0]}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{b[0]}</h3>
              <p>{b[1]}</p>
            </article>
          ))}
        </div>
      </section>
      {!mountain ? (
        <section className="wrap related">
          <div className="section-heading">
            <h2>{related.title}</h2>
            <Link to={href(related.linkPath || 'safaris?q=Zanzibar')} className="text-link">
              {related.linkText}
            </Link>
          </div>
          <div className="related-grid">
            {zanzibarTours.map((t) => (
              <JourneyCard key={t.id} t={t} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
