import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import JourneyCard from './JourneyCard.jsx';
import { INTERESTS, LENGTHS } from '../lib/finder-options.js';
import { planHref } from '../lib/plan-link.js';
import { href } from '../lib/utils.js';
import { tiers } from '../lib/journeys.js';

const PAGE = 9;

const SORTS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'shortest', label: 'Shortest first' },
  { value: 'longest', label: 'Longest first' },
];
const PARKS = [
  { value: 'all', label: 'Any park' },
  { value: 'Serengeti', label: 'Serengeti' },
  { value: 'Ngorongoro', label: 'Ngorongoro' },
  { value: 'Tarangire', label: 'Tarangire' },
  { value: 'Manyara', label: 'Lake Manyara' },
  { value: 'Ndutu', label: 'Ndutu' },
  { value: 'Natron', label: 'Lake Natron' },
  { value: 'Zanzibar', label: 'Zanzibar' },
];

function parkFromParam(raw) {
  const q = String(raw ?? '').trim();
  if (!q) return 'all';
  const lower = q.toLowerCase();
  if (lower === 'calving') return 'Ndutu';
  const known = PARKS.find((p) => p.value.toLowerCase() === lower);
  return known ? known.value : q;
}

const matchesLength = (d, l) =>
  l === 'any' ||
  (l === '3-5' && d <= 5) ||
  (l === '6-8' && d >= 6 && d <= 8) ||
  (l === '9-plus' && d >= 9);

