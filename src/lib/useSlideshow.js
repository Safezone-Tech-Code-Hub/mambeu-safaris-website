import { useEffect, useState } from 'react';

export function useSlideshow(count, intervalMs = 6500) {
  const [state, setState] = useState({ index: 0, prev: null });
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const running = count > 1 && !paused && !reduced && !hidden;

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      setState((s) => ({ index: (s.index + 1) % count, prev: s.index }));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [running, count, intervalMs]);

  return { index: state.index, prev: state.prev, paused, setPaused, reduced };
}
