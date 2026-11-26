import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { normalizeLevelsMap } from '../content/levelDefaults.js';
import { levels as staticLevels } from '../data/levels.js';
import { planHref } from '../lib/plan-link.js';
import { Img } from '../lib/utils.js';

/**
 * @param {{
 *   style?: string;
 *   levels: Record<string, Record<string, unknown>>;
 *   eyebrowSuffix: string;
 * }} props
 */
function StylePanel({ style = 'Comfort', levels, eyebrowSuffix }) {
  const s = levels[style];
  if (!s) return null;
  return (
    <>
      <figure className="comfort-section__figure">
        <div className="comfort-section__photo">
          <Img src={s.image} alt={s.alt} />
        </div>
        {s.imageNote ? (
          <figcaption className="comfort-section__caption">{s.imageNote}</figcaption>
        ) : null}
      </figure>
      <div className="comfort-section__copy">
        <p className="comfort-section__panel-eyebrow">
          {s.number} / {style.toUpperCase()}
          {eyebrowSuffix ? ` ${eyebrowSuffix}` : ''}
        </p>
        <h3 className="comfort-section__panel-title">
          {s.titleLine1}
          {s.titleLine2 ? (
            <>
              <br />
              {s.titleLine2}
            </>
          ) : null}
        </h3>
        <p className="comfort-section__panel-lead">{s.sub}</p>
        <p className="comfort-section__panel-body">{s.body}</p>
        <ul className="comfort-section__list">
          {(s.bullets || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <Link className="comfort-section__cta button" to={planHref({ style })}>
          {s.cta}
        </Link>
        <p className="comfort-section__note">{s.note}</p>
      </div>
    </>
  );
}

export default function ComfortSection() {
  const { levels: liveLevels, pages } = useCms();
  const copy = pages.comfort.comfortSection;
  const levels = Object.keys(liveLevels || {}).length ? liveLevels : normalizeLevelsMap(staticLevels);
  const styleKeys = Object.keys(levels);
  const firstTab = styleKeys.includes(copy.defaultTab) ? copy.defaultTab : styleKeys[0];
  const [activeStyle, setActiveStyle] = useState(firstTab);
  const [tabId, setTabId] = useState(`tab-${firstTab}`);

  const switchStyle = useCallback((style, id) => {
    setActiveStyle(style);
    setTabId(id);
  }, []);

  const onKeyDown = (e, index) => {
    let n;
    if (e.key === 'ArrowRight') n = (index + 1) % styleKeys.length;
    else if (e.key === 'ArrowLeft') n = (index + styleKeys.length - 1) % styleKeys.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = styleKeys.length - 1;
    if (n !== undefined) {
      e.preventDefault();
      const style = styleKeys[n];
      switchStyle(style, `tab-${style}`);
      document.getElementById(`tab-${style}`)?.focus();
    }
  };

  return (
    <section className="comfort-section" id="comfort" aria-labelledby="comfort-heading">
      <div className="comfort-section__inner">
        <header className="comfort-section__header">
          <div className="comfort-section__intro">
            <p className="comfort-section__eyebrow">{copy.eyebrow}</p>
            <h2 id="comfort-heading" className="comfort-section__heading">
              {copy.titleLine1}
              {copy.titleLine2 ? (
                <>
                  <br />
                  {copy.titleLine2}
                </>
              ) : null}
            </h2>
          </div>
          <p className="comfort-section__lede">
            {copy.introLine1}
            {copy.introLine2 ? (
              <>
                <br />
                {copy.introLine2}
              </>
            ) : null}
          </p>
        </header>

        <div className="comfort-section__tabs" role="tablist" aria-label="Safari comfort levels">
          {styleKeys.map((s, i) => {
            const selected = s === activeStyle;
            return (
              <button
                key={s}
                role="tab"
                type="button"
                id={`tab-${s}`}
                data-style={s}
                aria-selected={selected}
                aria-controls="comfort-panel"
                tabIndex={selected ? 0 : -1}
                className={
                  selected
                    ? 'comfort-section__tab comfort-section__tab--active'
                    : 'comfort-section__tab'
                }
                onClick={() => switchStyle(s, `tab-${s}`)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="comfort-section__tab-label">{s}</span>
                <span className="comfort-section__tab-hint">{levels[s]?.tabSubtitle}</span>
              </button>
            );
          })}
        </div>

        <div
          className="comfort-section__panel"
          id="comfort-panel"
          role="tabpanel"
          aria-labelledby={tabId}
        >
          <StylePanel style={activeStyle} levels={levels} eyebrowSuffix={copy.panelEyebrowSuffix} />
        </div>
      </div>
    </section>
  );
}
