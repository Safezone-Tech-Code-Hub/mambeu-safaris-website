import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { cmsLink, isExternalLink } from '../content/schema.js';
import { href, Img } from '../lib/utils.js';

/** Router Link for site paths, plain anchor (new tab) for external links. */
function FooterLink({ link, children, className }) {
  if (isExternalLink(link)) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={cmsLink(link)} className={className}>
      {children}
    </Link>
  );
}

function LinkColumn({ title, items }) {
  const list = (Array.isArray(items) ? items : []).filter((i) => i && String(i.label ?? '').trim());
  return (
    <nav aria-label={title}>
      <ColumnTitle>{title}</ColumnTitle>
      <ul className="site-footer__list">
        {list.map((item, i) => (
          <li key={i}>
            <FooterLink link={item.link} className="site-footer__link">
              {item.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ColumnTitle({ children }) {
  return <h3 className="site-footer__title">{children}</h3>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { pages } = useCms();
  const c = siteChrome(pages);
  const phoneTel = c.phoneE164 || c.whatsapp;

  return (
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <Link className="site-footer__logo" to="/" aria-label="Mambeu Safaris home">
                <Img
                  src="logo-white.webp"
                  alt="Mambeu Tanzania Safaris"
                  className="site-footer__logo-img"
                />
              </Link>

              <p className="site-footer__tagline">{c.footerHeadline}</p>
              <p className="site-footer__lede">{c.footerLede}</p>

              <a
                href={`https://wa.me/${c.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__whatsapp"
              >
                {c.footerWhatsappText}
                <span className="site-footer__sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <div className="site-footer__links">
              <LinkColumn title={c.footerColumn1Title} items={c.footerColumn1Links} />
              <LinkColumn title={c.footerColumn2Title} items={c.footerColumn2Links} />
            </div>

            <div className="site-footer__contact">
              <ColumnTitle>{c.footerContactTitle}</ColumnTitle>
              <dl className="site-footer__dl">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${c.email}`} className="site-footer__link site-footer__link--solid">
                      {c.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:+${phoneTel}`} className="site-footer__link site-footer__link--solid">
                      {c.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Office</dt>
                  <dd>
                    {c.officeLocation}
                    <br />
                    {c.officeHours} EAT
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="site-footer__base">
            <p>
              © {year} {c.footerCopyright}
            </p>
            <ul className="site-footer__legal">
              <li>
                <a
                  href={c.termsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__base-link"
                >
                  {c.termsText}
                  <span className="site-footer__sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link to={href('privacy')} className="site-footer__base-link">
                  Privacy
                </Link>
              </li>
              <li>
                <a href="#top" className="site-footer__base-link">
                  Back to top <span aria-hidden="true">↑</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
}
