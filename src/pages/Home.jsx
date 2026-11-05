import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ComfortSection from '../components/ComfortSection.jsx';
import FaqItem from '../components/FaqItem.jsx';
import JourneyCard from '../components/JourneyCard.jsx';
import { useCms } from '../CmsProvider.jsx';
import { mergeHomeContent, splitLines } from '../content/homeDefaults.js';
import { href, Img } from '../lib/utils.js';

function MultilineHeading({ text, as: Tag = 'h2' }) {
  const lines = splitLines(text);
  return (
    <Tag>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </Tag>
  );
}

function parseTourIds(raw) {
  return String(raw || '')
    .split(/[,;\s]+/)
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n) && n > 0);
}

export default function Home() {
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const { tours, places, faq, pages } = useCms();
  const home = mergeHomeContent(pages.home);
  const styleTabs = String(home.curated.tabs || 'Comfort,Luxury,Camping')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const [feature, setFeature] = useState(styleTabs[0] || 'Comfort');

  const comfortIds = parseTourIds(home.curated.featuredComfortTourIds);
  const featuredTours =
    feature === 'Comfort' && comfortIds.length
      ? comfortIds.map((id) => tours.find((t) => t.id === id)).filter(Boolean)
      : tours.filter((t) => t.style === feature).slice(0, 3);

  const faqCount = Math.max(1, Math.min(20, Number(home.faqSection.faqCount) || 3));

  const tabsKey = styleTabs.join('|');
  useEffect(() => {
    if (!styleTabs.includes(feature)) setFeature(styleTabs[0] || 'Comfort');
  }, [feature, tabsKey, styleTabs]);

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

  const beyondCards = [
    {
      className: 'beyond-card sea',
      link: home.beyond.card1Link,
      image: home.beyond.card1Image,
      alt: home.beyond.card1ImageAlt,
      eyebrow: home.beyond.card1Eyebrow,
      title: home.beyond.card1Title,
      text: home.beyond.card1Text,
    },
    {
      className: 'beyond-card mountain',
      link: home.beyond.card2Link,
      image: home.beyond.card2Image,
      alt: home.beyond.card2ImageAlt,
      eyebrow: home.beyond.card2Eyebrow,
      title: home.beyond.card2Title,
      text: home.beyond.card2Text,
    },
    {
      className: 'beyond-card culture',
      link: home.beyond.card3Link,
      image: home.beyond.card3Image,
      alt: home.beyond.card3ImageAlt,
      eyebrow: home.beyond.card3Eyebrow,
      title: home.beyond.card3Title,
      text: home.beyond.card3Text,
    },
  ];

  return (
    <main id="main">
      <section className="home-hero">
        <div className="hero-image">
          <Img src={home.hero.image} alt={home.hero.imageAlt} priority />
        </div>
        <div className="hero-content wrap">
          <span className="eyebrow">{home.hero.eyebrow}</span>
          <h1>
            {home.hero.titleLine1}
            <br />
            <span>{home.hero.titleLine2}</span>
          </h1>
          <p>
            {splitLines(home.hero.text).map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
          <div className="hero-actions">
            <Link to={href(home.hero.ctaPrimaryLink || 'safaris')} className="button orange">
              {home.hero.ctaPrimary}
            </Link>
            <Link to={href(home.hero.ctaSecondaryLink || 'plan')} className="button ghost">
              {home.hero.ctaSecondary}
            </Link>
          </div>
          <div className="hero-bottom">
            <span>{home.hero.bottomLeft}</span>
            <span>{home.hero.bottomRight}</span>
          </div>
        </div>
        <a href="#discover" className="hero-scroll">
          {home.hero.scrollLabel}
        </a>
      </section>

      <section className="discovery wrap" id="discover">
        <div className="discovery-title">
          <span className="eyebrow">{home.finder.eyebrow}</span>
          <MultilineHeading text={home.finder.title} />
        </div>
        <form id="finder" className="finder" onSubmit={onFinderSubmit}>
          <div>
            <label htmlFor="find-style">{home.finder.styleLabel}</label>
            <select id="find-style" defaultValue="Comfort">
              <option value="Comfort">Comfort</option>
              <option value="Midrange">Midrange</option>
              <option value="Luxury">Luxury</option>
              <option value="Camping">Camping</option>
              <option value="">Help me decide</option>
            </select>
          </div>
          <div>
            <label htmlFor="find-duration">{home.finder.durationLabel}</label>
            <select id="find-duration" defaultValue="">
              <option value="">Any duration</option>
              <option value="short">2–4 days</option>
              <option value="medium">5–6 days</option>
              <option value="long">7+ days</option>
            </select>
          </div>
          <div>
            <label htmlFor="find-interest">{home.finder.interestLabel}</label>
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
            {home.finder.submitLabel}
          </button>
        </form>
      </section>

      <section className="welcome wrap">
        <div>
          <span className="eyebrow">{home.welcome.eyebrow}</span>
          <h2 dangerouslySetInnerHTML={{ __html: home.welcome.titleHtml }} />
        </div>
        <div className="welcome-copy">
          <p className="lead">{home.welcome.lead}</p>
          <p>{home.welcome.body}</p>
          <Link to={href(home.welcome.linkPath || 'about')} className="text-link">
            {home.welcome.linkText}
          </Link>
          <div className="welcome-points">
            <div>
              <b>{home.welcome.point1Title}</b>
              <span>{home.welcome.point1Text}</span>
            </div>
            <div>
              <b>{home.welcome.point2Title}</b>
              <span>{home.welcome.point2Text}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="curated wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{home.curated.eyebrow}</span>
            <MultilineHeading text={home.curated.title} />
          </div>
          <div className="collection-controls">
            <div className="pill-tabs" aria-label="Featured journeys">
              {styleTabs.map((s) => (
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
              {home.curated.collectionLinkText}
            </Link>
          </div>
        </div>
        <div className="featured-grid" id="featured-journeys">
          {featuredTours.map((t) => (
            <JourneyCard key={t.id} t={t} />
          ))}
        </div>
      </section>

      <ComfortSection section={home.comfortSection} />

      <section className="places-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{home.placesSection.eyebrow}</span>
            <MultilineHeading text={home.placesSection.title} />
          </div>
          <div className="slider-actions">
            <button className="round-button" id="places-prev" type="button" aria-label="Previous destinations">
              {home.placesSection.prevLabel}
            </button>
            <button className="round-button" id="places-next" type="button" aria-label="Next destinations">
              {home.placesSection.nextLabel}
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
          <span>{home.placesSection.tailText}</span>
          <Link to={href('destinations')} className="text-link">
            {home.placesSection.tailLinkText}
          </Link>
        </div>
      </section>

      <section className="beyond wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{home.beyond.eyebrow}</span>
            <h2>{home.beyond.title}</h2>
          </div>
          <p>
            {splitLines(home.beyond.intro).map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="beyond-grid">
          {beyondCards.map((card) => (
            <Link key={card.link} className={card.className} to={href(card.link || '')}>
              <Img src={card.image} alt={card.alt} />
              <div>
                <span className="eyebrow">{card.eyebrow}</span>
                <MultilineHeading text={card.title} as="h3" />
                <p>{card.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="local-story">
        <div className="wrap story-grid">
          <div className="story-photo">
            <Img src={home.localStory.photo} alt={home.localStory.photoAlt} />
            <span>{home.localStory.photoCaption}</span>
          </div>
          <div>
            <span className="eyebrow">{home.localStory.eyebrow}</span>
            <MultilineHeading text={home.localStory.title} />
            <p>{home.localStory.body1}</p>
            <p>{home.localStory.body2}</p>
            <Link to={href(home.localStory.buttonLink || 'about')} className="button outline">
              {home.localStory.buttonText}
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap home-faq">
        <div>
          <span className="eyebrow">{home.faqSection.eyebrow}</span>
          <MultilineHeading text={home.faqSection.title} />
          <Link to={href('travel-guide')} className="text-link">
            {home.faqSection.linkText}
          </Link>
        </div>
        <div className="faq-list">
          {faq.slice(0, faqCount).map(([q, a]) => (
            <FaqItem key={q} question={q} answer={a} />
          ))}
        </div>
      </section>
    </main>
  );
}
