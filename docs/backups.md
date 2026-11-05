# Backups — Mambeu Safaris

## What you must protect

| Data | Where it lives | In git? |
|------|----------------|---------|
| **CMS content** (tours, pages, enquiries, media uploads) | `pocketbase/pb_data/` on the VPS | No |
| Website code & static assets in repo | GitHub | Yes |
| Built public site | Docker image / `dist/` | Rebuild from git + PocketBase |

**If `pb_data` is lost without a backup, CMS content and uploaded media are gone.** Git and Docker alone do not restore that.

---

## Recommended strategy

1. **Automated PocketBase backups** (daily) — database + file storage in one `.zip`.
2. **Retention** — keep 14–30 days on the server (script default: 14).
3. **Off-server copy** — copy zips to another disk, machine, or cloud (weekly is a good minimum). One backup on the same VPS is not enough if the server fails.
4. **Test a restore** once in a while (staging or local Docker).

---

## Automated backup (VPS)

From the repo root, with `pocketbase/.env` containing superuser credentials and `POCKETBASE_URL=http://127.0.0.1:9112`:

```bash
npm run backup:pb
```

Backups are written to:

```text
pocketbase/pb_data/backups/mambeu-YYYYMMDD-HHMM.zip
```

### Optional: copy elsewhere

Add to `pocketbase/.env` (or export in cron):

```env
BACKUP_KEEP=21
BACKUP_COPY_DIR=/home/humphrey/backups/mambeu
```

Create the directory once: `mkdir -p ~/backups/mambeu`

### Cron (daily at 3:00 AM Tanzania time)

```bash
crontab -e
```

```cron
0 3 * * * cd /home/humphrey/production/applications/mambeu-safaris-website && /usr/bin/npm run backup:pb >> /home/humphrey/logs/mambeu-backup.log 2>&1
```

Use `which npm` on the VPS if the path differs.

---

## Manual backup

**Admin UI:** `https://dashboard-mambeu.schoolhub.space/_/` → **Settings → Backups** → create / download.

**CLI inside the container:**

```bash
docker exec mambeu-pocketbase pocketbase backup create mambeu-manual.zip
```

File appears under `pocketbase/pb_data/backups/` on the host.

---

## Restore

1. Stop PocketBase: `cd pocketbase && docker compose stop`
2. **Admin UI:** Settings → Backups → choose a zip → Restore (or upload a downloaded zip).
3. Or replace `pb_data` from a known-good copy (only when PocketBase is stopped).

After restore, start PocketBase and smoke-test the dashboard and public site.

---

## What `npm run seed:pb` is not

Seeding **updates** collections and can **overwrite** content from repo JSON. It is **not** a backup and **not** a restore. Use backups before risky changes.
