import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { homePageDefaults } from '../data/home-page-defaults.js';
import { planHref } from '../lib/plan-link.js';
import { href } from '../lib/utils.js';
import Reveal from './Reveal.jsx';

/** @typedef {{
 *   slug: string;
 *   name: string;
 *   title: string;
 *   description: string;
 *   duration: string;
 *   image: string;
 *   alt: string;
 *   position?: string;
 * }} Extra
 */

// Replace [X] only with confirmed durations.
const EXTRAS = /** @type {Extra[]} */ ([
  {
    slug: 'zanzibar',
    plan: { destination: 'zanzibar' },
    name: 'Zanzibar',
    title: 'Zanzibar beach stay',
    description: 'Wildlife to white sands. Unwind in Zanzibar.',
    duration: '+[X] days',
    image: '/images/beyond/zanzibar.jpg',
    alt: 'Thatched beach lodge on stilts over turquoise water in Zanzibar',
  },
  {
    slug: 'kilimanjaro',
    plan: { destination: 'kilimanjaro' },
    name: 'Kilimanjaro',
    title: 'Kilimanjaro climb',
    description: 'Take the higher road. Your Kilimanjaro adventure.',
    duration: '+[X] days',
    image: '/images/beyond/kilimanjaro.jpg',
    alt: 'Climbers and an orange tent beneath the snow-capped summit of Kilimanjaro',
    position: 'beyond-safari__photo-img--kili',
  },
  {
    slug: 'culture',
    plan: { experience: 'cultural-connections' },
    name: 'a cultural visit',
    title: 'Short day tours',
    description: 'Meet another side of Tanzania. Short, locally guided day tours.',
    duration: '+[X] days',
    image: '/images/beyond/culture.jpg',
    alt: 'A visitor meeting a local community in the forest',
  },
  {
    slug: 'balloon',
    plan: { experience: 'hot-air-balloon' },
    name: 'a balloon flight',
    title: 'Hot air balloon safaris',
    description: 'A sunrise balloon flight over the Serengeti, added to your safari.',
    duration: '+[X] days',
    image: '/images/beyond/balloon.jpg',
    alt: 'Hot-air balloons inflating beside safari vehicles on the Serengeti plains',
  },
  {
    slug: 'family',
    plan: { experience: 'family-safaris' },
    name: 'a family safari',
    title: 'Family safari vacations',
    description: 'Time together, thoughtfully planned. A route and pace shaped around everyone.',
    duration: '+[X] days',
    image: '/images/beyond/family.jpg',
    alt: 'A family looking out from a safari vehicle across the savannah',
  },
  {
    slug: 'romantic',
    plan: { experience: 'romantic-bush-dinner' },
    name: 'a romantic stay',
    title: 'Romantic safari holidays',
    description: 'Thoughtful stays and quiet evenings, from the bush to the coast.',
    duration: '+[X] days',
    image: '/images/beyond/romantic.jpg',
    alt: 'A candlelit dinner table set for two in the bush',
  },
]);

export default function BeyondSafari() {
  const { pages } = useCms();
  const beyond = { ...homePageDefaults.beyond, ...(pages.home?.beyond || {}) };

  return (
    <section className="beyond-safari" aria-labelledby="beyond-heading">
      <div className="beyond-safari__container">
        <Reveal as="header" className="beyond-safari__head">
          <p className="beyond-safari__eyebrow">{beyond.eyebrow}</p>
          <h2 id="beyond-heading" className="beyond-safari__title">
            {beyond.titleLine1}
            <span className="beyond-safari__title-muted">{beyond.titleLine2}</span>
          </h2>
          <div className="beyond-safari__row">
            <p className="beyond-safari__text">{beyond.text}</p>
            <Link to={href('experiences')} className="beyond-safari__link">
              {beyond.linkLabel}
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </Reveal>

        <Reveal as="ul" stagger className="beyond-safari__grid">
          {EXTRAS.map((x) => (
            <li key={x.slug} className="beyond-safari__card">
              <div className="beyond-safari__photo">
                <img
                  src={x.image}
                  alt={x.alt}
                  decoding="async"
                  className={`beyond-safari__photo-img${x.position ? ` ${x.position}` : ''}`}
                />
                <div className="beyond-safari__photo-overlay" aria-hidden="true" />
                {x.duration && !String(x.duration).includes('[X]') ? (
                  <span className="beyond-safari__pill">{x.duration}</span>
                ) : null}
              </div>

              <div className="beyond-safari__body">
                <h3 className="beyond-safari__card-title">{x.title}</h3>
                <p className="beyond-safari__desc">{x.description}</p>
                <div className="beyond-safari__foot">
                  <Link to={planHref(x.plan)} className="beyond-safari__cta">
                    Add {x.name} to my trip
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
