import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ComfortSection from '../components/ComfortSection.jsx';
import FaqItem from '../components/FaqItem.jsx';
import JourneyCard from '../components/JourneyCard.jsx';
import { faqItems } from '../data/faq.js';
import { places } from '../data/places.js';
import tours from '../data/tours.json';
import { href, Img } from '../lib/utils.js';

const FEATURED_COMFORT_IDS = [302, 298, 291];

export default function Home() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [feature, setFeature] = useState('Comfort');

  const featuredTours =
    feature === 'Comfort'
      ? FEATURED_COMFORT_IDS.map((id) => tours.find((t) => t.id === id)).filter(Boolean)
      : tours.filter((t) => t.style === feature).slice(0, 3);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const prev = document.getElementById('places-prev');
    const next = document.getElementById('places-next');
    if (!prev || !next) return;

    const update = () => {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    };

    const scrollBy = (dir) =>
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });

    prev.onclick = () => scrollBy(-1);
    next.onclick = () => scrollBy(1);
    track.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();

    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const onFinderSubmit = (e) => {
    e.preventDefault();
    const style = document.getElementById('find-style')?.value ?? '';
    const duration = document.getElementById('find-duration')?.value ?? '';
    const q = document.getElementById('find-interest')?.value ?? '';
    const params = new URLSearchParams();
    if (style) params.set('style', style);
    if (duration) params.set('duration', duration);
    if (q) params.set('q', q);
    const qs = params.size ? '?' + params.toString() : '';
    navigate(`/safaris/${qs}`);
  };

  return (
    <main id="main">
      <section className="home-hero">
        <div className="hero-image">
          <Img src="hero.webp" alt="Wildebeest and zebras on Tanzania’s plains" priority />
        </div>
        <div className="hero-content wrap">
          <span className="eyebrow">TANZANIA, YOUR WAY</span>
          <h1>
            Your Tanzania.
            <br />
            <span>Wildly personal.</span>
          </h1>
          <p>
            Extraordinary wildlife. Welcoming stays.
            <br />
            Thoughtfully planned around you.
          </p>
          <div className="hero-actions">
            <Link to={href('safaris')} className="button orange">
              Explore our safaris
            </Link>
            <Link to={href('plan')} className="button ghost">
              Create your journey
            </Link>
          </div>
          <div className="hero-bottom">
            <span>Locally owned · Arusha, Tanzania</span>
            <span>Dream. Discover. Explore.</span>
          </div>
        </div>
        <a href="#discover" className="hero-scroll">
          Discover Mambeu
        </a>
      </section>

      <section className="discovery wrap" id="discover">
        <div className="discovery-title">
          <span className="eyebrow">FIND YOUR STARTING POINT</span>
          <h2>
            Where will
            <br />
            your story go?
          </h2>
        </div>
        <form id="finder" className="finder" onSubmit={onFinderSubmit}>
          <div>
            <label htmlFor="find-style">Your comfort level</label>
            <select id="find-style" defaultValue="Comfort">
              <option value="Comfort">Comfort</option>
              <option value="Midrange">Midrange</option>
              <option value="Luxury">Luxury</option>
              <option value="Camping">Camping</option>
              <option value="">Help me decide</option>
            </select>
          </div>
          <div>
            <label htmlFor="find-duration">Time to explore</label>
            <select id="find-duration" defaultValue="">
              <option value="">Any duration</option>
              <option value="short">2–4 days</option>
              <option value="medium">5–6 days</option>
              <option value="long">7+ days</option>
            </select>
          </div>
          <div>
            <label htmlFor="find-interest">What draws you here?</label>
            <select id="find-interest" defaultValue="">
              <option value="">Wildlife & landscapes</option>
              <option>Serengeti</option>
              <option>Ngorongoro</option>
              <option>Migration</option>
              <option>Zanzibar</option>
              <option>Cultural</option>
            </select>
          </div>
          <button className="button" type="submit">
            Find my safari
          </button>
        </form>
      </section>

      <section className="welcome wrap">
        <div>
          <span className="eyebrow">WELCOME TO MAMBEU</span>
          <h2>
            Big on adventure.
            <br />
            Thoughtful about
            <br />
            <span className="accent">everything else.</span>
          </h2>
        </div>
        <div className="welcome-copy">
          <p className="lead">You don’t need the most expensive safari to have an extraordinary one.</p>
          <p>
            You need the right route, a knowledgeable guide and a welcoming place to end the day. From
            our home in Arusha, we bring these details together in journeys made around you.
          </p>
          <Link to={href('about')} className="text-link">
            Meet the people behind your journey
          </Link>
          <div className="welcome-points">
            <div>
              <b>Local roots</b>
              <span>Locally owned in Tanzania</span>
            </div>
            <div>
              <b>Your pace</b>
              <span>Personalised routes & stays</span>
            </div>
          </div>
        </div>
      </section>

      <section className="curated wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A FEW GOOD PLACES TO BEGIN</span>
            <h2>
              Journeys with
              <br />
              something more.
            </h2>
          </div>
          <div className="collection-controls">
            <div className="pill-tabs" aria-label="Featured journeys">
              {['Comfort', 'Luxury', 'Camping'].map((s) => (
                <button
                  key={s}
                  type="button"
                  data-feature={s}
                  aria-pressed={feature === s}
                  onClick={() => setFeature(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link to={href('safaris')} className="text-link">
              View the full collection
            </Link>
          </div>
        </div>
        <div className="featured-grid" id="featured-journeys">
          {featuredTours.map((t) => (
            <JourneyCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      <ComfortSection />

      <section className="places-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MEET THE PLACES THAT MAKE TANZANIA</span>
            <h2>
              Six landscapes.
              <br />
              Countless possibilities.
            </h2>
          </div>
          <div className="slider-actions">
            <button className="round-button" id="places-prev" type="button" aria-label="Previous destinations">
              Back
            </button>
            <button className="round-button" id="places-next" type="button" aria-label="Next destinations">
              Next
            </button>
          </div>
        </div>
        <div
          className="places-track"
          id="places-track"
          ref={trackRef}
          tabIndex={0}
          aria-label="Tanzania destinations"
        >
          {places.map((p, i) => (
            <Link key={p.slug} className="place-card" to={`/destinations/${p.slug}/`}>
              <Img src={p.photo} alt={`${p.name} landscape and wildlife`} />
              <div>
                <span className="eyebrow">
                  0{i + 1} / TANZANIA
                </span>
                <h3>{p.name}</h3>
                <p>{p.tag}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="section-tail">
          <span>Connect your favourites into one personal journey.</span>
          <Link to={href('destinations')} className="text-link">
            Explore all destinations
          </Link>
        </div>
      </section>

      <section className="beyond wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MAKE ROOM FOR A DIFFERENT KIND OF WILD</span>
            <h2>Beyond the safari.</h2>
          </div>
          <p>
            Your adventure doesn’t have to end
            <br />
            when the game drive does.
          </p>
        </div>
        <div className="beyond-grid">
          <Link className="beyond-card sea" to={href('zanzibar')}>
            <Img src="zanzibar.webp" alt="Zanzibar coastline and Indian Ocean" />
            <div>
              <span className="eyebrow">ISLAND TIME</span>
              <h3>
                Wildlife to
                <br />
                white sands.
              </h3>
              <p>Unwind in Zanzibar.</p>
            </div>
          </Link>
          <Link className="beyond-card mountain" to={href('kilimanjaro')}>
            <Img src="mountain.webp" alt="Kilimanjaro mountain camp" />
            <div>
              <span className="eyebrow">A HIGHER PERSPECTIVE</span>
              <h3>
                Take the
                <br />
                higher road.
              </h3>
              <p>Your Kilimanjaro adventure.</p>
            </div>
          </Link>
          <Link className="beyond-card culture" to={href('experiences')}>
            <Img src="tour-296.webp" alt="A cultural visit with local people in Tanzania" />
            <div>
              <span className="eyebrow">HUMAN CONNECTIONS</span>
              <h3>
                Meet another
                <br />
                side of Tanzania.
              </h3>
              <p>Culture, stories and shared moments.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="local-story">
        <div className="wrap story-grid">
          <div className="story-photo">
            <Img src="team.webp" alt="Mambeu guests beside the branded safari vehicle" />
            <span>OUR HOME. YOUR ADVENTURE.</span>
          </div>
          <div>
            <span className="eyebrow">THE PEOPLE MAKE THE DIFFERENCE</span>
            <h2>
              Good safaris begin
              <br />
              with good people.
            </h2>
            <p>
              Mambeu is locally owned and operated. We share Tanzania through expertly guided journeys,
              personal attention and a commitment to responsible travel.
            </p>
            <p>
              From your first ideas to the route, stays and special moments, we bring local knowledge to
              the details that matter.
            </p>
            <Link to={href('about')} className="button outline">
              Get to know Mambeu
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap home-faq">
        <div>
          <span className="eyebrow">A LITTLE HELP BEFORE YOU GO</span>
          <h2>
            Good questions.
            <br />
            Personal answers.
          </h2>
          <Link to={href('travel-guide')} className="text-link">
            All planning questions
          </Link>
        </div>
        <div className="faq-list">
          {faqItems()
            .slice(0, 3)
            .map(([q, a]) => (
              <FaqItem key={q} question={q} answer={a} />
            ))}
        </div>
      </section>
    </main>
  );
}
