import { useEffect, useLayoutEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Nav from './components/Nav.jsx';
import { getPageMeta } from './meta.js';
import About from './pages/About.jsx';
import Comfort from './pages/Comfort.jsx';
import Destinations from './pages/Destinations.jsx';
import Experiences from './pages/Experiences.jsx';
import Home from './pages/Home.jsx';
import JourneyDetail from './pages/JourneyDetail.jsx';
import NotFound from './pages/NotFound.jsx';
import Place from './pages/Place.jsx';
import Favourites from './pages/Favourites.jsx';
import Plan from './pages/Plan.jsx';
import Privacy from './pages/Privacy.jsx';
import Safaris from './pages/Safaris.jsx';
import Thematic from './pages/Thematic.jsx';
import TravelGuide from './pages/TravelGuide.jsx';

function DocumentMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description } = getPageMeta(pathname);
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    html.style.scrollBehavior = previous;
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <div id="top">
      <DocumentMeta />
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/safaris/" element={<Safaris />} />
        <Route path="/about/" element={<About />} />
        <Route path="/comfort/" element={<Comfort />} />
        <Route path="/destinations/" element={<Destinations />} />
        <Route path="/destinations/:slug/" element={<Place />} />
        <Route path="/kilimanjaro/" element={<Thematic type="kilimanjaro" />} />
        <Route path="/zanzibar/" element={<Thematic type="zanzibar" />} />
        <Route path="/experiences/" element={<Experiences />} />
        <Route path="/travel-guide/" element={<TravelGuide />} />
        <Route path="/plan/" element={<Plan />} />
        <Route path="/favourites/" element={<Favourites />} />
        <Route path="/privacy/" element={<Privacy />} />
        <Route path="/:tourPath" element={<JourneyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
