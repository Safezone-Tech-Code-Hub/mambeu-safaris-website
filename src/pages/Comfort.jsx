import { Link } from 'react-router-dom';
import ComfortSection from '../components/ComfortSection.jsx';
import PageHead from '../components/PageHead.jsx';
import { href } from '../lib/utils.js';

export default function Comfort() {
  return (
    <main id="main">
      <PageHead
        label="YOUR KIND OF STAY"
        title={'Adventure outside.<br><span class="accent">Comfort within.</span>'}
        text="Midrange and comfort are at the heart of our approach. Luxury and camping remain part of the possibilities. Choose how you want your journey to feel."
      />
      <ComfortSection />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">A THOUGHTFUL BALANCE</span>
          <h2>
            Spend on the things
            <br />
            you’ll remember.
          </h2>
        </div>
        <div>
          <p className="lead">
            Your budget influences accommodation, length of stay and optional experiences. We’ll help you
            decide where extra comfort makes a difference.
          </p>
          <p>
            The published journeys are starting points. When you enquire, we’ll suggest specific lodges
            and tented camps for your dates and confirm what is included before you book.
          </p>
          <Link to={href('safaris?style=Camping')} className="text-link">
            Explore our camping journeys
          </Link>
        </div>
      </section>
    </main>
  );
}
