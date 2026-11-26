import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { resolveImageSrc } from '../lib/utils.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

export default function GoodPeople() {
  const { pages } = useCms();
  const copy = pages.home.people;
  return (
    <section className="good-people" aria-labelledby="good-people-heading">
      <div className="good-people__container">
        <div className="good-people__grid">
          <figure className="good-people__figure">
            <Reveal variant="image" className="good-people__photo">
              <img src={resolveImageSrc(copy.photo)} alt={copy.photoAlt} decoding="async" />
              <div className="good-people__photo-overlay" aria-hidden="true" />
            </Reveal>
            <figcaption className="good-people__caption">
              <span>{copy.caption}</span>
              <span className="good-people__caption-aside" aria-hidden="true">
                {copy.captionAside}
              </span>
            </figcaption>
          </figure>

          <Reveal className="good-people__copy">
            <SectionHeader
              variant="inline"
              id="good-people-heading"
              eyebrow={copy.eyebrow}
              title={
                <>
                  {copy.titleLine1}{' '}
                  <span className="section-header__quiet">{copy.titleLine2}</span>
                </>
              }
              description={copy.text}
            />

            {/* Add a real guest quote here when you have one:
            <blockquote className="good-people__quote">
              <p>“Quote here.”</p>
              <footer>Guest name, trip</footer>
            </blockquote>
            */}

            <div className="good-people__actions">
              <Link to={cmsLink(copy.buttonLink, '/plan/')} className="good-people__cta">
                {copy.buttonText}
              </Link>
              <Link to={cmsLink(copy.linkPath, '/about/')} className="good-people__text-link">
                {copy.linkText}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
