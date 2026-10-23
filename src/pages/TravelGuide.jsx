import { Link } from 'react-router-dom';
import FaqItem from '../components/FaqItem.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { href } from '../lib/utils.js';

export default function TravelGuide() {
  const { faq, pages } = useCms();
  const head = pages.travel_guide?.head || {};
  return (
    <main id="main">
      <PageHead
        label={head.label || 'A LITTLE PLANNING GOES A LONG WAY'}
        title={head.title || 'Good questions.<br><span class="accent">Clear answers.</span>'}
        text={head.text || 'Practical starting points for your safari, mountain journey or Zanzibar escape.'}
      />
      <section className="wrap faq-page">
        <aside>
          <span className="eyebrow">YOUR LOCAL TEAM</span>
          <h2>Still curious?</h2>
          <p>Let’s talk through your plans.</p>
          <Link to={href('plan')} className="button">
            Ask a safari specialist
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
