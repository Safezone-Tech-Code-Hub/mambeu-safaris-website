import { Img } from '../lib/utils.js';

/**
 * Inner-page header. Pass titleLine1/titleLine2 (plain text); the older `title` string
 * (may contain HTML) is still accepted. `accentLine2={false}` keeps line 2 in the
 * heading colour instead of the accent colour.
 */
export default function PageHead({
  label,
  title,
  titleLine1,
  titleLine2,
  text,
  photo = '',
  photoAlt = 'Tanzania safari scenery',
  accentLine2 = true,
}) {
  const titleHasHtml = typeof title === 'string' && title.includes('<');
  const usePlainLines = String(titleLine1 ?? '').trim() !== '';
  return (
    <section className={`page-intro ${photo ? 'with-photo' : ''}`}>
      <div className="wrap">
        <span className="eyebrow">{label}</span>
        {usePlainLines ? (
          <h1>
            {titleLine1}
            {titleLine2 ? (
              <>
                <br />
                {accentLine2 ? <span className="accent">{titleLine2}</span> : titleLine2}
              </>
            ) : null}
          </h1>
        ) : titleHasHtml ? (
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <h1>{title}</h1>
        )}
        <p>{text}</p>
      </div>
      {photo ? (
        <Img src={photo} alt={photoAlt || 'Tanzania safari scenery'} className="intro-image" priority />
      ) : null}
    </section>
  );
}
