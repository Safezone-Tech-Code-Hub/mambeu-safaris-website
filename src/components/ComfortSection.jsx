import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { levels as staticLevels } from '../data/levels.js';
import { normalizeLevelsMap } from '../content/levelDefaults.js';
import { Img } from '../lib/utils.js';

function StylePanel({ style = 'Comfort', levels }) {
  const s = levels[style];
  if (!s) return null;
  return (
    <>
      <div className="stay-photo">
        <Img src={s.image} alt={s.alt} />
        <span className="image-note">{s.imageNote}</span>
      </div>
      <div className="stay-copy">
        <span className="eyebrow">
          {s.number} / {style.toUpperCase()} SAFARIS
        </span>
        <h3>
          {s.titleLine1}
          {s.titleLine2 ? (
            <>
              <br />
              {s.titleLine2}
            </>
          ) : null}
        </h3>
        <p className="stay-sub">{s.sub}</p>
        <p>{s.body}</p>
        <ul className="check-list">
          {(s.bullets || []).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <Link className="button" to={`/plan/?style=${style}`}>
          {s.cta}
        </Link>
        <p className="fineprint">{s.note}</p>
      </div>
    </>
  );
}

function splitTwoLines(text, fallback1, fallback2) {
  if (!text || typeof text !== 'string') return [fallback1, fallback2];
  if (!text.includes('\n')) return [text.trim(), ''];
  const [a, b] = text.split('\n');
  return [a.trim() || fallback1, (b || '').trim() || fallback2];
}

function sectionLines(section) {
  const eyebrow = section?.eyebrow || 'YOUR SAFARI. YOUR KIND OF STAY.';
  let titleLine1 = section?.titleLine1;
  let titleLine2 = section?.titleLine2;
  if (!titleLine1) [titleLine1, titleLine2] = splitTwoLines(section?.title, 'Comfort is personal.', 'Let’s find yours.');
  let introLine1 = section?.introLine1;
  let introLine2 = section?.introLine2;
  if (!introLine1) [introLine1, introLine2] = splitTwoLines(section?.intro, 'Midrange and comfort at our heart.', 'Luxury when you want a little more.');
  return { eyebrow, titleLine1, titleLine2, introLine1, introLine2 };
}

export default function ComfortSection({ section }) {
  const { levels: liveLevels, pages } = useCms();
  const intro = section || pages.comfort?.comfortSection || pages.home?.comfortSection || {};
  const { eyebrow, titleLine1, titleLine2, introLine1, introLine2 } = sectionLines(intro);
  const rawLevels = Object.keys(liveLevels || {}).length ? liveLevels : staticLevels;
  const levels = normalizeLevelsMap(rawLevels);
  const styleKeys = Object.keys(levels);
  const [activeStyle, setActiveStyle] = useState('Comfort');
  const [tabId, setTabId] = useState('tab-Comfort');

  const switchStyle = useCallback((style, id) => {
    setActiveStyle(style);
    setTabId(id);
  }, []);

  const onKeyDown = (e, index) => {
    let n;
    if (e.key === 'ArrowRight') n = (index + 1) % styleKeys.length;
    else if (e.key === 'ArrowLeft') n = (index - styleKeys.length + 1) % styleKeys.length;
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
    <section className="comfort-section" id="comfort">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2>
              {titleLine1}
              {titleLine2 ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : null}
            </h2>
          </div>
          <p>
            {introLine1}
            {introLine2 ? (
              <>
                <br />
                {introLine2}
              </>
            ) : null}
          </p>
        </div>
        <div className="style-tabs" role="tablist" aria-label="Safari comfort levels">
          {styleKeys.map((s, i) => (
            <button
              key={s}
              role="tab"
              type="button"
              id={`tab-${s}`}
              data-style={s}
              aria-selected={s === activeStyle}
              aria-controls="stay-panel"
              tabIndex={s === activeStyle ? 0 : -1}
              onClick={() => switchStyle(s, `tab-${s}`)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {s}
              <span>{levels[s]?.tabSubtitle || ''}</span>
            </button>
          ))}
        </div>
        <div className="stay-panel" id="stay-panel" role="tabpanel" aria-labelledby={tabId}>
          <StylePanel style={activeStyle} levels={levels} />
        </div>
      </div>
    </section>
  );
}
