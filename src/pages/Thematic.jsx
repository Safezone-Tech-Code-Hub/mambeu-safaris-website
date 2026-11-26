import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { planHref } from '../lib/plan-link.js';

/** Which journeys count as related. Kept in code: it searches the tour data, not page copy. */
function relatedFor(type, tours) {
  if (type === 'kilimanjaro') return tours.filter((t) => /kilimanjaro|kili/i.test(JSON.stringify(t)));
  return tours.filter((t) => String(t.title || '').includes('Zanzibar'));
}

export default function Thematic({ type }) {
  const { tours, pages } = useCms();
  const copy = pages[type];
  const split = copy.splitSection;
  const related = copy.relatedSection;
  const blocks = (copy.blocks || []).filter((b) => b && String(b.title ?? '').trim());
  const relatedTours = relatedFor(type, tours);

  return (
    <main id="main">
      <PageHead
        label={copy.label}
        titleLine1={copy.titleLine1}
        titleLine2={copy.titleLine2}
        accentLine2={false}
        text={copy.text}
        photo={copy.photo}
        photoAlt={copy.photoAlt}
      />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{split.eyebrow}</span>
          <h2>
            {split.titleLine1}
            {split.titleLine2 ? (
              <>
                <br />
                {split.titleLine2}
              </>
            ) : null}
          </h2>
        </div>
        <div>
          <p className="lead">{split.lead}</p>
          <p>{split.body}</p>
          <Link
            className="button orange"
            to={planHref({ destination: split.planDestination || undefined })}
          >
            {split.buttonText}
          </Link>
        </div>
      </section>
      <section className="values">
        <div className="wrap values-grid">
          {blocks.map((b, i) => (
            <article key={i}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>
      </section>
      {relatedTours.length ? (
        <section className="wrap related">
          <div className="section-heading">
            <h2>{related.title}</h2>
            <Link to={cmsLink(related.linkPath, '/safaris/')} className="text-link">
              {related.linkText}
            </Link>
          </div>
          <ul className="related-grid">
            {relatedTours.map((t) => (
              <JourneyCard key={t.id} t={t} />
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
