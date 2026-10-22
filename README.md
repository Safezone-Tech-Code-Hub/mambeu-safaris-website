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

Two containers: the static site (`mambeu-web`) and PocketBase (`mambeu-pocketbase`). Each listens on a fixed internal port and publishes a separate host port. Image builds use the host network so downloads resolve on this VPS. Runtime stays on bridge network `proxy-net` so Nginx Proxy Manager can reach the containers.

| Service | Container | Internal port | Host port | NPM upstream |
|---------|-----------|---------------|-----------|--------------|
| Site (nginx) | `mambeu-web` | 80 | 8080 | `http://mambeu-web:80` |
| PocketBase | `mambeu-pocketbase` | 8090 | 9112 | `http://mambeu-pocketbase:8090` |

8080 is free on the VPS. 8090 is `salestrack-mailer`, and 8906 is the old `mambeu-safaris-backend`, so this stack does not use either. PocketBase still listens on 8090 inside the container; only the host port is 9112.

```bash
docker compose up -d --build
```

Site: http://localhost:8080 · PocketBase admin: http://localhost:9112/_/

`proxy-net` must already exist (`docker network create proxy-net` once, if this host does not have it yet). PocketBase data is the `pocketbase-data` volume. Create the first superuser in the admin UI. The site is still static nginx — no Node process after the image is built.

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
