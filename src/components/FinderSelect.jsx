import { useEffect, useId, useRef, useState } from 'react';

export default function FinderSelect({ id, name, options, defaultValue = '' }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const rootRef = useRef(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;
    window.dispatchEvent(new CustomEvent('finder-select-open', { detail: id }));
    const onOther = (e) => {
      if (e.detail !== id) setOpen(false);
    };
    const onDoc = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('finder-select-open', onOther);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('finder-select-open', onOther);
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, id]);

  const pick = (next) => {
    setValue(next);
    setOpen(false);
  };

  return (
    <div
      className={`finder-select finder-select-custom${open ? ' is-open' : ''}`}
      ref={rootRef}
    >
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        id={id}
        className="finder-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="finder-select-value">{selected.label}</span>
      </button>
      <ul id={listId} className="finder-select-menu" role="listbox" aria-labelledby={id}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <li key={opt.value || '__any'} role="none">
              <button
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`finder-select-option${isSelected ? ' is-selected' : ''}`}
                onClick={() => pick(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected ? (
                  <svg className="finder-select-check" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
                    <path
                      d="M3.5 8.5 6.5 11.5 12.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
