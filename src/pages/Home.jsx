import BeyondSafari from '../components/BeyondSafari.jsx';
import Destinations from '../components/Destinations.jsx';
import Faq from '../components/Faq.jsx';
import FinalCta from '../components/FinalCta.jsx';
import GoodPeople from '../components/GoodPeople.jsx';
import Hero from '../components/Hero.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import JourneyCollection from '../components/JourneyCollection.jsx';
import MambeuIntro from '../components/MambeuIntro.jsx';

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <MambeuIntro />

      <JourneyCollection />

      <HowItWorks />

      <Destinations />

      <BeyondSafari />

      <GoodPeople />

      <Faq />

      <FinalCta />
    </main>
  );
}
