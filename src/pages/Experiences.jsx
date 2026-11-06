import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeExperiencesContent } from '../content/experiencesDefaults.js';
import { href, Img } from '../lib/utils.js';

export default function Experiences() {
  const { experiences, pages } = useCms();
  const exp = mergeExperiencesContent(pages.experiences);
  const { head, list } = exp;
  const buttonText = list.buttonText || 'Include this in my journey';
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
      />
      <section className="wrap experience-list">
        {experiences.map((x, i) => (
          <article className="experience-row" key={x[0]}>
            <div>
              <Img src={x[2]} alt={x[0]} />
            </div>
            <div>
              <span className="eyebrow">
                {String(i + 1).padStart(2, '0')} / {String(x[0]).toUpperCase()}
              </span>
              <h2>{x[1]}</h2>
              <p>{x[3]}</p>
              <Link className="button outline" to={href(`plan/?interest=${encodeURIComponent(x[4])}`)}>
                {buttonText}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
