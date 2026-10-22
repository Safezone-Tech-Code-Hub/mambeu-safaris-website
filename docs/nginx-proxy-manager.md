# Nginx Proxy Manager — Mambeu (schoolhub.space)

Production host: **209.74.72.96**. Webuzo subdomains `new-mambeu.schoolhub.space` and `dashboard-mambeu.schoolhub.space` are DNS labels only; traffic should be handled by NPM forwarding to Docker, not the empty `public_html/new-mambeu` folders.

## 1. Start containers on the VPS

From the project directory (`~/production/applications/mambeu-safaris-website` or your clone path):

**Both site + dashboard (PocketBase):**

```bash
docker compose up -d --build
```

**Site only** (`mambeu-web`, port 8080):

```bash
docker compose up -d --build web
```

**Dashboard / backend only** (`mambeu-pocketbase`, port 9112):

```bash
docker compose up -d --build pocketbase
```

Verify:

```bash
docker ps --filter name=mambeu
curl -sI http://127.0.0.1:8080 | head -1    # site
curl -sI http://127.0.0.1:9112/_/ | head -1 # PocketBase admin
```

| Compose service | Container name | Host port | Role |
|-----------------|----------------|-----------|------|
| `web` | `mambeu-web` | 8080 | Public static site |
| `pocketbase` | `mambeu-pocketbase` | 9112 | Dashboard + API (`/_/`) |

## 2. Add proxy hosts in NPM

**Proxy Hosts → Add Proxy Host** for each row below. Match your other hosts: Forward Hostname / IP = server IP, Forward Port = host port, SSL = Let's Encrypt, Access = Public.

| Domain names | Forward IP | Forward port | Notes |
|--------------|------------|--------------|--------|
| `new-mambeu.schoolhub.space` | `209.74.72.96` | `8080` | Static site |
| `dashboard-mambeu.schoolhub.space` | `209.74.72.96` | `9112` | PocketBase admin + API |

**Details tab (both):** Scheme `http`, Block Common Exploits on, Websockets Support **on** (required for PocketBase admin).

**Alternative** if NPM runs on Docker network `proxy-net` and resolves container names:

| Domain | Forward hostname | Forward port |
|--------|------------------|--------------|
| `new-mambeu.schoolhub.space` | `mambeu-web` | `80` |
| `dashboard-mambeu.schoolhub.space` | `mambeu-pocketbase` | `8090` |

## 3. PocketBase after first deploy

1. Open `https://dashboard-mambeu.schoolhub.space/_/` and create the superuser.
2. **Settings → Application** → set **Application URL** to `https://dashboard-mambeu.schoolhub.space` (avoids wrong links behind the proxy).

## 4. Smoke test

- `https://new-mambeu.schoolhub.space/` — home page loads, assets under `/assets/`.
- `https://dashboard-mambeu.schoolhub.space/_/` — PocketBase installer or login.

## 5. Old stack

Container `mambeu-safaris-backend` on host port **8906** is the previous project. Stop or remove it when you no longer need it; this stack does not use 8906.
