import { Link, useNavigate } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { cmsLink } from '../content/schema.js';
import { INTERESTS, LENGTHS, STYLES } from '../lib/finder-options.js';
import { useSlideshow } from '../lib/useSlideshow.js';
import { href, Img } from '../lib/utils.js';
import FinderSelect from './FinderSelect.jsx';

/**
 * @param {{ label: string; name: string; id: string; options: { value: string; label: string }[] }} props
 */
function HeroField({ label, name, id, options }) {
  return (
    <label className="home-hero__field" htmlFor={id}>
      <span className="home-hero__field-label">{label}</span>
      <span className="home-hero__select-wrap">
        <FinderSelect id={id} name={name} options={options} defaultValue={options[0].value} />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="home-hero__select-chevron"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </span>
    </label>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const { pages } = useCms();
  const hero = pages.home.hero;
  const finder = pages.home.finder;
  const slides = (hero.slides || []).filter((s) => String(s?.image ?? '').trim());
  const { index, prev } = useSlideshow(slides.length);

  const onFinderSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    [
      ['interest', 'all'],
      ['style', 'all'],
      ['length', 'any'],
    ].forEach(([key, def]) => {
      const value = String(data.get(key) ?? '').trim();
      if (value && value !== def) params.set(key, value);
    });
    const search = params.toString();
    navigate({ pathname: href('safaris'), search: search ? `?${search}` : '' });
  };

  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="home-hero__photo-block">
        <div className="home-hero__media" aria-hidden="true">
          <div className="home-hero__slideshow">
            {slides.map((slide, i) => {
              const active = i === index;
              const leaving = i === prev && !active;
              const state = active ? 'is-active' : leaving ? 'is-leaving' : '';
              return (
                <div key={`${slide.image}-${i}`} className={`home-hero__slide ${state}`.trim()}>
                  <Img
                    src={slide.image}
                    alt=""
                    priority={i === 0}
                    className="home-hero__photo"
                  />
                </div>
              );
            })}
          </div>
          <div className="home-hero__overlay home-hero__overlay--legibility" />
          <div className="home-hero__overlay home-hero__overlay--veil" />
        </div>

        <div className="home-hero__copy-wrap">
          <p className="home-hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-heading" className="home-hero__title">
            <span className="home-hero__title-line">{hero.titleLine1}</span>
            {hero.titleLine2 ? (
              <span className="home-hero__title-line home-hero__title-line--quiet">
                {hero.titleLine2}
              </span>
            ) : null}
          </h1>
          <p className="home-hero__subline">{hero.text}</p>
          <Link to={cmsLink(hero.ctaLink, '/plan/')} className="home-hero__cta">
            {hero.ctaLabel}
          </Link>
        </div>
      </div>

      <div className="home-hero__card-wrap">
        <form
          id="finder"
          className="home-hero__finder"
          action={href('safaris')}
          method="get"
          aria-label="Find your safari"
          onSubmit={onFinderSubmit}
        >
          <p className="home-hero__finder-eyebrow">
            {finder.eyebrow}
          </p>
          <div className="home-hero__finder-grid">
            <HeroField
              id="find-interest"
              label={finder.interestLabel}
              name="interest"
              options={INTERESTS}
            />
            <HeroField
              id="find-style"
              label={finder.styleLabel}
              name="style"
              options={STYLES}
            />
            <HeroField
              id="find-length"
              label={finder.durationLabel}
              name="length"
              options={LENGTHS}
            />
            <button type="submit" className="home-hero__finder-submit">
              {finder.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
