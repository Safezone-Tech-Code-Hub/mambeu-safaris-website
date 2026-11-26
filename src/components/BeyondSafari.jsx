import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink, isPlaceholder } from '../content/schema.js';
import { planHref } from '../lib/plan-link.js';
import { resolveImageSrc } from '../lib/utils.js';
import Reveal from './Reveal.jsx';

export default function BeyondSafari() {
  const { pages } = useCms();
  const beyond = pages.home.beyond;
  const extras = (beyond.extras || []).filter((x) => x && String(x.title ?? '').trim());

  return (
    <section className="beyond-safari" aria-labelledby="beyond-heading">
      <div className="beyond-safari__container">
        <Reveal as="header" className="beyond-safari__head">
          <p className="beyond-safari__eyebrow">{beyond.eyebrow}</p>
          <h2 id="beyond-heading" className="beyond-safari__title">
            {beyond.titleLine1}
            <span className="beyond-safari__title-muted">{beyond.titleLine2}</span>
          </h2>
          <div className="beyond-safari__row">
            <p className="beyond-safari__text">{beyond.text}</p>
            <Link to={cmsLink(beyond.linkPath, '/experiences/')} className="beyond-safari__link">
              {beyond.linkLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </Reveal>

        <Reveal as="ul" stagger className="beyond-safari__grid">
          {extras.map((x, i) => (
            <li key={i} className="beyond-safari__card">
              <div className="beyond-safari__photo">
                <img
                  src={resolveImageSrc(x.image)}
                  alt={x.alt}
                  decoding="async"
                  className={`beyond-safari__photo-img${x.imageClass ? ` ${x.imageClass}` : ''}`}
                />
                <div className="beyond-safari__photo-overlay" aria-hidden="true" />
                {!isPlaceholder(x.duration) ? (
                  <span className="beyond-safari__pill">{x.duration}</span>
                ) : null}
              </div>

              <div className="beyond-safari__body">
                <h3 className="beyond-safari__card-title">{x.title}</h3>
                <p className="beyond-safari__desc">{x.description}</p>
                <div className="beyond-safari__foot">
                  <Link
                    to={planHref({
                      destination: x.planDestination || undefined,
                      experience: x.planExperience || undefined,
                    })}
                    className="beyond-safari__cta"
                  >
                    {x.buttonText}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
