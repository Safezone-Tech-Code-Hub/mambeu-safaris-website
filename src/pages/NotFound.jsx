import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { href } from '../lib/utils.js';

export default function NotFound() {
  return (
    <main id="main">
      <PageHead
        label="A DIFFERENT TRAIL"
        title="Let’s find your way."
        text="This page isn’t here. Explore our safari collection or talk with the team."
      />
      <section className="wrap">
        <Link to={href('safaris')} className="button">
          Explore our safaris
        </Link>
      </section>
    </main>
  );
}
