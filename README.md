# Mambeu Safaris

Static Tanzania safari website for Mambeu Safaris — React + Vite, existing global CSS (no Tailwind), pre-rendered HTML for every route.

## Develop

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
```

This builds the client bundle and pre-renders all 38 routes plus `404.html` into `dist/`.

Preview the production build:

```bash
npm run preview
```

Or serve `dist/` with any static file server:

```bash
python3 -m http.server 8000 --directory dist
```

## Docker (VPS)

```bash
docker compose up --build
```

Site: http://localhost:8080

On a VPS, point a reverse proxy (or publish port 80) at the container. Runtime is nginx only — no Node process required after the image is built.

## Edit content

| Change | Where |
|--------|--------|
| Page layout / copy / interactions | `src/pages/`, `src/components/` |
| Styles | `src/style.css`, `src/fonts.css` |
| Safari itineraries & prices | `src/data/tours.json` |
| Images & fonts | `public/assets/` |

## Enquiries

The planner prepares a WhatsApp or email message for the visitor to review and send. It is not a booking backend or direct mail server.

Contact: info@mambeusafaris.com · +255 796 086 799
