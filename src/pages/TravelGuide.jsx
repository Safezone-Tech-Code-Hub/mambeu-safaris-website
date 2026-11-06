import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeTravelGuideContent } from '../content/travelGuideDefaults.js';
import { href } from '../lib/utils.js';

export default function TravelGuide() {
  const { faq, pages } = useCms();
  const tg = mergeTravelGuideContent(pages.travel_guide);
  const { head, aside } = tg;
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
      />
      <section className="wrap faq-page">
        <aside>
          <span className="eyebrow">{aside.eyebrow}</span>
          <h2>{aside.title}</h2>
          <p>{aside.intro}</p>
          <Link to={href(aside.buttonPath || 'plan')} className="button">
            {aside.buttonText}
          </Link>
        </aside>
        <div className="faq-list">
          {faq.map(([q, a]) => (
            <FaqItem key={q} question={q} answer={a} />
          ))}
        </div>
      </section>
    </main>
  );
}
