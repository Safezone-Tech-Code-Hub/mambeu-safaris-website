import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { planHref } from '../lib/plan-link.js';
import { useDestinationsIntro } from '../lib/useDestinationsIntro.js';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { href, resolveImageSrc } from '../lib/utils.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

const INTERVAL_MS = 7000;

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Destinations() {
  const { pages } = useCms();
  const copy = pages.home.destinations;
  const places = (copy.places || []).filter((p) => p && String(p.name ?? '').trim());
  const total = places.length;
  const sectionRef = useRef(null);
  const last = places.length - 1;
  const { ref: listRef, phase, vars } = useDestinationsIntro(places.length);
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
    setActive((a) => (a + 1) % total);
  };

  return (
    <section ref={sectionRef} className="destinations" aria-labelledby="destinations-heading">
      <div className="destinations__inner">
        <Reveal>
        <SectionHeader
          variant="stacked"
          id="destinations-heading"
          eyebrow={copy.eyebrow}
          title={
            <>
              {copy.titleLine1}
              {copy.titleLine2 ? (
                <>
                  <br />
                  <span className="section-header__quiet">{copy.titleLine2}</span>
                </>
              ) : null}
            </>
          }
          description={copy.description}
          aside={
            <div className="destinations__head-controls">
              <p className="destinations__head-hint">
                <span className="destinations__head-hint-desktop">{copy.hintDesktop}</span>
                <span className="destinations__head-hint-touch">{copy.hintTouch}</span>
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
          {places.map((p, i) => {
            const isActive = i === shownActive;

            return (
              <li
                key={`${p.slug || p.name}-${i}`}
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
                  src={resolveImageSrc(p.image)}
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
                        {places.map((_, t) => {
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
                        {pad(total)}
                      </p>
                    </div>
                    <span className="destinations__detail-tag">{copy.tag}</span>
                  </div>

                  <div className="destinations__detail-bottom">
                    <h3 className="destinations__detail-title">{p.name}</h3>
                    <p className="destinations__detail-tagline">{p.tagline}</p>
                    <div className="destinations__detail-rule">
                      <Link
                        to={
                          String(p.link ?? '').trim()
                            ? cmsLink(p.link)
                            : href(p.slug ? `destinations/${p.slug}` : 'destinations')
                        }
                        tabIndex={isActive ? 0 : -1}
                        className="destinations__detail-cta"
                      >
                        {copy.journeysLinkText}
                        <span className="destinations__sr-only"> in {p.name}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                      <Link
                        to={planHref({ destination: p.slug || undefined })}
                        tabIndex={isActive ? 0 : -1}
                        className="destinations__detail-plan"
                      >
                        {copy.planLinkPrefix} {p.name}
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
            {copy.footerText}
          </p>
          <Link to={cmsLink(copy.footerLinkPath, '/destinations/')} className="destinations__footer-link">
            {copy.footerLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
