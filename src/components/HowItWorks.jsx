import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';

/** @typedef {{
 *   title: string;
 *   body: string;
 *   image: string;
 *   alt: string;
 *   imagePosition?: string;
 * }} HowItWorksStep */

/** @typedef {'done' | 'active' | 'upcoming'} StepMarkerState */

/** Edit copy and images here. */
const STEPS = /** @type {HowItWorksStep[]} */ ([
  {
    title: 'Tell us the shape of your trip',
    body: 'Share your dates, group size and the parks you care about. Two minutes is enough, and we confirm what we understood.',
    image: '/images/how/step-1.jpg',
    alt: 'Hot air balloon over the Serengeti at sunrise',
    imagePosition: 'center 45%',
  },
  {
    title: 'Receive a quoted route',
    body: 'We build a route around your pace, with named lodges and camps, and quote it in full. Nothing is hidden in add-ons.',
    image: '/images/how/step-2.jpg',
    alt: 'Wildebeest and zebra on open grassland',
    imagePosition: 'center 60%',
  },
  {
    title: 'Confirm, and we handle the rest',
    body: 'Once you are happy, we secure the lodges, book the guide, and send your final itinerary and booking references.',
    image: '/images/how/step-3.jpg',
    alt: 'Zebras crossing open savanna seen from above',
    imagePosition: 'center 40%',
  },
]);

function readStickyTop() {
  if (typeof window === 'undefined') return 64;
  const raw =
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim() ||
    getComputedStyle(document.documentElement).getPropertyValue('--header-h').trim();
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : 64;
}

/** @param {{ index: number; state: StepMarkerState }} props */
function StepMarker({ index, state }) {
  return (
    <span
      aria-hidden="true"
      className={`how-it-works__step-box how-it-works__step-box--${state}`}
    >
      {state === 'done' ? (
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      ) : (
        index + 1
      )}
    </span>
  );
}

export default function HowItWorks() {
  const wrapperRef = useRef(/** @type {HTMLElement | null} */ (null));
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stickyTop, setStickyTop] = useState(readStickyTop);
  const [pin, setPin] = useState(false);
  const n = STEPS.length;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setPin(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!pin) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const top = readStickyTop();
      setStickyTop(top);
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, (top - rect.top) / scrollable));
      setProgress(p);
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [n, pin]);

  useEffect(() => {
    if (!pin) setProgress((active + 1) / n);
  }, [pin, active, n]);

  const goTo = useCallback(
    (i) => {
      if (!pin) {
        setActive(i);
        setProgress((i + 1) / n);
        return;
      }
      const el = wrapperRef.current;
      if (!el) return;
      const top = readStickyTop();
      const scrollable = el.offsetHeight - window.innerHeight;
      const y =
        el.getBoundingClientRect().top + window.scrollY - top + ((i + 0.5) / n) * scrollable;
      window.scrollTo({ top: y, behavior: 'smooth' });
    },
    [n, pin],
  );

  return (
    <section
      ref={wrapperRef}
      aria-labelledby="how-it-works-heading"
      className={pin ? 'how-it-works how-it-works--scroll-pin' : 'how-it-works'}
      style={pin ? { height: `${n * 100}vh` } : undefined}
    >
      <div
        className="how-it-works__stage"
        style={
          pin
            ? {
                top: stickyTop,
                height: `calc(100vh - ${stickyTop}px)`,
              }
            : undefined
        }
      >
        <div className="how-it-works__stage-inner">
          <div className="how-it-works__photos">
            {STEPS.map((s, i) => (
              <img
                key={s.image}
                src={s.image}
                alt={i === active ? s.alt : ''}
                aria-hidden={i !== active}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={
                  i === active
                    ? 'how-it-works__photo how-it-works__photo--active'
                    : 'how-it-works__photo'
                }
                style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
              />
            ))}
            <div aria-hidden="true" className="how-it-works__photo-overlay" />
          </div>

          <div className="how-it-works__panel">
            <div className="how-it-works__panel-top">
              <p className="how-it-works__eyebrow">How it works</p>
              {pin ? (
                <p aria-hidden="true" className="how-it-works__counter">
                  Step {active + 1} of {n}
                </p>
              ) : null}
            </div>

            <h2 id="how-it-works-heading" className="how-it-works__heading">
              From first message to a confirmed route.
            </h2>

            <p className="how-it-works__intro how-it-works__intro--mobile">
              You get a quoted route and named lodges before you pay anything.
            </p>

            {pin ? (
              <div aria-hidden="true" className="how-it-works__progress-track">
                <div
                  className="how-it-works__progress-fill"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>
            ) : null}

            <ol className="how-it-works__list">
              {STEPS.map((s, i) => {
                const isActive = pin ? i === active : true;
                const state = /** @type {StepMarkerState} */ (
                  pin
                    ? isActive
                      ? 'active'
                      : i < active
                        ? 'done'
                        : 'upcoming'
                    : 'done'
                );
                return (
                  <li
                    key={s.title}
                    aria-current={pin && isActive ? 'step' : undefined}
                    className={
                      isActive
                        ? 'how-it-works__item how-it-works__item--active'
                        : 'how-it-works__item'
                    }
                  >
                    <div className="how-it-works__rail">
                      <StepMarker index={i} state={state} />
                      {i < n - 1 && (
                        <span
                          aria-hidden="true"
                          className={
                            !pin || i < active
                              ? 'how-it-works__connector how-it-works__connector--done'
                              : 'how-it-works__connector'
                          }
                        />
                      )}
                    </div>

                    <div
                      className={
                        i < n - 1
                          ? 'how-it-works__item-main'
                          : 'how-it-works__item-main how-it-works__item-main--last'
                      }
                    >
                      {pin ? (
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-expanded={isActive}
                          className="how-it-works__trigger"
                        >
                          <span className="how-it-works__trigger-title">
                            <span className="how-it-works__sr-only">Step {i + 1}: </span>
                            {s.title}
                          </span>
                        </button>
                      ) : (
                        <h3 className="how-it-works__step-title">
                          <span className="how-it-works__sr-only">Step {i + 1}: </span>
                          {s.title}
                        </h3>
                      )}

                      <div
                        className="how-it-works__detail"
                        aria-hidden={pin ? !isActive : false}
                      >
                        <div className="how-it-works__detail-inner">
                          <p className="how-it-works__detail-body">{s.body}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <Link to={planHref()} className="how-it-works__cta button orange">
              Start with your dates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
