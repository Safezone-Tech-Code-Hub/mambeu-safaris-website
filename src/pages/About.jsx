import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeAboutContent } from '../content/aboutDefaults.js';
import { href, Img } from '../lib/utils.js';

function TwoLineTitle({ line1, line2, accentSecond = false }) {
  if (!line2) return <h2>{line1}</h2>;
  return (
    <h2>
      {line1}
      <br />
      {accentSecond ? <span className="accent">{line2}</span> : line2}
    </h2>
  );
}

export default function About() {
  const { pages } = useCms();
  const about = mergeAboutContent(pages.about);
  const { head, story, valuesSection, mission } = about;
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
      />
      <section className="wrap story-grid about-story">
        <div className="story-photo">
          <Img src={about.storyPhoto} alt={about.storyPhotoAlt} />
          <span>{about.storyPhotoCaption}</span>
        </div>
        <div>
          <span className="eyebrow">{story.eyebrow}</span>
          <TwoLineTitle line1={story.titleLine1} line2={story.titleLine2} />
          <p>{story.paragraph1}</p>
          <p>{story.paragraph2}</p>
          <p>{story.paragraph3}</p>
        </div>
      </section>
      <section className="values">
        <div className="wrap">
          <span className="eyebrow">{valuesSection.eyebrow}</span>
          <TwoLineTitle line1={valuesSection.titleLine1} line2={valuesSection.titleLine2} />
          <div className="values-grid">
            {about.values.map((v) => (
              <article key={v.number}>
                <span>{v.number}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{mission.eyebrow}</span>
          <TwoLineTitle line1={mission.titleLine1} line2={mission.titleLine2} />
        </div>
        <div>
          <p className="lead">{mission.lead}</p>
          <p>{mission.body}</p>
          <Link to={href(mission.buttonLink || 'plan')} className="button">
            {mission.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
