# Mambeu Safaris

A complete static, pre-rendered website focused on midrange and comfort Tanzania safaris, with luxury and camping journeys retained.

Run `node scripts/build.mjs` to generate all 38 routes from `src/app.js`, `src/tours.json`, and local styles. The deployed pages include their full content before JavaScript runs. Runtime JavaScript binds menus, filters, comfort tabs, itinerary controls, price selection, and enquiry preparation. It makes no catalogue API request.

Content was carried forward from Mambeu's live website and its public tour catalogue. Original group-size prices are retained; changing accommodation requires a tailored quotation. Planner enquiries are explicitly prepared for visitors to review and send through WhatsApp or their email app. No direct delivery or booking confirmation is claimed.

## Verification

- All 38 pages render with unique IDs, a main heading, valid internal links and local images.
- DOM integration checks cover desktop dropdowns, mobile menu toggles, Escape handling, featured journey tabs, keyboard comfort tabs, search, style/duration filters, sorting, empty-result recovery, all published group-size prices, all 22 itinerary pages and enquiry prefill/encoding.
- Images and fonts are local; the catalogue is available without a loading request.
- The available environment did not provide the required control-browser skill, so visual browser QA was unavailable. Responsive layouts are implemented in the stylesheet; no claim of real-browser visual testing is made.