function Select({ id, label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(value);
  const rootRef = useRef(null);
  const listId = `${id}-list`;
  const labelId = `${id}-label`;
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (open) setActive(value);
  }, [open, value]);

  useEffect(() => {
    if (!open) return undefined;
    window.dispatchEvent(new CustomEvent('safaris-select-open', { detail: id }));
    const onOther = (e) => {
      if (e.detail !== id) setOpen(false);
    };
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('safaris-select-open', onOther);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('safaris-select-open', onOther);
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, id]);

  const pick = (next) => {
    onChange(next);
    setOpen(false);
  };

  const move = (dir) => {
    const i = Math.max(0, options.findIndex((o) => o.value === active));
    const next = options[Math.min(options.length - 1, Math.max(0, i + dir))];
    if (next) setActive(next.value);
  };

  const onTriggerKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      else move(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) pick(active);
      else setOpen(true);
    } else if (e.key === 'Home' && open) {
      e.preventDefault();
      setActive(options[0].value);
    } else if (e.key === 'End' && open) {
      e.preventDefault();
      setActive(options[options.length - 1].value);
    }
  };

  return (
    <div className={open ? 'safaris-field is-open' : 'safaris-field'} ref={rootRef}>
      <span className="safaris-field__label" id={labelId}>
        {label}
      </span>
      <div className="safaris-field__wrap">
        <button
          type="button"
          id={id}
          className="safaris-field__control safaris-select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={`${labelId} ${id}`}
          aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onTriggerKey}
        >
          <span className="safaris-select__value">{selected.label}</span>
        </button>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="safaris-field__chevron"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
        <ul
          id={listId}
          className="safaris-select__menu"
          role="listbox"
          aria-labelledby={labelId}
          hidden={!open}
        >
          {options.map((o) => {
            const isSelected = o.value === value;
            const isActive = o.value === active;
            return (
              <li key={o.value} role="none">
                <button
                  type="button"
                  id={`${id}-opt-${o.value}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={isSelected}
                  className={`safaris-select__option${isSelected ? ' is-selected' : ''}${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(o.value)}
                  onClick={() => pick(o.value)}
                >
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function SafarisBrowser({ journeys }) {
  const [params, setSearchParams] = useSearchParams();

  const style = (params.get('style') ?? 'all').toLowerCase();
  const interest = params.get('interest') ?? 'all';
  const length = params.get('length') ?? 'any';
  const sort = params.get('sort') ?? 'recommended';
  const park = parkFromParam(params.get('q'));

  const [shown, setShown] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setShown(PAGE);
  }, [style, interest, length, sort, park]);

  const paramString = params.toString();

  const setParam = (key, value, def) => {
    const next = new URLSearchParams(paramString);
    if (!value || value === def) next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
    setShown(PAGE);
  };

  const parkOptions = useMemo(() => {
    if (park !== 'all' && !PARKS.some((p) => p.value === park)) {
      return [...PARKS, { value: park, label: park }];
    }
    return PARKS;
  }, [park]);

  const results = useMemo(() => {
    const needle = park === 'all' ? '' : park.toLowerCase();
    let list = journeys.filter((j) => {
      if (style !== 'all' && String(j.tier).toLowerCase() !== style) return false;
      if (interest !== 'all' && !(j.tags ?? ['wildlife']).includes(interest)) return false;
      if (!matchesLength(j.days, length)) return false;
      if (needle && ![j.title, j.description, ...j.route].join(' ').toLowerCase().includes(needle)) {
        return false;
      }
      return true;
    });
    if (sort === 'shortest') list = [...list].sort((a, b) => a.days - b.days);
    if (sort === 'longest') list = [...list].sort((a, b) => b.days - a.days);
    return list;
  }, [journeys, style, interest, length, sort, park]);

  const chips = [
    style !== 'all' && {
      key: 'style',
      label: style.charAt(0).toUpperCase() + style.slice(1),
      clear: () => setParam('style', '', 'all'),
    },
    interest !== 'all' && {
      key: 'interest',
      label: INTERESTS.find((o) => o.value === interest)?.label ?? interest,
      clear: () => setParam('interest', '', 'all'),
    },
    length !== 'any' && {
      key: 'length',
      label: LENGTHS.find((o) => o.value === length)?.label ?? length,
      clear: () => setParam('length', '', 'any'),
    },
    park !== 'all' && {
      key: 'q',
      label: parkOptions.find((o) => o.value === park)?.label ?? park,
      clear: () => setParam('q', '', 'all'),
    },
  ].filter(Boolean);

  const clearAll = () => {
    setShown(PAGE);
    setSearchParams({}, { replace: true });
  };

  const count = (t) =>
    t === 'all' ? journeys.length : journeys.filter((j) => String(j.tier).toLowerCase() === t).length;

  const tabValues = ['all', ...tiers.map((t) => t.toLowerCase())];

  return (
    <>
    <section className="safaris-browser" aria-label="Safari collection">
      <div className="safaris-browser__inner">
        <div className="safaris-browser__overlap">
        <div className="safaris-tabs" role="group" aria-label="Filter by safari style">
          {tabValues.map((t) => {
            const active = style === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setParam('style', t, 'all')}
                className={active ? 'safaris-tab safaris-tab--active' : 'safaris-tab'}
              >
                {t === 'all' ? 'All' : t}
                <span className={active ? 'safaris-tab__count safaris-tab__count--active' : 'safaris-tab__count'}>
                  {count(t)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="safaris-bar">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="safari-filters"
            onClick={() => setFiltersOpen((o) => !o)}
            className="safaris-bar__toggle"
          >
            <span>
              Filters
              {chips.length > 0 ? ` (${chips.length})` : ''}
            </span>
            <span aria-hidden="true">{filtersOpen ? '−' : '+'}</span>
          </button>

          <div
            id="safari-filters"
            className={filtersOpen ? 'safaris-filters is-open' : 'safaris-filters'}
          >
            <Select
              id="safari-park"
              label="Park"
              value={park}
              options={parkOptions}
              onChange={(v) => setParam('q', v, 'all')}
            />
            <Select
              id="safari-interest"
              label="Interest"
              value={interest}
              options={INTERESTS}
              onChange={(v) => setParam('interest', v, 'all')}
            />
            <Select
              id="safari-length"
              label="Length"
              value={length}
              options={LENGTHS}
              onChange={(v) => setParam('length', v, 'any')}
            />
            <Select
              id="safari-sort"
              label="Sort"
              value={sort}
              options={SORTS}
              onChange={(v) => setParam('sort', v, 'recommended')}
            />
          </div>
        </div>
        </div>
      </div>
    </section>

    <section className="safaris-results" aria-label="Results">
      <div className="safaris-results__inner">
        <div className="safaris-status">
          <p className="safaris-status__count" aria-live="polite">
            Showing {Math.min(shown, results.length)} of {results.length} journeys
          </p>
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.clear}
              aria-label={`Remove filter: ${c.label}`}
              className="safaris-chip"
            >
              {c.label}
              <span aria-hidden="true">×</span>
            </button>
          ))}
          {chips.length > 0 ? (
            <button type="button" onClick={clearAll} className="safaris-clear">
              Clear all
            </button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <>
            <ul className="safaris-grid">
              {results.slice(0, shown).map((j, i) => (
                <JourneyCard key={j.id} journey={j} priority={i < 3} />
              ))}
            </ul>
            {results.length > shown ? (
              <div className="safaris-more">
                <button type="button" onClick={() => setShown((s) => s + PAGE)} className="safaris-more__btn">
                  Show more journeys
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="safaris-empty">
            <p className="safaris-empty__title">No journeys match those filters.</p>
            <p className="safaris-empty__text">
              Try removing a filter, or tell us what you have in mind and we will build it.
            </p>
            <div className="safaris-empty__actions">
              <button type="button" onClick={clearAll} className="safaris-more__btn">
                Clear all
              </button>
              <Link to={planHref()} className="safaris-plan">
                Plan my safari
              </Link>
            </div>
          </div>
        )}

        <div className="safaris-close">
          <div>
            <p className="safaris-close__title">Nothing quite right?</p>
            <p className="safaris-close__text">
              Tell us what you have in mind and we will build the route around it.
            </p>
          </div>
          <Link to={planHref()} className="safaris-plan">
            Plan my safari
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}
