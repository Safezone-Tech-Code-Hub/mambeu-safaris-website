import home from './home.js';
import about from './about.js';
import plan from './plan.js';
import safaris from './safaris.js';
import kilimanjaro from './kilimanjaro.js';
import comfort from './comfort.js';
import destinations from './destinations.js';
import experiences from './experiences.js';
import travelGuide from './travel-guide.js';
import zanzibar from './zanzibar.js';
import placeDetail from './place-detail.js';
import journeyDetail from './journey-detail.js';
import notFound from './not-found.js';

/** Editor tabs per page_content pageKey. Each tab: { label, hint?, fields, panel? }. */
export const pageEditorTabs = {
  home: home,
  about: about,
  plan: plan,
  safaris: safaris,
  kilimanjaro: kilimanjaro,
  comfort: comfort,
  destinations: destinations,
  experiences: experiences,
  travel_guide: travelGuide,
  zanzibar: zanzibar,
  place_detail: placeDetail,
  journey_detail: journeyDetail,
  not_found: notFound,
};

export { getNested, setNested } from './fields.js';
