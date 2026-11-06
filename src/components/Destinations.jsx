import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import { useDestinationsIntro } from '../lib/useDestinationsIntro.js';
import { href } from '../lib/utils.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const INTERVAL_MS = 7000;

/** @typedef {{
 *   slug: string;
 *   name: string;
 *   tagline: string;
 *   image: string;
 *   objectPosition?: string;
 *   href?: string;
 * }} DestinationPlace */

/** Edit names, taglines and images here. */
const PLACES = /** @type {DestinationPlace[]} */ ([
  {
    slug: 'serengeti',
    name: 'Serengeti',
    tagline: 'The plains go on. The moments stay.',
    image: '/images/destinations/serengeti.jpg',
    objectPosition: 'center 60%',
  },
  {
    slug: 'ngorongoro',
    name: 'Ngorongoro',
    tagline: 'A whole world inside a crater.',
    image: '/images/destinations/ngorongoro.jpg',
  },
  {
    slug: 'tarangire',
    name: 'Tarangire',
    tagline: 'Elephants. Baobabs. Room to roam.',
    image: '/images/destinations/tarangire.jpg',
  },
  {
    slug: 'lake-manyara',
    name: 'Lake Manyara',
    tagline: 'Forest meets the Rift Valley.',
    image: '/images/destinations/lake-manyara.jpg',
  },
  {
    slug: 'ndutu',
    name: 'Ndutu',
    tagline: 'Calving season on the southern plains.',
    image: '/images/destinations/ndutu.jpg',
    objectPosition: 'center 40%',
  },
  {
    slug: 'lake-natron',
    name: 'Lake Natron',
    tagline: 'Flamingos, salt and a very big sky.',
    image: '/images/destinations/lake-natron.jpg',
  },
  {
    slug: 'kilimanjaro',
    name: 'Kilimanjaro',
    tagline: 'A higher perspective.',
    image: '/images/destinations/kilimanjaro.jpg',
    href: '/kilimanjaro/',
  },
]);

const TOTAL = PLACES.length;

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Destinations() {
  const sectionRef = useRef(null);
  const last = PLACES.length - 1;
  const { ref: listRef, phase, vars } = useDestinationsIntro(PLACES.length);
  const introDone = phase === 'done';
  const [active, setActive] = useState(0);
  const shownActive = phase === 'idle' || phase === 'rising' ? -1 : active;
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = introDone && !reduced && !userPaused && !hovering && !focused && inView;

  const select = (i) => {
    if (!introDone) return;
    setActive(i);
    setUserPaused(true);
  };

  const onTickAnimationEnd = () => {
    if (reduced || !running) return;
    setActive((a) => (a + 1) % TOTAL);
  };

  return (
    <section ref={sectionRef} className="destinations" aria-labelledby="destinations-heading">
      <div className="destinations__inner">
        <Reveal>
        <SectionHeader
          variant="stacked"
          id="destinations-heading"
          eyebrow="Meet the places that make Tanzania"
          title={
            <>
              Seven landscapes.
              <br />
              <span className="section-header__quiet">Countless possibilities.</span>
            </>
          }
          description="Each one is a different kind of safari. Open one to see where it could take you."
          aside={
            <div className="destinations__head-controls">
              <p className="destinations__head-hint">
                <span className="destinations__head-hint-desktop">Hover a landscape</span>
                <span className="destinations__head-hint-touch">Tap a landscape</span>
              </p>
              {introDone && !reduced && (
                <button
                  type="button"
                  className="destinations__autoplay-btn"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={
                    userPaused ? 'Play landscape slideshow' : 'Pause landscape slideshow'
                  }
                >
                  {userPaused ? 'Play' : 'Pause'}
                </button>
              )}
            </div>
          }
        />
        </Reveal>

        <ul
          ref={listRef}
          className="destinations__panels"
          data-phase={phase}
          style={vars}
          onMouseLeave={() => {
            if (!introDone) return;
            setHovering(false);
          }}
          onFocus={() => {
            if (introDone) setFocused(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setFocused(false);
            }
          }}
        >
          {PLACES.map((p, i) => {
            const isActive = i === shownActive;

            return (
              <li
                key={p.slug}
                className={
                  isActive
                    ? 'destinations__panel destinations__panel--active'
                    : shownActive < 0
                      ? 'destinations__panel'
                      : 'destinations__panel destinations__panel--collapsed'
                }
                style={{ '--i': last - i }}
                onMouseEnter={() => {
                  if (!introDone) return;
                  setHovering(true);
                  setActive(i);
                }}
              >
                <img
                  src={p.image}
                  alt=""
                  className="destinations__photo"
                  style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                <div className="destinations__overlay destinations__overlay--gradient" aria-hidden="true" />
                <div className="destinations__overlay destinations__overlay--dim" aria-hidden="true" />

                <span className="destinations__strip-label" aria-hidden="true">
                  <span className="destinations__strip-index">{pad(i + 1)}</span>
                  <span className="destinations__strip-tick" />
                  <span className="destinations__strip-name">{p.name}</span>
                </span>

                <button
                  type="button"
                  className="destinations__select"
                  onClick={() => select(i)}
                  disabled={!introDone || isActive}
                  aria-label={`Show ${p.name}`}
                />

                <div className="destinations__detail" aria-hidden={!isActive}>
                  <div className="destinations__detail-top">
                    <div className="destinations__detail-meta">
                      <div className="destinations__ticks" aria-hidden="true">
                        {PLACES.map((_, t) => {
                          const isCurrent = t === shownActive;
                          return (
                            <span
                              key={t}
                              className={
                                isCurrent
                                  ? 'destinations__tick destinations__tick--track'
                                  : 'destinations__tick'
                              }
                            >
                              {isCurrent && isActive && (
                                <span
                                  key={shownActive}
                                  className={
                                    reduced
                                      ? 'destinations__tick-fill destinations__tick-fill--static'
                                      : 'destinations__tick-fill'
                                  }
                                  style={
                                    reduced
                                      ? undefined
                                      : {
                                          animationDuration: `${INTERVAL_MS}ms`,
                                          animationPlayState: running ? 'running' : 'paused',
                                        }
                                  }
                                  onAnimationEnd={onTickAnimationEnd}
                                />
                              )}
                            </span>
                          );
                        })}
                      </div>
                      <p className="destinations__detail-counter">
                        <span className="destinations__detail-counter-current">{pad(i + 1)}</span>
                        {' / '}
                        {pad(TOTAL)}
                      </p>
                    </div>
                    <span className="destinations__detail-tag">Tanzania</span>
                  </div>

                  <div className="destinations__detail-bottom">
                    <h3 className="destinations__detail-title">{p.name}</h3>
                    <p className="destinations__detail-tagline">{p.tagline}</p>
                    <div className="destinations__detail-rule">
                      <Link
                        to={p.href ?? href(`destinations/${p.slug}`)}
                        tabIndex={isActive ? 0 : -1}
                        className="destinations__detail-cta"
                      >
                        See journeys
                        <span className="destinations__sr-only"> in {p.name}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                      <Link
                        to={planHref({ destination: p.slug })}
                        tabIndex={isActive ? 0 : -1}
                        className="destinations__detail-plan"
                      >
                        Plan a trip to {p.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="destinations__footer">
          <p className="destinations__footer-lede">
            Connect your favourites into one personal journey.
          </p>
          <Link to={href('destinations')} className="destinations__footer-link">
            Explore all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
