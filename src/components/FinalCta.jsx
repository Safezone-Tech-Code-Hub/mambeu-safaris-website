import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import Reveal from './Reveal.jsx';

export default function FinalCta() {
  return (
    <Reveal as="section" className="final-cta" aria-labelledby="final-cta-heading">
      <div className="final-cta__container">
        <h2 id="final-cta-heading" className="final-cta__title">
          Your next chapter
          <br />
          <span className="final-cta__title-muted">starts in Tanzania.</span>
        </h2>

        <Link to={planHref()} className="final-cta__primary">
          Let’s plan your safari
        </Link>
      </div>
    </Reveal>
  );
}
