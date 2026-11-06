import { mergeAboutContent } from './aboutDefaults.js';
import { mergeComfortContent } from './comfortDefaults.js';
import { mergeDestinationsContent } from './destinationsDefaults.js';
import { mergeExperiencesContent } from './experiencesDefaults.js';
import { mergeHomeContent } from './homeDefaults.js';
import { mergeJourneyDetailContent } from './journeyDefaults.js';
import { mergeNotFoundContent } from './notFoundDefaults.js';
import { mergePlaceDetailContent } from './placeDefaults.js';
import { mergePlanContent } from './planDefaults.js';
import { mergeSafarisContent } from './safarisDefaults.js';
import { mergeThematicContent } from './thematicDefaults.js';
import { mergeTravelGuideContent } from './travelGuideDefaults.js';

/** Merge CMS defaults into all page_content payloads (client and static builds). */
export function mergePageCatalog(pages) {
  const p = pages && typeof pages === 'object' ? { ...pages } : {};
  p.home = mergeHomeContent(p.home);
  p.about = mergeAboutContent(p.about);
  p.comfort = mergeComfortContent(p.comfort);
  p.destinations = mergeDestinationsContent(p.destinations);
  p.experiences = mergeExperiencesContent(p.experiences);
  p.travel_guide = mergeTravelGuideContent(p.travel_guide);
  p.plan = mergePlanContent(p.plan);
  p.safaris = mergeSafarisContent(p.safaris);
  p.kilimanjaro = mergeThematicContent('kilimanjaro', p.kilimanjaro);
  p.zanzibar = mergeThematicContent('zanzibar', p.zanzibar);
  p.place_detail = mergePlaceDetailContent(p.place_detail);
  p.journey_detail = mergeJourneyDetailContent(p.journey_detail);
  p.not_found = mergeNotFoundContent(p.not_found);
  return p;
}
