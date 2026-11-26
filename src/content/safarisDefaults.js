/**
 * Safari collection page content (schema 2). Defaults match what /safaris/ shows; the
 * dashboard editor (dashboard/src/lib/pageEditor/safaris.js) edits these exact paths.
 * `cards` holds the labels on every journey card across the site.
 */
import { mergePage } from './schema.js';

export const safarisPageDefaults = {
  head: {
    label: 'The Mambeu collection',
    titleLine1: 'Find your',
    titleLine2: 'kind of wild.',
    text: '{count} starting points. Explore our existing journeys, then tailor your route, dates and stays.',
    photo: '/images/safaris-header.jpg',
  },
  browser: {
    allTab: 'All',
    filtersLabel: 'Filters',
    parkLabel: 'Park',
    anyPark: 'Any park',
    interestLabel: 'Interest',
    lengthLabel: 'Length',
    sortLabel: 'Sort',
    sortRecommended: 'Recommended',
    sortShortest: 'Shortest first',
    sortLongest: 'Longest first',
    countText: 'Showing {shown} of {total} journeys',
    clearAll: 'Clear all',
    showMore: 'Show more journeys',
    emptyTitle: 'No journeys match those filters.',
    emptyText: 'Try removing a filter, or tell us what you have in mind and we will build it.',
    closeTitle: 'Nothing quite right?',
    closeText: 'Tell us what you have in mind and we will build the route around it.',
    planButton: 'Plan my safari',
    planLink: 'plan',
  },
  cards: {
    durationLabel: 'Duration',
    dayUnit: 'day',
    daysUnit: 'days',
    pricingLabel: 'Pricing',
    pricingByGroup: 'By group size',
    pricingTailored: 'Tailored quotation',
    viewMore: 'View more',
  },
};

/** Nothing saved by the old dashboard reached the redesigned page, so nothing carries over. */
function migrateV1() {
  return {};
}

export function mergeSafarisContent(cms) {
  return mergePage(safarisPageDefaults, cms, migrateV1);
}

/** Replace {name} tokens, e.g. fill('{count} journeys', { count: 3 }). */
export function fill(template, values) {
  return String(template ?? '').replace(/\{(\w+)\}/g, (m, key) =>
    values[key] !== undefined ? String(values[key]) : m,
  );
}
