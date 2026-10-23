# Nginx Proxy Manager — Mambeu (schoolhub.space)

Production host: **209.74.72.96**. Webuzo subdomains are DNS only; NPM forwards to host ports (Elevated-style **`network_mode: host`** stacks).

## 1. Start containers on the VPS

**Site** — from the repo root:

```bash
cd ~/production/applications/mambeu-safaris-website
docker compose up -d --build
```

**Dashboard (PocketBase)** — separate compose (same pattern as `elevated-tanzania-safaris-pb`):

```bash
cd ~/production/applications/mambeu-safaris-website/pocketbase
docker compose up -d
```

Optional: copy the `pocketbase/` folder to `~/sandbox/mambeu-pocketbase` and run compose there so data stays outside the git tree.

Verify:

```bash
docker ps --filter name=mambeu
curl -sI http://127.0.0.1:8080 | head -1
curl -sI http://127.0.0.1:9112/_/ | head -1
```

| Container | Host port | Role |
|-----------|-----------|------|
| `mambeu-web` | 8080 | Public static site |
| `mambeu-pocketbase` | 9112 | PocketBase API + superuser UI (`/_/`) |
| `mambeu-manage` | **8082** | Vue staff dashboard (host network, same pattern as Elevated) |

**Staff dashboard** (no Docker network — host mode, like Elevated on port 3233):

```bash
cd ~/production/applications/mambeu-safaris-website
docker compose -f docker-compose.manage.yml up -d --build
```

**Seed PocketBase (once, from repo root after superuser exists):**

```bash
cp pocketbase/.env.example pocketbase/.env   # fill admin credentials
npm run seed:pb
```

## 2. Add proxy hosts in NPM

Forward Hostname / IP = **209.74.72.96**, scheme **http**, SSL = Let's Encrypt, Access = Public.

| Domain | Forward port | Notes |
|--------|--------------|--------|
| `new-mambeu.schoolhub.space` | **8080** | Static site |
| `dashboard-mambeu.schoolhub.space` | **9112** | PocketBase — enable **Websockets** |
| `manage-mambeu.schoolhub.space` | **8082** | Vue staff dashboard |

In PocketBase **Settings → Application**, add CORS origin `https://new-mambeu.schoolhub.space` so the plan form can save enquiries.

## 3. PocketBase after first deploy

1. Open `https://dashboard-mambeu.schoolhub.space/_/` and create the superuser (or set `PB_ADMIN_EMAIL` / `PB_ADMIN_PASSWORD` in `pocketbase/.env` before `docker compose up`).
2. **Settings → Application** → **Application URL** = `https://dashboard-mambeu.schoolhub.space`.

## 4. Smoke test

- `https://new-mambeu.schoolhub.space/` — home page and `/assets/`.
- `https://dashboard-mambeu.schoolhub.space/_/` — PocketBase installer or login.

## 5. Old stack

`mambeu-safaris-backend` on **8906** is the previous project. Stop it when you no longer need it:

```bash
docker stop mambeu-safaris-backend
```
