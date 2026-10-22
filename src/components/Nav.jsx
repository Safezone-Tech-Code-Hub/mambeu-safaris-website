import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { href, Img } from '../lib/utils.js';

export default function Nav() {
  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const safariToggleRef = useRef(null);
  const safariPanelRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const menu = menuRef.current;
    if (!nav || !menu) return;

    const closeMenus = () => {
      document.querySelectorAll('.nav-toggle').forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(b.getAttribute('aria-controls'));
        if (panel) panel.hidden = true;
      });
    };

    const onMenuClick = () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (!open) closeMenus();
    };

    const onDocClick = (e) => {
      if (!e.target.closest('.nav-group')) closeMenus();
    };

    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      const active = document.activeElement;
      const group = active?.closest('.nav-group');
      closeMenus();
      if (group) group.querySelector('button')?.focus();
      if (nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
        menu.focus();
      }
    };

    menu.addEventListener('click', onMenuClick);
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeyDown);

    const toggles = document.querySelectorAll('.nav-toggle');
    const toggleHandlers = [];
    toggles.forEach((b) => {
      const handler = () => {
        const open = b.getAttribute('aria-expanded') !== 'true';
        closeMenus();
        b.setAttribute('aria-expanded', String(open));
        const panel = document.getElementById(b.getAttribute('aria-controls'));
        if (panel) panel.hidden = !open;
      };
      b.addEventListener('click', handler);
      toggleHandlers.push({ b, handler });
    });

    return () => {
      menu.removeEventListener('click', onMenuClick);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
      toggleHandlers.forEach(({ b, handler }) => b.removeEventListener('click', handler));
    };
  }, [location.pathname]);

  useEffect(() => {
    document.querySelectorAll('nav a').forEach((a) => {
      const linkPath = a.getAttribute('href')?.split('?')[0];
      if (linkPath === location.pathname) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }, [location.pathname]);

  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-shell">
          <Link to="/" className="brand" aria-label="Mambeu Safaris home">
            <Img src="logo.webp" alt="Mambeu Tanzania Safaris" priority />
          </Link>
          <button
            ref={menuRef}
            className="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="main-nav"
          >
            Menu
          </button>
          <nav id="main-nav" ref={navRef} aria-label="Main navigation">
            <div className="nav-group">
              <button
                ref={safariToggleRef}
                className="nav-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="safari-menu"
              >
                Our safaris <span aria-hidden="true">⌄</span>
              </button>
              <div id="safari-menu" className="nav-panel" ref={safariPanelRef} hidden>
                <Link to={href('safaris')}>All safari journeys</Link>
                <Link to={href('safaris?style=Comfort')}>Comfort safaris</Link>
                <Link to={href('safaris?style=Midrange')}>Midrange safaris</Link>
                <Link to={href('safaris?style=Luxury')}>Luxury safaris</Link>
                <Link to={href('safaris?style=Camping')}>Camping adventures</Link>
                <Link to={href('comfort')}>Compare comfort levels</Link>
              </div>
            </div>
            <Link to={href('destinations')}>Destinations</Link>
            <Link to={href('experiences')}>Experiences</Link>
            <Link to={href('about')}>Our story</Link>
            <Link className="nav-plan" to={href('plan')}>
              Plan my safari
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
