import { Img } from '../lib/utils.js';

export default function PageHead({ label, title, titleLine1, titleLine2, text, photo = '' }) {
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
                <span className="accent">{titleLine2}</span>
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
      {photo ? <Img src={photo} alt="Tanzania safari scenery" className="intro-image" priority /> : null}
    </section>
  );
}
