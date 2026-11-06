import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeNotFoundContent } from '../content/notFoundDefaults.js';
import { href } from '../lib/utils.js';

export default function NotFound() {
  const { pages } = useCms();
  const nf = mergeNotFoundContent(pages.not_found);
  return (
    <main id="main">
      <PageHead
        label={nf.head.label}
        titleLine1={nf.head.titleLine1}
        titleLine2={nf.head.titleLine2}
        text={nf.head.text}
      />
      <section className="wrap">
        <Link to={href(nf.buttonPath || 'safaris')} className="button">
          {nf.button}
        </Link>
      </section>
    </main>
  );
}
