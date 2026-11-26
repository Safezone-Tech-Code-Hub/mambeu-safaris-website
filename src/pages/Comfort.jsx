import { Link } from 'react-router-dom';
import ComfortSection from '../components/ComfortSection.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink, isExternalLink } from '../content/schema.js';

export default function Comfort() {
  const { pages } = useCms();
  const { head, balanceSection: balance } = pages.comfort;
  const linkTo = cmsLink(balance.linkPath, '/safaris/');
  return (
    <main id="main">
      <PageHead
        label={head.label}
        titleLine1={head.titleLine1}
        titleLine2={head.titleLine2}
        text={head.text}
        photo={head.photo}
        photoAlt={head.photoAlt}
      />
      <ComfortSection />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">{balance.eyebrow}</span>
          <h2>
            {balance.titleLine1}
            {balance.titleLine2 ? (
              <>
                <br />
                {balance.titleLine2}
              </>
            ) : null}
          </h2>
        </div>
        <div>
          <p className="lead">{balance.lead}</p>
          <p>{balance.body}</p>
          {balance.linkText ? (
            isExternalLink(linkTo) ? (
              <a href={linkTo} className="text-link">
                {balance.linkText}
              </a>
            ) : (
              <Link to={linkTo} className="text-link">
                {balance.linkText}
              </Link>
            )
          ) : null}
        </div>
      </section>
    </main>
  );
}
