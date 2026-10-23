import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { href, Img } from '../lib/utils.js';

const values = [
  [
    '01',
    'Personal by design',
    'Your dates, interests and comfort level shape the journey. We listen first, then help you connect the details.',
  ],
  [
    '02',
    'Rooted in Tanzania',
    'Local knowledge helps us choose routes, stays and experiences that work together.',
  ],
  [
    '03',
    'Travel responsibly',
    'Respect for nature and communities guides how we share Tanzania with our visitors.',
  ],
];

export default function About() {
  const { pages } = useCms();
  const head = pages.about?.head || {};
  const photo = pages.about?.storyPhoto || 'team.webp';
  const valueItems = pages.about?.values?.length ? pages.about.values : values;
  return (
    <main id="main">
      <PageHead
        label={head.label || 'THE PEOPLE BEHIND YOUR JOURNEY'}
        title={head.title || 'Rooted in Tanzania.<br><span class="accent">Made around you.</span>'}
        text={
          head.text ||
          'Mambeu Safaris is locally owned and based in Arusha, sharing the country we call home through personal wildlife, mountain, cultural and beach journeys.'
        }
      />
      <section className="wrap story-grid about-story">
        <div className="story-photo">
          <Img src={photo} alt="Mambeu guests and safari vehicle in Tanzania" />
          <span>LOCAL ROOTS. PERSONAL JOURNEYS.</span>
        </div>
        <div>
          <span className="eyebrow">WHO WE ARE</span>
          <h2>
            Local knowledge.
            <br />
            Human connections.
          </h2>
          <p>
            Founded by local Tanzanians, Mambeu brings a close connection to Tanzania’s landscapes,
            wildlife and communities. Our team plans bespoke journeys through the places we know and
            love.
          </p>
          <p>
            We welcome different budgets and travel styles. We help choose routes, stays and activities
            around your comfort, interests and time available.
          </p>
          <p>
            Responsible tourism is part of our approach: respecting wildlife, supporting local
            communities and making meaningful connections with the places you visit.
          </p>
        </div>
      </section>
      <section className="values">
        <div className="wrap">
          <span className="eyebrow">WHAT GUIDES US</span>
          <h2>
            A journey with care
            <br />
            at its heart.
          </h2>
          <div className="values-grid">
            {valueItems.map((v) => (
              <article key={v[0]}>
                <span>{v[0]}</span>
                <h3>{v[1]}</h3>
                <p>{v[2]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">OUR MISSION</span>
          <h2>
            Help every traveller
            <br />
            find their Tanzania.
          </h2>
        </div>
        <div>
          <p className="lead">
            We create personalised travel experiences that showcase Tanzania’s natural beauty and
            cultural richness, with comfort, safety and local insight.
          </p>
          <p>
            Our vision is to grow through thoughtful service and responsible tourism, supporting local
            communities while sharing the country’s extraordinary places.
          </p>
          <Link to={href('plan')} className="button">
            Meet your safari specialist
          </Link>
        </div>
      </section>
    </main>
  );
}
