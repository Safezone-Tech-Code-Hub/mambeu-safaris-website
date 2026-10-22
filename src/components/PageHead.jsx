import { Img } from '../lib/utils.js';

export default function PageHead({ label, title, text, photo = '' }) {
  const titleHasHtml = typeof title === 'string' && title.includes('<');
  return (
    <section className={`page-intro ${photo ? 'with-photo' : ''}`}>
      <div className="wrap">
        <span className="eyebrow">{label}</span>
        {titleHasHtml ? (
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
