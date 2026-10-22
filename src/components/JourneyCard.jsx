import { Link } from 'react-router-dom';
import { href, itineraryRoute, Img } from '../lib/utils.js';

export default function JourneyCard({ t }) {
  const available = t.pricingTiers.length > 0;
  const desc = t.description.replace(/\.\.\.$/, '').slice(0, 145);
  const descSuffix = t.description.length > 145 ? '…' : '';
  const imageFile = t.image.split('/').pop();

  return (
    <article className="journey-card">
      <Link className="journey-photo" to={href(t.path)}>
        <Img src={imageFile} alt={t.title} />
        <span className="photo-tag">{t.style}</span>
        <span className="photo-days">{t.days} days</span>
      </Link>
      <div className="journey-info">
        <p className="journey-route">{itineraryRoute(t)}</p>
        <h3>
          <Link to={href(t.path)}>{t.title}</Link>
        </h3>
        <p className="journey-desc">
          {desc}
          {descSuffix}
        </p>
        <div className="journey-bottom">
          <span>
            {available ? 'Price by group size' : 'Tailored quotation'}
            <small>
              {available ? 'View published pricing' : 'Choose your dates & stays'}
            </small>
          </span>
          <Link to={href(t.path)} className="text-link">
            View journey
          </Link>
        </div>
      </div>
    </article>
  );
}
