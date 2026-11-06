let observer;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Reveal when entering the viewport, or immediately if already scrolled past.
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' },
  );
  return observer;
}

export function observeReveal(el) {
  if (!el) return undefined;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    el.classList.add('is-visible');
    return undefined;
  }
  const io = getObserver();
  io.observe(el);
  return () => io.unobserve(el);
}
