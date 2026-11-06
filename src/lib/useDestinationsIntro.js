import { useEffect, useRef, useState } from 'react';

const KEY = 'mambeu-destinations-intro';
export const STAGGER = 110; // ms between panels
export const RISE = 700; // ms for one panel to land
export const OPEN = 800; // ms for the panel width change; also set in CSS via --dest-open
const BEAT = 300; // pause before panel 01 opens
const DECODE_TIMEOUT = 1500; // never wait longer than this for images

function imagesReady(root) {
  const imgs = Array.from(root.querySelectorAll('img'));
  const decoded = Promise.all(
    imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
  );
  const timeout = new Promise((resolve) => setTimeout(resolve, DECODE_TIMEOUT));
  return Promise.race([decoded, timeout]);
}

function initialPhase() {
  if (typeof window === 'undefined') return 'done';
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done';
    if (sessionStorage.getItem(KEY) === '1') return 'done';
  } catch {
    /* private mode */
  }
  if (!('IntersectionObserver' in window)) return 'done';
  return 'idle';
}

export function useDestinationsIntro(count) {
  const ref = useRef(null);
  const [phase, setPhase] = useState(initialPhase); // idle | rising | opening | done

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* private mode */
    }
    if (reduced || seen || !('IntersectionObserver' in window)) {
      setPhase('done');
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    let cancelled = false;
    const timers = [];

    const run = async () => {
      await imagesReady(el);
      if (cancelled) return;
      // two frames so the decoded images are painted before anything moves
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (cancelled) return;

      setPhase('rising');
      const riseEnd = (count - 1) * STAGGER + RISE;
      timers.push(setTimeout(() => setPhase('opening'), riseEnd + BEAT));
      timers.push(
        setTimeout(() => {
          setPhase('done');
          try {
            sessionStorage.setItem(KEY, '1');
          } catch {
            /* private mode */
          }
        }, riseEnd + BEAT + OPEN)
      );
    };

    // Fire when the top of the list reaches the lower quarter of the screen.
    // (A percentage threshold can never fire on phones, where the list is taller than the screen.)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { rootMargin: '0px 0px -25% 0px', threshold: 0 }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [count]);

  const vars = {
    '--dest-stagger': `${STAGGER}ms`,
    '--dest-rise': `${RISE}ms`,
    '--dest-open': `${OPEN}ms`,
  };
  return { ref, phase, vars };
}
