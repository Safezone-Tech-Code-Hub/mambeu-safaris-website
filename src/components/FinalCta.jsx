import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink, lines } from '../content/schema.js';
import { siteChrome } from '../lib/cms.js';
import Reveal from './Reveal.jsx';

export default function FinalCta() {
  const { pages } = useCms();
  const chrome = siteChrome(pages);
  const [first, ...rest] = lines(chrome.finalCtaTitle);

  return (
    <Reveal as="section" className="final-cta" aria-labelledby="final-cta-heading">
      <div className="final-cta__container">
        <h2 id="final-cta-heading" className="final-cta__title">
          {first}
          {rest.length ? (
            <>
              <br />
              <span className="final-cta__title-muted">{rest.join(' ')}</span>
            </>
          ) : null}
        </h2>

        <Link to={cmsLink(chrome.finalCtaLink, '/plan/')} className="final-cta__primary">
          {chrome.finalCtaButton}
        </Link>
      </div>
    </Reveal>
  );
}
