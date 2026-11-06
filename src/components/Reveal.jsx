import { createElement, useEffect, useRef } from 'react';
import { observeReveal } from '../lib/reveal.js';

/**
 * variant: 'up' (default) | 'fade' | 'image'
 * stagger: animate the direct children one after another instead of the element itself
 * delay: extra delay in ms for single elements
 */
export default function Reveal({
  as = 'div',
  variant = 'up',
  stagger = false,
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => observeReveal(ref.current), []);

  const classes = [stagger ? 'reveal-stagger' : `reveal reveal--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return createElement(
    as,
    {
      ref,
      className: classes,
      style: delay && !stagger ? { ...style, animationDelay: `${delay}ms` } : style,
      ...rest,
    },
    children,
  );
}
