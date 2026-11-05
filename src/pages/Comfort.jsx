import { Link } from 'react-router-dom';
import ComfortSection from '../components/ComfortSection.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeComfortContent } from '../content/comfortDefaults.js';
import { href } from '../lib/utils.js';

function TwoLineTitle({ line1, line2 }) {
  if (!line2) return <h2>{line1}</h2>;
  return (
    <h2>
      {line1}
      <br />
      {line2}
    </h2>
  );
}

export default function Comfort() {
  const { pages } = useCms();
  const comfort = mergeComfortContent(pages.comfort);
  const { head, comfortSection, balanceSection } = comfort;
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
      />
      <ComfortSection section={comfortSection} />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{balanceSection.eyebrow}</span>
          <TwoLineTitle line1={balanceSection.titleLine1} line2={balanceSection.titleLine2} />
        </div>
        <div>
          <p className="lead">{balanceSection.lead}</p>
          <p>{balanceSection.body}</p>
          <Link to={href(balanceSection.linkPath || 'safaris?style=Camping')} className="text-link">
            {balanceSection.linkText}
          </Link>
        </div>
      </section>
    </main>
  );
}
