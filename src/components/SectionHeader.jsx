/**
 * @param {{ children: import('react').ReactNode }} props
 */
function Eyebrow({ children }) {
  return <p className="section-header__eyebrow">{children}</p>;
}

/**
 * @param {{
 *   id: string;
 *   eyebrow: string;
 *   title: import('react').ReactNode;
 *   description?: import('react').ReactNode;
 *   aside?: import('react').ReactNode;
 *   variant?: 'split' | 'centered' | 'inline' | 'stacked';
 * }} props
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  aside,
  variant = 'split',
}) {
  if (variant === 'centered') {
    return (
      <div className="section-header section-header--centered">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="section-header__title section-header__title--centered">
          {title}
        </h2>
        {description ? (
          <p className="section-header__desc section-header__desc--centered">{description}</p>
        ) : null}
        {aside ? <div className="section-header__aside section-header__aside--centered">{aside}</div> : null}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="section-header section-header--inline">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="section-header__title section-header__title--inline">
          {title}
        </h2>
        {description ? (
          <p className="section-header__desc section-header__desc--inline">{description}</p>
        ) : null}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className="section-header section-header--stacked">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="section-header__title section-header__title--stacked">
          {title}
        </h2>
        {description || aside ? (
          <div className="section-header__stacked-row">
            {description ? (
              <p className="section-header__desc section-header__desc--stacked">{description}</p>
            ) : null}
            {aside}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="section-header section-header--split">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="section-header__split-row">
        <h2 id={id} className="section-header__title section-header__title--split">
          {title}
        </h2>
        {description || aside ? (
          <div className="section-header__extra">
            {description ? (
              <p className="section-header__desc section-header__desc--split">{description}</p>
            ) : null}
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}
