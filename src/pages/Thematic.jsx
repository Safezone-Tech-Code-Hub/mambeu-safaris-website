import { Link } from 'react-router-dom';
import JourneyCard from '../components/JourneyCard.jsx';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { href } from '../lib/utils.js';

const fallback = {
  kilimanjaro: {
    label: 'MOUNTAIN ADVENTURES',
    title: 'Take the<br>higher road.',
    text: 'A Kilimanjaro adventure with personal preparation, local guiding and support along the way.',
    photo: 'mountain.webp',
    blocks: [
      ['Prepare well', 'Share your hiking experience, fitness and questions with our team.'],
      ['Choose your route', 'Discuss route options, duration, equipment and preparation before confirming your climb.'],
      ['Keep exploring', 'Add a wildlife safari or a Zanzibar stay to round off your adventure.'],
    ],
  },
  zanzibar: {
    label: 'SAFARI & ISLAND ESCAPES',
    title: 'From wild plains<br>to white sands.',
    text: 'Pair your wildlife adventure with Zanzibar’s beaches, historic Stone Town and the Indian Ocean.',
    photo: 'zanzibar.webp',
    blocks: [
      ['Time by the sea', 'Unhurried days, warm waters and accommodation matched to your comfort level.'],
      ['Culture & history', 'Explore Stone Town, local flavours and the island’s spice heritage.'],
      ['Ocean experiences', 'Ask about snorkelling, diving and excursions for your travel dates.'],
    ],
  },
};

export default function Thematic({ type }) {
  const { tours, pages } = useCms();
  const mountain = type === 'kilimanjaro';
  const copy = { ...fallback[type], ...(pages[type] || {}) };
  const blocks = copy.blocks?.length ? copy.blocks : fallback[type].blocks;
  const zanzibarTours = tours.filter((t) => String(t.title || '').includes('Zanzibar'));

  return (
    <main id="main">
      <PageHead
        label={copy.label}
        title={copy.title}
        text={copy.text}
        photo={copy.photo}
      />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">
            {mountain ? 'THE JOURNEY IS THE STORY' : 'MAKE TIME TO SLOW DOWN'}
          </span>
          <h2
            dangerouslySetInnerHTML={{
              __html: mountain ? 'More than<br>a summit.' : 'Your island.<br>Your pace.',
            }}
          />
        </div>
        <div>
          <p className="lead">
            {mountain
              ? 'Mambeu’s mountain experiences bring expert guiding, equipment and preparation together with a personal approach.'
              : 'Build a Zanzibar stay around your interests, from beach relaxation to cultural exploration and time on the water.'}
          </p>
          <p>
            {mountain
              ? 'Tell us about your hiking background, preferred dates and available time. We’ll discuss suitable routes, support and preparation before providing your quotation.'
              : 'Accommodation, flights, airport transfers and excursions can be discussed together so your safari and island stay connect smoothly.'}
          </p>
          <Link
            className="button orange"
            to={`/plan/?interest=${mountain ? 'Kilimanjaro' : 'Zanzibar'}`}
          >
            Plan my {mountain ? 'mountain adventure' : 'island escape'}
          </Link>
        </div>
      </section>
      <section className="values">
        <div className="wrap values-grid">
          {blocks.map((b, i) => (
            <article key={b[0]}>
              <span>0{i + 1}</span>
              <h3>{b[0]}</h3>
              <p>{b[1]}</p>
            </article>
          ))}
        </div>
      </section>
      {!mountain ? (
        <section className="wrap related">
          <div className="section-heading">
            <h2>Safari from Zanzibar.</h2>
            <Link to={href('safaris?q=Zanzibar')} className="text-link">
              Explore these journeys
            </Link>
          </div>
          <div className="related-grid">
            {zanzibarTours.map((t) => (
              <JourneyCard key={t.id} t={t} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
