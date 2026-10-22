# Mambeu Safaris — Complete Website Project

This archive contains the latest redesigned website, including 38 pages, all 22 safari journeys, source code, local images and fonts, and the build script.

## View the website locally

1. Extract the ZIP.
2. Open a terminal in the `Mambeu_Safaris` folder.
3. Run: `python3 -m http.server 8000 --directory dist`
4. Open http://localhost:8000 in your browser.

Use a local web server rather than opening the HTML files directly: navigation and assets use paths starting at the website root.

## Edit and rebuild

- Install Node.js 22 or later.
- Edit `src/app.js` for page content and interactions.
- Edit `src/style.css` for layout and styling.
- Edit `src/tours.json` for safari itineraries and published group-size prices.
- Images and fonts are in `dist/assets`.
- Run `node scripts/build.mjs` from the project folder to rebuild the website.
- No npm packages are needed to run the build.

## Hosting

Upload the contents of `dist` to a static website host, preserving all folders. Each route already includes an `index.html` file. `dist/404.html` is the custom not-found page.

The `.openai/hosting.json` file preserves the identity of this project's existing ChatGPT Site. It is not needed for ordinary static hosting.

## Enquiries

The planner prepares a message for the visitor to review and send through WhatsApp or their email application. It is not a direct email-delivery service or booking backend.

See `README.md` for content and validation notes.
