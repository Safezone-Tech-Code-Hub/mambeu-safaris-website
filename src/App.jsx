import { useEffect } from 'react';
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
import Plan from './pages/Plan.jsx';
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

function Layout() {
  return (
    <>
      <DocumentMeta />
      <Nav />
      <Outlet />
      <Footer />
    </>
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
        <Route path="/:tourPath" element={<JourneyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
