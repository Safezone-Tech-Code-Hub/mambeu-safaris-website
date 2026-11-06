/**
 * Forest band for inner pages. Optional photo with a left-weighted overlay.
 * @param {{
 *   id: string;
 *   eyebrow: string;
 *   title: import('react').ReactNode;
 *   description?: string;
 *   image?: string;
 *   imagePosition?: string;
 *   overlap?: boolean;
 *   compact?: boolean;
 * }} props
 */
export default function PageHeader({
  id,
  eyebrow,
  title,
  description,
  image,
  imagePosition,
  overlap = false,
  compact = false,
}) {
  const className = [
    'page-header',
    overlap ? 'page-header--overlap' : '',
    compact ? 'page-header--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section aria-labelledby={id} className={className}>
      {image ? (
        <div className="page-header__media" aria-hidden="true">
          <img
            src={image}
            alt=""
            fetchPriority="high"
            className="page-header__photo"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div className="page-header__overlay" />
        </div>
      ) : null}
      <div className="page-header__inner">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 id={id} className="page-header__title">
          {title}
        </h1>
        {description ? <p className="page-header__lede">{description}</p> : null}
      </div>
    </section>
  );
}
