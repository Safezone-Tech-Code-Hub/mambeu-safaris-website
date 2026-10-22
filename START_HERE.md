# Mambeu Safaris — Complete Website Project

React + Vite static site with the original CSS look, 38 pre-rendered pages, 22 safari journeys, local images and fonts, and Docker deploy support.

## View locally (after build)

1. Open a terminal in the `Mambeu_Safaris` folder.
2. Run: `npm install` then `npm run build`
3. Run: `python3 -m http.server 8000 --directory dist`
4. Open http://localhost:8000

For day-to-day editing use `npm run dev` instead.

## Edit and rebuild

- Node.js 22 or later.
- Page content: `src/pages/` and `src/components/`
- Styles: `src/style.css` (and `src/fonts.css`)
- Tours: `src/data/tours.json`
- Images and fonts: `public/assets/`
- Rebuild: `npm run build`

## Docker

```bash
docker compose up --build
```

Then open http://localhost:8080. Upload/deploy the image to your VPS the same way.

## Hosting without Docker

Upload the contents of `dist/` to any static host, preserving folders. Each route includes an `index.html`. `dist/404.html` is the custom not-found page.

## Enquiries

The planner prepares a message for WhatsApp or the visitor’s email app. It is not a direct booking backend.

See `README.md` for more detail.
