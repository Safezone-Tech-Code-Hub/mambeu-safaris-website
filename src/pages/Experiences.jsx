import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { experiences } from '../data/experiences.js';
import { Img } from '../lib/utils.js';

export default function Experiences() {
  return (
    <main id="main">
      <PageHead
        label="FOLLOW YOUR CURIOSITY"
        title={'A safari is only<br><span class="accent">the beginning.</span>'}
        text="Add experiences that mean something to you, from cultural connections to a different view of the plains."
      />
      <section className="wrap experience-list">
        {experiences.map((x, i) => (
          <article className="experience-row" key={x[0]}>
            <div>
              <Img src={x[2]} alt={x[0]} />
            </div>
            <div>
              <span className="eyebrow">
                0{i + 1} / {x[0].toUpperCase()}
              </span>
              <h2>{x[1]}</h2>
              <p>{x[3]}</p>
              <Link className="button outline" to={`/plan/?interest=${encodeURIComponent(x[4])}`}>
                Include this in my journey
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
