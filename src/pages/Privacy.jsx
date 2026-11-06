import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { useCms } from '../CmsProvider.jsx';
import { siteChrome } from '../lib/cms.js';
import { href } from '../lib/utils.js';

export default function Privacy() {
  const { pages } = useCms();
  const c = siteChrome(pages);

  return (
    <main id="main">
      <PageHead
        label="YOUR INFORMATION"
        title="Privacy"
        text="How Mambeu Safaris handles the details you share when you browse this site or plan a journey with us."
      />
      <section className="wrap split-story">
        <div>
          <span className="eyebrow">SIMPLE AND DIRECT</span>
          <h2>
            We only ask for
            <br />
            what we need.
          </h2>
        </div>
        <div>
          <p className="lead">
            When you send an enquiry, we collect the details you provide — such as your name, email,
            phone number, travel dates and preferences — so our Arusha team can reply and shape a
            quotation.
          </p>
          <p>
            We use that information to respond to you, plan your journey and keep records of bookings
            and conversations. We do not sell your personal information. We may share necessary
            details with trusted partners (for example lodges, parks or transfer providers) only to
            deliver the services you ask for.
          </p>
          <p>
            Questions about your data? Email{' '}
            <a href={`mailto:${c.email}`}>{c.email}</a> or call {c.phone}.
          </p>
          <Link to={href('plan')} className="text-link">
            Plan your safari
          </Link>
        </div>
      </section>
    </main>
  );
}
