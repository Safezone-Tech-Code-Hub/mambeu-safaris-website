import { useEffect, useRef, useState } from 'react';

const EXIT_MS = 320;

export default function SidePanel({ open, onClose, labelledBy, children }) {
  const ref = useRef(null);
  const returnTo = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return undefined;

    if (open) {
      setClosing(false);
      if (!d.open) {
        returnTo.current = document.activeElement;
        d.showModal();
        document.documentElement.classList.add('is-panel-open');
      }
      return undefined;
    }

    if (d.open) {
      const finish = () => {
        d.close();
        setClosing(false);
        document.documentElement.classList.remove('is-panel-open');
        const el = returnTo.current;
        const slug = el?.getAttribute?.('data-xp-open');
        const target = (slug && document.querySelector(`[data-xp-open="${slug}"]`)) || el;
        target?.focus?.();
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finish();
        return undefined;
      }
      setClosing(true);
      const t = window.setTimeout(finish, EXIT_MS);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('is-panel-open'), []);

  return (
    <dialog
      ref={ref}
      className={`side-panel${closing ? ' is-closing' : ''}`}
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="side-panel__inner">{children}</div>
    </dialog>
  );
}
