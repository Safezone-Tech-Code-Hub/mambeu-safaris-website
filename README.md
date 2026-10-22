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

Same layout as **elevated-tanzania-safaris**: two separate compose projects, **`network_mode: host`**, fixed ports on the server. Nginx Proxy Manager forwards to the host IP + port (not Docker bridge names).

| Stack | Directory | Container | Port | NPM forward |
|-------|-----------|-----------|------|-------------|
| Site | repo root | `mambeu-web` | **8080** | `http://209.74.72.96:8080` |
| PocketBase | `pocketbase/` | `mambeu-pocketbase` | **9112** | `http://209.74.72.96:9112` |

```bash
# Site (builds static files into the image)
docker compose up -d --build

# Dashboard / backend (pulls ghcr.io/muchobien/pocketbase — no custom build)
cd pocketbase && docker compose up -d
```

Site: http://127.0.0.1:8080 · PocketBase admin: http://127.0.0.1:9112/_/

PocketBase data lives in `pocketbase/pb_data/`. Staff use the **Vue dashboard** (`dashboard/`, port **8081**, NPM `manage-mambeu.schoolhub.space`). After `npm run seed:pb`, sign in with the bootstrap staff account.

```bash
docker compose -f docker-compose.manage.yml up -d --build
npm run seed:pb   # once
```

Builds pull published content from PocketBase via `scripts/sync-content-from-pb.mjs`. Port **8906** is the old `mambeu-safaris-backend`.

### Production (NPM + subdomains)

| Public URL | NPM forward (same pattern as your other hosts) |
|------------|-----------------------------------------------|
| https://new-mambeu.schoolhub.space | `http://209.74.72.96:8080` |
| https://dashboard-mambeu.schoolhub.space | `http://209.74.72.96:9112` (enable **Websockets** in NPM) |

Step-by-step: [docs/nginx-proxy-manager.md](docs/nginx-proxy-manager.md).

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
