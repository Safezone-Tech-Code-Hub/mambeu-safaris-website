import { useState } from 'react';
import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import { href } from '../lib/utils.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/** @typedef {{ q: string; a: string }} FaqEntry */

// Check these answers are true for Mambeu before launch.
const ITEMS = /** @type {FaqEntry[]} */ ([
  {
    q: 'Can I change a published itinerary?',
    a: 'Yes. Published journeys are starting points. Tell us what you would like to change, such as the pace, the parks or the lodges, and we will rebuild the route and quote it in full before you commit.',
  },
  {
    q: 'What is the difference between Comfort, Luxury and Camping?',
    a: 'Comfort safaris use handpicked lodges and tented camps and balance a rewarding route with welcoming stays. Luxury raises the level of the stays and experiences. Camping keeps things simple and close to the wild. Tell us your dates and we will compare specific stays for you.',
  },
  {
    q: 'Can I combine a safari with Zanzibar?',
    a: 'Yes. Zanzibar can be added to the end of a safari, and so can a Kilimanjaro climb or a cultural visit. Tell us your dates and we will quote it together as one journey.',
  },
]);

export default function Faq() {
  const [open, setOpen] = useState(/** @type {number | null} */ (0));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ITEMS.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <section className="home-faq" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="home-faq__grid">
        <div className="home-faq__intro">
          <Reveal>
            <SectionHeader
              variant="inline"
              id="faq-heading"
              eyebrow="A little help before you go"
              title={
                <>
                  Good questions.{' '}
                  <span className="section-header__quiet">Personal answers.</span>
                </>
              }
            />

            <div className="home-faq__fallback">
              <p>Can’t find your answer? Tell us what you are wondering and we will reply personally.</p>
              <Link to={planHref()} className="home-faq__ask">
                Ask us a question
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="home-faq__list-wrap">
          <Reveal as="ul" stagger className="home-faq__list">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="home-faq__item">
                  <h3 className="home-faq__q">
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="home-faq__toggle"
                    >
                      <span className="home-faq__question">{item.q}</span>
                      <span
                        aria-hidden="true"
                        className={
                          isOpen
                            ? 'home-faq__icon home-faq__icon--open'
                            : 'home-faq__icon'
                        }
                      >
                        <span className="home-faq__icon-h" />
                        <span className="home-faq__icon-v" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={
                      isOpen
                        ? 'home-faq__panel home-faq__panel--open'
                        : 'home-faq__panel'
                    }
                  >
                    <div className="home-faq__panel-inner">
                      <p>{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>

          <p className="home-faq__more">
            <Link to={href('travel-guide')} className="home-faq__more-link">
              All planning questions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
