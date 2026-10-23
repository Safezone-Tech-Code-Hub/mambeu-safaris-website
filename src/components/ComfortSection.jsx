import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCms } from '../CmsProvider.jsx';
import { levels as staticLevels } from '../data/levels.js';
import { Img } from '../lib/utils.js';

function imageNote(style) {
  if (style === 'Comfort') return 'A little space to take it all in';
  if (style === 'Luxury') return 'Special experiences, by arrangement';
  return 'Time to unwind between game drives';
}

function tabSubtitle(style) {
  if (style === 'Comfort') return 'The perfect balance';
  if (style === 'Midrange') return 'Thoughtful value';
  return 'Elevated experiences';
}

function StylePanel({ style = 'Comfort', levels }) {
  const s = levels[style];
  if (!s) return null;
  return (
    <>
      <div className="stay-photo">
        <Img src={s.image} alt={s.alt} />
        <span className="image-note">{imageNote(style)}</span>
      </div>
      <div className="stay-copy">
        <span className="eyebrow">
          {s.number} / {style.toUpperCase()} SAFARIS
        </span>
        <h3 dangerouslySetInnerHTML={{ __html: s.title }} />
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

export default function ComfortSection() {
  const { levels: liveLevels } = useCms();
  const levels = Object.keys(liveLevels || {}).length ? liveLevels : staticLevels;
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
    <section className="comfort-section" id="comfort">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">YOUR SAFARI. YOUR KIND OF STAY.</span>
            <h2>
              Comfort is personal.
              <br />
              Let’s find yours.
            </h2>
          </div>
          <p>
            Midrange and comfort at our heart.
            <br />
            Luxury when you want a little more.
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
              <span>{tabSubtitle(s)}</span>
            </button>
          ))}
        </div>
        <div
          className="stay-panel"
          id="stay-panel"
          role="tabpanel"
          aria-labelledby={tabId}
        >
          <StylePanel style={activeStyle} levels={levels} />
        </div>
      </div>
    </section>
  );
}
